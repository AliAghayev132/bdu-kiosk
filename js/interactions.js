/* ====================================
   BDU Kiosk - UI interactions
   Ripple effects, feature card animations, scroll reveal,
   stat counters, smooth scroll, accessibility, lazy loading,
   live time display.
   ==================================== */

(function () {
    'use strict';

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function setupNavButtonRipple() {
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                const rect = this.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    function setupFeatureCardAnimations() {
        document.querySelectorAll('.feature-card').forEach(card => {
            // Decorative particles
            for (let i = 0; i < 6; i++) {
                const particle = document.createElement('span');
                particle.classList.add('particle');
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${50 + Math.random() * 50}%`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                card.appendChild(particle);
            }

            // Click ripple
            card.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const size = Math.max(rect.width, rect.height) * 2;
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = (x - size / 2) + 'px';
                ripple.style.top = (y - size / 2) + 'px';
                this.appendChild(ripple);
                this.classList.add('clicked');
                setTimeout(() => ripple.remove(), 800);
                setTimeout(() => this.classList.remove('clicked'), 600);
            });

            card.addEventListener('touchstart', function () {
                this.classList.add('touch-active');
            }, { passive: true });

            card.addEventListener('touchend', function () {
                this.classList.remove('touch-active');
            }, { passive: true });

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform =
                        `rotateX(${-y / 10}deg) rotateY(${x / 10}deg) scale(1.1) translateZ(20px)`;
                }
            });

            card.addEventListener('mouseleave', function () {
                const icon = this.querySelector('.feature-icon');
                if (icon) icon.style.transform = '';
            });
        });
    }

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('animate-in');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        document.querySelectorAll(
            '.nav-button, .feature-card, .timeline-item, .stat-card, .eco-card, .faculty-card, .science-card'
        ).forEach(el => observer.observe(el));
    }

    function setupLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const imageObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    function setupAccessibility() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
        });
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        document.querySelectorAll('button:not([aria-label])').forEach(btn => {
            const text = btn.textContent.trim();
            if (text) btn.setAttribute('aria-label', text);
        });
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .stat-value');

        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''), 10);
            if (isNaN(target)) return;

            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            counter.setAttribute('data-original', counter.textContent);

            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString('az-AZ');
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString('az-AZ');
                    const original = counter.getAttribute('data-original');
                    if (original && original.includes('+')) counter.textContent += '+';
                }
            };

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        update();
                        observer.unobserve(counter);
                    }
                });
            });
            observer.observe(counter);
        });
    }

    function updateTimeDisplay() {
        const el = document.querySelector('.current-time');
        if (!el) return;

        const tick = () => {
            const now = new Date();
            el.textContent = now.toLocaleDateString('az-AZ', {
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        };
        tick();
        setInterval(tick, 60000);
    }

    function preloadCriticalPages() {
        ['tetym-page', 'history-page', 'rankings-page'].forEach(id => {
            const page = document.getElementById(id);
            if (page) page.offsetHeight;
        });
    }

    function setupGlobalErrorHandling() {
        window.addEventListener('error', e => {
            console.error('Application error:', e.error);
        });
        window.addEventListener('unhandledrejection', e => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    function init() {
        setupSmoothScroll();
        setupNavButtonRipple();
        setupFeatureCardAnimations();
        setupScrollAnimations();
        setupLazyLoading();
        setupAccessibility();
        animateCounters();
        updateTimeDisplay();
        preloadCriticalPages();
        setupGlobalErrorHandling();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
