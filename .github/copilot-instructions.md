# BDU Kiosk Application - AI Coding Agent Instructions

## Project Overview
Interactive information kiosk system for Baku State University (BDU), designed for touchscreen displays. Single-page application with multiple views showcasing university history, facilities, achievements, and campus features. Content is in Azerbaijani (az) language.

## Architecture & Tech Stack
- **Pure Vanilla Stack**: No frameworks - HTML5, CSS3, vanilla JavaScript only
- **File Structure**: Single-page architecture with view-based navigation
  - `index.html` - Main entry point containing all pages/views as hidden divs
  - `campus-map.html` - Separate interactive campus map application
  - `css/style.css` - Main styles (~22KB)
  - `js/main.js` - Core application logic with page navigation and kiosk features
  - `static/campus-map.{js,css}` - Campus map specific implementation

## Critical Design Patterns

### 1. Page Navigation System
All pages exist in single HTML file as `.page` divs with `active` class toggling:
```javascript
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}
```
**Always use `showPage()` for navigation** - never create separate HTML files for new pages.

### 2. Kiosk-Specific Behaviors
Auto-return to main page after 3 minutes inactivity:
```javascript
app.autoReturnDelay = 180000; // DO NOT change without explicit request
```
- Context menu disabled via `contextmenu` event prevention
- Double-tap zoom prevention on touch devices
- ESC and Backspace keys return to main page

### 3. Carousel Implementation
Multi-page carousel system with shared functionality:
- Auto-play every 4-5 seconds
- Touch/swipe support via `touchstart`/`touchend` events
- Keyboard navigation (arrow keys)
- Located in multiple pages (Eco, History, TETYM, etc.)
- **Pattern**: Each carousel must call `initializeCarousel()` on page show

### 4. Interactive Campus Map
Separate SVG-based application (`campus-map.html`):
- Building data stored in `defaultBuildingsData` array
- LocalStorage with version control (`DATA_VERSION = '2026-01-13-v1'`)
- Edit mode for adding/modifying building shapes (rect, circle, polygon)
- Building modal with image carousel for each location
- **Version bumping**: Increment `DATA_VERSION` to force data refresh

## Color Scheme (CSS Custom Properties)
```css
--primary-blue: #1a3a5c      /* BDU corporate color */
--accent-gold: #d4af37       /* Academic excellence */
--success-green: #48bb78     /* Actions */
--danger-red: #e53e3e        /* Destructive actions */
```
**Use CSS variables** - never hardcode colors.

## Content Guidelines
- **Language**: All user-facing text in Azerbaijani
- **Typography**: Inter font (via Google Fonts), 16-18px base
- **Icons**: FontAwesome 6.x - use semantic icons (`fa-landmark`, `fa-trophy`, etc.)
- **Images**: Path convention `images/{category}/{filename}` (e.g., `images/eco/`, `images/tetym/`)

## Key Workflows

### Adding New Page
1. Add `<div id="new-page" class="page">` inside `<body>` in index.html
2. Add navigation button with `onclick="showPage('new-page')"`
3. Include page header with back button: `<button onclick="showPage('main-page')">← Ana Səhifə</button>`
4. Style using existing patterns (`.page-header`, `.page-content`)

### Adding New Carousel
1. Create HTML structure with `.carousel-slides` and `.carousel-dots`
2. Initialize on page show: modify `showPage()` to call `initializeCarousel()` for that page
3. Use existing touch/keyboard handlers - they work page-contextually via `app.currentPage`

### Modifying Campus Map Buildings
1. Open campus map in browser
2. Click edit button (top-right)
3. Use shape tools or edit building data modal
4. Export JSON or save to localStorage
5. **For permanent changes**: Update `defaultBuildingsData` in `static/campus-map.js` and bump `DATA_VERSION`

## Build & Deployment
- **No build process** - static files served directly
- **Testing**: Open `index.html` in browser (Chrome/Edge recommended)
- **Deployment**: Upload entire directory to web server
- **Performance**: Total size ~3.6MB (mostly images)

## Common Pitfalls
❌ Creating separate HTML files for pages - use in-page divs with `showPage()`  
❌ Using external libraries - keep vanilla JS only  
❌ Hardcoding colors - use CSS custom properties  
❌ Breaking auto-return timer - preserve `resetAutoReturnTimer()` calls  
❌ Forgetting `DATA_VERSION` bump - campus map won't refresh  

## Animation Conventions
- Page transitions: `fadeIn` / `fadeInUp` (0.3-0.5s)
- Hover effects: `translateY(-2px)` with `box-shadow` increase
- Counters: Animated from 0 to target using `requestAnimationFrame`
- Touch ripple: Temporary span with `ripple-effect` class (600ms duration)

## Accessibility & UX
- Large touch targets (45x45px minimum)
- High contrast text (WCAG AA)
- Keyboard navigation fully supported
- ARIA labels on interactive elements
- Smooth scroll behavior: `scroll-behavior: smooth` on scroll containers

## Video Elements
Two embedded videos in campus map:
- `.xari-bulbul-video` - Positioned at 63% top, 1.8% right
- `.abide-video` - Positioned at 35% top, 4.09% right (currently commented out)
**Click handler**: Opens modal with building information

## State Management
Global `app` object in main.js:
```javascript
app = {
    currentPage: 'main-page',
    previousPage: null,
    autoReturnTimeout: null
}
```
**Do not replace** - extend if needed.

## File Naming Conventions
- HTML: kebab-case (`campus-map.html`, `fakulteler.html`)
- CSS: kebab-case (`style.css`, `campus-map.css`)
- JS: camelCase for variables/functions, kebab-case for files
- Images: lowercase with hyphens (`eco-park.jpg`, `robotics-lab.jpg`)
- Directories: lowercase (`images/`, `static/`, `css/`)

## Testing Checklist
Before committing changes:
- [ ] All pages navigate correctly via `showPage()`
- [ ] Auto-return to main page works (wait 3min or test programmatically)
- [ ] Carousels auto-play and respond to touch/keyboard
- [ ] No console errors on page load
- [ ] Images load (check network tab)
- [ ] Campus map edit mode saves correctly
- [ ] Responsive layout works (test mobile viewport)
