// ==========================================
// 🔥 CENTRAL FIREBASE MATRIX CONFIGURATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyCXEiDTxnKRPd1yT-doEKxNpZJYPwWV_Jg",
    authDomain: "matara-clash-live.firebaseapp.com",
    databaseURL: "https://matara-clash-live-default-rtdb.firebaseio.com",
    projectId: "matara-clash-live",
    storageBucket: "matara-clash-live.firebasestorage.app",
    messagingSenderId: "560346687609",
    appId: "1:560346687609:web:ef7f9ceaf866db0fefcca8"
};

let db = null;
try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        console.log("⚡ Firebase Cluster Synchronized Successfully.");
    } else {
        console.warn("⚠️ Firebase values are placeholders. Running on local state engine.");
    }
} catch (error) {
    console.error("❌ Firebase Boot Error:", error);
}

// Extended Global Match State Registry
let matchState = {
    homeScore: 0,
    awayScore: 0,
    possession: 50,
    totalSeconds: 1200,
    isClockRunning: false,
    matchElapsedSeconds: 0,
    isMatchRunning: false,
    homeTeam: "RAHULA",
    awayTeam: "ST. THOMAS'",
    homeLogo: "",
    awayLogo: "",
    rahulaPlayers: ["Player One (GK)", "Player Two (C)", "Player Three", "Player Four"],
    thomasPlayers: ["Player Alpha (GK)", "Player Beta (C)", "Player Gamma", "Player Delta"],
    streamNotice: "BIG MATCH DECK ACTIVE",
    tickerText: "WELCOME TO THE GOLDEN-BLUE ENCOUNTER 2026 Live Broadcast Powered by Rahula Web Team. Realtime scores synchronized dynamically.",
    masterKey: "yenuka is back",
    youtubeUrl: ""
};

// ==========================================
// 📦 LOCAL STORAGE MATRICES (FAIL-SAFE PERSISTENCE)
// ==========================================
function saveLocalState() {
    localStorage.setItem("matara_clash_state", JSON.stringify(matchState));
}

function loadLocalState() {
    const saved = localStorage.getItem("matara_clash_state");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            matchState = { ...matchState, ...parsed };
        } catch (e) {
            console.error("Local state decode error:", e);
        }
    }
}

loadLocalState();

// ==========================================
// ⚡ FAIL-SAFE PRELOADER SUBSYSTEM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const pctDisplay = document.getElementById("load-pct");
    const statusDisplay = document.getElementById("load-status");
    const preloader = document.getElementById("cyber-preloader");
    
    let currentPct = 0;
    const logs = [
        "Initializing Core...",
        "Connecting Realtime Database...",
        "Injecting Holographic Modules...",
        "Ready to Launch"
    ];

    if (!pctDisplay && !preloader) return;

    const loadInterval = setInterval(() => {
        currentPct += Math.floor(Math.random() * 8) + 2;
        
        if (currentPct >= 100) {
            currentPct = 100;
            clearInterval(loadInterval);
            if (pctDisplay) pctDisplay.innerText = "100%";
            if (statusDisplay) statusDisplay.innerText = logs[3];
            
            if (preloader) {
                setTimeout(() => {
                    preloader.style.opacity = "0";
                    preloader.style.transform = "scale(1.05)";
                    setTimeout(() => {
                        preloader.style.display = "none";
                    }, 500);
                }, 400);
            }
        } else {
            if (pctDisplay) pctDisplay.innerText = (currentPct < 10 ? "0" : "") + currentPct + "%";
            if (statusDisplay) {
                if (currentPct < 30) statusDisplay.innerText = logs[0];
                else if (currentPct < 65) statusDisplay.innerText = logs[1];
                else statusDisplay.innerText = logs[2];
            }
        }
    }, 45); 
});

// ==========================================
// 📺 ORIGINAL OBS MODE TOGGLE
// ==========================================
const obsBtn = document.getElementById("obs-mode-btn");
if (obsBtn) {
    obsBtn.addEventListener("click", () => {
        window.open('live.html', '_blank');
    });
}

function toggleObsMode() {
    document.body.classList.toggle("obs-stream-active");
    const obsBtn = document.getElementById("obs-mode-btn");
    if(obsBtn) {
        if(document.body.classList.contains("obs-stream-active")) {
            obsBtn.innerHTML = `<i class="fa-solid fa-window-restore"></i> EXIT OBS MODE`;
        } else {
            obsBtn.innerHTML = `<i class="fa-solid fa-video"></i> LIVE MATCH`;
        }
    }
}

// ==========================================
// 🆕 ORIGINAL POPUP FUNCTION (FULLY PRESERVED)
// ==========================================
function openLiveMatchWindow() {
    const home = matchState.homeTeam;
    const away = matchState.awayTeam;
    const homeScore = matchState.homeScore;
    const awayScore = matchState.awayScore;
    const possession = matchState.possession;
    const youtubeId = matchState.youtubeUrl;
    const videoSrc = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&rel=0` : '';

    let mins = Math.floor(matchState.matchElapsedSeconds / 60);
    let secs = matchState.matchElapsedSeconds % 60;
    let elapsedStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

    const win = window.open('', '_blank', 'width=1280,height=720,menubar=no,toolbar=no,location=no,status=no,resizable=yes');
    if (!win) { 
        alert("Please allow popups for this site to open Live Match."); 
        return; 
    }
    win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Matara Clash - LIVE MATCH</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"><\/script>
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"><\/script>
        <style>
            * { margin:0; padding:0; box-sizing:border-box; }
            body { 
                background: #07070d; 
                color: #e2e8f0; 
                font-family: 'Rajdhani', sans-serif; 
                overflow: hidden; 
                height: 100vh; 
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center; 
                background-image: radial-gradient(circle at 50% 50%, #111126 0%, #07070d 80%);
                padding: 20px;
            }
            .popup-container { 
                width: 100%; 
                max-width: 1200px; 
                display: flex; 
                flex-direction: column; 
                gap: 20px; 
            }
            .popup-scoreboard { 
                display: grid; 
                grid-template-columns: 1fr 160px 1fr; 
                background: rgba(15,15,30,0.8); 
                border: 2px solid #ffd700; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 0 30px rgba(255,215,0,0.3); 
            }
            .team-block-popup { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 20px 30px; 
            }
            .team-block-popup.home { background: linear-gradient(90deg, rgba(255,215,0,0.1) 0%, transparent 100%); }
            .team-block-popup.away { background: linear-gradient(270deg, rgba(0,240,255,0.1) 0%, transparent 100%); }
            .team-name-popup { font-family: 'Orbitron', sans-serif; font-size: 2rem; font-weight: 700; letter-spacing: 2px; }
            .score-digit-popup { font-family: 'Orbitron', sans-serif; font-size: 4rem; font-weight: 900; text-shadow: 0 0 20px rgba(255,215,0,0.5); }
            .timer-popup { display: flex; flex-direction: column; justify-content: center; align-items: center; background: #090914; padding: 5px; }
            .clock-popup { font-family: 'Orbitron', sans-serif; font-size: 2.4rem; font-weight: 700; color: #00ff66; text-shadow: 0 0 20px rgba(0,255,102,0.5); }
            .elapsed-popup { font-family: 'Orbitron', sans-serif; font-size: 1rem; color: #ffd700; margin-top: 2px; }
            .live-tag { font-size: 0.7rem; letter-spacing: 3px; color: #64748b; margin-top: 2px; }
            .video-wrapper { 
                width: 100%; 
                background: #000; 
                border-radius: 12px; 
                overflow: hidden; 
                border: 1px solid rgba(255,215,0,0.3); 
                box-shadow: 0 0 20px rgba(0,0,0,0.8); 
                position: relative; 
                padding-bottom: 56.25%; 
                height: 0; 
            }
            .video-wrapper iframe { 
                position: absolute; 
                top: 0; left: 0; 
                width: 100%; height: 100%; 
                border: 0; 
            }
            .popup-stats { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 15px 25px; 
                background: rgba(15,15,30,0.6); 
                border-radius: 8px; 
                border: 1px solid rgba(255,255,255,0.05); 
            }
            .possession-text { font-family: 'Orbitron', sans-serif; font-size: 1rem; color: #ffd700; }
            .pos-bar-bg { width: 60%; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; }
            .pos-bar-fill { height: 100%; background: linear-gradient(90deg, #ffd700, #00ff66); transition: width 0.3s ease; }
            .match-title { font-family: 'Orbitron', sans-serif; font-size: 1.2rem; text-align: center; color: #00f0ff; letter-spacing: 4px; }
            
            @media (max-width: 768px) {
                .popup-scoreboard { grid-template-columns: 1fr; }
                .team-block-popup { padding: 15px; }
                .score-digit-popup { font-size: 3rem; }
                .clock-popup { font-size: 1.8rem; }
                .team-name-popup { font-size: 1.2rem; }
                .pos-bar-bg { width: 40%; }
            }
        </style>
    </head>
    <body>
        <div class="popup-container">
            <div class="match-title">THE GOLDEN-BLUE ENCOUNTER 2026</div>
            <div class="popup-scoreboard">
                <div class="team-block-popup home">
                    <span class="team-name-popup" id="popup-home-name">${home}</span>
                    <span class="score-digit-popup" id="popup-home-score">${homeScore}</span>
                </div>
                <div class="timer-popup">
                    <span class="clock-popup" id="popup-timer">20:00</span>
                    <span class="elapsed-popup" id="popup-elapsed">⏱ ${elapsedStr}</span>
                    <span class="live-tag">LIVE MATRICES</span>
                </div>
                <div class="team-block-popup away">
                    <span class="score-digit-popup" id="popup-away-score">${awayScore}</span>
                    <span class="team-name-popup" id="popup-away-name">${away}</span>
                </div>
            </div>
            <div class="video-wrapper">
                <iframe id="popup-youtube" src="${videoSrc}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
            </div>
            <div class="popup-stats">
                <span class="possession-text" id="popup-pos-home">${home} (${possession}%)</span>
                <div class="pos-bar-bg"><div class="pos-bar-fill" id="popup-pos-bar" style="width:${possession}%"></div></div>
                <span class="possession-text" id="popup-pos-away">${away} (${100 - possession}%)</span>
            </div>
        </div>
        <script>
            const firebaseConfig = ${JSON.stringify(firebaseConfig)};
            let db = null;
            try {
                if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
                    firebase.initializeApp(firebaseConfig);
                    db = firebase.database();
                }
            } catch(e) { console.error(e); }

            function updatePopupUI(data, meta, timer, elapsed) {
                if (data && data.homeScore !== undefined) document.getElementById('popup-home-score').innerText = data.homeScore;
                if (data && data.awayScore !== undefined) document.getElementById('popup-away-score').innerText = data.awayScore;
                if (data && data.possession !== undefined) {
                    const pos = data.possession;
                    document.getElementById('popup-pos-bar').style.width = pos + '%';
                }
                if (meta) {
                    let homeName = meta.homeTeam || document.getElementById('popup-home-name').innerText;
                    let awayName = meta.awayTeam || document.getElementById('popup-away-name').innerText;
                    document.getElementById('popup-home-name').innerText = homeName;
                    document.getElementById('popup-away-name').innerText = awayName;
                    let currentPos = parseInt(document.getElementById('popup-pos-bar').style.width) || 50;
                    document.getElementById('popup-pos-home').innerText = homeName + ' (' + currentPos + '%)';
                    document.getElementById('popup-pos-away').innerText = awayName + ' (' + (100 - currentPos) + '%)';
                }
                if (timer && timer.totalSeconds !== undefined) {
                    let mins = Math.floor(timer.totalSeconds / 60);
                    let secs = timer.totalSeconds % 60;
                    document.getElementById('popup-timer').innerText = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
                }
                if (elapsed && elapsed.matchElapsedSeconds !== undefined) {
                    let mins = Math.floor(elapsed.matchElapsedSeconds / 60);
                    let secs = elapsed.matchElapsedSeconds % 60;
                    document.getElementById('popup-elapsed').innerText = '⏱ ' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
                }
            }

            if (db) {
                db.ref('match/').on('value', (snapshot) => {
                    const data = snapshot.val() || {};
                    updatePopupUI(data, null, null, null);
                });
                db.ref('match/meta').on('value', (snapshot) => {
                    const meta = snapshot.val() || {};
                    updatePopupUI(null, meta, null, null);
                });
                db.ref('match/timer').on('value', (snapshot) => {
                    const timer = snapshot.val() || {};
                    updatePopupUI(null, null, timer, null);
                });
                db.ref('match/elapsed').on('value', (snapshot) => {
                    const elapsed = snapshot.val() || {};
                    updatePopupUI(null, null, null, elapsed);
                });
            }
        <\/script>
    </body>
    </html>
    `);
    win.document.close();
}

// ==========================================
// 🛡️ CYBERPUNK ADMIN MODAL SYSTEM
// ==========================================
const adminModalOverlay = document.getElementById("admin-modal-overlay");
const openAdminHeaderBtn = document.getElementById("admin-menu-btn");
const openAdminHeroBtn = document.getElementById("hero-launch-btn");
const closeAdminBtn = document.getElementById("admin-close-btn");

const openModal = () => { 
    if(adminModalOverlay) adminModalOverlay.classList.add("open"); 
    populateAdminInputs();
};
const closeModal = () => { if(adminModalOverlay) adminModalOverlay.classList.remove("open"); };

if (openAdminHeaderBtn) openAdminHeaderBtn.addEventListener("click", openModal);
if (openAdminHeroBtn) openAdminHeroBtn.addEventListener("click", openModal);
if (closeAdminBtn) closeAdminBtn.addEventListener("click", closeModal);

if (adminModalOverlay) {
    adminModalOverlay.addEventListener("click", (e) => {
        if (e.target === adminModalOverlay) closeModal();
    });
}

const loginBtn = document.getElementById("admin-login-btn");
const authScreen = document.getElementById("admin-auth-screen");
const controlsContent = document.getElementById("admin-controls-content");
const errorMsg = document.getElementById("auth-error-msg");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const adminPassInput = document.getElementById("admin-pass");
        if (!adminPassInput) return;
        
        if (adminPassInput.value === matchState.masterKey) {
            if (authScreen) authScreen.style.display = "none";
            if (controlsContent) controlsContent.style.display = "flex";
            if (errorMsg) errorMsg.innerText = "";
        } else {
            if (errorMsg) errorMsg.innerText = "ACCESS DENIED: INVALID PRIVILEGE KEY";
        }
    });
}

// ==========================================
// 🆕 DYNAMIC PLAYER MANAGEMENT
// ==========================================

function renderPlayerInputs() {
    const homeContainer = document.getElementById("home-players-container");
    const awayContainer = document.getElementById("away-players-container");
    if (!homeContainer || !awayContainer) return;

    let homeHTML = '';
    matchState.rahulaPlayers.forEach((player, index) => {
        homeHTML += `
            <div style="display:flex; gap:8px; margin-bottom:6px; align-items:center;">
                <input type="text" id="p-home-${index}" value="${player}" placeholder="Player ${index+1}" style="flex:1;">
                <button onclick="removeHomePlayer(${index})" class="cyber-btn btn-small" style="background:rgba(255,42,95,0.2); border-color:var(--neon-red); color:var(--neon-red); padding:4px 10px; font-size:0.7rem;">X</button>
            </div>
        `;
    });
    homeContainer.innerHTML = homeHTML;

    let awayHTML = '';
    matchState.thomasPlayers.forEach((player, index) => {
        awayHTML += `
            <div style="display:flex; gap:8px; margin-bottom:6px; align-items:center;">
                <input type="text" id="p-away-${index}" value="${player}" placeholder="Player ${index+1}" style="flex:1;">
                <button onclick="removeAwayPlayer(${index})" class="cyber-btn btn-small" style="background:rgba(255,42,95,0.2); border-color:var(--neon-red); color:var(--neon-red); padding:4px 10px; font-size:0.7rem;">X</button>
            </div>
        `;
    });
    awayContainer.innerHTML = awayHTML;

    document.getElementById("admin-p-home-title").innerHTML = `<i class="fa-solid fa-users"></i> ${matchState.homeTeam} SQUAD (${matchState.rahulaPlayers.length})`;
    document.getElementById("admin-p-away-title").innerHTML = `<i class="fa-solid fa-users"></i> ${matchState.awayTeam} SQUAD (${matchState.thomasPlayers.length})`;
}

// 🆕 Auto-sync to Firebase immediately
window.addHomePlayer = function() {
    matchState.rahulaPlayers.push(`Player ${matchState.rahulaPlayers.length + 1}`);
    saveLocalState();
    renderPlayerInputs();
    if (db) {
        db.ref('match/players').update({ rahula: matchState.rahulaPlayers, thomas: matchState.thomasPlayers });
    }
};

window.addAwayPlayer = function() {
    matchState.thomasPlayers.push(`Player ${matchState.thomasPlayers.length + 1}`);
    saveLocalState();
    renderPlayerInputs();
    if (db) {
        db.ref('match/players').update({ rahula: matchState.rahulaPlayers, thomas: matchState.thomasPlayers });
    }
};

window.removeHomePlayer = function(index) {
    if (matchState.rahulaPlayers.length > 1) {
        matchState.rahulaPlayers.splice(index, 1);
        saveLocalState();
        renderPlayerInputs();
        if (db) {
            db.ref('match/players').update({ rahula: matchState.rahulaPlayers, thomas: matchState.thomasPlayers });
        }
    } else {
        alert("At least one player must remain.");
    }
};

window.removeAwayPlayer = function(index) {
    if (matchState.thomasPlayers.length > 1) {
        matchState.thomasPlayers.splice(index, 1);
        saveLocalState();
        renderPlayerInputs();
        if (db) {
            db.ref('match/players').update({ rahula: matchState.rahulaPlayers, thomas: matchState.thomasPlayers });
        }
    } else {
        alert("At least one player must remain.");
    }
};

// ==========================================
// 📋 POPULATE ADMIN INPUTS
// ==========================================
function populateAdminInputs() {
    document.getElementById("input-home-team").value = matchState.homeTeam;
    document.getElementById("input-away-team").value = matchState.awayTeam;
    renderPlayerInputs();
    document.getElementById("input-stream-notice").value = matchState.streamNotice;
    document.getElementById("input-ticker-text").value = matchState.tickerText;
    document.getElementById("input-youtube-url").value = matchState.youtubeUrl || "";
    document.getElementById("input-home-logo").value = matchState.homeLogo || "";
    document.getElementById("input-away-logo").value = matchState.awayLogo || "";
}

window.switchAdminTab = function(event, tabId) {
    const tabPanels = document.querySelectorAll('.admin-tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active-tab'));
    const tabLinks = document.querySelectorAll('.admin-tab-link');
    tabLinks.forEach(link => link.classList.remove('active'));
    document.getElementById(tabId).classList.add('active-tab');
    event.currentTarget.classList.add('active');
    if (tabId === 'tab-players') {
        renderPlayerInputs();
    }
}

// ==========================================
// ⚡ SAVE FUNCTIONS - ALL SYNC TO FIREBASE
// ==========================================

// ✅ Team Names → Firebase match/meta
window.saveTeamSettings = function() {
    matchState.homeTeam = document.getElementById("input-home-team").value.toUpperCase() || "HOME";
    matchState.awayTeam = document.getElementById("input-away-team").value.toUpperCase() || "AWAY";
    if (db) {
        db.ref('match/meta').update({ homeTeam: matchState.homeTeam, awayTeam: matchState.awayTeam });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
    renderPlayerInputs();
};

// ✅ Logos → Firebase match/meta
window.saveLogoSettings = function() {
    matchState.homeLogo = document.getElementById("input-home-logo").value.trim();
    matchState.awayLogo = document.getElementById("input-away-logo").value.trim();
    if (db) {
        db.ref('match/meta').update({ homeLogo: matchState.homeLogo, awayLogo: matchState.awayLogo });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

// ✅ Players → Firebase match/players
window.savePlayerSettings = function() {
    const homeInputs = document.querySelectorAll('#home-players-container input');
    matchState.rahulaPlayers = [];
    homeInputs.forEach(input => {
        if (input.value.trim()) matchState.rahulaPlayers.push(input.value.trim());
    });
    if (matchState.rahulaPlayers.length === 0) matchState.rahulaPlayers = ["Default Player"];

    const awayInputs = document.querySelectorAll('#away-players-container input');
    matchState.thomasPlayers = [];
    awayInputs.forEach(input => {
        if (input.value.trim()) matchState.thomasPlayers.push(input.value.trim());
    });
    if (matchState.thomasPlayers.length === 0) matchState.thomasPlayers = ["Default Player"];

    if (db) {
        db.ref('match/players').update({ rahula: matchState.rahulaPlayers, thomas: matchState.thomasPlayers });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
    renderPlayerInputs();
};

// ✅ Stream Notice → Firebase match/meta
window.saveStreamSettings = function() {
    matchState.streamNotice = document.getElementById("input-stream-notice").value || "LIVE AREA ACTIVE";
    if (db) {
        db.ref('match/meta').update({ streamNotice: matchState.streamNotice });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

// ✅ Ticker Text → Firebase match/meta
window.saveTickerSettings = function() {
    matchState.tickerText = document.getElementById("input-ticker-text").value || "...";
    if (db) {
        db.ref('match/meta').update({ tickerText: matchState.tickerText });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

// ✅ YouTube URL → Firebase match/meta
window.saveYoutubeStream = function() {
    const input = document.getElementById("input-youtube-url");
    const url = input.value.trim();
    const videoId = extractYouTubeId(url);
    if (videoId) {
        matchState.youtubeUrl = videoId;
        if (db) {
            db.ref('match/meta').update({ youtubeUrl: videoId });
        } else {
            saveLocalState();
            syncDisplayUI();
        }
    } else {
        alert("Invalid YouTube URL or Video ID. Please check and try again.");
    }
};

// ✅ Remove YouTube → Firebase match/meta (set to empty)
window.closeYoutubeStream = function() {
    matchState.youtubeUrl = "";
    document.getElementById("input-youtube-url").value = "";
    if (db) {
        db.ref('match/meta').update({ youtubeUrl: "" });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

// ✅ Password Change (local only)
window.savePasswordSettings = function() {
    const current = document.getElementById("pass-current").value;
    const newVal = document.getElementById("pass-new").value;
    const msg = document.getElementById("pass-msg");
    if (current === matchState.masterKey) {
        if (newVal.trim().length > 0) {
            matchState.masterKey = newVal;
            saveLocalState();
            msg.style.color = "var(--neon-green)";
            msg.innerText = "SUCCESS: MASTER DECRYPTION KEY MODIFIED.";
            document.getElementById("pass-current").value = "";
            document.getElementById("pass-new").value = "";
        } else {
            msg.style.color = "var(--neon-red)";
            msg.innerText = "ERROR: NEW PASSWORD CANNOT BE EMPTY.";
        }
    } else {
        msg.style.color = "var(--neon-red)";
        msg.innerText = "ERROR: CURRENT SYSTEM KEY UNMATCHED.";
    }
};

// ==========================================
// ⚽ THREE.JS 3D INTERACTIVE FOOTBALL ENGINE
// ==========================================
let isFootballMode = false;
let globeMesh, footballGroup;

function init3DPlayground() {
    const container = document.getElementById("canvas-3d-container");
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    const globeGeo = new THREE.IcosahedronGeometry(4.8, 2);
    const globeMat = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    footballGroup = new THREE.Group();
    const fbInnerGeo = new THREE.SphereGeometry(4.5, 32, 32);
    const fbInnerMat = new THREE.MeshStandardMaterial({ color: 0x0a0a14, roughness: 0.5 });
    const fbInner = new THREE.Mesh(fbInnerGeo, fbInnerMat);
    footballGroup.add(fbInner);
    const fbOuterGeo = new THREE.IcosahedronGeometry(4.56, 1);
    const fbOuterMat = new THREE.MeshStandardMaterial({
        color: 0x00ff66,
        wireframe: true,
        wireframeLinewidth: 2,
        emissive: 0x00ff66,
        emissiveIntensity: 0.5
    });
    const fbOuter = new THREE.Mesh(fbOuterGeo, fbOuterMat);
    footballGroup.add(fbOuter);
    footballGroup.visible = false;
    scene.add(footballGroup);

    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.04, color: 0x00ff66 });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    function animate() {
        requestAnimationFrame(animate);
        if (!isFootballMode) {
            globeMesh.rotation.y += 0.006;
            globeMesh.rotation.x += 0.003;
        } else {
            footballGroup.rotation.y += 0.012;
            footballGroup.rotation.x += 0.004;
        }
        particleMesh.rotation.y -= 0.001;
        renderer.render(scene, camera);
    }

    window.toggle3DTransformation = function() {
        isFootballMode = !isFootballMode;
        if (isFootballMode) {
            globeMesh.visible = false;
            footballGroup.visible = true;
            footballGroup.scale.set(0.3, 0.3, 0.3);
            document.getElementById("btn-morph-toggle").innerText = "RESET GLOBE";
        } else {
            globeMesh.visible = true;
            footballGroup.visible = false;
            document.getElementById("btn-morph-toggle").innerText = "TRANSFORM 3D";
        }
    };

    container.addEventListener("click", (e) => {
        if(e.target.id !== "btn-morph-toggle") toggle3DTransformation();
    });
    document.getElementById("btn-morph-toggle")?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggle3DTransformation();
    });

    setInterval(() => {
        if (isFootballMode && footballGroup.scale.x < 1.0) {
            let nextScale = Math.min(1.0, footballGroup.scale.x + 0.15);
            footballGroup.scale.set(nextScale, nextScale, nextScale);
        }
    }, 30);

    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

    animate();
}
window.addEventListener("load", init3DPlayground);

// ==========================================
// ⏱️ MATCH CLOCK (COUNTDOWN) SYSTEM LOGIC
// ==========================================
let timerInterval = null;

function updateTimerUI() {
    let mins = Math.floor(matchState.totalSeconds / 60);
    let secs = matchState.totalSeconds % 60;
    let timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    
    const liveTimer = document.getElementById("live-timer");
    const deckTimer = document.getElementById("deck-timer");
    if (liveTimer) liveTimer.innerText = timeStr;
    if (deckTimer) deckTimer.innerText = timeStr;
    const popupTimer = document.getElementById("popup-timer");
    if (popupTimer) popupTimer.innerText = timeStr;
}

function startClockMechanism() {
    if (matchState.isClockRunning) return;
    matchState.isClockRunning = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (matchState.totalSeconds > 0) {
            matchState.totalSeconds--;
            updateTimerUI();
            saveLocalState();
        } else {
            clearInterval(timerInterval);
            matchState.isClockRunning = false;
        }
    }, 1000);
}

function pauseClockMechanism() {
    clearInterval(timerInterval);
    matchState.isClockRunning = false;
    saveLocalState();
}

document.getElementById("btn-clock-start")?.addEventListener("click", () => {
    if (db) {
        db.ref('match/timer').update({ isClockRunning: true, totalSeconds: matchState.totalSeconds });
    } else {
        startClockMechanism();
    }
});

document.getElementById("btn-clock-pause")?.addEventListener("click", () => {
    if (db) {
        db.ref('match/timer').update({ isClockRunning: false, totalSeconds: matchState.totalSeconds });
    } else {
        pauseClockMechanism();
    }
});

document.getElementById("btn-clock-set")?.addEventListener("click", () => {
    const customInput = document.getElementById("custom-time-input");
    if (!customInput) return;
    const parts = customInput.value.split(":");
    if (parts.length === 2) {
        const m = parseInt(parts[0]) || 0;
        const s = parseInt(parts[1]) || 0;
        matchState.totalSeconds = (m * 60) + s;
        if (db) {
            db.ref('match/timer').update({ totalSeconds: matchState.totalSeconds, isClockRunning: false });
        } else {
            pauseClockMechanism();
            updateTimerUI();
        }
    }
});

// ==========================================
// 🆕 MATCH DURATION (ELAPSED) SYSTEM
// ==========================================
let matchInterval = null;

function updateElapsedUI() {
    let mins = Math.floor(matchState.matchElapsedSeconds / 60);
    let secs = matchState.matchElapsedSeconds % 60;
    let timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    const mainElapsed = document.getElementById("main-elapsed-timer");
    const deckElapsed = document.getElementById("deck-elapsed");
    const popupElapsed = document.getElementById("popup-elapsed");
    const liveElapsed = document.getElementById("live-elapsed");
    if (mainElapsed) mainElapsed.innerText = timeStr;
    if (deckElapsed) deckElapsed.innerText = timeStr;
    if (popupElapsed) popupElapsed.innerText = `⏱ ${timeStr}`;
    if (liveElapsed) liveElapsed.innerText = `⏱ ${timeStr}`;
}

function startMatchDuration() {
    if (matchState.isMatchRunning) return;
    matchState.isMatchRunning = true;
    clearInterval(matchInterval);
    matchInterval = setInterval(() => {
        matchState.matchElapsedSeconds++;
        updateElapsedUI();
        saveLocalState();
        if (db) {
            db.ref('match/elapsed').update({ 
                matchElapsedSeconds: matchState.matchElapsedSeconds,
                isMatchRunning: true
            });
        }
    }, 1000);
}

function pauseMatchDuration() {
    clearInterval(matchInterval);
    matchState.isMatchRunning = false;
    saveLocalState();
    if (db) {
        db.ref('match/elapsed').update({ isMatchRunning: false });
    }
}

function resetMatchDuration() {
    clearInterval(matchInterval);
    matchState.matchElapsedSeconds = 0;
    matchState.isMatchRunning = false;
    updateElapsedUI();
    saveLocalState();
    if (db) {
        db.ref('match/elapsed').update({ 
            matchElapsedSeconds: 0,
            isMatchRunning: false 
        });
    }
}

document.getElementById("btn-elapsed-start")?.addEventListener("click", () => {
    if (db) {
        db.ref('match/elapsed').update({ isMatchRunning: true });
        startMatchDuration();
    } else {
        startMatchDuration();
    }
});

document.getElementById("btn-elapsed-pause")?.addEventListener("click", () => {
    if (db) {
        db.ref('match/elapsed').update({ isMatchRunning: false });
        pauseMatchDuration();
    } else {
        pauseMatchDuration();
    }
});

document.getElementById("btn-elapsed-reset")?.addEventListener("click", () => {
    if (db) {
        db.ref('match/elapsed').update({ 
            matchElapsedSeconds: 0,
            isMatchRunning: false 
        });
        resetMatchDuration();
    } else {
        resetMatchDuration();
    }
});

// ==========================================
// 📊 LIVE SCOREBOARD CORE MATRIX TELEMETRY
// ==========================================

function updateLivePageUI() {
    const liveHomeScore = document.getElementById("live-home-score");
    const liveAwayScore = document.getElementById("live-away-score");
    const liveHomeName = document.getElementById("live-home-name");
    const liveAwayName = document.getElementById("live-away-name");
    const livePosHome = document.getElementById("live-pos-home");
    const livePosAway = document.getElementById("live-pos-away");
    const livePosBar = document.getElementById("live-pos-bar");
    const liveIframe = document.getElementById("live-youtube-iframe");
    const liveHomeLogo = document.getElementById("live-home-logo");
    const liveAwayLogo = document.getElementById("live-away-logo");

    if (liveHomeScore) liveHomeScore.innerText = matchState.homeScore;
    if (liveAwayScore) liveAwayScore.innerText = matchState.awayScore;
    if (liveHomeName) liveHomeName.innerText = matchState.homeTeam;
    if (liveAwayName) liveAwayName.innerText = matchState.awayTeam;
    if (livePosHome) livePosHome.innerText = `${matchState.homeTeam} (${matchState.possession}%)`;
    if (livePosAway) livePosAway.innerText = `${matchState.awayTeam} (${100 - matchState.possession}%)`;
    if (livePosBar) livePosBar.style.width = matchState.possession + "%";

    if (liveIframe && matchState.youtubeUrl) {
        liveIframe.src = `https://www.youtube.com/embed/${matchState.youtubeUrl}?autoplay=1&mute=0&controls=1&rel=0`;
    } else if (liveIframe) {
        liveIframe.src = "";
    }

    if (liveHomeLogo) {
        if (matchState.homeLogo) {
            liveHomeLogo.src = matchState.homeLogo;
            liveHomeLogo.style.display = 'block';
        } else {
            liveHomeLogo.style.display = 'none';
        }
    }
    if (liveAwayLogo) {
        if (matchState.awayLogo) {
            liveAwayLogo.src = matchState.awayLogo;
            liveAwayLogo.style.display = 'block';
        } else {
            liveAwayLogo.style.display = 'none';
        }
    }
}

function syncDisplayUI() {
    const scoreHome = document.getElementById("score-home");
    const scoreAway = document.getElementById("score-away");
    const matrixHome = document.getElementById("matrix-home-score");
    const matrixAway = document.getElementById("matrix-away-score");
    const titleHome = document.getElementById("title-home-team");
    const titleAway = document.getElementById("title-away-team");
    const boardHome = document.getElementById("board-home-name");
    const boardAway = document.getElementById("board-away-name");
    const squadHomeTitle = document.getElementById("squad-home-title");
    const squadAwayTitle = document.getElementById("squad-away-title");
    const adminHomeTitle = document.getElementById("admin-p-home-title");
    const adminAwayTitle = document.getElementById("admin-p-away-title");
    const posHomeName = document.getElementById("pos-home-name");
    const posAwayName = document.getElementById("pos-away-name");
    const posHome = document.getElementById("pos-home");
    const posAway = document.getElementById("pos-away");
    const posBar = document.getElementById("pos-bar");
    const streamNotice = document.getElementById("display-stream-notice");
    const tickerStrip = document.getElementById("live-ticker-strip");
    const homeLogoImg = document.getElementById("home-logo-img");
    const awayLogoImg = document.getElementById("away-logo-img");
    const homeLogoText = document.getElementById("home-logo-text");
    const awayLogoText = document.getElementById("away-logo-text");

    if (scoreHome) scoreHome.innerText = matchState.homeScore;
    if (scoreAway) scoreAway.innerText = matchState.awayScore;
    if (matrixHome) matrixHome.innerText = matchState.homeScore;
    if (matrixAway) matrixAway.innerText = matchState.awayScore;
    if (titleHome) titleHome.innerText = matchState.homeTeam;
    if (titleAway) titleAway.innerText = matchState.awayTeam;
    if (boardHome) boardHome.innerText = matchState.homeTeam;
    if (boardAway) boardAway.innerText = matchState.awayTeam;
    if (squadHomeTitle) squadHomeTitle.innerText = `${matchState.homeTeam} SQUAD`;
    if (squadAwayTitle) squadAwayTitle.innerText = `${matchState.awayTeam} SQUAD`;
    if (adminHomeTitle) adminHomeTitle.innerHTML = `<i class="fa-solid fa-users"></i> ${matchState.homeTeam} SQUAD (${matchState.rahulaPlayers.length})`;
    if (adminAwayTitle) adminAwayTitle.innerHTML = `<i class="fa-solid fa-users"></i> ${matchState.awayTeam} SQUAD (${matchState.thomasPlayers.length})`;
    if (posHomeName) posHomeName.innerText = matchState.homeTeam;
    if (posAwayName) posAwayName.innerText = matchState.awayTeam;
    if (posHome) posHome.innerText = matchState.possession;
    if (posAway) posAway.innerText = 100 - matchState.possession;
    if (posBar) posBar.style.width = matchState.possession + "%";
    if (streamNotice) streamNotice.innerText = matchState.streamNotice;
    
    if (tickerStrip) {
        const loopContent = `<span class="ticker-item">${matchState.tickerText}</span>`;
        tickerStrip.innerHTML = loopContent + loopContent;
    }

    const homeList = document.getElementById("squad-home-list");
    const awayList = document.getElementById("squad-away-list");
    if (homeList) {
        let homeHTML = "";
        matchState.rahulaPlayers.forEach((player, index) => {
            let num = (index+1).toString().padStart(2, '0');
            homeHTML += `<li><span class="jersey-num">${num}</span> ${player}</li>`;
        });
        homeList.innerHTML = homeHTML;
    }
    if (awayList) {
        let awayHTML = "";
        matchState.thomasPlayers.forEach((player, index) => {
            let num = (index+1).toString().padStart(2, '0');
            awayHTML += `<li><span class="jersey-num">${num}</span> ${player}</li>`;
        });
        awayList.innerHTML = awayHTML;
    }

    renderYoutubeVideo();
    updateElapsedUI();
    
    if (homeLogoImg && homeLogoText) {
        if (matchState.homeLogo) {
            homeLogoImg.src = matchState.homeLogo;
            homeLogoImg.style.display = 'block';
            homeLogoText.style.display = 'none';
        } else {
            homeLogoImg.style.display = 'none';
            homeLogoText.style.display = 'flex';
        }
    }
    if (awayLogoImg && awayLogoText) {
        if (matchState.awayLogo) {
            awayLogoImg.src = matchState.awayLogo;
            awayLogoImg.style.display = 'block';
            awayLogoText.style.display = 'none';
        } else {
            awayLogoImg.style.display = 'none';
            awayLogoText.style.display = 'flex';
        }
    }

    updateLivePageUI();
}

// ✅ Scores → Firebase match/
window.updateScore = function(side, val) {
    if (side === 'home') {
        matchState.homeScore = Math.max(0, matchState.homeScore + val);
    } else {
        matchState.awayScore = Math.max(0, matchState.awayScore + val);
    }
    if (db) {
        db.ref('match/').update({ homeScore: matchState.homeScore, awayScore: matchState.awayScore });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

// ✅ Possession → Firebase match/
window.setPossession = function() {
    const posInput = document.getElementById("input-possession");
    if (!posInput) return;
    const val = parseInt(posInput.value) || 50;
    matchState.possession = Math.min(100, Math.max(0, val));
    if (db) {
        db.ref('match/').update({ possession: matchState.possession });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

// ==========================================
// 📡 REALTIME LIVE DATA SYNCHRONIZER
// ==========================================
if (db) {
    db.ref('match/').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            matchState.homeScore = data.homeScore !== undefined ? data.homeScore : matchState.homeScore;
            matchState.awayScore = data.awayScore !== undefined ? data.awayScore : matchState.awayScore;
            matchState.possession = data.possession !== undefined ? data.possession : matchState.possession;
        }
        syncDisplayUI();
    });

    db.ref('match/meta').on('value', (snapshot) => {
        const meta = snapshot.val();
        if (meta) {
            matchState.homeTeam = meta.homeTeam || matchState.homeTeam;
            matchState.awayTeam = meta.awayTeam || matchState.awayTeam;
            matchState.streamNotice = meta.streamNotice || matchState.streamNotice;
            matchState.tickerText = meta.tickerText || matchState.tickerText;
            matchState.youtubeUrl = meta.youtubeUrl || "";
            matchState.homeLogo = meta.homeLogo || "";
            matchState.awayLogo = meta.awayLogo || "";
        }
        syncDisplayUI();
    });

    db.ref('match/players').on('value', (snapshot) => {
        const pData = snapshot.val();
        if (pData) {
            matchState.rahulaPlayers = pData.rahula || matchState.rahulaPlayers;
            matchState.thomasPlayers = pData.thomas || matchState.thomasPlayers;
        }
        syncDisplayUI();
        if (adminModalOverlay && adminModalOverlay.classList.contains('open')) {
            renderPlayerInputs();
        }
    });

    db.ref('match/timer').on('value', (snapshot) => {
        const timerData = snapshot.val();
        if (timerData) {
            matchState.totalSeconds = timerData.totalSeconds !== undefined ? timerData.totalSeconds : matchState.totalSeconds;
            if (timerData.isClockRunning) {
                startClockMechanism();
            } else {
                pauseClockMechanism();
            }
        }
        updateTimerUI();
    });

    db.ref('match/elapsed').on('value', (snapshot) => {
        const elapsedData = snapshot.val();
        if (elapsedData) {
            matchState.matchElapsedSeconds = elapsedData.matchElapsedSeconds !== undefined ? elapsedData.matchElapsedSeconds : matchState.matchElapsedSeconds;
            if (elapsedData.isMatchRunning) {
                if (!matchState.isMatchRunning) {
                    startMatchDuration();
                }
            } else {
                if (matchState.isMatchRunning) {
                    pauseMatchDuration();
                }
            }
        }
        updateElapsedUI();
    });

} else {
    syncDisplayUI();
    updateTimerUI();
    updateElapsedUI();
}

// ==========================================
// 🆕 YOUTUBE ID EXTRACTOR
// ==========================================
function extractYouTubeId(url) {
    if (!url) return null;
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtu\.be\/([^?]+)/,
        /youtube\.com\/embed\/([^?]+)/,
        /youtube\.com\/live\/([^?]+)/
    ];
    for (let p of patterns) {
        const match = url.match(p);
        if (match) return match[1];
    }
    if (url.length === 11) return url;
    return null;
}

function renderYoutubeVideo() {
    const container = document.getElementById("youtube-stream-container");
    const iframe = document.getElementById("youtube-iframe");
    if (!container || !iframe) return;

    if (matchState.youtubeUrl) {
        container.style.display = "block";
        iframe.src = `https://www.youtube.com/embed/${matchState.youtubeUrl}?autoplay=1&mute=0&controls=1&rel=0`;
    } else {
        container.style.display = "none";
        iframe.src = "";
    }
}

// ==========================================
// 🚀 RESET / CLEAR ALL MATCH DATA
// ==========================================
window.resetAllMatchData = function() {
    if (!db) { 
        alert("❌ Firebase is not connected."); 
        return; 
    }

    if (!confirm("⚠️ WARNING: This will reset ALL match data (scores, timers, players, logos) to default values. Continue?")) {
        return;
    }

    const defaultData = { homeScore: 0, awayScore: 0, possession: 50 };
    const defaultMeta = {
        homeTeam: "RAHULA",
        awayTeam: "ST. THOMAS'",
        homeLogo: "",
        awayLogo: "",
        streamNotice: "BIG MATCH DECK ACTIVE",
        tickerText: "WELCOME TO THE GOLDEN-BLUE ENCOUNTER 2026 Live Broadcast...",
        youtubeUrl: ""
    };
    const defaultPlayers = {
        rahula: ["Player One (GK)", "Player Two (C)", "Player Three", "Player Four"],
        thomas: ["Player Alpha (GK)", "Player Beta (C)", "Player Gamma", "Player Delta"]
    };
    const defaultTimer = { totalSeconds: 1200, isClockRunning: false };
    const defaultElapsed = { matchElapsedSeconds: 0, isMatchRunning: false };

    db.ref('match/').update(defaultData);
    db.ref('match/meta').update(defaultMeta);
    db.ref('match/players').update(defaultPlayers);
    db.ref('match/timer').update(defaultTimer);
    db.ref('match/elapsed').update(defaultElapsed);

    matchState.homeScore = 0;
    matchState.awayScore = 0;
    matchState.possession = 50;
    matchState.homeTeam = "RAHULA";
    matchState.awayTeam = "ST. THOMAS'";
    matchState.homeLogo = "";
    matchState.awayLogo = "";
    matchState.streamNotice = "BIG MATCH DECK ACTIVE";
    matchState.tickerText = "WELCOME TO THE GOLDEN-BLUE ENCOUNTER 2026 Live Broadcast...";
    matchState.youtubeUrl = "";
    matchState.rahulaPlayers = ["Player One (GK)", "Player Two (C)", "Player Three", "Player Four"];
    matchState.thomasPlayers = ["Player Alpha (GK)", "Player Beta (C)", "Player Gamma", "Player Delta"];
    matchState.totalSeconds = 1200;
    matchState.isClockRunning = false;
    matchState.matchElapsedSeconds = 0;
    matchState.isMatchRunning = false;

    clearInterval(timerInterval);
    clearInterval(matchInterval);

    saveLocalState();
    syncDisplayUI();
    updateTimerUI();
    updateElapsedUI();

    if (adminModalOverlay) {
        closeModal();
    }

    alert("✅ All match data has been reset to default values and synced to Firebase.\n\nAll connected pages will update automatically.");
    console.log("🔥 Match data reset to defaults.");
};