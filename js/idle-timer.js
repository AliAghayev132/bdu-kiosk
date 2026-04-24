/**
 * Idle Timer - BDU Kiosk Application
 * Automatically returns to the main page after 2 minutes of inactivity.
 */

(function () {
    const IDLE_TIMEOUT = 120000; // 2 minutes in milliseconds
    let idleTimer;

    /**
     * Resets the inactivity timer
     */
    function resetTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(redirectHome, IDLE_TIMEOUT);
    }

    /**
     * Redirects the user to the home page or specific home section
     */
    function redirectHome() {
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

        if (isIndex && typeof window.showPage === 'function') {
            // If on index.html, use the SPA navigation to show main-page
            console.log('Auto-returning to main section...');
            window.showPage('main-page');
        } else {
            // If on other pages (campus-map, korpus, etc.), redirect to index.html
            console.log('Auto-returning to index.html...');
            window.location.href = 'index.html';
        }
    }

    // Set up event listeners for user activity
    const activityEvents = [
        'mousedown', 'mousemove', 'keypress',
        'scroll', 'touchstart', 'click'
    ];

    activityEvents.forEach(event => {
        document.addEventListener(event, resetTimer, { passive: true });
    });

    // Start the timer on page load
    document.addEventListener('DOMContentLoaded', resetTimer);

    // Also reset on visibility change (when tab becomes active again)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            resetTimer();
        }
    });

    console.log('Idle timer initialized (2 minutes)');
})();
