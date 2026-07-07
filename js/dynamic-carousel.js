// ====================================
// Dynamic Carousel Loader System
// Automatically loads all images from specified folders
// ====================================

/**
 * Configuration mapping carousel IDs to their image folders
 */
const carouselConfig = {
    'history': 'static/images/history',
    'tetym': 'static/images/tetym',
    'tetym-inn': 'static/images/tetym',
    'eco': 'static/images/eco',
    'eco-inn': 'static/images/eco',
    'clean-charge': 'static/images/clean-charge',
    'drl': 'static/images/drl',
    'heyder-aliyev': 'static/images/heyder-aliyev',
    'achievements': 'static/images/Achievements',
    'prezident': 'static/images/prezident'
};

/**
 * Supported image extensions
 */
const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

/**
 * File list for each carousel (populated by loadCarouselImages)
 */
const carouselImageLists = {};

/**
 * Dynamically load images into a carousel
 * @param {string} carouselId - The carousel identifier
 * @param {string} folderPath - Path to the image folder
 */
async function loadCarouselImages(carouselId, folderPath) {
    try {
        // Fetch the image list from the folder (requires directory listing)
        // For static sites, we use a predefined list or fetch from server
        const images = await getImagesFromFolder(folderPath);

        if (images.length === 0) {
            console.warn(`No images found in ${folderPath}`);
            return;
        }

        const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
        if (!carousel) {
            console.warn(`Carousel with id "${carouselId}" not found`);
            return;
        }

        const carouselInner = carousel.querySelector('.carousel-inner');
        if (!carouselInner) {
            console.warn(`Carousel inner container not found for "${carouselId}"`);
            return;
        }

        // Clear existing items
        carouselInner.innerHTML = '';

        // Add image items
        images.forEach((imagePath, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item' + (index === 0 ? ' active' : '');

            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Image ${index + 1}`;
            img.loading = index === 0 ? 'eager' : 'lazy';  // First image loads eagerly

            // Add error handling for broken images
            img.onerror = () => {
                console.warn(`Failed to load image: ${imagePath}`);
                img.style.display = 'none';
            };

            img.onload = () => {
                // Image loaded successfully
            };

            item.appendChild(img);
            carouselInner.appendChild(item);
        });

        // Update total slides count
        const totalSlidesElement = carousel.querySelector('.total-slides');
        if (totalSlidesElement) {
            totalSlidesElement.textContent = images.length;
        }

        // Regenerate indicators
        updateCarouselIndicators(carousel, images.length);

        // Store image list
        carouselImageLists[carouselId] = images;

        console.log(`✓ Loaded ${images.length} images for carousel "${carouselId}"`);
    } catch (error) {
        console.error(`Error loading carousel images for "${carouselId}":`, error);
    }
}

/**
 * Fetch images from a folder
 * This uses a predefined list since static sites can't enumerate directories
 */
async function getImagesFromFolder(folderPath) {
    // Predefined image lists for each folder - ACTUAL FILES FROM FOLDERS
    const folderImages = {
        'static/images/history': [
            // 'static/images/history/image-0.jpg',
            'static/images/history/image-1.webp',
            'static/images/history/image-2.jpg',
            'static/images/history/image-3.jpg',
            'static/images/history/image-4.webp',
            'static/images/history/image-5.webp',
            'static/images/history/image-6.webp',
            'static/images/history/image-7.webp',
            'static/images/history/image-8.webp',
            'static/images/history/image-9.webp',
            'static/images/history/image-10.webp',
            'static/images/history/image-11.webp',
            'static/images/history/image-12.webp',
            'static/images/history/image-13.webp',
            'static/images/history/image-14.webp',
            'static/images/history/image-15.webp',
            'static/images/history/image-16.webp',
            'static/images/history/image-17.webp',
            'static/images/history/image-18.webp',
            'static/images/history/image-19.webp',
            'static/images/history/image-20.webp',
            'static/images/history/image-21.webp',
            'static/images/history/image-22.webp',
            'static/images/history/image-23.webp',
            'static/images/history/image-24.webp',
            'static/images/history/image-25.webp',
            'static/images/history/image-26.webp',
            'static/images/history/image-27.webp',
            'static/images/history/image-28.webp',
            'static/images/history/image-29.webp',
            'static/images/history/image-30.webp',
            'static/images/history/image-31.webp',
            'static/images/history/image-32.webp',
            'static/images/history/image-33.webp',
            'static/images/history/image-34.webp',
            'static/images/history/image-35.webp'
        ],
        'static/images/tetym': [
            'static/images/tetym/1.webp',
            'static/images/tetym/2.webp',
            'static/images/tetym/3.webp',
            'static/images/tetym/4.webp',
            'static/images/tetym/5.webp',
            'static/images/tetym/6.webp',
            'static/images/tetym/7.webp',
            'static/images/tetym/8.webp',
            'static/images/tetym/9.webp',
            'static/images/tetym/10.webp',
            'static/images/tetym/11.webp',
            'static/images/tetym/12.webp',
            'static/images/tetym/13.webp',
            'static/images/tetym/14.webp'
        ],
        'static/images/eco': [
            'static/images/eco/1.jpg',
            'static/images/eco/2.jpg',
            'static/images/eco/3.jpg',
            'static/images/eco/4.jpg',
            'static/images/eco/5.jpg',
            'static/images/eco/6.jpg',
            'static/images/eco/7.jpg',
            'static/images/eco/9.jpg',
            'static/images/eco/11.jpg',
            'static/images/eco/12.jpg',
            'static/images/eco/13.jpg',
            'static/images/eco/14.jpg',
            'static/images/eco/19.jpg'
        ],
        'static/images/clean-charge': [
            'static/images/clean-charge/1.jpg',
            'static/images/clean-charge/2.jpg',
            'static/images/clean-charge/6.jpg'
        ],
        'static/images/drl': [
            'static/images/drl/374A5344.jpeg',
            'static/images/drl/374A5476.jpeg',
            'static/images/drl/374A5543.jpeg',
            'static/images/drl/374A5569.jpeg'
        ],
        'static/images/heyder-aliyev': [
            'static/images/heyder-aliyev/1.jpg',
            'static/images/heyder-aliyev/2.jpg',
            'static/images/heyder-aliyev/3.jpg',
            'static/images/heyder-aliyev/4.jpg',
            'static/images/heyder-aliyev/5.jpg',
            'static/images/heyder-aliyev/6.jpg',
            'static/images/heyder-aliyev/7.jpg',
            'static/images/heyder-aliyev/8.jpg',
            'static/images/heyder-aliyev/9.jpg',
            'static/images/heyder-aliyev/10.jpg',
            'static/images/heyder-aliyev/11.jpg',
            'static/images/heyder-aliyev/12.jpg',
            'static/images/heyder-aliyev/13.jpg',
            'static/images/heyder-aliyev/14.jpg',
            'static/images/heyder-aliyev/15.jpg',
            'static/images/heyder-aliyev/16.jpg',
            'static/images/heyder-aliyev/17.jpg',
            'static/images/heyder-aliyev/18.jpg',
            'static/images/heyder-aliyev/19.jpg',
            'static/images/heyder-aliyev/20.jpg',
            'static/images/heyder-aliyev/21.jpg',
            'static/images/heyder-aliyev/22.jpg'
        ],
        'static/images/Achievements': [
            'static/images/Achievements/qs1.webp',
            'static/images/Achievements/QS2.webp',
            'static/images/Achievements/qs3.jpg',
            'static/images/Achievements/THE1.webp',
            'static/images/Achievements/THE2.webp'
        ],
        'static/images/prezident': [
            'static/images/prezident/1.jpg',
            'static/images/prezident/2.jpg',
            'static/images/prezident/3.jpg',
            'static/images/prezident/4.jpg',
            'static/images/prezident/5.jpg',
            'static/images/prezident/6.jpg',
            'static/images/prezident/7.jpg',
            'static/images/prezident/8.jpg',
            'static/images/prezident/9.jpg',
            'static/images/prezident/10.jpg',
            'static/images/prezident/11.jpg',
            'static/images/prezident/12.jpg'
        ]
    };

    // Return images for the folder, or empty array if not defined
    return folderImages[folderPath] || [];
}

/**
 * Update carousel indicators based on image count
 */
function updateCarouselIndicators(carousel, imageCount) {
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    if (!indicatorsContainer) return;

    // Clear existing indicators
    indicatorsContainer.innerHTML = '';

    // Add new indicators
    for (let i = 0; i < imageCount; i++) {
        const span = document.createElement('span');
        span.className = 'indicator' + (i === 0 ? ' active' : '');
        span.onclick = () => {
            const carouselId = carousel.getAttribute('data-carousel');
            goToSlideIndex(carouselId, i);
        };
        indicatorsContainer.appendChild(span);
    }
}

/**
 * Initialize all dynamic carousels on page load
 */
function initializeDynamicCarousels() {
    Object.entries(carouselConfig).forEach(([carouselId, folderPath]) => {
        // Always load from folder, overwriting any existing content
        loadCarouselImages(carouselId, folderPath);
    });
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit to ensure all carousels are rendered
        setTimeout(initializeDynamicCarousels, 100);
    });
} else {
    // DOM already loaded
    setTimeout(initializeDynamicCarousels, 100);
}

// Export for global access
window.loadCarouselImages = loadCarouselImages;
window.initializeDynamicCarousels = initializeDynamicCarousels;
window.carouselConfig = carouselConfig;

console.log('Dynamic Carousel Loader System initialized!');
