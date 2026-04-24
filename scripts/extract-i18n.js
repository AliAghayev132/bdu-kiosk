// extract-i18n.js
// Walks specified HTML files, finds text-bearing elements without data-i18n,
// assigns sequential keys, writes data-i18n attribute back into HTML, and
// builds static/data/translations.json with az filled and en empty.
//
// Approach: token-based scanner that walks tag-by-tag.
// Element is a "translatable leaf" if:
//   - tag in TRANSLATABLE_TAGS
//   - it has no nested block-level children that we'd recurse into
//   - innerHTML (after stripping <i>, <br>, <strong>, <em>, <span class="...">)
//     contains visible Azerbaijani/Latin text
//   - element does not already have data-i18n attribute
//   - element does not contain dynamic counters / placeholders we should skip
//
// To stay safe we DO NOT touch any element whose attributes contain
// data-i18n / id="footer-year" / class~="counter".
//
// Usage: node extract-i18n.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
    { file: 'index.html', prefix: 'idx' },
    { file: 'fakulteler.html', prefix: 'fak' },
    { file: 'korpus.html', prefix: 'kor' },
    { file: 'campus-map.html', prefix: 'map' }
];

// Tags whose direct text content should be extracted.
const TRANSLATABLE_TAGS = new Set([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'li', 'button', 'a', 'span',
    'td', 'th', 'label', 'dt', 'dd',
    'summary', 'figcaption', 'caption', 'option',
    'small', 'strong', 'em', 'b', 'i', 'u',
    'blockquote', 'cite', 'time', 'div'
]);

// Whitespace-only or non-text patterns we skip.
const TEXT_RE = /[A-Za-z\u00C0-\u024F\u0259\u018F\u0131\u0130\u015F\u015E\u011F\u011E\u00E7\u00C7\u00FC\u00DC\u00F6\u00D6]/;

// Skip element if its open tag contains any of these substrings
const SKIP_PATTERNS = [
    'data-i18n', 'data-i18n-html', 'data-i18n-attr',
    'id="footer-year"', 'id="footer-credits"',
    'id="hero-fakulte-count"', 'id="hero-bakalavriat-count"', 'id="hero-magistratura-count"',
    'id="currentSlideNum"', 'id="totalSlideNum"',
    'class="current-slide"', 'class="total-slides"',
    'class="tab-number"', 'class="carousel-counter"',
    'class="footer-sep"', 'id="langCurrent"',
    'class="modal-close"', 'class="fakulte-modal-close"',
    'class="close-edit-panel"', 'class="carousel-prev"', 'class="carousel-next"',
    'class="carousel-control', 'class="carousel-btn'
];

// Tag-level skip (whole element subtree skipped)
const SKIP_TAGS_SUBTREE = new Set(['script', 'style', 'svg', 'noscript', 'video', 'audio', 'iframe', 'select']);

function isInlineFormattingTag(t) {
    return ['i', 'b', 'em', 'strong', 'u', 'small', 'br', 'sub', 'sup', 'mark'].includes(t);
}

// Strip *only* simple inline-format tags but keep their inner text;
// also keep <span> that contain only icons/numbers (turn them into a placeholder).
// Returns the visible text used for the JSON value (still includes minor inline HTML).
function getInnerHTML(html) {
    return html;
}

// Normalize whitespace inside a string to single spaces, preserving leading/trailing trims.
function norm(s) {
    return s.replace(/\s+/g, ' ').trim();
}

// Parse HTML into a flat list of tokens: { kind: 'open'|'close'|'self'|'text'|'comment', ... }
function tokenize(html) {
    const tokens = [];
    let i = 0;
    const n = html.length;
    while (i < n) {
        if (html[i] === '<') {
            // comment
            if (html.startsWith('<!--', i)) {
                const end = html.indexOf('-->', i + 4);
                const stop = end === -1 ? n : end + 3;
                tokens.push({ kind: 'comment', raw: html.slice(i, stop) });
                i = stop;
                continue;
            }
            // doctype / cdata
            if (html.startsWith('<!', i)) {
                const end = html.indexOf('>', i);
                const stop = end === -1 ? n : end + 1;
                tokens.push({ kind: 'comment', raw: html.slice(i, stop) });
                i = stop;
                continue;
            }
            // tag end
            const end = html.indexOf('>', i);
            if (end === -1) {
                tokens.push({ kind: 'text', raw: html.slice(i) });
                break;
            }
            const raw = html.slice(i, end + 1);
            const isClose = raw[1] === '/';
            const inner = raw.slice(isClose ? 2 : 1, raw.length - 1).trim();
            // tag name = up to first whitespace or '/'
            const m = inner.match(/^([a-zA-Z][a-zA-Z0-9-]*)/);
            const tag = m ? m[1].toLowerCase() : '';
            const selfClose = raw.endsWith('/>') || ['br', 'img', 'input', 'meta', 'link', 'hr', 'source', 'track', 'wbr', 'area', 'base', 'col', 'embed', 'param'].includes(tag);
            if (isClose) tokens.push({ kind: 'close', tag, raw });
            else if (selfClose) tokens.push({ kind: 'self', tag, raw });
            else tokens.push({ kind: 'open', tag, raw });
            i = end + 1;
        } else {
            const next = html.indexOf('<', i);
            const stop = next === -1 ? n : next;
            const txt = html.slice(i, stop);
            tokens.push({ kind: 'text', raw: txt });
            i = stop;
        }
    }
    return tokens;
}

function rawToString(tokens, start, end) {
    return tokens.slice(start, end).map(t => t.raw).join('');
}

// Build an index of matching open->close pairs (handles nesting)
function buildPairs(tokens) {
    const pairs = new Map(); // openIdx -> closeIdx
    const stack = [];
    tokens.forEach((t, idx) => {
        if (t.kind === 'open') stack.push(idx);
        else if (t.kind === 'close') {
            // find nearest matching open from top
            for (let j = stack.length - 1; j >= 0; j--) {
                if (tokens[stack[j]].tag === t.tag) {
                    pairs.set(stack[j], idx);
                    stack.splice(j, 1);
                    break;
                }
            }
        }
    });
    return pairs;
}

// Returns inner-HTML text between open and matching close tokens.
function innerHTML(tokens, openIdx, closeIdx) {
    return rawToString(tokens, openIdx + 1, closeIdx);
}

// Decide whether an open tag has any nested *block* children that contain
// translatable text. If so, we DO NOT extract this element — we let the
// recursion handle the children instead.
const BLOCK_TAGS = new Set([
    'div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside',
    'ul', 'ol', 'dl', 'table', 'thead', 'tbody', 'tr', 'p', 'h1','h2','h3','h4','h5','h6',
    'li', 'figure', 'form', 'fieldset', 'pre', 'blockquote'
]);

function hasNestedBlock(tokens, openIdx, closeIdx) {
    for (let j = openIdx + 1; j < closeIdx; j++) {
        const t = tokens[j];
        if (t.kind === 'open' && BLOCK_TAGS.has(t.tag)) return true;
    }
    return false;
}

// True if any descendant has data-i18n / data-i18n-html / data-i18n-attr
// or any id we explicitly want to preserve (footer-year, langSwitcher, langCurrent, modalTitle, etc.)
const PRESERVE_ID_RE = /id="(footer-year|footer-credits|langSwitcher|langCurrent|hero-fakulte-count|hero-bakalavriat-count|hero-magistratura-count|currentSlideNum|totalSlideNum|modalTitle|modalBuildingName|modalDescription|toastMessage)"/;
const PRESERVE_CLASS_RE = /class="[^"]*\b(lang-switcher|footer-credits|footer-sep|tab-number|carousel-counter|current-slide|total-slides|carousel-control|carousel-btn|carousel-prev|carousel-next|modal-close|fakulte-modal-close|close-edit-panel|history-tab|history-tabs|korpus-tab|korpus-tabs|fakulte-tab|fakulte-tabs|nav-button|navigation-grid|carousel-inner|carousel|carousel-slides|carousel-dots)\b/;

function hasPreservedDescendant(tokens, openIdx, closeIdx) {
    for (let j = openIdx + 1; j < closeIdx; j++) {
        const t = tokens[j];
        if (t.kind === 'open' || t.kind === 'self') {
            if (t.raw.includes('data-i18n')) return true;
            if (PRESERVE_ID_RE.test(t.raw)) return true;
            if (PRESERVE_CLASS_RE.test(t.raw)) return true;
        }
    }
    return false;
}

function shouldSkipOpenTag(rawOpen) {
    for (const p of SKIP_PATTERNS) if (rawOpen.includes(p)) return true;
    return false;
}

function injectI18n(rawOpen, key) {
    // insert data-i18n="key" right after the tag name
    return rawOpen.replace(/^<([a-zA-Z][a-zA-Z0-9-]*)/, `<$1 data-i18n="${key}"`);
}

function extractFile(filePath, prefix) {
    const html = fs.readFileSync(filePath, 'utf8');
    const tokens = tokenize(html);
    const pairs = buildPairs(tokens);

    // Determine "hidden" subtrees we should skip (script/style/etc.)
    const skipUntil = new Array(tokens.length).fill(0);
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].kind === 'open' && SKIP_TAGS_SUBTREE.has(tokens[i].tag)) {
            const close = pairs.get(i);
            if (close != null) skipUntil[i] = close;
        }
    }

    let counter = 0;
    const dict = {}; // key -> az text
    const replacements = []; // {idx, newRaw}

    let blocked = -1;
    for (let i = 0; i < tokens.length; i++) {
        if (i <= blocked) continue;
        const t = tokens[i];
        if (skipUntil[i]) { blocked = skipUntil[i]; continue; }
        if (t.kind !== 'open') continue;
        if (!TRANSLATABLE_TAGS.has(t.tag)) continue;
        if (shouldSkipOpenTag(t.raw)) continue;
        const close = pairs.get(i);
        if (close == null) continue;
        if (hasNestedBlock(tokens, i, close)) continue;
        if (hasPreservedDescendant(tokens, i, close)) continue;
        const inner = innerHTML(tokens, i, close);
        const visibleText = norm(inner.replace(/<[^>]+>/g, ''));
        if (!visibleText || !TEXT_RE.test(visibleText)) continue;
        // Skip pure numbers / years / single chars
        if (/^[\d\s.,:/\-]+$/.test(visibleText)) continue;
        if (visibleText.length < 2) continue;
        // Generate key
        counter++;
        const key = `${prefix}.${String(counter).padStart(4, '0')}`;
        dict[key] = norm(inner);
        replacements.push({ idx: i, newRaw: injectI18n(t.raw, key) });
    }

    // Apply replacements
    for (const r of replacements) tokens[r.idx].raw = r.newRaw;
    const newHtml = tokens.map(t => t.raw).join('');
    fs.writeFileSync(filePath, newHtml, 'utf8');
    return dict;
}

function main() {
    const outDir = path.join(ROOT, 'static', 'data');
    const outPath = path.join(outDir, 'translations.json');

    // Load existing JSON so we never lose previously filled EN translations.
    let existing = { az: {}, en: {} };
    if (fs.existsSync(outPath)) {
        try { existing = JSON.parse(fs.readFileSync(outPath, 'utf8')); }
        catch (e) { console.warn('existing JSON unreadable, starting fresh'); }
        if (!existing.az) existing.az = {};
        if (!existing.en) existing.en = {};
    }

    const az = Object.assign({}, existing.az);
    const en = Object.assign({}, existing.en);

    let newCount = 0;
    for (const { file, prefix } of FILES) {
        const fp = path.join(ROOT, file);
        if (!fs.existsSync(fp)) { console.warn('skip missing', fp); continue; }
        const dict = extractFile(fp, prefix);
        const keys = Object.keys(dict);
        console.log(`[${file}] extracted ${keys.length} new strings`);
        for (const k of keys) {
            if (!(k in az)) newCount++;
            az[k] = dict[k];
            if (!(k in en)) en[k] = '';
        }
    }
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify({ az, en }, null, 2), 'utf8');
    const filledEn = Object.values(en).filter(v => v && v.trim()).length;
    console.log(`Wrote ${outPath}`);
    console.log(`  total keys: ${Object.keys(az).length}  new this run: ${newCount}  EN filled: ${filledEn}`);
}

main();
