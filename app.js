// Global state
const state = {
    currentPage: 'home',
    currentUser: {
        id: 'user_123',
        username: 'jc4651338',
        displayName: 'jc4651338',
        verified: true,
        avatar: 'J',
        followers: 15420,
        following: 342,
        gameCopies: 2450000,
        createdGames: 8
    },
    games: [
        {
            id: 1,
            name: 'Obby: Tower of Dreams',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '🏗️',
            plays: 1200000,
            favorites: 45000,
            rating: 4.7,
            description: 'An epic obstacle course game with 50+ levels of challenging gameplay. Race against other players and climb to the top of the tower!',
            thumbnail: '🏗️'
        },
        {
            id: 2,
            name: 'Tycoon Simulator',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '💼',
            plays: 980000,
            favorites: 38000,
            rating: 4.5,
            description: 'Start from nothing and build your empire. Manage resources, hire employees, and dominate the market!',
            thumbnail: '💼'
        },
        {
            id: 3,
            name: 'Anime Fighter Royale',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '⚔️',
            plays: 2100000,
            favorites: 92000,
            rating: 4.8,
            description: 'Battle royale game with anime characters. 100 players drop in an ever-shrinking map. Collect weapons and be the last one standing!',
            thumbnail: '⚔️'
        },
        {
            id: 4,
            name: 'Murder Mystery Night',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '🔍',
            plays: 1450000,
            favorites: 56000,
            rating: 4.6,
            description: 'Who is the murderer? One player is the killer, the rest must find evidence and vote them out before time runs out!',
            thumbnail: '🔍'
        },
        {
            id: 5,
            name: 'Parkour Paradise',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '🤸',
            plays: 890000,
            favorites: 34000,
            rating: 4.4,
            description: 'Master advanced parkour movements and complete stunning levels across beautiful environments.',
            thumbnail: '🤸'
        },
        {
            id: 6,
            name: 'Dungeon Quest',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '⚔️',
            plays: 1650000,
            favorites: 67000,
            rating: 4.7,
            description: 'Explore dangerous dungeons, solve puzzles, defeat bosses, and find legendary treasures!',
            thumbnail: '⚔️'
        },
        {
            id: 7,
            name: 'Restaurant Tycoon',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '🍕',
            plays: 756000,
            favorites: 28000,
            rating: 4.3,
            description: 'Build and manage your own restaurant empire. Cook food, serve customers, and expand your business.',
            thumbnail: '🍕'
        },
        {
            id: 8,
            name: 'Sword Fighting Simulator',
            creator: 'jc4651338',
            creatorVerified: true,
            icon: '🗡️',
            plays: 1340000,
            favorites: 51000,
            rating: 4.6,
            description: 'Train your sword fighting skills and battle other players. Unlock new swords and abilities as you level up!',
            thumbnail: '🗡️'
        }
    ],
    currentGame: null,
    gameInProgress: false
};

// App initialization
function init() {
    renderPage();
}

// Render based on current page
function renderPage() {
    const app = document.getElementById('app');
    
    if (state.gameInProgress) {
        app.innerHTML = renderGameViewport();
        setupGameControls();
        return;
    }

    let content = renderNavbar();
    
    switch(state.currentPage) {
        case 'home':
            content += renderHomePage();
            break;
        case 'game':
            content += renderGameDetails();
            break;
        case 'profile':
            content += renderProfilePage();
            break;
        default:
            content += renderHomePage();
    }
    
    app.innerHTML = content;
    attachEventListeners();
}

// Navbar
function renderNavbar() {
    return `
        <nav class="navbar">
            <div class="logo">
                <span>🎮</span>
                <span>Roblox</span>
            </div>
            <ul class="nav-links">
                <li><a href="#" onclick="goToPage('home')">Home</a></li>
                <li><a href="#" onclick="goToPage('profile')">My Profile</a></li>
                <li><a href="#">Discover</a></li>
            </ul>
            <div class="user-profile">
                <div class="user-name">
                    <span>${state.currentUser.displayName}</span>
                    <span class="verified-badge">✓</span>
                </div>
                <div class="avatar" onclick="goToPage('profile')">J</div>
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
        </nav>
    `;
}

// Home Page
function renderHomePage() {
    return `
        <div class="home-container">
            <div class="hero">
                <h1>Experience Imagination</h1>
                <p>Play millions of games created by the community</p>
                <button class="btn btn-primary" onclick="document.querySelector('.games-grid').scrollIntoView({behavior: 'smooth'})">Explore Games</button>
            </div>

            <h2 class="section-title">🔥 Popular Games</h2>
            <div class="games-grid">
                ${state.games.map(game => renderGameCard(game)).join('')}
            </div>
        </div>
    `;
}

// Game Card
function renderGameCard(game) {
    return `
        <div class="game-card" onclick="playGame(${game.id})">
            <div class="game-thumbnail">${game.icon}</div>
            <div class="game-info">
                <div class="game-name">
                    ${game.name}
                    ${game.creatorVerified ? '<span class="creator-badge">Verified Creator</span>' : ''}
                </div>
                <div class="game-creator">By ${game.creator}</div>
                <div class="game-stats">
                    <div class="stat">
                        <span class="stat-number">${(game.plays / 1000000).toFixed(1)}M</span>
                        <span>Plays</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${(game.favorites / 1000).toFixed(0)}K</span>
                        <span>Favorites</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">⭐ ${game.rating}</span>
                        <span>Rating</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Game Details Page
function renderGameDetails() {
    const game = state.currentGame;
    if (!game) return '';

    return `
        <div class="game-details">
            <div class="game-header">
                <div class="game-banner">${game.icon}</div>
                <div class="game-title-section">
                    <div>
                        <h1>${game.name}</h1>
                        <div class="creator-info">
                            <div class="creator-avatar">J</div>
                            <div class="creator-details">
                                <h3>${game.creator} <span class="verified-badge">✓</span></h3>
                                <p>Creator</p>
                            </div>
                        </div>
                    </div>
                    <button class="play-btn" onclick="startGame(${game.id})">▶ PLAY NOW</button>
                </div>

                <div class="tabs">
                    <button class="tab active" onclick="switchTab(event, 'description')">Description</button>
                    <button class="tab" onclick="switchTab(event, 'reviews')">Reviews</button>
                </div>

                <div id="description" class="tab-content active">
                    <div class="description">
                        <p>${game.description}</p>
                        <p><strong>Game Stats:</strong></p>
                        <p>👥 ${game.plays.toLocaleString()} Plays</p>
                        <p>❤️ ${game.favorites.toLocaleString()} Favorites</p>
                        <p>⭐ ${game.rating} Stars</p>
                    </div>
                </div>

                <div id="reviews" class="tab-content">
                    <div class="reviews">
                        <div class="review">
                            <div class="review-header">
                                <span class="review-author">PlayerXD</span>
                                <span class="review-rating">⭐⭐⭐⭐⭐</span>
                            </div>
                            <p class="review-text">This game is absolutely amazing! So much fun and the creator is awesome. Highly recommend!</p>
                        </div>
                        <div class="review">
                            <div class="review-header">
                                <span class="review-author">GamerGirl123</span>
                                <span class="review-rating">⭐⭐⭐⭐</span>
                            </div>
                            <p class="review-text">Really enjoyed this. Would love to see more levels added soon!</p>
                        </div>
                        <div class="review">
                            <div class="review-header">
                                <span class="review-author">CoolKid99</span>
                                <span class="review-rating">⭐⭐⭐⭐⭐</span>
                            </div>
                            <p class="review-text">Best game ever made! I've been playing for hours. The creator really knows what they're doing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Profile Page
function renderProfilePage() {
    return `
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-avatar">J</div>
                <div class="profile-info">
                    <h1>
                        ${state.currentUser.displayName}
                        <span class="verified-badge">✓</span>
                    </h1>
                    <p><strong>Verified Creator</strong></p>
                    <p>Welcome to my Roblox profile! I create amazing games for the community.</p>
                    <div class="profile-stats">
                        <div class="stat-box">
                            <div class="stat-box-number">${state.currentUser.followers.toLocaleString()}</div>
                            <div class="stat-box-label">FOLLOWERS</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-number">${state.currentUser.following.toLocaleString()}</div>
                            <div class="stat-box-label">FOLLOWING</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-number">${(state.currentUser.gameCopies / 1000000).toFixed(1)}M</div>
                            <div class="stat-box-label">GAME COPIES</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="my-games">
                <h2>My Created Games (${state.currentUser.createdGames})</h2>
                <div class="games-grid" style="margin-top: 20px;">
                    ${state.games.map(game => renderGameCard(game)).join('')}
                </div>
                <button class="create-game-btn" onclick="openCreateGameModal()">+ Create New Game</button>
            </div>
        </div>
    `;
}

// Game Viewport (Playing the game)
function renderGameViewport() {
    const game = state.currentGame;
    return `
        <div class="game-viewport">
            <div class="game-container">
                <div class="game-canvas" id="gameCanvas">
                    <button class="close-game-btn" onclick="exitGame()">← Exit Game</button>
                    <div class="player-character" id="player">J</div>
                    <div class="game-hud">
                        <div class="hud-stat">👤 Player: ${state.currentUser.displayName}</div>
                        <div class="hud-stat">🎮 Game: ${game.name}</div>
                        <div class="hud-stat">⏱️ Time: <span id="gameTime">0:00</span></div>
                        <div class="hud-stat">⭐ Score: <span id="gameScore">0</span></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Navigation
function goToPage(page) {
    state.currentPage = page;
    renderPage();
}

// Game Functions
function playGame(gameId) {
    const game = state.games.find(g => g.id === gameId);
    if (game) {
        state.currentGame = game;
        state.currentPage = 'game';
        renderPage();
    }
}

function startGame(gameId) {
    const game = state.games.find(g => g.id === gameId);
    if (game) {
        state.currentGame = game;
        state.gameInProgress = true;
        renderPage();
    }
}

function exitGame() {
    state.gameInProgress = false;
    state.currentGame = null;
    state.currentPage = 'home';
    renderPage();
}

// Logout Function
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Game Controls
function setupGameControls() {
    const canvas = document.getElementById('gameCanvas');
    const player = document.getElementById('player');
    let playerX = 50;
    let playerY = 50;
    let score = 0;
    let gameTime = 0;

    // Update HUD
    const gameTimeInterval = setInterval(() => {
        gameTime++;
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;
        document.getElementById('gameTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);

    // Keyboard controls
    const keys = {};
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        updatePlayerPosition();
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    function updatePlayerPosition() {
        const step = 5;
        if (keys['ArrowUp'] || keys['w'] || keys['W']) playerY = Math.max(0, playerY - step);
        if (keys['ArrowDown'] || keys['s'] || keys['S']) playerY = Math.min(canvas.clientHeight - 60, playerY + step);
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) playerX = Math.max(0, playerX - step);
        if (keys['ArrowRight'] || keys['d'] || keys['D']) playerX = Math.min(canvas.clientWidth - 40, playerX + step);
        
        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';
        
        // Random score increase
        if (Math.random() > 0.98) {
            score += 10;
            document.getElementById('gameScore').textContent = score;
        }
    }

    // Cleanup on exit
    window.gameCleanup = () => {
        clearInterval(gameTimeInterval);
        window.removeEventListener('keydown', null);
        window.removeEventListener('keyup', null);
    };
}

// Tab switching
function switchTab(event, tabName) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Modal
function openCreateGameModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                Create New Game
                <button class="close-modal" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <form onsubmit="handleCreateGame(event)">
                <div class="form-group">
                    <label>Game Name</label>
                    <input type="text" placeholder="Enter game name" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe your game" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="this.closest('.modal').remove()">Cancel</button>
                    <button type="submit" class="btn-submit">Create Game</button>
                </div>
            </form>
        </div>
    `;
    document.getElementById('app').appendChild(modal);
}

function handleCreateGame(event) {
    event.preventDefault();
    alert('Game creation feature coming soon! This would save your game to the platform.');
    event.target.closest('.modal').remove();
}

// Event listeners
function attachEventListeners() {
    // Already attached through inline events
}

// Initialize app
init();