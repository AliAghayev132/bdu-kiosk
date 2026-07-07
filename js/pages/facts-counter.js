/* ====================================
   BDU Kiosk - Facts page counter animation
   Animates .fact-number elements when #facts-page becomes active.
   ==================================== */

(function () {
    'use strict';

    function animateFactsCounters() {
        const counters = document.querySelectorAll('#facts-page .fact-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (isNaN(target) || counter.classList.contains('counted')) return;

            const duration = 2000;
            const startTime = performance.now();
            const suffix = counter.getAttribute('data-suffix') || '';
            const isYear = target >= 1000 && target <= 2100;

            const update = currentTime => {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(eased * target);
                const formatted = isYear ? current : current.toLocaleString('az-AZ');
                counter.textContent = formatted + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    const finalText = isYear ? target : target.toLocaleString('az-AZ');
                    counter.textContent = finalText + suffix;
                    counter.classList.add('counted');
                }
            };

            requestAnimationFrame(update);
        });
    }

    function init() {
        const factsPage = document.getElementById('facts-page');
        if (!factsPage) return;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                if (m.target.id === 'facts-page' && m.target.classList.contains('active')) {
                    document.querySelectorAll('#facts-page .fact-number').forEach(c => {
                        c.classList.remove('counted');
                        c.textContent = '0';
                    });
                    setTimeout(animateFactsCounters, 300);
                }
            });
        });

        observer.observe(factsPage, { attributes: true, attributeFilter: ['class'] });

        // Initialise dynamic facts content
        if (typeof FactsLoader !== 'undefined') {
            FactsLoader.initFactsPage();
            FactsLoader.initHistoryPage();
        }
    }

    // Expose for facts-loader.js, which triggers the initial animation
    window.animateFactsCounters = animateFactsCounters;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
