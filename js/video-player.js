/* ==========================================================================
   BDU Kiosk - Ana səhifədəki tanıtım videosu üçün xüsusi pleyer
   İmkanlar: oynat/dayandır, stop, 10 san. geri/irəli, sürüşdürmə zolağı,
             səs artır/azalt + susdur, təkrar (loop), tam ekran.
   Video həmişə tam səslə açılır.
   ========================================================================== */

(function () {
    'use strict';

    const SKIP = 10;          // saniyə (geri / irəli)
    const VOL_STEP = 0.10;    // səs addımı
    const HIDE_DELAY = 3500;  // idarəetmə panelinin gizlənmə gecikməsi (ms)

    function init() {
        const stage = document.getElementById('videoStage');
        const video = document.getElementById('promoVideo');
        if (!stage || !video) return;

        const el = id => document.getElementById(id);

        const bigPlay = el('videoBigPlay');
        const btnPlay = el('btnPlay');
        const btnStop = el('btnStop');
        const btnBack = el('btnBack10');
        const btnFwd = el('btnFwd10');
        const btnMute = el('btnMute');
        const btnVolUp = el('btnVolUp');
        const btnVolDn = el('btnVolDown');
        const btnLoop = el('btnLoop');
        const btnFull = el('btnFull');
        const volRange = el('volRange');
        const volVal = el('volVal');
        const progress = el('videoProgress');
        const played = el('videoPlayed');
        const buffer = el('videoBuffer');
        const curEl = el('vCur');
        const durEl = el('vDur');
        const toast = el('videoToast');

        let hideTimer = null;
        let toastTimer = null;
        let scrubbing = false;
        let startedOnce = false;

        // ---------- köməkçilər ----------

        function fmt(sec) {
            if (!isFinite(sec) || sec < 0) sec = 0;
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = Math.floor(sec % 60);
            const mm = h ? String(m).padStart(2, '0') : String(m);
            return (h ? h + ':' : '') + mm + ':' + String(s).padStart(2, '0');
        }

        function showToast(text) {
            if (!toast) return;
            toast.textContent = text;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 900);
        }

        function icon(btn, name) {
            const i = btn && btn.querySelector('i');
            if (i) i.className = 'fas ' + name;
        }

        // ---------- səs ----------

        function setVolume(v, withToast) {
            v = Math.min(1, Math.max(0, v));
            video.volume = v;
            video.muted = (v === 0);
            syncVolumeUI();
            if (withToast) showToast(Math.round(v * 100) + '%');
        }

        function syncVolumeUI() {
            const pct = video.muted ? 0 : Math.round(video.volume * 100);
            if (volRange) volRange.value = pct;
            if (volVal) volVal.textContent = pct + '%';
            if (btnMute) {
                icon(btnMute,
                    pct === 0 ? 'fa-volume-xmark'
                        : pct < 50 ? 'fa-volume-low'
                            : 'fa-volume-high');
                btnMute.title = pct === 0 ? 'Səsi aç' : 'Səsi bağla';
            }
        }

        /** Videonu tam səslə açır */
        function fullVolume() {
            video.muted = false;
            video.volume = 1;
            syncVolumeUI();
        }

        // ---------- oynatma ----------

        function play(resetVolume) {
            if (resetVolume || !startedOnce) fullVolume();
            startedOnce = true;
            stage.classList.add('has-started');
            const p = video.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {
                    // Brauzer səsli avto-oynatmaya icazə vermədi -> logo + böyük düymə qalsın
                    stage.classList.remove('is-playing');
                    if (video.currentTime === 0) stage.classList.remove('has-started');
                });
            }
        }

        function togglePlay() {
            if (video.paused || video.ended) {
                play(video.currentTime === 0);
            } else {
                video.pause();
            }
        }

        function stop() {
            video.pause();
            video.currentTime = 0;
            startedOnce = false;
            stage.classList.remove('is-playing');
            stage.classList.remove('has-started');
            update();
        }

        function skip(sec) {
            const d = video.duration || 0;
            let t = video.currentTime + sec;
            if (t < 0) t = 0;
            if (d && t > d - 0.25) t = Math.max(0, d - 0.25);
            video.currentTime = t;
            showToast((sec > 0 ? '+' : '') + sec + ' san.');
            update();
        }

        // ---------- tam ekran ----------

        function isFull() {
            return document.fullscreenElement === stage
                || document.webkitFullscreenElement === stage;
        }

        function toggleFullscreen() {
            if (isFull()) {
                const exit = document.exitFullscreen || document.webkitExitFullscreen
                    || document.msExitFullscreen || document.mozCancelFullScreen;
                if (exit) exit.call(document);
            } else {
                const req = stage.requestFullscreen || stage.webkitRequestFullscreen
                    || stage.msRequestFullscreen || stage.mozRequestFullScreen;
                if (req) {
                    const r = req.call(stage);
                    if (r && typeof r.catch === 'function') r.catch(() => { });
                }
            }
        }

        ['fullscreenchange', 'webkitfullscreenchange'].forEach(evt => {
            document.addEventListener(evt, () => {
                icon(btnFull, isFull() ? 'fa-compress' : 'fa-expand');
                showControls();
            });
        });

        // ---------- zolaq / vaxt ----------

        function update() {
            const d = video.duration || 0;
            const c = video.currentTime || 0;
            if (played) played.style.width = (d ? (c / d) * 100 : 0) + '%';
            if (curEl) curEl.textContent = fmt(c);
            if (durEl) durEl.textContent = fmt(d);

            if (buffer && video.buffered && video.buffered.length && d) {
                const end = video.buffered.end(video.buffered.length - 1);
                buffer.style.width = Math.min(100, (end / d) * 100) + '%';
            }
        }

        function seekFromEvent(e) {
            const d = video.duration;
            if (!d || !isFinite(d)) return;
            const rect = progress.getBoundingClientRect();
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            const ratio = Math.min(1, Math.max(0, x / rect.width));
            video.currentTime = ratio * d;
            update();
        }

        if (progress) {
            progress.addEventListener('pointerdown', e => {
                scrubbing = true;
                progress.setPointerCapture && progress.setPointerCapture(e.pointerId);
                seekFromEvent(e);
                showControls();
            });
            progress.addEventListener('pointermove', e => {
                if (scrubbing) seekFromEvent(e);
            });
            progress.addEventListener('pointerup', () => { scrubbing = false; });
            progress.addEventListener('pointercancel', () => { scrubbing = false; });
        }

        // ---------- idarəetmə panelinin gizlənməsi ----------

        function showControls() {
            stage.classList.remove('controls-hidden');
            clearTimeout(hideTimer);
            if (!video.paused && !video.ended) {
                hideTimer = setTimeout(() => {
                    if (!video.paused && !scrubbing) stage.classList.add('controls-hidden');
                }, HIDE_DELAY);
            }
        }

        ['mousemove', 'pointerdown', 'touchstart', 'click'].forEach(evt => {
            stage.addEventListener(evt, showControls, { passive: true });
        });

        // ---------- hadisələr ----------

        if (bigPlay) bigPlay.addEventListener('click', () => play(true));
        if (btnPlay) btnPlay.addEventListener('click', togglePlay);
        if (btnStop) btnStop.addEventListener('click', stop);
        if (btnBack) btnBack.addEventListener('click', () => skip(-SKIP));
        if (btnFwd) btnFwd.addEventListener('click', () => skip(SKIP));

        if (btnVolUp) btnVolUp.addEventListener('click', () => setVolume(video.volume + VOL_STEP, true));
        if (btnVolDn) btnVolDn.addEventListener('click', () => setVolume(video.volume - VOL_STEP, true));
        if (btnMute) btnMute.addEventListener('click', () => {
            if (video.muted || video.volume === 0) setVolume(1, true);
            else { video.muted = true; syncVolumeUI(); showToast('Səssiz'); }
        });
        if (volRange) volRange.addEventListener('input', () => setVolume(volRange.value / 100, false));

        if (btnLoop) btnLoop.addEventListener('click', () => {
            video.loop = !video.loop;
            btnLoop.classList.toggle('is-on', video.loop);
            btnLoop.title = video.loop ? 'Təkrar: aktiv' : 'Təkrar: söndürülüb';
            showToast(video.loop ? 'Təkrar: aktiv' : 'Təkrar: söndürülüb');
        });

        if (btnFull) btnFull.addEventListener('click', toggleFullscreen);

        // Video üzərinə tək toxunuş -> oynat/dayandır
        video.addEventListener('click', togglePlay);

        video.addEventListener('play', () => {
            stage.classList.add('is-playing');
            icon(btnPlay, 'fa-pause');
            showControls();
        });

        video.addEventListener('pause', () => {
            stage.classList.remove('is-playing');
            icon(btnPlay, 'fa-play');
            stage.classList.remove('controls-hidden');
            clearTimeout(hideTimer);
        });

        video.addEventListener('ended', () => {
            stage.classList.remove('is-playing');
            icon(btnPlay, 'fa-play');
        });

        video.addEventListener('timeupdate', update);
        video.addEventListener('progress', update);
        video.addEventListener('loadedmetadata', () => { update(); fullVolume(); });
        video.addEventListener('volumechange', syncVolumeUI);
        video.addEventListener('waiting', () => stage.classList.add('is-buffering'));
        ['playing', 'canplay', 'pause'].forEach(e =>
            video.addEventListener(e, () => stage.classList.remove('is-buffering')));

        // Klaviatura (yalnız ana səhifə aktiv olduqda)
        document.addEventListener('keydown', e => {
            const page = document.getElementById('main-page');
            if (!page || !page.classList.contains('active')) return;
            const tag = (e.target && e.target.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea') return;

            switch (e.key) {
                case ' ': e.preventDefault(); togglePlay(); break;
                case 'ArrowRight': e.preventDefault(); skip(SKIP); break;
                case 'ArrowLeft': e.preventDefault(); skip(-SKIP); break;
                case 'ArrowUp': e.preventDefault(); setVolume(video.volume + VOL_STEP, true); break;
                case 'ArrowDown': e.preventDefault(); setVolume(video.volume - VOL_STEP, true); break;
                case 'm': case 'M': btnMute && btnMute.click(); break;
                case 'f': case 'F': toggleFullscreen(); break;
            }
        });

        // Başqa səhifəyə keçəndə videonu dayandır
        const origShowPage = window.showPage;
        window.showPage = function (pageId) {
            if (pageId !== 'main-page' && !video.paused) video.pause();
            if (isFull()) {
                const exit = document.exitFullscreen || document.webkitExitFullscreen;
                if (exit) { try { exit.call(document); } catch (_) { } }
            }
            if (typeof origShowPage === 'function') return origShowPage.apply(this, arguments);
        };

        // Səhifə arxa plana keçəndə dayandır
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !video.paused) video.pause();
        });

        // ---------- ilkin vəziyyət ----------
        video.loop = true;
        if (btnLoop) btnLoop.classList.add('is-on');
        fullVolume();
        icon(btnFull, 'fa-expand');
        update();

        // Səsli avtomatik başlatmağa cəhd (brauzer bloklayarsa böyük düymə qalır)
        const tryAutoplay = video.getAttribute('data-autoplay') === 'true';
        if (tryAutoplay) {
            play(true);
        }
    }

    /**
     * Ana səhifə məzmununun header/footer arasında dəqiq ortalanması üçün
     * onların real hündürlüyünü CSS dəyişəninə yazır.
     */
    function syncLayoutVars() {
        const header = document.querySelector('#main-page .header');
        const footer = document.querySelector('#main-page .footer');
        const root = document.documentElement;
        if (header) root.style.setProperty('--bdu-header-h', Math.round(header.offsetHeight) + 'px');
        if (footer) root.style.setProperty('--bdu-footer-h', Math.round(footer.offsetHeight) + 'px');
    }

    function boot() {
        syncLayoutVars();
        init();
        window.addEventListener('resize', syncLayoutVars, { passive: true });
        window.addEventListener('load', syncLayoutVars);
        if (window.ResizeObserver) {
            const h = document.querySelector('#main-page .header');
            if (h) new ResizeObserver(syncLayoutVars).observe(h);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
