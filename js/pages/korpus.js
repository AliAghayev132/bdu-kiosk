/* ====================================
   BDU Kiosk - Korpus page (korpus.html)
   Static building data, tab switcher, faculty card population.
   ==================================== */

(function () {
    'use strict';

    const korpusData = {
        // Korpus 0 - Əsas tədris binası (Təbiət Elmləri)
        0: {
            name: "Əsas tədris binası",
            description: "Təbiət Elmləri fakültələri",
            faculties: [
                { name: "Fizika fakültəsi", icon: "fa-atom", description: "Fizika elminin müxtəlif sahələrində - nəzəri fizika, eksperimental fizika, optika, kvant mexanikası və yarımkeçiricilər fizikası üzrə mütəxəssislər hazırlanır.", departments: ["Ümumi fizika", "Nəzəri fizika", "Optika və molekulyar fizika", "Yarımkeçiricilər fizikası"], students: 850, professors: 45 },
                { name: "Kimya fakültəsi", icon: "fa-flask", description: "Kimya elminin fundamental və tətbiqi sahələri - üzvi kimya, qeyri-üzvi kimya, analitik kimya və fiziki kimya üzrə kadrlar yetişdirilir.", departments: ["Üzvi kimya", "Qeyri-üzvi kimya", "Analitik kimya", "Fiziki və kolloid kimya"], students: 720, professors: 38 },
                { name: "Biologiya fakültəsi", icon: "fa-dna", description: "Canlı aləmin öyrənilməsi - botanika, zoologiya, mikrobiologiya, genetika və biokimya sahələrində elmi kadrlar hazırlanır.", departments: ["Botanika", "Zoologiya", "Mikrobiologiya", "Biokimya və biotexnologiya", "Genetika"], students: 680, professors: 42 },
                { name: "Geologiya fakültəsi", icon: "fa-mountain", description: "Yer elmləri sahəsində mütəxəssislər - geologiya, geofizika, hidrogeologiya və faydalı qazıntıların axtarışı üzrə kadrlar yetişdirilir.", departments: ["Ümumi geologiya", "Geofizika", "Hidrogeologiya", "Faydalı qazıntılar"], students: 520, professors: 32 },
                { name: "Coğrafiya fakültəsi", icon: "fa-globe-americas", description: "Fiziki və iqtisadi coğrafiya, ekologiya, kartoqrafiya və coğrafi informasiya sistemləri sahəsində mütəxəssislər hazırlanır.", departments: ["Fiziki coğrafiya", "İqtisadi coğrafiya", "Ekologiya", "Kartoqrafiya və GİS"], students: 580, professors: 35 }
            ]
        },
        1: {
            name: "1-ci Korpus",
            description: "Humanitar Elmlər fakültələri - I",
            faculties: [
                { name: "Filologiya fakültəsi", icon: "fa-book-open", description: "Azərbaycan dili və ədəbiyyatı, dilçilik, ədəbiyyatşünaslıq və folklor sahəsində yüksək ixtisaslı mütəxəssislər hazırlanır.", departments: ["Azərbaycan dilçiliyi", "Azərbaycan ədəbiyyatı", "Dünya ədəbiyyatı", "Folklor"], students: 920, professors: 52 },
                { name: "Tarix fakültəsi", icon: "fa-landmark", description: "Azərbaycan tarixi, dünya tarixi, arxeologiya və etnoqrafiya sahəsində elmi kadrlar yetişdirilir.", departments: ["Azərbaycan tarixi", "Ümumi tarix", "Arxeologiya və etnoqrafiya", "Tarix nəzəriyyəsi"], students: 780, professors: 48 },
                { name: "Jurnalistika fakültəsi", icon: "fa-newspaper", description: "Media və kütləvi kommunikasiya sahəsində peşəkar kadrlar - jurnalistlər, redaktorlar və media menecerləri hazırlanır.", departments: ["Mətbuat tarixi və nəzəriyyəsi", "Teleraidio jurnalistikası", "İnternet jurnalistikası", "İctimai əlaqələr"], students: 650, professors: 35 },
                { name: "Xarici dillər fakültəsi", icon: "fa-language", description: "İngilis, alman, fransız və digər Avropa dilləri üzrə tərcüməçi və dil mütəxəssisləri hazırlanır.", departments: ["İngilis dili", "Alman dili", "Fransız dili", "Roman-german filologiyası"], students: 1100, professors: 58 },
                { name: "Şərqşünaslıq fakültəsi", icon: "fa-mosque", description: "Şərq ölkələrinin dili, ədəbiyyatı, tarixi və mədəniyyəti sahəsində mütəxəssislər yetişdirilir.", departments: ["Ərəb filologiyası", "Fars filologiyası", "Türk filologiyası", "Şərq tarixi"], students: 480, professors: 28 }
            ]
        },
        2: {
            name: "2-ci Korpus",
            description: "Sosial Elmlər fakültələri",
            faculties: [
                { name: "Hüquq fakültəsi", icon: "fa-balance-scale", description: "Konstitusiya hüququ, mülki hüquq, cinayət hüququ və beynəlxalq hüquq sahəsində yüksək ixtisaslı hüquqşünaslar hazırlanır.", departments: ["Konstitusiya hüququ", "Mülki hüquq", "Cinayət hüququ", "Beynəlxalq hüquq"], students: 1200, professors: 62 },
                { name: "İqtisadiyyat fakültəsi", icon: "fa-chart-line", description: "İqtisadi nəzəriyyə, maliyyə, mühasibat və marketinq sahəsində peşəkar iqtisadçılar yetişdirilir.", departments: ["İqtisadi nəzəriyyə", "Maliyyə", "Mühasibat uçotu", "Marketinq"], students: 980, professors: 55 },
                { name: "Beynəlxalq münasibətlər fakültəsi", icon: "fa-globe", description: "Diplomatiya, beynəlxalq siyasət və regional araşdırmalar sahəsində mütəxəssislər hazırlanır.", departments: ["Beynəlxalq münasibətlər nəzəriyyəsi", "Diplomatiya tarixi", "Regional araşdırmalar", "Siyasi elmlər"], students: 720, professors: 42 },
                { name: "Sosial elmlər və psixologiya fakültəsi", icon: "fa-users", description: "Sosiologiya, psixologiya, fəlsəfə və sosial iş sahəsində kadrlar yetişdirilir.", departments: ["Sosiologiya", "Psixologiya", "Fəlsəfə", "Sosial iş"], students: 680, professors: 38 },
                { name: "Kitabxanaçılıq-informasiya fakültəsi", icon: "fa-book", description: "Kitabxana işi, arxiv işi və informasiya sistemləri sahəsində mütəxəssislər hazırlanır.", departments: ["Kitabxanaşünaslıq", "Arxivşünaslıq", "İnformasiya sistemləri", "Biblioqrafiya"], students: 420, professors: 25 }
            ]
        },
        3: {
            name: "3-cü Korpus",
            description: "Dəqiq Elmlər və İnformasiya Texnologiyaları",
            faculties: [
                { name: "Mexanika-riyaziyyat fakültəsi", icon: "fa-square-root-alt", description: "Riyaziyyatın fundamental sahələri - cəbr, riyazi analiz, həndəsə və diferensial tənliklər üzrə mütəxəssislər hazırlanır.", departments: ["Cəbr və həndəsə", "Riyazi analiz", "Diferensial tənliklər", "Ehtimal nəzəriyyəsi"], students: 650, professors: 42 },
                { name: "Tətbiqi riyaziyyat və kibernetika fakültəsi", icon: "fa-robot", description: "Tətbiqi riyaziyyat, optimallaşdırma, süni intellekt və kibernetika sahəsində innovativ kadrlar yetişdirilir.", departments: ["Tətbiqi riyaziyyat", "Optimallaşdırma və optimal idarəetmə", "Kibernetika", "Süni intellekt"], students: 780, professors: 48 },
                { name: "İnformasiya texnologiyaları və proqramlaşdırma fakültəsi", icon: "fa-laptop-code", description: "Proqram mühəndisliyi, verilənlər bazası, şəbəkə texnologiyaları və kibertəhlükəsizlik sahəsində İT mütəxəssisləri hazırlanır.", departments: ["Proqram mühəndisliyi", "Verilənlər bazası sistemləri", "Kompüter şəbəkələri", "Kibertəhlükəsizlik"], students: 1050, professors: 55 },
                { name: "Kompüter elmləri fakültəsi", icon: "fa-microchip", description: "Kompüter elmləri, alqoritmlər, maşın öyrənməsi və böyük verilənlərin analizi sahəsində elmi kadrlar yetişdirilir.", departments: ["Alqoritmlər və proqramlaşdırma", "Maşın öyrənməsi", "Böyük verilənlər", "Kompüter görüntüsü"], students: 920, professors: 52 },
                { name: "Rəqəmsal iqtisadiyyat və biznes analitikası fakültəsi", icon: "fa-chart-bar", description: "Rəqəmsal transformasiya, biznes analitikası və fintech sahəsində müasir mütəxəssislər hazırlanır.", departments: ["Rəqəmsal iqtisadiyyat", "Biznes analitikası", "Fintech", "E-ticarət"], students: 680, professors: 38 }
            ]
        }
    };

    let currentKorpus = 0;

    /** Escape HTML to prevent injection through static data. */
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function showKorpus(korpusNumber) {
        currentKorpus = korpusNumber;

        document.querySelectorAll('.korpus-tab').forEach((tab, index) => {
            tab.classList.toggle('active', index === korpusNumber);
        });

        document.querySelectorAll('.korpus-content').forEach(c => c.classList.remove('active'));
        const target = document.getElementById(`korpus-${korpusNumber}`);
        if (target) target.classList.add('active');

        populateFaculties(korpusNumber);
    }

    function populateFaculties(korpusNumber) {
        const data = korpusData[korpusNumber];
        const grid = document.getElementById(`faculty-grid-${korpusNumber}`);
        if (!grid || grid.hasChildNodes() || !data) return;

        data.faculties.forEach(faculty => {
            const card = document.createElement('div');
            card.className = 'faculty-card';
            card.innerHTML = `
                <div class="faculty-card-header">
                    <div class="faculty-icon">
                        <i class="fas ${escapeHtml(faculty.icon)}"></i>
                    </div>
                    <h3>${escapeHtml(faculty.name)}</h3>
                </div>
                <div class="faculty-card-body">
                    <p>${escapeHtml(faculty.description)}</p>
                    <div class="faculty-stats">
                        <div class="faculty-stat">
                            <div class="faculty-stat-value">${faculty.students}</div>
                            <div class="faculty-stat-label">Tələbə</div>
                        </div>
                        <div class="faculty-stat">
                            <div class="faculty-stat-value">${faculty.professors}</div>
                            <div class="faculty-stat-label">Professor</div>
                        </div>
                        <div class="faculty-stat">
                            <div class="faculty-stat-value">${faculty.departments.length}</div>
                            <div class="faculty-stat-label">Kafedra</div>
                        </div>
                    </div>
                    <button class="expand-btn" onclick="toggleDetails(this)">
                        <i class="fas fa-chevron-down"></i> Ətraflı
                    </button>
                    <div class="faculty-details">
                        <h4 style="color:#1a3a5c;margin-bottom:10px;font-size:1.1em;">Kafedralar:</h4>
                        <ul style="padding-left:20px;color:#444;">
                            ${faculty.departments.map(d => `<li style="padding:5px 0;">${escapeHtml(d)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function toggleDetails(button) {
        const card = button.closest('.faculty-card');
        card.classList.toggle('expanded');

        if (card.classList.contains('expanded')) {
            button.innerHTML = '<i class="fas fa-chevron-up"></i> Gizlət';
        } else {
            button.innerHTML = '<i class="fas fa-chevron-down"></i> Ətraflı';
        }
    }

    document.addEventListener('DOMContentLoaded', () => showKorpus(currentKorpus));

    // Expose to inline onclick handlers
    window.showKorpus = showKorpus;
    window.toggleDetails = toggleDetails;
})();
