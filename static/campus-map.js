/**
 * Interactive Campus Map - JavaScript
 * Bakı Dövlət Universiteti
 * ================================
 */

// ========================================
// Building Data
// ========================================
const DATA_VERSION = '2026-04-24-v15'; // Update this to force reload

const defaultBuildingsData = [
    {
        "id": "building-new-1761765509520",
        "name": "2 nömrəli tədris binası",
        "nameEn": "Academic Building 2",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/korpus-2/1.jpg",
        "folder": "korpus-2",
        "coordinates": {
            "type": "polygon",
            "points": "906.1183081255425,123.4827995193044 907.9836377836518,290.39343750700766 938.5669652120505,290.62512938146523 939.0883081255425,124.7927995193044"
        },
        "galleries": [
            "2.jpeg",
            "3.jpeg",
            "4.jpeg",
            "5.jpeg",
            "6.jpeg"
        ],
        "shapes": []
    },
    {
        "id": "building-new-1761765550045",
        "name": "1 nömrəli tədris binası",
        "nameEn": "Academic Building 1",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/korpus-1/1.jpg",
        "folder": "korpus-1",
        "coordinates": {
            "type": "polygon",
            "points": "761.8134372799881,289.2824876793398 761.8134372799881,324.9024876793398 951.3100183072165,324.2204511778121 952.0050939305892,290.62512938146523"
        },
        "galleries": [
            "2.jpeg",
            "3.jpeg",
            "4.jpeg",
            "5.jpeg",
            "6.jpeg"
        ],
        "shapes": []
    },
    {
        "id": "building-new-1761765662748",
        "name": "İdman Kompleksi",
        "nameEn": "Sports Complex",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/idman-kompleksi/1.jpg",
        "folder": "idman-kompleksi",
        "coordinates": {
            "type": "polygon",
            "points": "607.5208240519205,42.88396446940302 647.0908240519205,42.88396446940302 647.0908240519205,140.50396446940357 606.2008240519206,141.81396446940357 606.2008240519206,45.52396446940302"
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1761765727904",
        "name": "Futbol Meydançası",
        "nameEn": "Football Field",
        "description": "BDU-nun futbol meydançası universitetin idman infrastrukturu daxilində yüksək keyfiyyətli məşq və oyunlar üçün nəzərdə tutulmuş açıq sahədir.",
        "image": "static/images/kampus/futbol-meydancasi/1.jpg",
        "folder": "futbol-meydancasi",
        "coordinates": {
            "type": "polygon",
            "points": "440.8322865404268,18.607913961347137 595.1722865404269,18.607913961347137 595.1722865404269,124.13791396134727 442.1522865404268,124.13791396134727"
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1761765760425",
        "name": "Bufet",
        "nameEn": "Cafeteria",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/bufet/1.jpg",
        "folder": "bufet",
        "coordinates": {
            "type": "polygon",
            "points": "395.4867186399941,41.29248767933977 429.77671863999404,41.29248767933977 431.0967186399941,145.50248767933977 394.1667186399941,144.18248767933977"
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1761766103986",
        "name": "3 nömrəli tədris binası",
        "nameEn": "Academic Building 3",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/korpus-3/1.jpg",
        "folder": "korpus-3",
        "coordinates": {
            "type": "polygon",
            "points": "180.46671863999413,299.84248767933974 180.95640448851955,268.28547671970233 181.79628755479044,263.24617832207707 184.48391336685725,258.0389033111976 187.84344563194077,254.3434178196057 191.20297789702428,251.8237686207931 195.06644000187032,250.31197910150547 199.26585533322472,249.47209603523464 202.79336421156242,249.13614280872628 205.31301341037508,249.80804926174295 208.84052228871275,251.31983878103057 211.02421826101704,253.1675815268265 213.87982068633804,255.3512774991308 216.08671863999413,257.62248767933977 217.91125940443825,260.0546226702477 219.0031073905904,261.98635372267074 219.12908985053105,262.28031279586554 219.19208108050134,262.42729233246297 219.22357669548649,262.5007821007617 219.7590021502342,264.2540380016021 220.59888521650507,272.4848920510567 221.36671863999413,298.52248767933975 295.2130235805479,299.27548216355757 296.5467186399942,332.81248767933977 106.59671863999412,334.13248767933976 105.28671863999412,299.84248767933974"
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1761766198127",
        "name": "Fizika Problemləri ETİ",
        "nameEn": "Institute for Physical Problems",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/fizika-problemleri/1.jpg",
        "folder": "fizika-problemleri",
        "coordinates": {
            "type": "polygon",
            "points": "30.74382743735109,45.54238780811423 121.82447927878944,45.915669168120125 122.20274981397839,74.42179991296436 30.74382743735109,73.53848980855636"
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1761766224641",
        "name": "Eko Məkan",
        "nameEn": "Eco Space",
        "description": "Bakı Dövlət Universiteti (BDU) ekoloji təhsil, elmi-tədqiqat və 'yaşıl iqtisadiyyat' sahələrində innovativ təşəbbüsləri ilə seçilir və universitetin 'Eko Məkan' layihəsi tələbələrə, gənc tədqiqatçılara və ictimaiyyətə ətraf mühitin qorunması, davamlı enerji və biomüxtəliflik sahələrində praktiki təcrübə və maarifləndirmə imkanı yaradır.",
        "image": "static/images/kampus/ekomekan/1.jpg",
        "folder": "ekomekan",
        "coordinates": {
            "type": "circle",
            "cx": 396.2154173354168,
            "cy": 358.2909604668543,
            "r": 16.685390471396257
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1761766230864",
        "name": "Kitab Evi",
        "nameEn": "Book House",
        "description": "Bakı Dövlət Universitetində açılan Kitab Evi tələbələr və əməkdaşlar üçün dərs və elmi ədəbiyyat, bədii əsərlər və dəftərxana ləvazimatları ilə təmin edən əsas məkana çevrilib.",
        "image": "static/images/kampus/kitab-evi/1.jpg",
        "folder": "kitab-evi",
        "coordinates": {
            "type": "circle",
            "cx": 703.691571824108,
            "cy": 355.2804705926759,
            "r": 15.43288177780731
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1761766411105",
        "name": "Əsas tədris binası",
        "nameEn": "Main Academic Building",
        "description": "Bakı Dövlət Universiteti (BDU) Azərbaycanın ən qədim və şərəfli təhsil ocağı olaraq, milli təhsilimizin flaqmanı hesab olunur. Bu əzəmətli bina on minlərlə tələbənin elmi biliklərə yiyələndiyi, milli kadr potensialının formalaşdığı mərkəzdir.",
        "image": "static/images/kampus/esas-korpus/1.webp",
        "folder": "esas-korpus",
        "coordinates": {
            "type": "polygon",
            "points": "480.3309396024526,184.49000937204818 572.236718639994,183.76248767933976 572.236718639994,293.2424876793398 549.8167186399942,293.2424876793398 549.8167186399942,302.47248767933974 601.6682738194944,303.5651350910045 601.9736858454547,292.875714182395 690.956718639994,291.9224876793398 689.6367186399941,121.76248767933976 723.9367186399941,120.44248767933976 727.8967186399941,330.1724876793398 603.8967186399941,334.13248767933976 603.8967186399941,344.6824876793398 454.8467186399941,347.32248767933976 453.52671863999404,331.4924876793398 328.20671863999405,334.13248767933976 324.25671863999406,120.44248767933976 359.8667186399941,120.44248767933976 364.3631296483631,292.97752129786016 455.9867374364447,290.4324179747128 456.90297351432554,305.0921952208058 499.96265655397576,305.15051505286743 499.68671863999407,293.2424876793398 479.90671863999404,291.9224876793398"
        },
        "galleries": [
            "2.jpg",
            "3.jpg",
            "4.jpg",
            "5.jpg",
            "6.jpg",
            "7.jpg"
        ],
        "shapes": []
    },
    {
        "id": "building-new-1768210854788",
        "name": "EkoEnerji",
        "nameEn": "EcoEnergy",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/ekoenerji/1.jpg",
        "folder": "ekoenerji",
        "coordinates": {
            "type": "rect",
            "x": 890.0304923697737,
            "y": 63.336399076947,
            "width": 30.357103295675188,
            "height": 28.517278853513034
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "parking",
        "name": "Üzgüçülük kompleksi",
        "nameEn": "Swimming Complex",
        "description": "",
        "image": "static/images/kampus/uzguchuluk-kompleksi/1.jpg",
        "folder": "uzguchuluk-kompleksi",
        "coordinates": {
            "type": "rect",
            "x": 683.9902014553664,
            "y": 25.750404378577194,
            "width": 80.50443727262996,
            "height": 60.66581731261989
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1768211156479",
        "name": "Tələbə məkanı",
        "nameEn": "Student Space",
        "description": "Tələbə məkanı tələbələrin asudə vaxtlarını keçirəcəyi, birgə debatlar, müzakirələr aparacağı, ünsiyyət quracağı bir məkandır. Burada yalnız Bakı Dövlət Universitetinin deyil, digər ali təhsil müəssisələrinin tələbələri də layihələrini həyata keçirə biləcəklər. Bu məkan planlaşdırılarkən müasir dövrün çağırışları, xüsusilə də dövlətimizin yaşıl texnologiyalar və ekoloji problemlərin həlli ilə bağlı siyasəti əsas götürülüb. Ərazidəki bütün işıqlandırma Günəş panelləri vasitəsilə təmin olunur. Layihənin mühüm cəhətlərindən biri də 24 saat fəaliyyət göstərən mini kitabxanasıdır.",
        "descriptionEn": "Student Space is a place where students can spend their leisure time, hold joint debates and discussions, and socialize. Here, not only students of Baku State University but also students from other higher education institutions will be able to implement their projects. In planning this space, the demands of the modern era were taken as a basis, especially our state's policy on green technologies and solving environmental problems. All lighting in the area is powered by solar panels. One of the important features of the project is its 24-hour mini library.",
        "image": "static/images/kampus/telebe-mekani/1.jpeg",
        "folder": "telebe-mekani",
        "coordinates": {
            "type": "rect",
            "x": 382.38243918001916,
            "y": 236.62292969550816,
            "width": 32.98449880370936,
            "height": 37.11363396685488
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1768299513250",
        "name": "Park",
        "nameEn": "Park",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/park/1.jpg",
        "folder": "park",
        "coordinates": {
            "type": "circle",
            "cx": 188.5395165005477,
            "cy": 153.64412266799073,
            "r": 16.237353123511408
        },
        "galleries": [
            "2.jpg",
            "3.jpg",
            "4.jpg"
        ],
        "shapes": []
    },
    {
        "id": "building-new-1761765808642",
        "name": "TETYM",
        "nameEn": "STREC",
        "description": "TETYM-də tələbələr innovativ layihələr hazırlayır, texniki bacarıqlarını inkişaf etdirir və texnologiya sektorunda parlaq karyera yollarını formalaşdırır.",
        "image": "static/images/kampus/tetym/1.webp",
        "folder": "tetym",
        "coordinates": {
            "type": "polygon",
            "points": "294.6537489615188,89.58958828880982 326.53613084088903,90.45423998175099 326.53613084088903,80.87957302626297 331.07149939875177,83.3992222250756 335.43889134336035,84.57505851785484 339.3023534482064,84.9110117443632 344.00569861932337,84.74303513110902 350.1514517742363,82.0751227643008 354.2862607087683,78.4571649465853 357.2150837040618,73.97778860084229 359.2824881713278,67.60329149343877 359.1102044657223,61.573361797246264 358.1157341326741,58.87463668996591 355.1476792367958,52.78689281136573 351.5297214190803,48.82436758243922 347.2226287789428,46.067828292751216 343.669745392815,44.76460117661513 340.1589968491173,44.51727494230171 336.36875532579626,45.03412605911822 332.92308121368626,45.89554458714572 330.0636397192267,47.45222698868196 327.06543522309926,48.99665128804473 326.6865627200117,36.22264359932208 294.6537489615188,36.210353807966854 295.4003116815305,61.966767648373605 295.4003116815305,76.89802204860939"
        },
        "galleries": [],
        "shapes": []
    },
    {
        "id": "building-new-1768305594576",
        "name": "TİİMM",
        "nameEn": "AIIMM",
        "description": "Click Edit to add description",
        "image": "static/images/kampus/tiimm/1.webp",
        "folder": "tiimm",
        "coordinates": {
            "type": "polygon",
            "points": "726.4673771245461,189.65958860196704 799.8011664370244,189.27564206106402 799.8011664370244,161.05557130469148 829.7489966274605,161.4395178455945 829.3990792402899,253.9570145842199 800.8430554657876,254.37695611031552 800.2710531392128,218.19468033606285 727.3793844245029,217.7874643097237"
        },
        "galleries": [],
        "shapes": []
    }
];

// ========================================
// Global State
// ========================================
let buildings = [];
let selectedBuilding = null;
let isEditMode = false;
let currentDrawingTool = null;
let carouselIntervals = {};
let currentSlideIndex = 0;

// Drawing state
let isDrawing = false;
let drawingPoints = [];
let tempShape = null;

// ========================================
// DOM Elements
// ========================================
// ========================================
// DOM Elements
// ========================================
const mapOverlay = document.getElementById('mapOverlay');
const buildingLegend = document.getElementById('buildingLegend');
// New Modal Elements
const mapModalOverlay = document.getElementById('modalOverlay');
const mapModal = document.getElementById('buildingModal');
const modalTitle = document.getElementById('modalBuildingName');
const modalClose = document.getElementById('modalClose'); // In new HTML, id is modalClose
const modalDescription = document.getElementById('modalDescription');
const editBuildingBtn = document.getElementById('editBuildingBtn');
// Carousel Elements
const mapCarouselContainer = document.getElementById('carouselContainer');
const mapCarouselInner = document.getElementById('carouselSlides');
const mapCarouselIndicators = document.getElementById('carouselDots');
const mapCarousel = document.getElementById('carouselContainer');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const currentSlideNum = document.getElementById('currentSlideNum');
const totalSlideNum = document.getElementById('totalSlideNum');
const mapCarouselCaption = document.getElementById('carouselCaption');
const mapCaptionText = document.getElementById('carouselCaption');

// Edit Panel Elements
const toggleEditModeBtn = document.getElementById('toggleEditMode');
const editPanel = document.getElementById('editPanel');
const closeEditPanelBtn = document.getElementById('closeEditPanel');
const deleteShapeBtn = document.getElementById('deleteShape');
const saveChangesBtn = document.getElementById('saveChanges');
const exportJsonBtn = document.getElementById('exportJson');
const importJsonBtn = document.getElementById('importJson');
const importFileInput = document.getElementById('importFileInput');
const saveAsDefaultBtn = document.getElementById('saveAsDefaultBtn');
const editModalOverlay = document.getElementById('editModalOverlay');
const editBuildingName = document.getElementById('editBuildingName');
const editBuildingDescription = document.getElementById('editBuildingDescription');
const editBuildingImage = document.getElementById('editBuildingImage');
const editModalClose = document.getElementById('editModalClose');
const editModalCancel = document.getElementById('editModalCancel');
const editModalSave = document.getElementById('editModalSave');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const toolButtons = document.querySelectorAll('.tool-btn');

function getCurrentLanguage() {
    return document.documentElement.getAttribute('data-lang') || 'az';
}

function getBuildingDisplayName(building) {
    return getCurrentLanguage() === 'en' && building.nameEn ? building.nameEn : building.name;
}

function getBuildingDisplayDescription(building) {
    return getCurrentLanguage() === 'en' && building.descriptionEn ? building.descriptionEn : building.description;
}

// ========================================
// Initialization
// ========================================
function init() {
    loadBuildings();
    renderBuildings();
    renderLegend();
    setupEventListeners();

    // Sync SVG overlay with image after it loads
    const campusMap = document.getElementById('campusMap');
    if (campusMap.complete) {
        syncOverlayWithImage();
    } else {
        campusMap.addEventListener('load', syncOverlayWithImage);
    }
    window.addEventListener('resize', syncOverlayWithImage);
}

// Synchronize SVG overlay position with the actual image bounds
function syncOverlayWithImage() {
    const campusMap = document.getElementById('campusMap');
    const mapOverlay = document.getElementById('mapOverlay');
    const mapContainer = document.getElementById('mapContainer');

    if (!campusMap || !mapOverlay || !mapContainer) return;

    // Wait for image to have dimensions
    if (!campusMap.naturalWidth || !campusMap.naturalHeight) {
        setTimeout(syncOverlayWithImage, 100);
        return;
    }

    const containerRect = mapContainer.getBoundingClientRect();
    const imgNaturalWidth = campusMap.naturalWidth;
    const imgNaturalHeight = campusMap.naturalHeight;
    const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
    const containerAspectRatio = containerRect.width / containerRect.height;

    let imgDisplayWidth, imgDisplayHeight, offsetX, offsetY;

    if (containerAspectRatio > imgAspectRatio) {
        // Container is wider - image height fills container
        imgDisplayHeight = containerRect.height;
        imgDisplayWidth = imgDisplayHeight * imgAspectRatio;
        offsetX = (containerRect.width - imgDisplayWidth) / 2;
        offsetY = 0;
    } else {
        // Container is taller - image width fills container
        imgDisplayWidth = containerRect.width;
        imgDisplayHeight = imgDisplayWidth / imgAspectRatio;
        offsetX = 0;
        offsetY = (containerRect.height - imgDisplayHeight) / 2;
    }

    // Position SVG to match image bounds
    mapOverlay.style.width = imgDisplayWidth + 'px';
    mapOverlay.style.height = imgDisplayHeight + 'px';
    mapOverlay.style.left = offsetX + 'px';
    mapOverlay.style.top = offsetY + 'px';

    // Also position the video elements relative to image bounds
    const xariBulbulVideo = document.querySelector('.xari-bulbul-video');
    const abideVideo = document.querySelector('.abide-video');

    if (xariBulbulVideo) {
        const videoSize = Math.max(25, imgDisplayWidth * 0.03);
        xariBulbulVideo.style.width = videoSize + 'px';
        xariBulbulVideo.style.height = videoSize + 'px';
        xariBulbulVideo.style.left = (offsetX + imgDisplayWidth * 0.988 - videoSize) + 'px';
        xariBulbulVideo.style.top = (offsetY + imgDisplayHeight * 0.59) + 'px';
        xariBulbulVideo.style.right = 'auto';
    }

    if (abideVideo) {
        const videoSize = Math.max(25, imgDisplayWidth * 0.03);
        abideVideo.style.width = videoSize + 'px';
        abideVideo.style.height = videoSize + 'px';
        abideVideo.style.left = (offsetX + imgDisplayWidth * 0.9591 - videoSize) + 'px';
        abideVideo.style.top = (offsetY + imgDisplayHeight * 0.35) + 'px';
        abideVideo.style.right = 'auto';
    }
}

function loadBuildings() {
    const savedVersion = localStorage.getItem('campusMapVersion');
    const savedData = localStorage.getItem('campusMapBuildings');

    console.log('Saved version:', savedVersion, 'Current version:', DATA_VERSION);
    console.log('Has saved data:', !!savedData);

    // Check if version matches, otherwise force reload default data
    if (savedData && savedVersion === DATA_VERSION) {
        try {
            buildings = JSON.parse(savedData);
            console.log('Loaded from localStorage:', buildings.length, 'buildings');
        } catch (e) {
            console.log('Error parsing saved data, using defaults');
            buildings = [...defaultBuildingsData];
            localStorage.setItem('campusMapVersion', DATA_VERSION);
        }
    } else {
        // Version mismatch or no saved data - use default and update version
        console.log('Loading default data:', defaultBuildingsData.length, 'buildings');
        buildings = [...defaultBuildingsData];
        localStorage.setItem('campusMapVersion', DATA_VERSION);
        saveBuildings();
    }
    console.log('Final buildings count:', buildings.length);
}

function saveBuildings() {
    localStorage.setItem('campusMapBuildings', JSON.stringify(buildings));
    localStorage.setItem('campusMapVersion', DATA_VERSION);
}

// ========================================
// Render Functions
// ========================================
function renderBuildings() {
    mapOverlay.innerHTML = '';

    console.log('Rendering', buildings.length, 'buildings');

    // First pass: render all shapes
    buildings.forEach(building => {
        const shape = createSVGShape(building);
        if (shape) {
            shape.classList.add('building-area');
            shape.dataset.buildingId = building.id;
            shape.setAttribute('fill', 'rgba(59, 130, 246, 0.2)');
            shape.setAttribute('stroke', '#3b82f6');
            shape.setAttribute('stroke-width', '2');

            // Click handler
            shape.addEventListener('click', () => handleBuildingClick(building));

            mapOverlay.appendChild(shape);
            // console.log('Added shape for:', building.name);
        } else {
            console.error('Failed to create shape for:', building.name, building.coordinates);
        }
    });

    // Second pass: render all labels (so they appear on top)
    buildings.forEach(building => {
        const label = createBuildingLabel(building);
        if (label) {
            mapOverlay.appendChild(label);
        }
    });
}

function createSVGShape(building) {
    const coords = building.coordinates;
    let shape;

    switch (coords.type) {
        case 'rect':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            shape.setAttribute('x', coords.x);
            shape.setAttribute('y', coords.y);
            shape.setAttribute('width', coords.width);
            shape.setAttribute('height', coords.height);
            break;

        case 'circle':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            shape.setAttribute('cx', coords.cx);
            shape.setAttribute('cy', coords.cy);
            shape.setAttribute('r', coords.r);
            break;

        case 'polygon':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            shape.setAttribute('points', coords.points);
            break;

        default:
            return null;
    }

    return shape;
}

function createBuildingLabel(building) {
    const coords = building.coordinates;
    const center = getShapeCenter(coords);

    if (!center) return null;

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', center.x);
    text.setAttribute('y', center.y);
    text.setAttribute('class', 'building-label');
    text.setAttribute('data-building-id', building.id);
    text.setAttribute('text-anchor', 'middle');

    // Split long names into 2 lines
    const name = getBuildingDisplayName(building);
    if (name.length > 12) {
        const words = name.split(' ');

        if (words.length === 1) {
            // Single word, split in middle
            const mid = Math.ceil(name.length / 2);
            const line1 = name.substring(0, mid);
            const line2 = name.substring(mid);

            const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan1.setAttribute('x', center.x);
            tspan1.setAttribute('dy', '0');
            tspan1.textContent = line1;
            text.appendChild(tspan1);

            const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan2.setAttribute('x', center.x);
            tspan2.setAttribute('dy', '12');
            tspan2.textContent = line2;
            text.appendChild(tspan2);
        } else {
            // Multiple words, split by space
            const mid = Math.ceil(words.length / 2);
            const line1 = words.slice(0, mid).join(' ');
            const line2 = words.slice(mid).join(' ');

            const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan1.setAttribute('x', center.x);
            tspan1.setAttribute('dy', '0');
            tspan1.textContent = line1;
            text.appendChild(tspan1);

            const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan2.setAttribute('x', center.x);
            tspan2.setAttribute('dy', '12');
            tspan2.textContent = line2;
            text.appendChild(tspan2);
        }
    } else {
        text.textContent = name;
    }

    return text;
}

function getShapeCenter(coords) {
    switch (coords.type) {
        case 'rect':
            return {
                x: coords.x + coords.width / 2,
                y: coords.y + coords.height / 2
            };

        case 'circle':
            return {
                x: coords.cx,
                y: coords.cy
            };

        case 'polygon':
            const points = coords.points.split(' ').map(p => {
                const [x, y] = p.split(',').map(Number);
                return { x, y };
            });
            const sumX = points.reduce((sum, p) => sum + p.x, 0);
            const sumY = points.reduce((sum, p) => sum + p.y, 0);
            return {
                x: sumX / points.length,
                y: sumY / points.length
            };

        default:
            return null;
    }
}

function renderLegend() {
    buildingLegend.innerHTML = '';

    // Define priority order for buildings
    const priorityOrder = [
        'əsas tədris binası',
        '1 nömrəli tədris binası',
        '2 nömrəli tədris binası',
        '3 nömrəli tədris binası',
        'tetym',
        'fizika',
        'idman kompleksi',
        'futbol meydançası',
        'üzgüçülük kompleksi',
        'eko məkan',
        'ekoenerji',
        'kitab evi',
        'bufet'
    ];

    // Sort buildings by priority
    const sortedBuildings = [...buildings].sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        let aPriority = priorityOrder.findIndex(p => aName.includes(p));
        let bPriority = priorityOrder.findIndex(p => bName.includes(p));

        // If not found in priority list, put at end
        if (aPriority === -1) aPriority = 999;
        if (bPriority === -1) bPriority = 999;

        return aPriority - bPriority;
    });

    sortedBuildings.forEach(building => {
        const btn = document.createElement('button');
        btn.className = 'legend-btn';
        btn.dataset.buildingId = building.id;

        const icon = getBuildingIcon(building.name);
        const displayName = getBuildingDisplayName(building);

        btn.innerHTML = `
            <div class="legend-icon">
                <i class="fas ${icon}"></i>
            </div>
            <span class="legend-name">${displayName}</span>
        `;

        btn.addEventListener('click', () => handleLegendClick(building));

        buildingLegend.appendChild(btn);
    });

    // Setup scroll indicators after rendering
    setTimeout(updateScrollIndicators, 100);
}

// Update scroll fade indicators
function updateScrollIndicators() {
    const legendSection = document.querySelector('.legend-section');
    const legendGrid = document.querySelector('.legend-grid');

    if (!legendSection || !legendGrid) return;

    const scrollLeft = legendGrid.scrollLeft;
    const maxScroll = legendGrid.scrollWidth - legendGrid.clientWidth;

    // Add/remove classes based on scroll position
    if (scrollLeft > 10) {
        legendSection.classList.add('has-scroll-left');
    } else {
        legendSection.classList.remove('has-scroll-left');
    }

    if (scrollLeft < maxScroll - 10) {
        legendSection.classList.add('has-scroll-right');
    } else {
        legendSection.classList.remove('has-scroll-right');
    }
}

function getBuildingIcon(name) {
    const nameLower = name.toLowerCase();

    if (nameLower.includes('korpus')) return 'fa-building';
    if (nameLower.includes('meydança') || nameLower.includes('stadion')) return 'fa-futbol';
    if (nameLower.includes('kitab') || nameLower.includes('library')) return 'fa-book';
    if (nameLower.includes('parking')) return 'fa-parking';
    if (nameLower.includes('tetym') || nameLower.includes('texnik')) return 'fa-microscope';
    if (nameLower.includes('eko') || nameLower.includes('eco')) return 'fa-leaf';
    if (nameLower.includes('bufet') || nameLower.includes('yeməkxana')) return 'fa-utensils';
    if (nameLower.includes('charge') || nameLower.includes('enerji')) return 'fa-charging-station';
    if (nameLower.includes('mükəmməllik')) return 'fa-star';
    if (nameLower.includes('əsas')) return 'fa-building-columns';

    return 'fa-building';
}

// ========================================
// Event Handlers
// ========================================
// ========================================
// Event Handlers
// ========================================
function setupEventListeners() {
    // Modal close
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (mapModalOverlay) {
        mapModalOverlay.addEventListener('click', (e) => {
            if (e.target === mapModalOverlay) closeModal();
        });
    }

    // Carousel navigation
    if (carouselPrev) carouselPrev.addEventListener('click', () => navigateCarousel(-1));
    if (carouselNext) carouselNext.addEventListener('click', () => navigateCarousel(1));

    // Edit mode toggle
    if (toggleEditModeBtn) toggleEditModeBtn.addEventListener('click', toggleEditMode);

    if (closeEditPanelBtn) {
        closeEditPanelBtn.addEventListener('click', () => {
            editPanel.classList.remove('active');
            toggleEditModeBtn.classList.remove('active');
            isEditMode = false;
            deselectAllTools();
        });
    }

    // Tool buttons
    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => selectTool(btn.dataset.shape));
    });

    // Delete shape
    if (deleteShapeBtn) deleteShapeBtn.addEventListener('click', deleteSelectedShape);

    // Save changes
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', () => {
            saveBuildings();
            showToast('Dəyişikliklər yadda saxlanıldı');
        });
    }

    // Export/Import
    if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportToJson);
    if (importJsonBtn) importJsonBtn.addEventListener('click', () => importFileInput.click());
    if (importFileInput) importFileInput.addEventListener('change', importFromJson);
    if (saveAsDefaultBtn) saveAsDefaultBtn.addEventListener('click', exportAsDefaultOverlay);

    // Edit building modal
    if (editBuildingBtn) editBuildingBtn.addEventListener('click', openEditBuildingModal);
    if (editModalClose) editModalClose.addEventListener('click', closeEditBuildingModal);

    // Legend scroll indicators
    if (buildingLegend) {
        buildingLegend.addEventListener('scroll', updateScrollIndicators);
        window.addEventListener('resize', updateScrollIndicators);
    }

    if (editModalCancel) editModalCancel.addEventListener('click', closeEditBuildingModal);
    if (editModalSave) editModalSave.addEventListener('click', saveEditedBuilding);
    if (editModalOverlay) {
        editModalOverlay.addEventListener('click', (e) => {
            if (e.target === editModalOverlay) closeEditBuildingModal();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeydown);

    // Touch support for carousel
    setupCarouselTouch();

    // Drawing on map
    if (mapOverlay) mapOverlay.addEventListener('click', handleMapClick);

    // Click on empty area to deselect
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer) {
        mapContainer.addEventListener('click', (e) => {
            // Check if click is on empty area (not on building or other elements)
            if (e.target === mapContainer || e.target.classList.contains('campus-map-image') || e.target.id === 'mapOverlay') {
                if (selectedBuilding && !isEditMode) {
                    deselectBuilding();
                }
            }
        });
    }

    if (mapOverlay) {
        mapOverlay.addEventListener('mousemove', handleMapMouseMove);
        mapOverlay.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (isDrawing && currentDrawingTool === 'polygon') {
                finishPolygonDrawing();
            }
        });
    }

    document.addEventListener('langchange', () => {
        renderBuildings();
        renderLegend();

        if (mapModalOverlay && mapModalOverlay.classList.contains('active') && selectedBuilding) {
            modalTitle.textContent = getBuildingDisplayName(selectedBuilding);
            modalDescription.textContent = getBuildingDisplayDescription(selectedBuilding) || 'Təsvir mövcud deyil';
            setupCarousel(selectedBuilding);
        }
    });
}

function handleBuildingClick(building) {
    selectBuilding(building);
    openModal(building);
}

function handleLegendClick(building) {
    // Highlight building on map with flicker effect
    const shape = mapOverlay.querySelector(`[data-building-id="${building.id}"]`);
    if (shape) {
        shape.classList.add('flicker');
        setTimeout(() => shape.classList.remove('flicker'), 600);
    }

    // Select in legend
    selectBuilding(building, false);
}

function selectBuilding(building, updateSelection = true) {
    // Deselect previous
    if (selectedBuilding) {
        const prevShape = mapOverlay.querySelector(`[data-building-id="${selectedBuilding.id}"]`);
        if (prevShape) {
            prevShape.classList.remove('selected');
        }

        const prevBtn = buildingLegend.querySelector(`[data-building-id="${selectedBuilding.id}"]`);
        if (prevBtn) {
            prevBtn.classList.remove('selected');
        }
    }

    selectedBuilding = building;

    // Select new
    const shape = mapOverlay.querySelector(`[data-building-id="${building.id}"]`);
    if (shape) {
        shape.classList.add('selected');
    }

    const btn = buildingLegend.querySelector(`[data-building-id="${building.id}"]`);
    if (btn) {
        btn.classList.add('selected');
    }

    // Enable delete button in edit mode
    if (isEditMode) {
        deleteShapeBtn.disabled = false;
    }
}

// ========================================
// Modal Functions
// ========================================
function openModal(building) {
    modalTitle.textContent = getBuildingDisplayName(building);
    modalDescription.textContent = getBuildingDisplayDescription(building) || 'Təsvir mövcud deyil';

    // Setup carousel
    setupCarousel(building);

    mapModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    mapModalOverlay.classList.remove('active');
    stopCarouselAutoplay();
    deselectBuilding();
    document.body.style.overflow = '';
}

function deselectBuilding() {
    if (selectedBuilding) {
        const prevShape = mapOverlay.querySelector(`[data-building-id="${selectedBuilding.id}"]`);
        if (prevShape) {
            prevShape.classList.remove('selected');
        }

        const prevBtn = buildingLegend.querySelector(`[data-building-id="${selectedBuilding.id}"]`);
        if (prevBtn) {
            prevBtn.classList.remove('selected');
        }

        selectedBuilding = null;

        // Disable delete button in edit mode
        if (isEditMode) {
            deleteShapeBtn.disabled = true;
        }
    }
}

// ========================================
// Carousel Functions
// ========================================
function setupCarousel(building) {
    // Reset UI
    mapCarouselContainer.classList.remove('has-images');
    if (mapCaptionText) mapCaptionText.textContent = '';
    if (mapCarouselCaption) mapCarouselCaption.style.display = 'none';

    // Clear previous slides
    mapCarouselInner.innerHTML = '';
    mapCarouselIndicators.innerHTML = '';
    currentSlideIndex = 0;

    let validCount = 0;
    const folder = building.folder;
    const extensions = ['webp', 'jpg', 'jpeg', 'png'];

    // Helper: Finalize a slide once image is loaded
    function finalizeSlide(img, caption) {
        // Prevent duplicates
        const existingImages = Array.from(mapCarouselInner.querySelectorAll('img')).map(i => i.src);
        if (existingImages.includes(img.src)) return;

        const slide = document.createElement('div');
        slide.className = 'carousel-item';

        // Add navigation indicator to image to make it clear it's clickable in coverflow
        img.alt = caption || getBuildingDisplayName(building);
        slide.appendChild(img);
        mapCarouselInner.appendChild(slide);

        validCount++;

        // UI Updates for the first valid image
        if (validCount === 1) {
            mapCarouselContainer.classList.add('has-images');
            updateCarouselCaption(img.alt);
            startCarouselAutoplay();
        }

        // Refresh UI state
        renderCarouselIndicators();
        updateCoverflowClasses();
        const total = mapCarouselInner.querySelectorAll('.carousel-item').length;
        updateCarouselCounter(currentSlideIndex + 1, total);

        // Navigation listener (click to move to this slide if it's next/prev)
        slide.addEventListener('click', () => {
            if (slide.classList.contains('prev')) navigateCarousel(-1);
            if (slide.classList.contains('next')) navigateCarousel(1);
        });
    }

    // Helper: Recursive probing to avoid 404 storms
    // We try index 1. If it exists (in any extension), we try index 2, etc.
    // If index i fails all extensions, we STOP and do not try i+1.
    function probeSequence(index) {
        if (index > 15) return; // Max limit

        const probeExtension = (extIndex) => {
            if (extIndex >= extensions.length) {
                // Tried all extensions for this index and found nothing.
                // Stop probing sequence.
                return;
            }

            const ext = extensions[extIndex];
            const url = `static/images/kampus/${folder}/${index}.${ext}`;
            const img = new Image();

            img.onload = () => {
                // Success! Add this slide
                finalizeSlide(img, getBuildingDisplayName(building));
                // Continue to next number
                probeSequence(index + 1);
            };

            img.onerror = () => {
                // Failed this extension, try next extension for SAME index
                probeExtension(extIndex + 1);
            };

            img.src = url;
        };

        // Start probing this index with first extension
        probeExtension(0);
    }

    // 1. High Priority: Primary Image
    if (building.image) {
        const primaryImg = new Image();
        primaryImg.onload = () => finalizeSlide(primaryImg, getBuildingDisplayName(building));
        primaryImg.onerror = () => {
            // If primary fails and no folder, fallback to default
            if (!folder) finalizeSlide(primaryImg, getBuildingDisplayName(building));
        };
        primaryImg.src = building.image;
    }

    // 2. Secondary: Gallery or Folder Probing
    if (building.galleries && building.galleries.length > 0) {
        building.galleries.forEach(item => {
            const displayUrl = item.url || (item.file && `static/images/fakulteler/${folder || building.id}/${item.file}`) || item;
            const fullUrl = displayUrl.startsWith('static') ? displayUrl : `static/images/kampus/${folder}/${displayUrl}`;

            const gImg = new Image();
            gImg.onload = () => finalizeSlide(gImg, item.caption || getBuildingDisplayName(building));
            gImg.src = fullUrl;
        });
    } else if (folder) {
        // Start sequential probing from 1
        probeSequence(1);
    }
}

function renderCarouselIndicators() {
    const slides = mapCarouselInner.querySelectorAll('.carousel-item');
    mapCarouselIndicators.innerHTML = '';

    if (slides.length <= 1) {
        mapCarousel.classList.add('single-image');
    } else {
        mapCarousel.classList.remove('single-image');
    }

    slides.forEach((slide, i) => {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        if (i === currentSlideIndex) indicator.classList.add('active');
        indicator.onclick = () => goToSlide(i);
        mapCarouselIndicators.appendChild(indicator);
    });
}

function updateCoverflowClasses() {
    const items = mapCarouselInner.querySelectorAll('.carousel-item');
    const indicators = mapCarouselIndicators.querySelectorAll('.indicator');
    const total = items.length;

    if (total === 0) return;

    // Coverflow uses CSS transforms on individual items, no container transform needed

    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

        if (index === currentSlideIndex) {
            item.classList.add('active');
        } else if (index === (currentSlideIndex - 1 + total) % total) {
            item.classList.add('prev');
        } else if (index === (currentSlideIndex + 1) % total) {
            item.classList.add('next');
        } else if (index === (currentSlideIndex - 2 + total) % total) {
            item.classList.add('far-prev');
        } else if (index === (currentSlideIndex + 2) % total) {
            item.classList.add('far-next');
        }
    });

    indicators.forEach((ind, index) => {
        ind.classList.remove('active');
        if (index === currentSlideIndex) {
            ind.classList.add('active');
        }
    });
}

function navigateCarousel(direction) {
    const items = mapCarouselInner.querySelectorAll('.carousel-item');
    const totalSlides = items.length;

    if (totalSlides === 0) return;

    currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;

    updateCoverflowClasses();
    updateCarouselCounter(currentSlideIndex + 1, totalSlides);

    // Update caption
    const activeSlide = items[currentSlideIndex];
    if (activeSlide) {
        const img = activeSlide.querySelector('img');
        if (img) updateCarouselCaption(img.alt);
    }

    restartCarouselAutoplay();
}

function goToSlide(index) {
    const items = mapCarouselInner.querySelectorAll('.carousel-item');
    if (index < 0 || index >= items.length) return;

    currentSlideIndex = index;
    updateCoverflowClasses();
    updateCarouselCounter(currentSlideIndex + 1, items.length);

    // Update caption
    const activeSlide = items[currentSlideIndex];
    if (activeSlide) {
        const img = activeSlide.querySelector('img');
        if (img) updateCarouselCaption(img.alt);
    }

    restartCarouselAutoplay();
}

function updateCarouselCounter(current, total) {
    if (currentSlideNum) currentSlideNum.textContent = current;
    if (totalSlideNum) totalSlideNum.textContent = total;
}

function updateCarouselCaption(caption) {
    if (mapCaptionText) mapCaptionText.textContent = caption || '';
    if (mapCarouselCaption) mapCarouselCaption.style.display = caption ? 'flex' : 'none';
}

function startCarouselAutoplay() {
    stopCarouselAutoplay();
    const slidesCount = mapCarouselInner.querySelectorAll('.carousel-item').length;

    if (slidesCount > 1) {
        carouselIntervals.autoplay = setInterval(() => {
            navigateCarousel(1);
        }, 4000);
    }
}

function stopCarouselAutoplay() {
    if (carouselIntervals.autoplay) {
        clearInterval(carouselIntervals.autoplay);
        carouselIntervals.autoplay = null;
    }
}

function restartCarouselAutoplay() {
    stopCarouselAutoplay();
    startCarouselAutoplay();
}

function setupCarouselTouch() {
    let touchStartX = 0;
    let touchEndX = 0;

    if (mapCarousel) {
        mapCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        mapCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        mapCarousel.addEventListener('mouseenter', stopCarouselAutoplay);
        mapCarousel.addEventListener('mouseleave', () => {
            // Determine if we should restart (if multiple slides)
            const items = mapCarouselInner.querySelectorAll('.carousel-item');
            if (items.length > 1) startCarouselAutoplay(items); // naive passing of items list as true-ish
        });
    }

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                navigateCarousel(1);
            } else {
                navigateCarousel(-1);
            }
        }
    }
}

// ========================================
// Tooltip Functions (Unchanged)
// ========================================
let tooltip = null;

function showTooltip(e, text) {
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'building-tooltip';
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = text;
    tooltip.style.display = 'block';
    moveTooltip(e);
}

function moveTooltip(e) {
    if (tooltip) {
        const rect = mapOverlay.getBoundingClientRect();
        tooltip.style.left = e.clientX + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    }
}

function hideTooltip() {
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// ========================================
// Edit Mode Functions (Unchanged)
// ========================================
function toggleEditMode() {
    isEditMode = !isEditMode;
    toggleEditModeBtn.classList.toggle('active', isEditMode);
    editPanel.classList.toggle('active', isEditMode);

    if (!isEditMode) {
        deselectAllTools();
        deleteShapeBtn.disabled = true;
    }
}

function selectTool(shape) {
    if (currentDrawingTool === shape) {
        deselectAllTools();
        return;
    }

    deselectAllTools();
    currentDrawingTool = shape;

    const btn = document.querySelector(`.tool-btn[data-shape="${shape}"]`);
    if (btn) {
        btn.classList.add('active');
    }

    mapOverlay.style.cursor = 'crosshair';
}

function deselectAllTools() {
    currentDrawingTool = null;
    toolButtons.forEach(btn => btn.classList.remove('active'));
    mapOverlay.style.cursor = '';

    // Cancel any ongoing drawing
    if (isDrawing) {
        cancelDrawing();
    }
}

function handleMapClick(e) {
    if (!isEditMode || !currentDrawingTool) return;

    const point = getSVGPoint(e);

    switch (currentDrawingTool) {
        case 'rect':
            if (!isDrawing) {
                startRectDrawing(point);
            }
            break;

        case 'circle':
            if (!isDrawing) {
                startCircleDrawing(point);
            }
            break;

        case 'polygon':
            if (!isDrawing) {
                startPolygonDrawing(point);
            } else {
                addPolygonPoint(point);
            }
            break;
    }
}

function handleMapMouseMove(e) {
    if (!isDrawing || !tempShape) return;

    const point = getSVGPoint(e);

    switch (currentDrawingTool) {
        case 'rect':
            updateRectDrawing(point);
            break;

        case 'circle':
            updateCircleDrawing(point);
            break;

        case 'polygon':
            updatePolygonDrawing(point);
            break;
    }
}

function getSVGPoint(e) {
    const rect = mapOverlay.getBoundingClientRect();
    const viewBox = mapOverlay.viewBox.baseVal;

    return {
        x: ((e.clientX - rect.left) / rect.width) * viewBox.width,
        y: ((e.clientY - rect.top) / rect.height) * viewBox.height
    };
}

function startRectDrawing(point) {
    isDrawing = true;
    drawingPoints = [point];

    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tempShape.setAttribute('x', point.x);
    tempShape.setAttribute('y', point.y);
    tempShape.setAttribute('width', 0);
    tempShape.setAttribute('height', 0);
    tempShape.setAttribute('fill', 'rgba(59, 130, 246, 0.3)');
    tempShape.setAttribute('stroke', '#3b82f6');
    tempShape.setAttribute('stroke-width', '2');
    tempShape.setAttribute('stroke-dasharray', '5,5');

    mapOverlay.appendChild(tempShape);

    // Add mouse up listener
    document.addEventListener('mouseup', finishRectDrawing, { once: true });
}

function updateRectDrawing(point) {
    const start = drawingPoints[0];
    const width = point.x - start.x;
    const height = point.y - start.y;

    tempShape.setAttribute('x', width >= 0 ? start.x : point.x);
    tempShape.setAttribute('y', height >= 0 ? start.y : point.y);
    tempShape.setAttribute('width', Math.abs(width));
    tempShape.setAttribute('height', Math.abs(height));
}

function finishRectDrawing(e) {
    if (!isDrawing || currentDrawingTool !== 'rect') return;

    const point = getSVGPoint(e);
    const start = drawingPoints[0];

    const x = Math.min(start.x, point.x);
    const y = Math.min(start.y, point.y);
    const width = Math.abs(point.x - start.x);
    const height = Math.abs(point.y - start.y);

    if (width > 10 && height > 10) {
        const newBuilding = {
            id: 'building-new-' + Date.now(),
            name: 'Yeni Bina',
            description: 'Təsvir əlavə edin',
            image: 'static/images/default.jpg',
            coordinates: { type: 'rect', x, y, width, height },
            galleries: [{ url: 'static/images/default.jpg', caption: '' }]
        };

        buildings.push(newBuilding);
        renderBuildings();
        renderLegend();
        showToast('Yeni bina əlavə edildi');
    }

    cancelDrawing();
}

function startCircleDrawing(point) {
    isDrawing = true;
    drawingPoints = [point];

    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    tempShape.setAttribute('cx', point.x);
    tempShape.setAttribute('cy', point.y);
    tempShape.setAttribute('r', 0);
    tempShape.setAttribute('fill', 'rgba(59, 130, 246, 0.3)');
    tempShape.setAttribute('stroke', '#3b82f6');
    tempShape.setAttribute('stroke-width', '2');
    tempShape.setAttribute('stroke-dasharray', '5,5');

    mapOverlay.appendChild(tempShape);

    document.addEventListener('mouseup', finishCircleDrawing, { once: true });
}

function updateCircleDrawing(point) {
    const center = drawingPoints[0];
    const r = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
    tempShape.setAttribute('r', r);
}

function finishCircleDrawing(e) {
    if (!isDrawing || currentDrawingTool !== 'circle') return;

    const point = getSVGPoint(e);
    const center = drawingPoints[0];
    const r = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));

    if (r > 5) {
        const newBuilding = {
            id: 'building-new-' + Date.now(),
            name: 'Yeni Bina',
            description: 'Təsvir əlavə edin',
            image: 'static/images/default.jpg',
            coordinates: { type: 'circle', cx: center.x, cy: center.y, r },
            galleries: [{ url: 'static/images/default.jpg', caption: '' }]
        };

        buildings.push(newBuilding);
        renderBuildings();
        renderLegend();
        showToast('Yeni bina əlavə edildi');
    }

    cancelDrawing();
}

function startPolygonDrawing(point) {
    isDrawing = true;
    drawingPoints = [point];

    tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    tempShape.setAttribute('points', `${point.x},${point.y}`);
    tempShape.setAttribute('fill', 'rgba(59, 130, 246, 0.3)');
    tempShape.setAttribute('stroke', '#3b82f6');
    tempShape.setAttribute('stroke-width', '2');
    tempShape.setAttribute('stroke-dasharray', '5,5');

    mapOverlay.appendChild(tempShape);
}

function addPolygonPoint(point) {
    drawingPoints.push(point);
    updatePolygonPoints();
}

function updatePolygonDrawing(point) {
    const points = [...drawingPoints, point];
    tempShape.setAttribute('points', points.map(p => `${p.x},${p.y}`).join(' '));
}

function updatePolygonPoints() {
    tempShape.setAttribute('points', drawingPoints.map(p => `${p.x},${p.y}`).join(' '));
}

function finishPolygonDrawing() {
    if (!isDrawing || currentDrawingTool !== 'polygon') return;

    if (drawingPoints.length >= 3) {
        const newBuilding = {
            id: 'building-new-' + Date.now(),
            name: 'Yeni Bina',
            description: 'Təsvir əlavə edin',
            image: 'static/images/default.jpg',
            coordinates: {
                type: 'polygon',
                points: drawingPoints.map(p => `${p.x},${p.y}`).join(' ')
            },
            galleries: [{ url: 'static/images/default.jpg', caption: '' }]
        };

        buildings.push(newBuilding);
        renderBuildings();
        renderLegend();
        showToast('Yeni bina əlavə edildi');
    }

    cancelDrawing();
}

function cancelDrawing() {
    isDrawing = false;
    drawingPoints = [];

    if (tempShape) {
        tempShape.remove();
        tempShape = null;
    }
}

function deleteSelectedShape() {
    if (!selectedBuilding) return;

    const index = buildings.findIndex(b => b.id === selectedBuilding.id);
    if (index > -1) {
        buildings.splice(index, 1);
        selectedBuilding = null;
        renderBuildings();
        renderLegend();
        deleteShapeBtn.disabled = true;
        showToast('Bina silindi');
    }
}

// ========================================
// Edit Building Modal
// ========================================
function openEditBuildingModal() {
    if (!selectedBuilding) return;

    editBuildingName.value = selectedBuilding.name;
    editBuildingDescription.value = selectedBuilding.description || '';
    editBuildingImage.value = selectedBuilding.image || '';

    closeModal();
    editModalOverlay.classList.add('active');
}

function closeEditBuildingModal() {
    editModalOverlay.classList.remove('active');
}

function saveEditedBuilding() {
    if (!selectedBuilding) return;

    const building = buildings.find(b => b.id === selectedBuilding.id);
    if (building) {
        building.name = editBuildingName.value || 'Adsız Bina';
        building.description = editBuildingDescription.value;
        building.image = editBuildingImage.value || 'static/images/default.jpg';

        if (building.galleries && building.galleries.length > 0) {
            building.galleries[0].url = building.image;
        } else if (building.galleries.length === 0) {
            building.galleries = [{ url: building.image, caption: building.name }];
        }

        renderBuildings();
        renderLegend();
        closeEditBuildingModal();
        showToast('Bina məlumatları yeniləndi');
    }
}

// ========================================
// Export/Import Functions
// ========================================
function exportToJson() {
    const dataStr = JSON.stringify(buildings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'campus-map-buildings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('JSON faylı yükləndi');
}

function importFromJson(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);
            if (Array.isArray(importedData)) {
                buildings = importedData;
                saveBuildings();
                renderBuildings();
                renderLegend();
                showToast('Məlumatlar idxal edildi');
            } else {
                showToast('Yanlış fayl formatı', true);
            }
        } catch (error) {
            showToast('Fayl oxuna bilmədi', true);
        }
    };
    reader.readAsText(file);

    // Reset file input
    e.target.value = '';
}

function exportAsDefaultOverlay() {
    // Generate current date for version
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const newVersion = `${dateStr}-v1`;

    // Create JavaScript code that can be directly pasted into campus-map.js
    let jsCode = `// ========================================\n`;
    jsCode += `// DEFAULT BUILDINGS DATA - MAIN OVERLAY\n`;
    jsCode += `// Generated: ${new Date().toLocaleString('az-AZ')}\n`;
    jsCode += `// ========================================\n\n`;
    jsCode += `const DATA_VERSION = '${newVersion}';\n\n`;
    jsCode += `const defaultBuildingsData = ${JSON.stringify(buildings, null, 4)};\n`;

    // Download as JavaScript file
    const dataBlob = new Blob([jsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'default-buildings-data.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Əsas overlay kodu yaradıldı! Bu kodu campus-map.js faylına yapışdırın.');
}

// ========================================
// Utility Functions
// ========================================
function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toast.querySelector('i').className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    toast.querySelector('i').style.color = isError ? '#e53e3e' : '#48bb78';
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function handleKeydown(e) {
    if (e.key === 'Escape') {
        if (mapModalOverlay.classList.contains('active')) {
            closeModal();
        } else if (editModalOverlay.classList.contains('active')) {
            closeEditBuildingModal();
        } else if (isDrawing) {
            cancelDrawing();
        } else if (isEditMode) {
            toggleEditMode();
        }
    }

    // Delete with Delete or Backspace key
    if ((e.key === 'Delete' || e.key === 'Backspace') && isEditMode && selectedBuilding) {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            deleteSelectedShape();
        }
    }
}

// ========================================
// Xarı Bülbül Video Handler
// ========================================
const xariBulbulData = {
    id: 'xari-bulbul',
    name: 'Xarı Bülbül',
    description: 'Xarı Bülbül - Azərbaycanın rəmzi sayılan nadir çiçəkdir. Bu heykəl Bakı Dövlət Universitetinin kampusunda yerləşir və milli dəyərlərimizi simvolizə edir.',
    image: 'static/images/xari-bulbul/1.webp',
    galleries: [
        { url: 'static/images/xari-bulbul/1.webp', caption: 'Xarı Bülbül heykəli' }
    ]
};

const abideData = {
    id: 'abide',
    name: 'Abidə',
    description: 'BDU kampusunda yerləşən abidə universiteti tarixi və mədəni dəyərlərini təmsil edir.',
    image: 'static/images/default.jpg',
    galleries: [
        { url: 'static/images/default.jpg', caption: 'Abidə' }
    ]
};

function setupXariBulbulVideo() {
    const video = document.querySelector('.xari-bulbul-video');
    if (video) {
        video.addEventListener('click', () => {
            selectedBuilding = xariBulbulData;
            openModal(xariBulbulData);
        });
    }
}

function setupAbideVideo() {
    const video = document.querySelector('.abide-video');
    if (video) {
        video.addEventListener('click', () => {
            selectedBuilding = abideData;
            openModal(abideData);
        });
    }
}

// ========================================
// Initialize App
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupXariBulbulVideo();
    setupAbideVideo();
});

