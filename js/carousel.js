// ====================================
// Universal Carousel System for All Pages
// ====================================

// Store carousel states for each carousel
const carouselStates = {};

/**
 * Initialize a carousel
 * @param {string} carouselId - The carousel identifier
 */
function initCarousel(carouselId) {
    if (!carouselStates[carouselId]) {
        carouselStates[carouselId] = {
            currentSlide: 0,
            interval: null,
            autoplayEnabled: false,
            isAnimating: false
        };
    }
}

/**
 * Move carousel slide - Coverflow style
 * @param {string} carouselId - The carousel identifier
 * @param {number} direction - 1 for next, -1 for previous
 */
function moveSlide(carouselId, direction) {
    initCarousel(carouselId);

    const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
    if (!carousel) return;

    // Prevent rapid succession of slides
    if (carouselStates[carouselId].isAnimating) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');

    if (items.length === 0) return;

    carouselStates[carouselId].isAnimating = true;

    // Calculate new slide index
    let newIndex = carouselStates[carouselId].currentSlide + direction;

    // Loop around
    if (newIndex >= items.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = items.length - 1;
    }

    carouselStates[carouselId].currentSlide = newIndex;

    // Update all slide classes for coverflow effect
    updateCoverflowClasses(items, newIndex, indicators);

    // Update counter
    updateCounter(carouselId, carousel);

    // Reset autoplay
    if (carouselStates[carouselId].autoplayEnabled) {
        resetAutoplay(carouselId);
    }

    // Re-enable animation after animation completes
    setTimeout(() => {
        carouselStates[carouselId].isAnimating = false;
    }, 600);
}

/**
 * Update coverflow classes for all slides
 */
function updateCoverflowClasses(items, activeIndex, indicators) {
    const total = items.length;

    items.forEach((item, index) => {
        // Remove all position classes
        item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

        if (index === activeIndex) {
            item.classList.add('active');
        } else if (index === (activeIndex - 1 + total) % total) {
            item.classList.add('prev');
        } else if (index === (activeIndex + 1) % total) {
            item.classList.add('next');
        } else if (index === (activeIndex - 2 + total) % total) {
            item.classList.add('far-prev');
        } else if (index === (activeIndex + 2) % total) {
            item.classList.add('far-next');
        }
    });

    // Update indicators
    indicators.forEach((ind, index) => {
        ind.classList.remove('active');
        if (index === activeIndex) {
            ind.classList.add('active');
        }
    });
}

/**
 * Go to specific slide index
 * @param {string} carouselId - The carousel identifier
 * @param {number} index - Slide index to go to
 */
function goToSlideIndex(carouselId, index) {
    initCarousel(carouselId);

    const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');

    if (index < 0 || index >= items.length) return;

    // Set new slide
    carouselStates[carouselId].currentSlide = index;

    // Update all slide classes for coverflow effect
    updateCoverflowClasses(items, index, indicators);

    // Update counter
    updateCounter(carouselId, carousel);

    // Reset autoplay
    if (carouselStates[carouselId].autoplayEnabled) {
        resetAutoplay(carouselId);
    }
}

/**
 * Update carousel counter display
 */
function updateCounter(carouselId, carousel) {
    const counter = carousel.querySelector('.current-slide');
    if (counter) {
        counter.textContent = carouselStates[carouselId].currentSlide + 1;
    }
}

/**
 * Start autoplay for carousel
 */
function startAutoplay(carouselId) {
    if (!carouselStates[carouselId]) initCarousel(carouselId);
    carouselStates[carouselId].autoplayEnabled = true;
    if (carouselStates[carouselId].interval) {
        clearInterval(carouselStates[carouselId].interval);
    }
    if (carouselStates[carouselId].paused) return; // honor pause state
    carouselStates[carouselId].interval = setInterval(() => {
        moveSlide(carouselId, 1);
    }, 4000); // 4 seconds
}

/**
 * Stop autoplay for carousel
 */
function stopAutoplay(carouselId) {
    if (carouselStates[carouselId] && carouselStates[carouselId].interval) {
        clearInterval(carouselStates[carouselId].interval);
        carouselStates[carouselId].interval = null;
    }
}

/**
 * Pause autoplay (Instagram-style: while user is interacting)
 */
function pauseAutoplay(carouselId) {
    if (!carouselStates[carouselId]) return;
    carouselStates[carouselId].paused = true;
    stopAutoplay(carouselId);
}

/**
 * Resume autoplay if it was running
 */
function resumeAutoplay(carouselId) {
    if (!carouselStates[carouselId]) return;
    carouselStates[carouselId].paused = false;
    if (carouselStates[carouselId].autoplayEnabled) {
        startAutoplay(carouselId);
    }
}

/**
 * Reset autoplay timer
 */
function resetAutoplay(carouselId) {
    stopAutoplay(carouselId);
    if (carouselStates[carouselId].autoplayEnabled) {
        startAutoplay(carouselId);
    }
}

/**
 * Initialize all carousels on page
 */
function initializeAllCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const carouselId = carousel.getAttribute('data-carousel');
        initCarousel(carouselId);
        const state = carouselStates[carouselId];

        // Check if carousel has only one image - hide nav buttons
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.indicator');
        if (items.length <= 1) {
            carousel.classList.add('single-image');
        } else {
            carousel.classList.remove('single-image');
        }

        // Items may have been rebuilt (dynamic-carousel.js) — keep index valid
        if (state.currentSlide >= items.length) state.currentSlide = 0;

        // Initialize coverflow classes for the current slide
        updateCoverflowClasses(items, state.currentSlide, indicators);
        updateCounter(carouselId, carousel);

        // Autoplay only while the carousel's page is visible — hidden pages
        // otherwise keep 4s timers mutating off-screen DOM around the clock
        const page = carousel.closest('.page');
        if (!page || page.classList.contains('active')) {
            startAutoplay(carouselId);
        } else {
            stopAutoplay(carouselId);
        }

        // Bind interaction handlers once per carousel element — showPage()
        // re-runs this on every navigation, so guard against re-binding
        if (carousel.dataset.carouselBound === 'true') return;
        carousel.dataset.carouselBound = 'true';

        // Delegated click handler: works for side-card navigation and
        // survives .carousel-inner rebuilds by dynamic-carousel.js
        carousel.addEventListener('click', (e) => {
            const item = e.target.closest('.carousel-item');
            if (!item || !carousel.contains(item)) return;
            if (item.classList.contains('prev')) {
                moveSlide(carouselId, -1);
            } else if (item.classList.contains('next')) {
                moveSlide(carouselId, 1);
            }
            // Clicking the active card does nothing (could open modal)
        });

        // Instagram-style pause: pause on hover/touch-hold, resume on leave/release
        carousel.addEventListener('mouseenter', () => pauseAutoplay(carouselId));
        carousel.addEventListener('mouseleave', () => resumeAutoplay(carouselId));

        // Touch swipe support + Instagram-style hold-to-pause
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            pauseAutoplay(carouselId);
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(carouselId, touchStartX, touchEndX);
            // Resume after a short delay so swipe gesture animation finishes first
            setTimeout(() => resumeAutoplay(carouselId), 800);
        }, { passive: true });

        carousel.addEventListener('touchcancel', () => {
            resumeAutoplay(carouselId);
        }, { passive: true });
    });

    // Keyboard navigation — bind a single document-level listener
    if (!initializeAllCarousels.keydownBound) {
        initializeAllCarousels.keydownBound = true;
        document.addEventListener('keydown', (e) => {
            // Find active carousel based on current page
            const activePage = document.querySelector('.page.active');
            if (!activePage) return;

            const activeCarousel = activePage.querySelector('[data-carousel]');
            if (!activeCarousel) return;

            const carouselId = activeCarousel.getAttribute('data-carousel');

            if (e.key === 'ArrowLeft') {
                moveSlide(carouselId, -1);
            } else if (e.key === 'ArrowRight') {
                moveSlide(carouselId, 1);
            }
        });
    }
}

/**
 * Handle swipe gesture
 */
function handleSwipe(carouselId, startX, endX) {
    // Prevent rapid successive swipes
    if (carouselStates[carouselId].isAnimating) return;

    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            moveSlide(carouselId, 1);
        } else {
            // Swipe right - previous
            moveSlide(carouselId, -1);
        }
    }
}

// Export functions to global scope
window.moveSlide = moveSlide;
window.goToSlideIndex = goToSlideIndex;
window.initializeAllCarousels = initializeAllCarousels;

console.log('Universal Carousel System loaded successfully!');