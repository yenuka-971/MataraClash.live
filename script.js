// ==========================================
// 🔥 CENTRAL FIREBASE MATRIX CONFIGURATION
// ==========================================
// ⚠️ වැදගත්: උඹේ Firebase Console එකෙන් ලැබුණු ඔරිජිනල් කීස් ටික මෙතනට අනිවාර්යයෙන්ම දාන්න.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Safe Firebase Initialization Engine
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

    const loadInterval = setInterval(() => {
        currentPct += Math.floor(Math.random() * 8) + 2;
        
        if (currentPct >= 100) {
            currentPct = 100;
            clearInterval(loadInterval);
            pctDisplay.innerText = "100%";
            statusDisplay.innerText = logs[3];
            
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.transform = "scale(1.05)";
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 500);
            }, 400);
        } else {
            pctDisplay.innerText = (currentPct < 10 ? "0" : "") + currentPct + "%";
            if (currentPct < 30) statusDisplay.innerText = logs[0];
            else if (currentPct < 65) statusDisplay.innerText = logs[1];
            else statusDisplay.innerText = logs[2];
        }
    }, 60);
});

// ==========================================
// 🛡️ SLIDING SIDEBAR SECURITY SYSTEMS
// ==========================================
const sidebar = document.getElementById("admin-sidebar");
const openBtn = document.getElementById("admin-menu-btn");
const closeBtn = document.getElementById("admin-close-btn");
const launchBtn = document.getElementById("hero-launch-btn");

const openAdminSidebar = () => sidebar.classList.add("open");
const closeAdminSidebar = () => sidebar.classList.remove("open");

if (openBtn) openBtn.addEventListener("click", openAdminSidebar);
if (closeBtn) closeBtn.addEventListener("click", closeAdminSidebar);
if (launchBtn) launchBtn.addEventListener("click", openAdminSidebar);

// Admin Authentication Gateway Engine
const loginBtn = document.getElementById("admin-login-btn");
const authScreen = document.getElementById("admin-auth-screen");
const controlsContent = document.getElementById("admin-controls-content");
const errorMsg = document.getElementById("auth-error-msg");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const passVal = document.getElementById("admin-pass").value;
        if (passVal === "yenuka is back") {
            authScreen.style.display = "none";
            controlsContent.style.display = "block";
            errorMsg.innerText = "";
        } else {
            errorMsg.innerText = "ACCESS DENIED: INVALID PRIVILEGE KEY";
        }
    });
}

// ==========================================
// 🧊 THREE.JS 3D WIREFRAME GLOBE GENERATOR
// ==========================================
function init3DPlayground() {
    const container = document.getElementById("canvas-3d-container");
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(5, 2);
    const material = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        wireframe: true,
        transparent: true,
        opacity: 0.55
    });
    const globeMesh = new THREE.Mesh(geometry, material);
    scene.add(globeMesh);

    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 250;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x00ff66
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    function animate() {
        requestAnimationFrame(animate);
        globeMesh.rotation.y += 0.006;
        globeMesh.rotation.x += 0.003;
        particleMesh.rotation.y -= 0.001;
        renderer.render(scene, camera);
    }

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
let totalSeconds = 1200; // Default: 20 minutes (20 * 60)
let timerInterval = null;
let isClockRunning = false;

function updateTimerUI() {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    
    // Formatting to MM:SS string style
    let timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    
    const liveTimer = document.getElementById("live-timer");
    const deckTimer = document.getElementById("deck-timer");
    
    if (liveTimer) liveTimer.innerText = timeStr;
    if (deckTimer) deckTimer.innerText = timeStr;
}

function startClockMechanism() {
    if (isClockRunning) return;
    isClockRunning = true;
    
    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerUI();
            
            // Only the Admin who triggers changes should write the exact tick to Firebase
            // To save database bandwidth, we only sync every second locally if firebase is up
            if (db && authScreen.style.display === "none") {
                db.ref('match/timer').update({ totalSeconds: totalSeconds });
            }
        } else {
            clearInterval(timerInterval);
            isClockRunning = false;
        }
    }, 1000);
}

function pauseClockMechanism() {
    clearInterval(timerInterval);
    isClockRunning = false;
}

// Clock Control Action Listeners
document.getElementById("btn-clock-start")?.addEventListener("click", () => {
    if (db) {
        db.ref('match/timer').update({ isClockRunning: true, totalSeconds: totalSeconds });
    } else {
        startClockMechanism();
    }
});

document.getElementById("btn-clock-pause")?.addEventListener("click", () => {
    if (db) {
        db.ref('match/timer').update({ isClockRunning: false, totalSeconds: totalSeconds });
    } else {
        pauseClockMechanism();
    }
});

document.getElementById("btn-clock-set")?.addEventListener("click", () => {
    const inputVal = document.getElementById("custom-time-input").value;
    const parts = inputVal.split(":");
    if (parts.length === 2) {
        const m = parseInt(parts[0]) || 0;
        const s = parseInt(parts[1]) || 0;
        totalSeconds = (m * 60) + s;
        
        if (db) {
            db.ref('match/timer').update({ totalSeconds: totalSeconds, isClockRunning: false });
        } else {
            pauseClockMechanism();
            updateTimerUI();
        }
    }
});

// ==========================================
// 📊 LIVE SCOREBOARD CORE MATRIX TELEMETRY
// ==========================================
let matchState = {
    homeScore: 0,
    awayScore: 0,
    possession: 50
};

function syncDisplayUI() {
    document.getElementById("score-home").innerText = matchState.homeScore;
    document.getElementById("score-away").innerText = matchState.awayScore;
    document.getElementById("matrix-home-score").innerText = matchState.homeScore;
    document.getElementById("matrix-away-score").innerText = matchState.awayScore;
    
    document.getElementById("pos-home").innerText = matchState.possession;
    document.getElementById("pos-away").innerText = 100 - matchState.possession;
    document.getElementById("pos-bar").style.width = matchState.possession + "%";
}

window.updateScore = function(side, val) {
    if (side === 'home') {
        matchState.homeScore = Math.max(0, matchState.homeScore + val);
    } else {
        matchState.awayScore = Math.max(0, matchState.awayScore + val);
    }
    
    if (db) {
        db.ref('match/').update({
            homeScore: matchState.homeScore,
            awayScore: matchState.awayScore
        });
    } else {
        syncDisplayUI();
    }
};

window.setPossession = function() {
    const val = parseInt(document.getElementById("input-possession").value) || 50;
    matchState.possession = Math.min(100, Math.max(0, val));
    
    if (db) {
        db.ref('match/').update({ possession: matchState.possession });
    } else {
        syncDisplayUI();
    }
};

// ==========================================
// 📡 REALTIME LIVE DATA SYNCHRONIZER (LISTENERS)
// ==========================================
if (db) {
    // 1. Listen for Scoreboard & Possession Updates
    db.ref('match/').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            matchState.homeScore = data.homeScore || 0;
            matchState.awayScore = data.awayScore || 0;
            matchState.possession = data.possession || 50;
            syncDisplayUI();
        }
    });

    // 2. Listen for Realtime Match Clock Updates
    db.ref('match/timer').on('value', (snapshot) => {
        const timerData = snapshot.val();
        if (timerData) {
            totalSeconds = timerData.totalSeconds !== undefined ? timerData.totalSeconds : totalSeconds;
            const cloudRunning = timerData.isClockRunning || false;
            
            if (cloudRunning) {
                startClockMechanism();
            } else {
                pauseClockMechanism();
            }
            updateTimerUI();
        }
    });
} else {
    // Run initial UI updates on local state mode
    syncDisplayUI();
    updateTimerUI();
}