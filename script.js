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

// Global Match State Registry
let matchState = {
    homeScore: 0,
    awayScore: 0,
    possession: 50,
    totalSeconds: 1200,
    isClockRunning: false
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

// Load cache immediately
loadLocalState();

// ==========================================
// ⚡ FAIL-SAFE PRELOADER SUBSYSTEM (FIXED 00% STUCK)
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
    }, 45); // Cleaned processing interval speed
});

// ==========================================
// 📺 OBS LIVE STREAM OVERLAY TOGGLE
// ==========================================
const obsBtn = document.getElementById("obs-mode-btn");
if (obsBtn) {
    obsBtn.addEventListener("click", () => {
        document.body.classList.toggle("obs-stream-active");
        if(document.body.classList.contains("obs-stream-active")) {
            obsBtn.innerHTML = `<i class="fa-solid fa-window-restore"></i> EXIT OBS`;
        } else {
            obsBtn.innerHTML = `<i class="fa-solid fa-video"></i> OBS MODE`;
        }
    });
}

// ==========================================
// 🛡️ SLIDING SIDEBAR SECURITY SYSTEMS
// ==========================================
const sidebar = document.getElementById("admin-sidebar");
const openBtn = document.getElementById("admin-menu-btn");
const closeBtn = document.getElementById("admin-close-btn");
const launchBtn = document.getElementById("hero-launch-btn");

const openAdminSidebar = () => sidebar?.classList.add("open");
const closeAdminSidebar = () => sidebar?.classList.remove("open");

if (openBtn) openBtn.addEventListener("click", openAdminSidebar);
if (closeBtn) closeBtn.addEventListener("click", closeAdminSidebar);
if (launchBtn) launchBtn.addEventListener("click", openAdminSidebar);

const loginBtn = document.getElementById("admin-login-btn");
const authScreen = document.getElementById("admin-auth-screen");
const controlsContent = document.getElementById("admin-controls-content");
const errorMsg = document.getElementById("auth-error-msg");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const adminPassInput = document.getElementById("admin-pass");
        if (!adminPassInput) return;
        
        if (adminPassInput.value === "yenuka is back") {
            if (authScreen) authScreen.style.display = "none";
            if (controlsContent) controlsContent.style.display = "block";
            if (errorMsg) errorMsg.innerText = "";
        } else {
            if (errorMsg) errorMsg.innerText = "ACCESS DENIED: INVALID PRIVILEGE KEY";
        }
    });
}

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

    // Wireframe Globe Mesh
    const globeGeo = new THREE.IcosahedronGeometry(4.8, 2);
    const globeMat = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    // Cyber Football Structure
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

    // Background Particles
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
    const scoreHome = document.getElementById("score-home");
    const scoreAway = document.getElementById("score-away");
    const matrixHome = document.getElementById("matrix-home-score");
    const matrixAway = document.getElementById("matrix-away-score");
    const posHome = document.getElementById("pos-home");
    const posAway = document.getElementById("pos-away");
    const posBar = document.getElementById("pos-bar");

    if (scoreHome) scoreHome.innerText = matchState.homeScore;
    if (scoreAway) scoreAway.innerText = matchState.awayScore;
    if (matrixHome) matrixHome.innerText = matchState.homeScore;
    if (matrixAway) matrixAway.innerText = matchState.awayScore;
    
    if (posHome) posHome.innerText = matchState.possession;
    if (posAway) posAway.innerText = 100 - matchState.possession;
    if (posBar) posBar.style.width = matchState.possession + "%";
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