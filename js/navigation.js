/* ====================================
   BDU Kiosk - Page navigation, sticky header, history tabs
   ==================================== */

(function () {
    'use strict';

    /**
     * Show a specific page and hide all others.
     * @param {string} pageId
     */
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        const target = document.getElementById(pageId);
        if (!target) return;

        target.classList.add('active');
        app.previousPage = app.currentPage;
        app.currentPage = pageId;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-initialize all carousels for newly visible page
        setTimeout(() => {
            if (typeof initializeAllCarousels === 'function') {
                initializeAllCarousels();
            }
        }, 100);
    }

    /**
     * Toggle a tab in the History page.
     */
    function openHistoryTab(event, tabId) {
        document.querySelectorAll('.history-tab-content').forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });
        document.querySelectorAll('.history-tab').forEach(b => b.classList.remove('active'));

        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = 'block';
            setTimeout(() => tab.classList.add('active'), 10);
        }
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
    }

    /**
     * Keyboard navigation: ESC / Backspace return to main page
     */
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', e => {
            if ((e.key === 'Escape' || e.key === 'Backspace') && app.currentPage !== 'main-page') {
                if (e.key === 'Backspace') e.preventDefault();
                showPage('main-page');
            }
        });
    }

    /**
     * Sticky header: hide on scroll-down, show on scroll-up.
     */
    function setupStickyHeader() {
        let lastScroll = 0;
        const threshold = 100;

        window.addEventListener('scroll', () => {
            if (app.currentPage === 'main-page') return;

            const current = window.pageYOffset || document.documentElement.scrollTop;
            const headers = document.querySelectorAll('.page-header');

            headers.forEach(h => {
                if (current > lastScroll && current > threshold) {
                    h.classList.add('header-hidden');
                } else {
                    h.classList.remove('header-hidden');
                }
            });
            lastScroll = current <= 0 ? 0 : current;
        }, { passive: true });
    }

    // Expose globals for inline onclick handlers
    window.showPage = showPage;
    window.openHistoryTab = openHistoryTab;

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupKeyboardNavigation();
            setupStickyHeader();
        });
    } else {
        setupKeyboardNavigation();
        setupStickyHeader();
    }
})();
