// facts-loader.js - Loads and renders facts from embedded data
// This module can be used on any page that needs to display university facts

const FactsLoader = {
    // Embedded facts data (no fetch required for file:// protocol)
    data: {
        "structure": [
            { "id": "fakulte", "icon": "fa-university", "value": 16, "name": "Fakültə", "description": "" },
            { "id": "kafedra", "icon": "fa-chalkboard-teacher", "value": 116, "name": "Kafedra", "description": "" },
            { "id": "elmi_tedqiqat_institutu", "icon": "fa-flask", "value": 2, "name": "Elmi-tədqiqat institutu", "description": "" },
            { "id": "elmi_tedqiqat_merkezi", "icon": "fa-building", "value": 8, "name": "Elmi-tədqiqat mərkəzi", "description": "" },
            { "id": "elmi_texniki_yaradicilik", "icon": "fa-lightbulb", "value": 1, "name": "Elmi-texniki yaradıcılıq mərkəzi", "description": "" },
            { "id": "beynelxalq_institut", "icon": "fa-globe", "value": 5, "name": "Beynəlxalq institut və mərkəz", "description": "" },
            { "id": "tedris_laboratoriyasi", "icon": "fa-vials", "value": 21, "name": "Tədris laboratoriyası", "description": "" },
            { "id": "elmi_kitabxana", "icon": "fa-book-open", "value": 1, "name": "Elmi kitabxana", "description": "Əyani və elektron mənbələr" },
            { "id": "muzey", "icon": "fa-landmark", "value": 5, "name": "Muzey", "description": "" },
            { "id": "kafedra_filiali", "icon": "fa-code-branch", "value": 13, "name": "Kafedra filialı", "description": "" },
            { "id": "filial", "icon": "fa-map-marker-alt", "value": 1, "name": "Filial", "description": "" },
            { "id": "kollec", "icon": "fa-graduation-cap", "value": 1, "name": "Kollec", "description": "" },
            { "id": "lisey", "icon": "fa-star", "value": 1, "name": "Lisey", "description": "" },
            { "id": "xususi_otaqlar", "icon": "fa-door-open", "value": 8, "name": "Xüsusi otaqlar", "description": "Elm-tədris-istehsalat" },
            { "id": "nesr_evi", "icon": "fa-newspaper", "value": 1, "name": "Nəşr Evi", "description": "" },
            { "id": "tedris_tecrube_istirahət", "icon": "fa-umbrella-beach", "value": 1, "name": "Tədris, təcrübə və istirahət mərkəzi", "description": "" },
            { "id": "tedris_tecrube_bazasi", "icon": "fa-flask", "value": 1, "name": "Tədris-təcrübə bazası", "description": "" },
            { "id": "telebe_seherciyiT", "icon": "fa-city", "value": 1, "name": "Tələbə şəhərciyi", "description": "" }
        ],
        "specialties": {
            "bakalavriatura": { "value": 75, "name": "Bakalavriatura ixtisas" },
            "magistratura": { "value": 243, "name": "Magistratura ixtisaslaşma" },
            "doktorantura": { "value": 123, "name": "Doktorantura ixtisas" }
        },
        "staff": {
            "eməkdas": { "value": 3000, "suffix": "+", "name": "Əməkdaş" },
            "professor_muellim": { "value": 1500, "suffix": "+", "name": "Professor-müəllim heyəti" }
        },
        "students": {
            "umumi": { "value": 28000, "suffix": "+", "name": "Ümumi təhsilalan" },
            "bakalavriat": { "value": 22500, "suffix": "+", "name": "Bakalavriat" },
            "magistrant": { "value": 2200, "suffix": "+", "name": "Magistrant" },
            "doktorant": { "value": 550, "suffix": "+", "name": "Doktorant" },
            "qazax_filiali": { "value": 1700, "suffix": "+", "name": "Qazax filialı" },
            "kollec": { "value": 1300, "suffix": "+", "name": "Kollec" },
            "lisey": { "value": 600, "suffix": "+", "name": "Lisey" }
        }
    },

    // Get data (synchronous since data is embedded)
    getData() {
        return this.data;
    },

    // Create a single fact card HTML
    createFactCard(item) {
        return `
            <div class="fact-card"
                style="background: linear-gradient(135deg, #fff 0%, #f8fafc 100%); border-radius: 20px; padding: 30px 20px; text-align: center; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 1px solid rgba(26, 58, 92, 0.08); transition: all 0.3s ease; position: relative; overflow: hidden;">
                <div
                    style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #1a3a5c, #d4af37);">
                </div>
                <div
                    style="width: 60px; height: 60px; background: linear-gradient(135deg, #1a3a5c, #2c5282); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 5px 15px rgba(26, 58, 92, 0.3);">
                    <i class="fas ${item.icon}" style="font-size: 1.5em; color: #d4af37;"></i>
                </div>
                <div class="fact-number" data-target="${item.value}"
                    style="font-size: 3em; font-weight: 800; color: #1a3a5c; line-height: 1;">0</div>
                <div style="font-size: 1.1em; font-weight: 700; color: #1a3a5c; margin: 10px 0 5px;">${item.name}</div>
                <div style="font-size: 0.85em; color: #64748b; line-height: 1.4;">${item.description || ''}</div>
            </div>
        `;
    },

    // Render structure facts grid
    renderStructureGrid(containerId) {
        const data = this.getData();
        if (!data) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = data.structure.map(item => this.createFactCard(item)).join('');
    },

    // Render specialties section
    renderSpecialties(containerId) {
        const data = this.getData();
        if (!data) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        const specs = data.specialties;
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2.5em; font-weight: 800; color: #d4af37;" class="fact-number"
                    data-target="${specs.bakalavriatura.value}">0</div>
                <div style="color: #fff; font-size: 1em; opacity: 0.9;">${specs.bakalavriatura.name}</div>
            </div>
            <div style="width: 2px; height: 60px; background: rgba(255,255,255,0.2);"></div>
            <div style="text-align: center;">
                <div style="font-size: 2.5em; font-weight: 800; color: #d4af37;" class="fact-number"
                    data-target="${specs.magistratura.value}">0</div>
                <div style="color: #fff; font-size: 1em; opacity: 0.9;">${specs.magistratura.name}</div>
            </div>
            <div style="width: 2px; height: 60px; background: rgba(255,255,255,0.2);"></div>
            <div style="text-align: center;">
                <div style="font-size: 2.5em; font-weight: 800; color: #d4af37;" class="fact-number"
                    data-target="${specs.doktorantura.value}">0</div>
                <div style="color: #fff; font-size: 1em; opacity: 0.9;">${specs.doktorantura.name}</div>
            </div>
        `;
    },

    // Render staff section
    renderStaff(containerId) {
        const data = this.getData();
        if (!data) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        const staff = data.staff;
        container.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2.5em; font-weight: 800; color: #1a3a5c;" class="fact-number"
                    data-target="${staff.eməkdas.value}" data-suffix="${staff.eməkdas.suffix || ''}">0</div>
                <div style="color: #64748b; font-size: 1em;">${staff.eməkdas.name}</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 2.5em; font-weight: 800; color: #1a3a5c;" class="fact-number"
                    data-target="${staff.professor_muellim.value}" data-suffix="${staff.professor_muellim.suffix || ''}">0</div>
                <div style="color: #64748b; font-size: 1em;">${staff.professor_muellim.name}</div>
            </div>
        `;
    },

    // Render students section
    renderStudents(mainContainerId, detailsContainerId) {
        const data = this.getData();
        if (!data) return;

        const students = data.students;

        // Main total
        const mainContainer = document.getElementById(mainContainerId);
        if (mainContainer) {
            mainContainer.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3em; font-weight: 800; color: #d4af37;" class="fact-number"
                        data-target="${students.umumi.value}" data-suffix="${students.umumi.suffix || ''}">0</div>
                    <div style="color: #fff; font-size: 1.1em; opacity: 0.9;">${students.umumi.name}</div>
                </div>
            `;
        }

        // Details breakdown
        const detailsContainer = document.getElementById(detailsContainerId);
        if (detailsContainer) {
            const degrees = ['bakalavriat', 'magistrant', 'doktorant'];
            const affiliates = ['qazax_filiali', 'kollec', 'lisey'];

            // Helper to create a row of cards
            const createRow = (keys, bgColor, numberColor, titleColor) => {
                const itemsHtml = keys.map(key => {
                    const item = students[key];
                    return `
                        <div style="text-align: center; padding: 20px 25px; background: ${bgColor}; border-radius: 15px; min-width: 200px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.1);">
                            <div style="font-size: 2em; font-weight: 800; color: ${numberColor}; margin-bottom: 5px;" class="fact-number"
                                data-target="${item.value}" data-suffix="${item.suffix || ''}">0</div>
                            <div style="color: ${titleColor}; font-size: 1em; font-weight: 500;">${item.name}</div>
                        </div>
                    `;
                }).join('');

                return `
                    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; width: 100%;">
                        ${itemsHtml}
                    </div>
                `;
            };

            // Row 1: Degrees - Blueish theme (keeping consistency with parent but lighter/glassy)
            const row1Html = createRow(degrees, 'rgba(255, 255, 255, 0.1)', '#f7b731', '#fff'); // Gold numbers, White text

            // Row 2: Affiliates - Distinct theme to separate them (e.g., slightly different bg or border)
            // Using a darker semi-transparent background to distinguish
            const row2Html = createRow(affiliates, 'rgba(0, 0, 0, 0.2)', '#fff', '#e2e8f0'); // White numbers, Light Grey text

            detailsContainer.innerHTML = row1Html + row2Html;
        }
    },

    // Get a specific value by path (e.g., "students.umumi.value")
    getValue(path) {
        const data = this.getData();
        if (!data) return null;

        const parts = path.split('.');
        let result = data;
        for (const part of parts) {
            if (result && result[part] !== undefined) {
                result = result[part];
            } else {
                return null;
            }
        }
        return result;
    },

    // Initialize all sections on the facts page
    initFactsPage() {
        this.renderStructureGrid('facts-grid');
        this.renderSpecialties('specialties-container');
        this.renderStaff('staff-container');
        this.renderStudents('students-main-container', 'students-details-container');

        // Trigger counter animation
        if (typeof animateFactsCounters === 'function') {
            setTimeout(animateFactsCounters, 100);
        }
    },

    // Initialize only the hero section on the faculties page
    initFacultiesPageHero() {
        const data = this.getData();
        if (!data) return;

        // Set faculty count (from structure.id === 'fakulte')
        const fakulteStats = data.structure.find(s => s.id === 'fakulte');
        if (fakulteStats) {
            const el = document.getElementById('hero-fakulte-count');
            if (el) el.textContent = fakulteStats.value;
        }

        // Set specialties
        const bakEl = document.getElementById('hero-bakalavriat-count');
        if (bakEl) bakEl.textContent = data.specialties.bakalavriatura.value;

        const magEl = document.getElementById('hero-magistratura-count');
        if (magEl) magEl.textContent = data.specialties.magistratura.value;
    },

    // Initialize the history page statistics
    initHistoryPage() {
        const data = this.getData();
        if (!data) return;

        // University Age (BDU was founded in 1919)
        const currentYear = new Date().getFullYear();
        const age = currentYear - 1919;
        const ageEl = document.getElementById('history-age-count');
        if (ageEl) ageEl.textContent = age;

        // Faculty count
        const fakulteStats = data.structure.find(s => s.id === 'fakulte');
        if (fakulteStats) {
            const el = document.getElementById('history-fakulte-count');
            if (el) el.textContent = fakulteStats.value;
        }

        // Specialty count (bakalavriat)
        const ixtisasEl = document.getElementById('history-ixtisas-count');
        if (ixtisasEl) ixtisasEl.textContent = data.specialties.bakalavriatura.value;

        // Total students
        const studentsEl = document.getElementById('history-telebe-count');
        if (studentsEl) {
            const val = data.students.umumi.value;
            const suffix = data.students.umumi.suffix || '';
            studentsEl.textContent = val.toLocaleString() + suffix;
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FactsLoader;
}
