/* ====================================
   BDU Kiosk - Flip cards (TETYM Projects grid)
   ==================================== */

(function () {
    'use strict';

    /**
     * Flip a card and close any other open ones in the same projects grid.
     * @param {HTMLElement} card
     */
    function flipCard(card) {
        document.querySelectorAll('.projects-grid .flip-card.flipped').forEach(c => {
            if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
    }

    window.flipCard = flipCard;
})();
