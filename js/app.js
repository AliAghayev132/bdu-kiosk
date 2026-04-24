/* ====================================
   BDU Kiosk - Global app state & utilities
   ==================================== */

// Global state shared across modules
window.app = window.app || {
    currentPage: 'main-page',
    previousPage: null,
};

// Debounce
window.debounce = function (func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Throttle
window.throttle = function (func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
