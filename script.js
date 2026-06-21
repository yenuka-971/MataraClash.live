// ==========================================
// 🔥 CENTRAL FIREBASE MATRIX CONFIGURATION
// ==========================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
    // Dynamic Custom Categories State Block
    homeTeam: "RAHULA",
    awayTeam: "ST. THOMAS'",
    rahulaPlayers: ["Player One (GK)", "Player Two (C)", "Player Three", "Player Four"],
    thomasPlayers: ["Player Alpha (GK)", "Player Beta (C)", "Player Gamma", "Player Delta"],
    streamNotice: "BIG MATCH DECK ACTIVE",
    tickerText: "WELCOME TO THE GOLDEN-BLUE ENCOUNTER 2026 Live Broadcast Powered by Rahula Web Team. Realtime scores synchronized dynamically.",
    masterKey: "yenuka is back"
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
// 📺 OBS LIVE STREAM OVERLAY TOGGLE
// ==========================================
const obsBtn = document.getElementById("obs-mode-btn");
if (obsBtn) {
    obsBtn.addEventListener("click", () => {
        document.body.classList.toggle("obs-stream-active");
        if(document.body.classList.contains("obs-stream-active")) {
            obsBtn.innerHTML = `<i class="fa-solid fa-window-restore"></i> EXIT OBS MODE`;
        } else {
            obsBtn.innerHTML = `<i class="fa-solid fa-video"></i> ACTIVATE OBS MODE`;
        }
    });
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
    populateAdminInputs(); // Load current data into inputs when modal opens
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

// Security Auth Gateway Logic
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

// Populate Admin Panel fields with current data
function populateAdminInputs() {
    document.getElementById("input-home-team").value = matchState.homeTeam;
    document.getElementById("input-away-team").value = matchState.awayTeam;
    
    for(let i=0; i<4; i++) {
        document.getElementById(`p-home-${i}`).value = matchState.rahulaPlayers[i] || "";
        document.getElementById(`p-away-${i}`).value = matchState.thomasPlayers[i] || "";
    }
    
    document.getElementById("input-stream-notice").value = matchState.streamNotice;
    document.getElementById("input-ticker-text").value = matchState.tickerText;
}

// Categories Tab Switcher Logic
window.switchAdminTab = function(event, tabId) {
    const tabPanels = document.querySelectorAll('.admin-tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active-tab'));

    const tabLinks = document.querySelectorAll('.admin-tab-link');
    tabLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(tabId).classList.add('active-tab');
    event.currentTarget.classList.add('active');
}

// ==========================================
// ⚡ NEW DYNAMIC SYNC FORM ACTIONS
// ==========================================
window.saveTeamSettings = function() {
    matchState.homeTeam = document.getElementById("input-home-team").value.toUpperCase() || "HOME";
    matchState.awayTeam = document.getElementById("input-away-team").value.toUpperCase() || "AWAY";
    
    if (db) {
        db.ref('match/meta').update({ homeTeam: matchState.homeTeam, awayTeam: matchState.awayTeam });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

window.savePlayerSettings = function() {
    for(let i=0; i<4; i++) {
        matchState.rahulaPlayers[i] = document.getElementById(`p-home-${i}`).value || `Player ${i+1}`;
        matchState.thomasPlayers[i] = document.getElementById(`p-away-${i}`).value || `Player ${i+1}`;
    }
    
    if (db) {
        db.ref('match/players').update({ rahula: matchState.rahulaPlayers, thomas: matchState.thomasPlayers });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

window.saveStreamSettings = function() {
    matchState.streamNotice = document.getElementById("input-stream-notice").value || "LIVE AREA ACTIVE";
    
    if (db) {
        db.ref('match/meta').update({ streamNotice: matchState.streamNotice });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

window.saveTickerSettings = function() {
    matchState.tickerText = document.getElementById("input-ticker-text").value || "...";
    
    if (db) {
        db.ref('match/meta').update({ tickerText: matchState.tickerText });
    } else {
        saveLocalState();
        syncDisplayUI();
    }
};

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
// ⏱️ MATCH CLOCK (TIMER) SYSTEM LOGIC
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
// 📊 LIVE SCOREBOARD CORE MATRIX TELEMETRY
// ==========================================
function syncDisplayUI() {
    // Scoreboard Core Elements
    document.getElementById("score-home").innerText = matchState.homeScore;
    document.getElementById("score-away").innerText = matchState.awayScore;
    document.getElementById("matrix-home-score").innerText = matchState.homeScore;
    document.getElementById("matrix-away-score").innerText = matchState.awayScore;
    
    // Dynamic Team Names Injection
    document.getElementById("title-home-team").innerText = matchState.homeTeam;
    document.getElementById("title-away-team").innerText = matchState.awayTeam;
    document.getElementById("board-home-name").innerText = matchState.homeTeam;
    document.getElementById("board-away-name").innerText = matchState.awayTeam;
    
    // Dynamic Squad Section Configuration
    document.getElementById("squad-home-title").innerText = `${matchState.homeTeam} SQUAD`;
    document.getElementById("squad-away-title").innerText = `${matchState.awayTeam} SQUAD`;
    document.getElementById("admin-p-home-title").innerHTML = `<i class="fa-solid fa-users"></i> ${matchState.homeTeam} SQUAD`;
    document.getElementById("admin-p-away-title").innerHTML = `<i class="fa-solid fa-users"></i> ${matchState.awayTeam} SQUAD`;
    
    // Ball Possession Text Synchronization
    document.getElementById("pos-home-name").innerText = matchState.homeTeam;
    document.getElementById("pos-away-name").innerText = matchState.awayTeam;
    document.getElementById("pos-home").innerText = matchState.possession;
    document.getElementById("pos-away").innerText = 100 - matchState.possession;
    document.getElementById("pos-bar").style.width = matchState.possession + "%";

    // Header Status Sync
    document.getElementById("display-stream-notice").innerText = matchState.streamNotice;
    
    // Moving News Ticker Feed Sync
    document.getElementById("live-ticker-strip").innerText = matchState.tickerText;

    // Build Player Squad HTML Lists
    const homeList = document.getElementById("squad-home-list");
    const awayList = document.getElementById("squad-away-list");
    
    let homeHTML = "";
    matchState.rahulaPlayers.forEach((player, index) => {
        let num = index === 0 ? "01" : index === 1 ? "07" : index === 2 ? "09" : "10";
        homeHTML += `<li><span class="jersey-num">${num}</span> ${player}</li>`;
    });
    homeList.innerHTML = homeHTML;

    let awayHTML = "";
    matchState.thomasPlayers.forEach((player, index) => {
        let num = index === 0 ? "01" : index === 1 ? "10" : index === 2 ? "11" : "08";
        awayHTML += `<li><span class="jersey-num">${num}</span> ${player}</li>`;
    });
    awayList.innerHTML = awayHTML;
}

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
} else {
    syncDisplayUI();
    updateTimerUI();
}