// ====================================
// i18n - Azerbaijani / English language switcher
// Persists choice in localStorage. Default: az
// Usage:
//   <span data-i18n="nav.history">BDU-nun tarixi</span>
//   <p data-i18n-html="some.key">HTML mətn icazəlidir</p>
// Long content can also use dual blocks:
//   <span class="lang-az">Azərbaycan</span><span class="lang-en">English</span>
// (visibility toggled by html[data-lang] CSS rules in shared.css)
// ====================================

(function () {
    'use strict';

    const STORAGE_KEY = 'bdu.lang';
    const DEFAULT_LANG = 'az';

    const TRANSLATIONS = {
        az: {
            // ===== Document titles =====
            'page.title.home': 'Bakı Dövlət Universiteti - İnformasiya Kiosku',
            'page.title.fakulteler': 'Fakültələr - Bakı Dövlət Universiteti',
            'page.title.korpus': 'Korpuslar haqqında - Bakı Dövlət Universiteti',
            'page.title.campus': 'İnteraktiv Kampus Xəritəsi - Bakı Dövlət Universiteti',

            // ===== Header =====
            'header.bdu.line1': 'BAKI DÖVLƏT',
            'header.bdu.line2': 'UNİVERSİTETİ',
            'header.quote': '"Bakı Dövlət Universiteti Azərbaycan xalqının, Azərbaycan Respublikasının milli sərvətidir, milli iftixarıdır"',
            'header.quote.author': 'Heydər Əliyev',

            // ===== Footer =====
            'footer.copy': '© <span id="footer-year"></span> Bakı Dövlət Universiteti. Bütün hüquqlar qorunur.',
            'footer.designed': 'Designed by BDU TETYM',

            // ===== Common =====
            'common.back': 'Ana Səhifə',
            'common.close': 'Bağla',
            'common.cancel': 'Ləğv Et',
            'common.save': 'Yadda Saxla',
            'common.search': 'Axtar',
            'common.loading': 'Yüklənir...',
            'common.readmore': 'Ətraflı',

            // ===== Main navigation buttons =====
            'nav.campus': 'Kampus və tədris binaları',
            'nav.history': 'BDU-nun tarixi',
            'nav.heyder': 'Heydər Əliyev və BDU',
            'nav.prezident': 'Azərbaycan Prezidenti və BDU',
            'nav.rankings': 'BDU-nun reytinqlərdə mövqeyi',
            'nav.facts': 'Rəqəmlər və faktlar',
            'nav.innovation': 'İnnovasiya',
            'nav.fakulteler': 'Fakültələr',

            // ===== Page headers =====
            'page.history.h1': 'BDU-nun Tarixi',
            'page.heyder.h1': 'Heydər Əliyev və BDU',
            'page.prezident.h1': 'Azərbaycan Prezidenti və BDU',
            'page.rankings.h1': 'BDU-nun reytinqlərdə mövqeyi',
            'page.facts.h1': 'Rəqəmlər və Faktlar',
            'page.innovation.h1': 'İnnovasiya',
            'page.fakulteler.h1': 'Fakültələr',
            'page.korpus.h1': 'Korpuslar haqqında',
            'page.campus.h1': 'İnteraktiv Kampus Xəritəsi',
            'page.campus.sub': 'Bakı Dövlət Universiteti',
            'page.eco.h1': 'Eko-Kampus',
            'page.tetym.h1': 'TETYM',
            'page.tetym.full': 'Tələbə Elmi-Texniki Yaradıcılıq Mərkəzi (TETYM)',
            'page.eco.h2': 'Eko Məkan',
            'page.rankings.h2': 'BDU - Beynəlxalq Reytinqlər',
            'page.kitab.h1': 'Kitab Evi',
            'page.stadion.h1': 'İdman Kompleksi',
            'page.science.h1': 'Elm və Tədqiqat',

            // ===== Innovation tabs =====
            'inn.tab.tetym': 'TETYM',
            'inn.tab.science': 'Elm',
            'inn.tab.eco': 'Eko-Kampus',
            'inn.tab.cleanCharge': 'CleanCharge',
            'inn.tab.drl': 'Robot Laboratoriyası',
            'inn.tab.kitab': 'Kitab Evi',

            // ===== History tabs =====
            'hist.tab.tarix': 'Tarix',
            'hist.tab.xronologiya': 'Xronologiya',

            // ===== Korpus =====
            'korpus.tab.0': 'Əsas tədris binası',
            'korpus.tab.1': '1-ci Korpus',
            'korpus.tab.2': '2-ci Korpus',
            'korpus.tab.3': '3-cü Korpus',
            'korpus.tab.4': '4-cü Korpus',
            'korpus.faculties': 'Fakültələr',
            'korpus.details.toggle': 'Ətraflı məlumat',
            'korpus.details.hide': 'Gizlət',
            'korpus.about': 'Korpus haqqında',
            'korpus.0.h': 'Əsas tədris binası',
            'korpus.0.hero': 'Bakı Dövlət Universitetinin tarixi əsas binası - Təbiet elmləri fakültələrinin mərkəzi. 1936-cı ildə tikilmiş bu möhtəşəm bina universitetin simvoluna çevrilmişdir.',
            'korpus.0.info': 'Əsas tədris binası BDU-nun ən qədim və ən böyük tədris binasıdır. Burada əsasən təbiet elmləri - fizika, kimya, biologiya və coğrafiya fakültələri yerləşir. Korpusda müasir laboratoriyalar, tədqiqat mərkəzləri və auditoriyalar fəaliyyət göstərir.',
            'korpus.1.h': '1-ci Korpus',
            'korpus.1.hero': 'Humanitar elmlər fakültələrinin mərkəzi - Filologiya, Tarix və Jurnalistika. Azərbaycan dilinin, ədəbiyyatının və mədəniyyətinin öyrənildiyi mühüm tədris binası.',
            'korpus.1.info': '1-ci korpus humanitar elmlərin öyrənildiyi əsas məkandır. Burada Azərbaycan dili və ədəbiyyatı, xarici dillər, tarix və jurnalistika sahəsində mütəxəssislər yetişdirilir. Korpusda zəngin kitabxana fondu və tədqiqat şöbələri fəaliyyət göstərir.',
            'korpus.2.h': '2-ci Korpus',
            'korpus.2.hero': 'Sosial və humanitar elmlər kompleksi - Hüquq, İqtisadiyyat və Beynəlxalq münasibətlər fakültələri. Gələcəyin hüquqşünas və iqtisadçılarının hazırlandığı mərkəz.',
            'korpus.2.info': '2-ci korpusda sosial elmlər sahəsində təhsil verilir. Hüquq, iqtisadiyyat, beynəlxalq münasibətlər və sosial iş fakültələri burada yerləşir. Müasir konfrans zalları və mühazirə otaqları tələbələrin xidmətindədir.',
            'korpus.3.h': '3-cü Korpus',
            'korpus.3.hero': 'Dəqiq elmlər və informasiya texnologiyaları mərkəzi - Riyaziyyat, Tətbiqi riyaziyyat, Kibernetika və İnformasiya texnologiyaları. Gələcəyin IT mütəxəssislərinin hazırlandığı innovativ məkan.',
            'korpus.3.info': '3-cü korpus BDU-nun ən müasir tədris binasıdır. Burada riyaziyyat, tətbiqi riyaziyyat, kompüter elmləri və informasiya texnologiyaları sahəsində kadrlar hazırlanır. TETYM, kompüter laboratoriyaları və innovasiya mərkəzləri bu korpusda yerləşir.',

            // ===== Fakulteler categories =====
            'fak.intro.h': 'Bakı Dövlət Universiteti fakültələri',
            'fak.cat.science': 'Təbiət və dəqiq elmlər fakültələri',
            'fak.cat.humanities': 'Humanitar və sosial elmlər fakültələri',
            'fak.modal.tab.about': 'Haqqında',
            'fak.modal.tab.dean': 'Dekan',
            'fak.modal.tab.history': 'Tarixi',
            'fak.modal.tab.gallery': 'Qalereya',
            'fak.modal.tab.today': 'Bu gün',
            'fak.modal.gallery.h': 'Foto qalereya',
            'fak.modal.title.placeholder': 'Fakültə Adı',
            'fak.intro.p': 'Universitet ilk tədris ilini 2 fakültə ilə – tarix-filologiya, tibb fakültələri və 1094 tələbə ilə başlamışdır. Hazırda isə Bakı Dövlət Universitetdə {a} fakültə fəaliyyət göstərir və bu fakültələrdə müxtəlif elmi istiqamətlərdə bakalavriat səviyyəsində {b} ixtisas, magistratura səviyyəsində isə {c} ixtisas üzrə mütəxəssislər hazırlanır.',
            'fak.mexanika': 'Mexanika-riyaziyyat fakültəsi',
            'fak.biologiya': 'Biologiya fakültəsi',
            'fak.cografiya': 'Coğrafiya fakültəsi',
            'fak.tetbiqi': 'Tətbiqi riyaziyyat və kibernetika fakültəsi',
            'fak.fizika': 'Fizika fakültəsi',
            'fak.kimya': 'Kimya fakültəsi',
            'fak.ekologiya': 'Ekologiya və torpağşünaslıq fakültəsi',
            'fak.geologiya': 'Geologiya fakültəsi',
            'fak.tarix': 'Tarix fakültəsi',
            'fak.beynelxalq': 'Beynəlxalq münasibətlər və iqtisadiyyat fakültəsi',
            'fak.huquq': 'Hüquq fakültəsi',
            'fak.jurnalistika': 'Jurnalistika fakültəsi',
            'fak.serqsunasliq': 'Şərqşünaslıq fakültəsi',
            'fak.sosial': 'Sosial elmlər və psixologiya fakültəsi',
            'fak.informasiya': 'İnformasiya və sənəd menecmenti fakültəsi',
            'fak.filologiya': 'Filologiya fakültəsi',

            // ===== Facts page =====
            'facts.section.structure': 'Struktur',
            'facts.section.specialties': 'İxtisaslar',
            'facts.section.staff': 'Heyət',
            'facts.section.students': 'Tələbələr',
            'facts.section.intl': 'Beynəlxalq əməkdaşlıq',

            // ===== Carousel =====
            'carousel.prev': 'Əvvəlki',
            'carousel.next': 'Növbəti',

            // ===== Campus map =====
            'campus.modal.desc': 'Təsvir',
            'campus.modal.gallery': 'Qalereya',
            'campus.modal.placeholder.name': 'Bina Adı',
            'campus.modal.placeholder.desc': 'Bina təsviri',
            'campus.legend': 'Binalar'
        },

        en: {
            // ===== Document titles =====
            'page.title.home': 'Baku State University - Information Kiosk',
            'page.title.fakulteler': 'Faculties - Baku State University',
            'page.title.korpus': 'About Campus Buildings - Baku State University',
            'page.title.campus': 'Interactive Campus Map - Baku State University',

            // ===== Header =====
            'header.bdu.line1': 'BAKU STATE',
            'header.bdu.line2': 'UNIVERSITY',
            'header.quote': '"Baku State University is the national wealth and pride of the Azerbaijani people and the Republic of Azerbaijan."',
            'header.quote.author': 'Heydar Aliyev',

            // ===== Footer =====
            'footer.copy': '© <span id="footer-year"></span> Baku State University. All rights reserved.',
            'footer.designed': 'Designed by BDU TETYM',

            // ===== Common =====
            'common.back': 'Home',
            'common.close': 'Close',
            'common.cancel': 'Cancel',
            'common.save': 'Save',
            'common.search': 'Search',
            'common.loading': 'Loading...',
            'common.readmore': 'Read more',

            // ===== Main navigation buttons =====
            'nav.campus': 'Campus & Academic Buildings',
            'nav.history': 'BSU History',
            'nav.heyder': 'Heydar Aliyev & BSU',
            'nav.prezident': 'President of Azerbaijan & BSU',
            'nav.rankings': 'BSU in World Rankings',
            'nav.facts': 'Figures & Facts',
            'nav.innovation': 'Innovation',
            'nav.fakulteler': 'Faculties',

            // ===== Page headers =====
            'page.history.h1': 'BSU History',
            'page.heyder.h1': 'Heydar Aliyev & BSU',
            'page.prezident.h1': 'President of Azerbaijan & BSU',
            'page.rankings.h1': 'BSU in World Rankings',
            'page.facts.h1': 'Figures & Facts',
            'page.innovation.h1': 'Innovation',
            'page.fakulteler.h1': 'Faculties',
            'page.korpus.h1': 'About Campus Buildings',
            'page.campus.h1': 'Interactive Campus Map',
            'page.campus.sub': 'Baku State University',
            'page.eco.h1': 'Eco-Campus',
            'page.tetym.h1': 'STREC',
            'page.tetym.full': 'Student Scientific-Technical Creativity Center (STREC)',
            'page.eco.h2': 'Eco Space',
            'page.rankings.h2': 'BSU in International Rankings',
            'page.kitab.h1': 'Book House',
            'page.stadion.h1': 'Sports Complex',
            'page.science.h1': 'Science & Research',

            // ===== Innovation tabs =====
            'inn.tab.tetym': 'STREC',
            'inn.tab.science': 'Science',
            'inn.tab.eco': 'Eco-Campus',
            'inn.tab.cleanCharge': 'CleanCharge',
            'inn.tab.drl': 'Robotics Lab',
            'inn.tab.kitab': 'Book House',

            // ===== History tabs =====
            'hist.tab.tarix': 'History',
            'hist.tab.xronologiya': 'Chronology',

            // ===== Korpus =====
            'korpus.tab.0': 'Main Academic Building',
            'korpus.tab.1': 'Building 1',
            'korpus.tab.2': 'Building 2',
            'korpus.tab.3': 'Building 3',
            'korpus.tab.4': 'Building 4',
            'korpus.faculties': 'Faculties',
            'korpus.details.toggle': 'More details',
            'korpus.details.hide': 'Hide',
            'korpus.about': 'About this building',
            'korpus.0.h': 'Main Academic Building',
            'korpus.0.hero': 'The historic main building of Baku State University — the centre of the natural-science faculties. Built in 1936, this magnificent building has become a symbol of the university.',
            'korpus.0.info': 'The Main Academic Building is BSU’s oldest and largest teaching block. It primarily houses the natural-science faculties — physics, chemistry, biology and geography — and contains modern laboratories, research centres and lecture halls.',
            'korpus.1.h': 'Building 1',
            'korpus.1.hero': 'The hub of the humanities faculties — Philology, History and Journalism. A key teaching building where the Azerbaijani language, literature and culture are studied.',
            'korpus.1.info': 'Building 1 is the principal venue for humanities studies. Specialists are trained here in Azerbaijani language and literature, foreign languages, history and journalism. The building hosts a rich library collection and several research departments.',
            'korpus.2.h': 'Building 2',
            'korpus.2.hero': 'A complex for the social and humanities sciences — Law, Economics and International Relations. The centre that prepares the lawyers and economists of the future.',
            'korpus.2.info': 'Building 2 delivers programmes in the social sciences. The faculties of law, economics, international relations and social work are housed here. Modern conference halls and lecture rooms are at the students’ disposal.',
            'korpus.3.h': 'Building 3',
            'korpus.3.hero': 'A centre for the exact sciences and information technologies — Mathematics, Applied Mathematics, Cybernetics and IT. An innovative space training the IT specialists of tomorrow.',
            'korpus.3.info': 'Building 3 is BSU’s most modern teaching block. It trains specialists in mathematics, applied mathematics, computer science and IT. STREC, computer laboratories and innovation centres are located here.',

            // ===== Fakulteler categories =====
            'fak.intro.h': 'Faculties of Baku State University',
            'fak.cat.science': 'Faculties of Natural & Exact Sciences',
            'fak.cat.humanities': 'Faculties of Humanities & Social Sciences',
            'fak.modal.tab.about': 'About',
            'fak.modal.tab.dean': 'Dean',
            'fak.modal.tab.history': 'History',
            'fak.modal.tab.gallery': 'Gallery',
            'fak.modal.tab.today': 'Today',
            'fak.modal.gallery.h': 'Photo gallery',
            'fak.modal.title.placeholder': 'Faculty Name',
            'fak.intro.p': 'The university began its first academic year with 2 faculties — history-philology and medicine — and 1,094 students. Today, Baku State University operates {a} faculties, training specialists in {b} bachelor’s and {c} master’s programmes across diverse scientific fields.',
            'fak.mexanika': 'Faculty of Mechanics & Mathematics',
            'fak.biologiya': 'Faculty of Biology',
            'fak.cografiya': 'Faculty of Geography',
            'fak.tetbiqi': 'Faculty of Applied Mathematics & Cybernetics',
            'fak.fizika': 'Faculty of Physics',
            'fak.kimya': 'Faculty of Chemistry',
            'fak.ekologiya': 'Faculty of Ecology & Soil Science',
            'fak.geologiya': 'Faculty of Geology',
            'fak.tarix': 'Faculty of History',
            'fak.beynelxalq': 'Faculty of International Relations & Economics',
            'fak.huquq': 'Faculty of Law',
            'fak.jurnalistika': 'Faculty of Journalism',
            'fak.serqsunasliq': 'Faculty of Oriental Studies',
            'fak.sosial': 'Faculty of Social Sciences & Psychology',
            'fak.informasiya': 'Faculty of Information & Document Management',
            'fak.filologiya': 'Faculty of Philology',

            // ===== Facts page =====
            'facts.section.structure': 'Structure',
            'facts.section.specialties': 'Specialties',
            'facts.section.staff': 'Faculty & Staff',
            'facts.section.students': 'Students',
            'facts.section.intl': 'International cooperation',

            // ===== Carousel =====
            'carousel.prev': 'Previous',
            'carousel.next': 'Next',

            // ===== Campus map =====
            'campus.modal.desc': 'Description',
            'campus.modal.gallery': 'Gallery',
            'campus.modal.placeholder.name': 'Building Name',
            'campus.modal.placeholder.desc': 'Building description',
            'campus.legend': 'Buildings'
        }
    };

    function getStoredLang() {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            if (v === 'az' || v === 'en') return v;
        } catch (e) { /* ignore */ }
        return DEFAULT_LANG;
    }

    function setStoredLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    function applyLang(lang) {
        const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
        const fallback = TRANSLATIONS[DEFAULT_LANG] || {};
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.lang = lang === 'en' ? 'en' : 'az';

        // Resolve a key, falling back to AZ when EN is empty/missing.
        function resolve(key) {
            const v = dict[key];
            if (v != null && v !== '') return v;
            const fb = fallback[key];
            if (fb != null && fb !== '') return fb;
            return null;
        }

        // Text-only translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = resolve(key);
            if (val == null) return;
            // If translation contains HTML markers, set innerHTML so footer year etc. work
            if (/[<&]/.test(val)) el.innerHTML = val;
            else el.textContent = val;
        });

        // HTML-allowed translations
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const val = resolve(key);
            if (val != null) el.innerHTML = val;
        });

        // attribute translations: data-i18n-attr="alt:home.alt;title:home.title"
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const spec = el.getAttribute('data-i18n-attr');
            spec.split(';').forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s && s.trim());
                const val = attr && key ? resolve(key) : null;
                if (val != null) el.setAttribute(attr, val);
            });
        });

        // <title> per page (each page sets data-page on body or html)
        const pageKey = document.body && document.body.dataset && document.body.dataset.titleKey;
        if (pageKey) {
            const t = resolve(pageKey);
            if (t) document.title = t;
        }

        // Update footer year
        document.querySelectorAll('#footer-year').forEach(el => {
            el.textContent = String(new Date().getFullYear());
        });

        // Update language switcher button label (shows OPPOSITE language as target)
        const cur = document.getElementById('langCurrent');
        if (cur) cur.textContent = lang === 'az' ? 'EN' : 'AZ';

        // Notify other modules (e.g., dynamically rendered carousels, korpus details)
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    function toggleLang() {
        const cur = document.documentElement.getAttribute('data-lang') || DEFAULT_LANG;
        const next = cur === 'az' ? 'en' : 'az';
        setStoredLang(next);
        applyLang(next);
    }

    // ====================================
    // External translations: load static/data/translations.json and merge.
    // Lets large body content live in JSON (easy translation) instead of inline.
    // ====================================
    const EXTERNAL_JSON_URL = 'static/data/translations.json';

    function mergeExternal(data) {
        if (!data || typeof data !== 'object') return;
        for (const lang of Object.keys(data)) {
            if (!TRANSLATIONS[lang]) TRANSLATIONS[lang] = {};
            const src = data[lang] || {};
            for (const k of Object.keys(src)) {
                // External JSON wins (it's the canonical store for body content)
                TRANSLATIONS[lang][k] = src[k];
            }
        }
    }

    function loadExternal() {
        if (typeof fetch !== 'function') return Promise.resolve();
        return fetch(EXTERNAL_JSON_URL, { cache: 'no-cache' })
            .then(r => r.ok ? r.json() : null)
            .then(json => { if (json) mergeExternal(json); })
            .catch(() => { /* silent — fall back to inline dictionary */ });
    }

    function init() {
        const lang = getStoredLang();
        // Apply inline translations immediately so UI chrome is correct on first paint.
        applyLang(lang);
        const btn = document.getElementById('langSwitcher');
        if (btn) btn.addEventListener('click', toggleLang);
        // Then load external JSON and re-apply for body content.
        loadExternal().then(() => applyLang(lang));
    }

    // expose for other modules
    window.i18n = {
        get current() { return document.documentElement.getAttribute('data-lang') || DEFAULT_LANG; },
        t: function (key) {
            const lang = this.current;
            return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS[DEFAULT_LANG] && TRANSLATIONS[DEFAULT_LANG][key]) || key;
        },
        set: function (lang) { if (TRANSLATIONS[lang]) { setStoredLang(lang); applyLang(lang); } },
        toggle: toggleLang,
        apply: applyLang
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
