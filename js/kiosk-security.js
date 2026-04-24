/* ====================================
   BDU Kiosk - Security & fullscreen mode
   - Block developer tools and zoom shortcuts
   - Disable right-click context menu
   - Prevent double-tap zoom on touchscreens
   - Provide F11 fullscreen toggle
   ==================================== */

(function () {
    'use strict';

    // ---- Block developer-tools and zoom shortcuts ----
    document.addEventListener('keydown', e => {
        // F12
        if (e.key === 'F12') { e.preventDefault(); return false; }

        // Ctrl+Shift+I/J/C/K
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'K'].includes(e.key)) {
            e.preventDefault();
            return false;
        }

        // Ctrl + (+, =, -, 0)
        if (e.ctrlKey && ['+', '=', '-', '0'].includes(e.key)) {
            e.preventDefault();
            return false;
        }
    });

    // ---- Right-click off ----
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        return false;
    });

    // ---- Prevent double-tap zoom on tablets ----
    let lastTouchEnd = 0;
    document.addEventListener('touchend', e => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) e.preventDefault();
        lastTouchEnd = now;
    }, false);

    // ---- Fullscreen manager ----
    const fullscreenManager = {
        isFullscreen: false,

        enterFullscreen() {
            const elem = document.documentElement;
            const req = elem.requestFullscreen
                || elem.webkitRequestFullscreen
                || elem.msRequestFullscreen
                || elem.mozRequestFullScreen;
            if (req) req.call(elem);
            this.isFullscreen = true;
            document.documentElement.classList.add('fullscreen-mode');
        },

        exitFullscreen() {
            const exit = document.exitFullscreen
                || document.webkitExitFullscreen
                || document.msExitFullscreen
                || document.mozCancelFullScreen;
            if (exit && (document.fullscreenElement || document.webkitFullscreenElement)) {
                exit.call(document);
            }
            this.isFullscreen = false;
            document.documentElement.classList.remove('fullscreen-mode');
        },

        toggle() {
            this.isFullscreen ? this.exitFullscreen() : this.enterFullscreen();
        }
    };

    // Sync state when user exits fullscreen via browser UI
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(evt => {
        document.addEventListener(evt, () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                fullscreenManager.isFullscreen = false;
                document.documentElement.classList.remove('fullscreen-mode');
            }
        });
    });

    // F11 -> toggle
    document.addEventListener('keydown', e => {
        if (e.key === 'F11') {
            e.preventDefault();
            fullscreenManager.toggle();
        }
    });

    window.fullscreenManager = fullscreenManager;
})();
