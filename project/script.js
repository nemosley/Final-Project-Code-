// Class Art Gallery - Interactive artwork viewer with search and filters

let artworks = [];
let filteredArtworks = [];

const galleryDiv   = document.getElementById('gallery');
const statusText   = document.getElementById('statusText');
const filterForm   = document.getElementById('filterForm');
const searchInput  = document.getElementById('searchInput');
const styleSelect  = document.getElementById('styleSelect');
const showAllBtn   = document.getElementById('showAllBtn');
const randomBtn    = document.getElementById('randomBtn');
const detailsBox   = document.getElementById('detailsBox');

// Load artworks.json (fetch + async/await)
async function loadArtworks() {
    try {
        statusText.textContent = 'Loading artworks...';
        const res = await fetch('artworks.json');
        artworks = await res.json();
        filteredArtworks = artworks.slice();
        renderGallery(filteredArtworks);
        statusText.textContent = 'Gallery loaded. Use search and filters.';
    } catch (e) {
        console.error(e);
        statusText.textContent = 'Error loading artworks.';
    }
}

// Build gallery cards from a list
function renderGallery(list) {
    galleryDiv.innerHTML = '';

    if (!list.length) {
        galleryDiv.innerHTML = '<p>No artworks match your search.</p>';
        return;
    }

    list.forEach(art => {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.dataset.id = art.id;

        card.innerHTML = `
            <div class="art-preview" style="background:${art.color}"></div>
            <p class="art-title">${art.title}</p>
            <p class="art-meta">${art.artist} · ${art.year}</p>
            <p class="art-mood">Mood: ${art.mood} | Style: ${art.style}</p>
        `;

        card.addEventListener('click', () => {
            showDetails(art);
            changeBackgroundByMood(art.mood);
        });

        galleryDiv.appendChild(card);
    });
}

// Search + style filters
function applyFilters() {
    const text  = searchInput.value.toLowerCase();
    const style = styleSelect.value;

    filteredArtworks = artworks.filter(art => {
        const t = (art.title + art.artist + art.mood + art.style).toLowerCase();
        const matchesText  = !text || t.includes(text);
        const matchesStyle = style === 'all' || art.style.toLowerCase() === style;
        return matchesText && matchesStyle;
    });

    renderGallery(filteredArtworks);
    statusText.textContent = filteredArtworks.length
        ? `Showing ${filteredArtworks.length} artwork(s).`
        : 'No artworks found.';
}

// Reset filters and show all
function showAllArtworks() {
    searchInput.value = '';
    styleSelect.value = 'all';
    filteredArtworks  = artworks.slice();
    renderGallery(filteredArtworks);
    statusText.textContent = `Showing all ${filteredArtworks.length} artworks.`;
}

// Pick and highlight a random artwork
function randomHighlight() {
    if (!filteredArtworks.length) {
        statusText.textContent = 'No artworks to highlight.';
        return;
    }

    document.querySelectorAll('.art-card')
        .forEach(c => c.classList.remove('highlight'));

    const art  = filteredArtworks[Math.floor(Math.random() * filteredArtworks.length)];
    const card = [...document.querySelectorAll('.art-card')]
        .find(c => Number(c.dataset.id) === art.id);

    if (card) {
        card.classList.add('highlight');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showDetails(art);
    changeBackgroundByMood(art.mood);
    statusText.textContent = `Random highlight: ${art.title} (${art.mood}).`;
}

// Show details in the details box
function showDetails(art) {
    detailsBox.innerHTML = `
        <p><strong>Title:</strong> ${art.title}</p>
        <p><strong>Artist:</strong> ${art.artist}</p>
        <p><strong>Mood:</strong> ${art.mood}</p>
        <p><strong>Style:</strong> ${art.style}</p>
        <p><strong>Year:</strong> ${art.year}</p>
        <p><strong>Description:</strong> ${art.description}</p>
    `;
}

// Change page background based on mood
function changeBackgroundByMood(mood) {
    document.body.classList.remove(
        'mood-calm', 'mood-energetic', 'mood-peaceful', 'mood-moody'
    );
    document.body.classList.add(`mood-${mood.toLowerCase()}`);
}

// Set up all events
function setupEvents() {
    filterForm.addEventListener('submit', e => {
        e.preventDefault();
        applyFilters();
    });

    showAllBtn.addEventListener('click', showAllArtworks);
    randomBtn.addEventListener('click', randomHighlight);

    searchInput.addEventListener('input', () => {
        if (!searchInput.value.trim()) {
            statusText.textContent = 'Type a word or choose a style and click Apply.';
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'r') randomHighlight();
    });
}

// Start when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    setupEvents();
    loadArtworks();
});
