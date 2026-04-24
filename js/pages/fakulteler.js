/* ====================================
   BDU Kiosk - Faculties page (fakulteler.html)
   Modal carousel + tab switcher.

   Depends on:
   - fakulteImagesData (js/pages/fakulteler-images.js)
   - fakultelerData    (static/fakulteler-data.js)
   - FactsLoader       (js/facts-loader.js)
   ==================================== */

(function () {
    'use strict';

    let currentSlide = 0;
    let totalSlides = 0;
    let currentImageData = [];
    let autoplayInterval = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // ----- Carousel -----

    function loadCarouselImages(fakulteId) {
        const container = document.getElementById('fakulteCarouselContainer');
        const inner = document.getElementById('fakulteCarouselInner');
        const indicators = document.getElementById('fakulteCarouselIndicators');
        const carousel = document.getElementById('fakulteCarousel');

        inner.innerHTML = '';
        indicators.innerHTML = '';
        currentSlide = 0;
        currentImageData = [];
        stopAutoplay();

        const data = fakulteImagesData[fakulteId];
        const images = data ? data.images : [];

        if (!images.length) {
            container.classList.remove('has-images');
            return;
        }

        container.classList.add('has-images');
        totalSlides = images.length;
        currentImageData = images;
        carousel.classList.toggle('single-image', images.length === 1);

        images.forEach((imageData, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';

            const img = document.createElement('img');
            const imgPath = `static/images/fakulteler/${fakulteId}/${imageData.file}`;
            img.src = imgPath;
            img.alt = imageData.caption || `Şəkil ${index + 1}`;
            img.onerror = createImageErrorHandler(imgPath, item);

            item.appendChild(img);
            inner.appendChild(item);

            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => goToSlide(index));
            indicators.appendChild(indicator);
        });

        // Side-click navigation
        inner.querySelectorAll('.carousel-item').forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('prev')) moveSlide(-1);
                else if (item.classList.contains('next')) moveSlide(1);
            });
        });

        updateCoverflowClasses();
        updateCarouselCounter();
        updateCaption();
        startAutoplay();
    }

    function createImageErrorHandler(imgPath, item) {
        return function () {
            const currentExt = imgPath.split('.').pop().toLowerCase();
            const extensions = ['jpg', 'jpeg', 'png', 'jfif', 'webp'];
            const basePathWithoutExt = imgPath.substring(0, imgPath.lastIndexOf('.'));
            const tried = [currentExt];
            const img = this;

            const tryNext = () => {
                for (const ext of extensions) {
                    if (!tried.includes(ext)) {
                        tried.push(ext);
                        img.src = basePathWithoutExt + '.' + ext;
                        return;
                    }
                }
                // All exhausted -> show placeholder
                img.onerror = null;
                item.innerHTML = '<div style="color:#94a3b8;text-align:center;padding:40px;font-size:14px;">'
                    + '<i class="fas fa-image" style="font-size:48px;margin-bottom:10px;display:block;"></i>'
                    + 'Şəkil yüklənmədi</div>';
            };
            img.onerror = tryNext;
            tryNext();
        };
    }

    function updateCoverflowClasses() {
        const items = document.querySelectorAll('#fakulteCarouselInner .carousel-item');
        const indicators = document.querySelectorAll('#fakulteCarouselIndicators .indicator');
        const total = items.length;

        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            if (index === currentSlide) item.classList.add('active');
            else if (index === (currentSlide - 1 + total) % total) item.classList.add('prev');
            else if (index === (currentSlide + 1) % total) item.classList.add('next');
            else if (index === (currentSlide - 2 + total) % total) item.classList.add('far-prev');
            else if (index === (currentSlide + 2) % total) item.classList.add('far-next');
        });

        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentSlide);
        });
    }

    function moveSlide(direction) {
        if (totalSlides === 0) return;
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateCoverflowClasses();
        updateCarouselCounter();
        updateCaption();
        resetAutoplay();
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateCoverflowClasses();
        updateCarouselCounter();
        updateCaption();
        resetAutoplay();
    }

    function updateCarouselCounter() {
        document.getElementById('currentSlideNum').textContent = currentSlide + 1;
        document.getElementById('totalSlideNum').textContent = totalSlides;
    }

    function updateCaption() {
        const captionText = document.getElementById('fakulteCaptionText');
        const captionContainer = document.getElementById('fakulteCarouselCaption');
        const data = currentImageData[currentSlide];

        if (data && data.caption) {
            captionText.textContent = data.caption;
            captionContainer.style.display = 'flex';
        } else {
            captionContainer.style.display = 'none';
        }
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => moveSlide(1), 4000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    function handleSwipe() {
        const threshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > threshold) {
            moveSlide(diff > 0 ? 1 : -1);
        }
    }

    // ----- Modal -----

    function openFakulteModal(fakulteId) {
        document.getElementById('fakulteModalOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';

        loadCarouselImages(fakulteId);
        switchTab('tarixi');

        const data = (typeof fakultelerData !== 'undefined') ? fakultelerData[fakulteId] : null;

        if (!data) {
            document.getElementById('modalTitle').textContent = 'Xəta';
            document.getElementById('modalTarihiContent').innerHTML =
                '<p style="text-align:center;color:#e53e3e;">Fakültə məlumatları tapılmadı.</p>';
            return;
        }

        document.getElementById('modalTitle').textContent = data.name;
        document.getElementById('modalTarihiContent').innerHTML = data.tarixi;
        document.getElementById('modalBuGunContent').innerHTML = data.bugun;
    }

    function closeFakulteModal(event) {
        if (event && event.target.id !== 'fakulteModalOverlay') return;
        stopAutoplay();
        document.getElementById('fakulteModalOverlay').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function switchTab(tabName, clickedElement) {
        document.querySelectorAll('.fakulte-tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.fakulte-tab').forEach(b => b.classList.remove('active'));

        const tabEl = document.getElementById(tabName + '-tab');
        if (tabEl) tabEl.classList.add('active');

        if (clickedElement) {
            clickedElement.classList.add('active');
        } else {
            const buttons = document.querySelectorAll('.fakulte-tab');
            const needle = tabName === 'tarixi' ? 'tarixi' : 'bu gün';
            for (const btn of buttons) {
                if (btn.textContent.toLowerCase().includes(needle)) {
                    btn.classList.add('active');
                    break;
                }
            }
        }
    }

    // ----- Init -----

    function init() {
        if (typeof FactsLoader !== 'undefined') {
            FactsLoader.initFacultiesPageHero();
        }

        const carousel = document.getElementById('fakulteCarousel');
        if (carousel) {
            carousel.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            carousel.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
        }

        // Modal-aware keyboard shortcuts
        document.addEventListener('keydown', e => {
            const overlay = document.getElementById('fakulteModalOverlay');
            const isOpen = overlay && overlay.classList.contains('active');

            if (e.key === 'Escape' && isOpen) {
                closeFakulteModal();
                return;
            }
            if (isOpen) {
                if (e.key === 'ArrowLeft') moveSlide(-1);
                else if (e.key === 'ArrowRight') moveSlide(1);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API for inline onclick handlers
    window.openFakulteModal = openFakulteModal;
    window.closeFakulteModal = closeFakulteModal;
    window.switchTab = switchTab;
    window.moveFakulteSlide = moveSlide;
    window.goToFakulteSlide = goToSlide;
})();
