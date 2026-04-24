/* ====================================
   BDU Kiosk - Innovation page section tabs
   Toggles between TETYM, Eco, and Eco-energy sections.
   ==================================== */

(function () {
    'use strict';

    const SECTIONS = {
        tetym: {
            tabId: 'tetym-tab',
            iconId: 'tetym-icon',
            sectionId: 'tetym-section',
            border: '2px solid #1a3a5c',
            activeBg: 'linear-gradient(135deg, #1a3a5c, #2c5282)',
            iconColor: '#1a3a5c'
        },
        eco: {
            tabId: 'eco-tab',
            iconId: 'eco-icon',
            sectionId: 'eco-section',
            border: '2px solid #28a745',
            activeBg: 'linear-gradient(135deg, #28a745, #20c997)',
            iconColor: '#28a745'
        },
        ekoenerji: {
            tabId: 'ekoenerji-tab',
            iconId: 'ekoenerji-icon',
            sectionId: 'ekoenerji-section',
            border: '2px solid #f7b731',
            activeBg: 'linear-gradient(135deg, #f7b731, #f5a623)',
            iconColor: '#f7b731'
        }
    };

    function resetTab(cfg) {
        const tab = document.getElementById(cfg.tabId);
        const icon = document.getElementById(cfg.iconId);
        const section = document.getElementById(cfg.sectionId);
        if (section) section.style.display = 'none';
        if (tab) {
            tab.style.background = 'rgba(255,255,255,0.9)';
            tab.style.color = '#1a3a5c';
            tab.style.border = cfg.border;
        }
        if (icon) icon.style.color = cfg.iconColor;
    }

    function activateTab(cfg) {
        const tab = document.getElementById(cfg.tabId);
        const icon = document.getElementById(cfg.iconId);
        const section = document.getElementById(cfg.sectionId);
        if (section) section.style.display = 'block';
        if (tab) {
            tab.style.background = cfg.activeBg;
            tab.style.color = '#fff';
            tab.style.border = 'none';
        }
        if (icon) icon.style.color = '#fff';
    }

    function showInnovationSection(section) {
        Object.values(SECTIONS).forEach(resetTab);
        const cfg = SECTIONS[section];
        if (cfg) activateTab(cfg);
    }

    window.showInnovationSection = showInnovationSection;
})();
