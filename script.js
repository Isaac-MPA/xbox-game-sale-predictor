// Mock Game Data
const mockGames = [
    {
        id: 1,
        title: "Starfield",
        emoji: "🚀",
        currentPrice: 69.99,
        originalPrice: 69.99,
        genre: "RPG",
        onSale: false,
        discount: 0,
        imageColor: "#107c10"
    },
    {
        id: 2,
        title: "Forza Motorsport",
        emoji: "🏎️",
        currentPrice: 34.99,
        originalPrice: 59.99,
        genre: "Racing",
        onSale: true,
        discount: 42,
        imageColor: "#005a9e"
    },
    {
        id: 3,
        title: "Halo Infinite",
        emoji: "🎯",
        currentPrice: 39.99,
        originalPrice: 59.99,
        genre: "FPS",
        onSale: true,
        discount: 33,
        imageColor: "#107c10"
    },
    {
        id: 4,
        title: "Baldur's Gate 3",
        emoji: "⚔️",
        currentPrice: 49.99,
        originalPrice: 59.99,
        genre: "RPG",
        onSale: true,
        discount: 17,
        imageColor: "#8B0000"
    },
    {
        id: 5,
        title: "Minecraft",
        emoji: "⛏️",
        currentPrice: 19.99,
        originalPrice: 19.99,
        genre: "Sandbox",
        onSale: false,
        discount: 0,
        imageColor: "#228B22"
    },
    {
        id: 6,
        title: "Sea of Thieves",
        emoji: "🏴‍☠️",
        currentPrice: 24.99,
        originalPrice: 39.99,
        genre: "Adventure",
        onSale: true,
        discount: 37,
        imageColor: "#4169E1"
    },
    {
        id: 7,
        title: "Fallout 76",
        emoji: "☢️",
        currentPrice: 29.99,
        originalPrice: 59.99,
        genre: "RPG",
        onSale: true,
        discount: 50,
        imageColor: "#FFD700"
    },
    {
        id: 8,
        title: "The Outer Worlds",
        emoji: "🌌",
        currentPrice: 19.99,
        originalPrice: 59.99,
        genre: "RPG",
        onSale: true,
        discount: 67,
        imageColor: "#DA70D6"
    }
];

// Mock Predictions Data
const mockPredictions = [
    {
        gameId: 1,
        title: "Starfield",
        nextSaleDate: "June 15, 2026",
        estimatedDiscount: 15,
        confidence: 72
    },
    {
        gameId: 3,
        title: "Halo Infinite",
        nextSaleDate: "June 20, 2026",
        estimatedDiscount: 25,
        confidence: 85
    },
    {
        gameId: 4,
        title: "Baldur's Gate 3",
        nextSaleDate: "June 25, 2026",
        estimatedDiscount: 20,
        confidence: 68
    },
    {
        gameId: 5,
        title: "Minecraft",
        nextSaleDate: "July 4, 2026",
        estimatedDiscount: 10,
        confidence: 45
    },
    {
        gameId: 2,
        title: "Forza Motorsport",
        nextSaleDate: "July 10, 2026",
        estimatedDiscount: 30,
        confidence: 78
    },
    {
        gameId: 6,
        title: "Sea of Thieves",
        nextSaleDate: "July 15, 2026",
        estimatedDiscount: 20,
        confidence: 65
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const gamesList = document.getElementById('gamesList');
const predictionsList = document.getElementById('predictionsList');
const gameModal = document.getElementById('gameModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    displayGames(mockGames);
    displayPredictions(mockPredictions);
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchResults.classList.remove('active');
        }, 200);
    });
    closeBtn.addEventListener('click', closeModal);
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) closeModal();
    });
}

// Search Handler
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length === 0) {
        searchResults.classList.remove('active');
        return;
    }

    const filtered = mockGames.filter(game =>
        game.title.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = '<div style="padding: 12px 20px; color: #999;">No games found</div>';
    } else {
        searchResults.innerHTML = filtered.map(game => `
            <div class="search-result-item" onclick="openGameDetail(${game.id})">
                <strong>${game.title}</strong>
                <br>
                <small>${game.genre} • $${game.currentPrice}</small>
            </div>
        `).join('');
    }

    searchResults.classList.add('active');
}

// Display Games
function displayGames(games) {
    gamesList.innerHTML = games.map(game => `
        <div class="game-card" onclick="openGameDetail(${game.id})">
            <div class="game-card-image" style="background: linear-gradient(135deg, ${game.imageColor}, ${adjustColorBrightness(game.imageColor, -30)});">
                ${game.emoji}
            </div>
            <div class="game-card-content">
                <div class="game-title">${game.title}</div>
                <div class="game-info">${game.genre}</div>
                <div class="game-price">$${game.currentPrice}</div>
                <span class="game-discount ${game.onSale ? '' : 'no-sale'}">
                    ${game.onSale ? `${game.discount}% OFF` : 'Full Price'}
                </span>
            </div>
        </div>
    `).join('');
}

// Display Predictions
function displayPredictions(predictions) {
    predictionsList.innerHTML = predictions.map(pred => `
        <div class="prediction-card">
            <div class="prediction-game">${pred.title}</div>
            <div class="prediction-date">📅 ${pred.nextSaleDate}</div>
            <div class="prediction-discount">~${pred.estimatedDiscount}% off</div>
            <div class="confidence">
                Confidence: ${pred.confidence}%
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${pred.confidence}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

// Open Game Detail Modal
function openGameDetail(gameId) {
    const game = mockGames.find(g => g.id === gameId);
    if (!game) return;

    const prediction = mockPredictions.find(p => p.gameId === gameId);

    modalTitle.textContent = `${game.emoji} ${game.title}`;
    
    let modalHTML = `
        <div class="modal-section">
            <h3>Current Price</h3>
            <div style="font-size: 1.8em; color: #107c10; font-weight: 700;">
                $${game.currentPrice}
                ${game.onSale ? `<span style="color: #ffb900; font-size: 0.8em;"> (-${game.discount}%)</span>` : ''}
            </div>
            ${game.originalPrice !== game.currentPrice ? `
                <div style="color: #999; text-decoration: line-through;">Original: $${game.originalPrice}</div>
            ` : ''}
        </div>

        <div class="modal-section">
            <h3>Game Details</h3>
            <p><strong>Genre:</strong> ${game.genre}</p>
            <p><strong>Status:</strong> ${game.onSale ? '✅ On Sale' : '⏳ Full Price'}</p>
        </div>
    `;

    if (prediction) {
        modalHTML += `
            <div class="modal-section">
                <h3>Sale Prediction</h3>
                <p><strong>Next Sale:</strong> ${prediction.nextSaleDate}</p>
                <p><strong>Estimated Discount:</strong> ~${prediction.estimatedDiscount}%</p>
                <p><strong>Confidence:</strong> ${prediction.confidence}%</p>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${prediction.confidence}%"></div>
                </div>
            </div>
        `;
    }

    modalHTML += `
        <div class="modal-section">
            <h3>About</h3>
            <p>This is an Xbox game from the Game Pass and Xbox Store. Check back soon for price updates!</p>
        </div>
    `;

    modalBody.innerHTML = modalHTML;
    gameModal.classList.add('active');
}

// Close Modal
function closeModal() {
    gameModal.classList.remove('active');
}

// Utility: Adjust color brightness
function adjustColorBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
