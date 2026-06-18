gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 🔥 FIREBASE REALTIME DATABASE CONFIGURATION
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const matchRef = db.ref("live_match_matrix");

document.addEventListener("DOMContentLoaded", () => {

    // Central Data Core State Architect
    let state = {
        homeTeam: "RAHULA COLLEGE", awayTeam: "ST. THOMAS' COLLEGE",
        homeScore: 0, awayScore: 0, minutes: 0, seconds: 0, isClockRunning: false,
        hShots: 6, aShots: 4, hCorners: 3, aCorners: 2, hFouls: 4, aFouls: 7
    };

    let clockInterval = null;

    // Cloud DB Broadcast Sync 
    function syncAndRender() {
        matchRef.set(state);
    }

    // 🔥 Realtime Firebase Listener (අනෙක් සියලුම ටැබ් සහ OBS ස්ක්‍රීන් ක්ෂණිකව අප්ඩේට් කරයි)
    matchRef.on("value", (snapshot) => {
        const cloudData = snapshot.val();
        if (cloudData) {
            state = cloudData;
            applyDataToUI();
            
            // Background Clock State Synchronization
            if (state.isClockRunning && !clockInterval) {
                initiateLocalClockLoop();
            } else if (!state.isClockRunning && clockInterval) {
                clearInterval(clockInterval);
                clockInterval = null;
            }
        }
    });


    // ==========================================
    // 🌐 CYBER CORE PRELOADER ENGINE
    // ==========================================
    const pctLabel = document.getElementById("load-pct");
    const logLabel = document.getElementById("load-log");
    const preloaderEl = document.getElementById("cyber-preloader");

    const bootLogs = [
        "INITIALIZING CORE SYSTEM MATRICES...",
        "STABILIZING OBS BROADCAST STREAM...",
        "CONNECTING TO FIREBASE CLOUD REALTIME DB...",
        "MOUNTING 3D GEOMETRIC PLAYGROUND...",
        "ENGAGING REALTIME TELEMETRY MATRIX...",
        "STREAM REVOLUTION READY!"
    ];

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 2;
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(progressInterval);
            
            gsap.to(preloaderEl, {
                opacity: 0, scale: 1.1, duration: 0.6, ease: "power3.inOut",
                onComplete: () => {
                    preloaderEl.style.display = "none";
                    startMainSiteAnimations();
                    initPremium3DCyberEngine();
                }
            });
        }
        pctLabel.innerText = (currentProgress < 10 ? "0" : "") + currentProgress + "%";
        
        let currentLogStage = Math.floor((currentProgress / 100) * bootLogs.length);
        if(currentLogStage < bootLogs.length) {
            logLabel.innerText = bootLogs[currentLogStage];
        }
    }, 45);


    let techBallMesh, ringParticles;

    // ==========================================
    // 🌐 HIGH-END HOLOGRAPHIC 3D SPORTS ENGINE
    // ==========================================
    function initPremium3DCyberEngine() {
        const container = document.getElementById("canvas-3d-container");
        const matrixText = document.getElementById("current-skill-txt");

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(0, 2, 4.5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const cyberCoreGroup = new THREE.Group();
        scene.add(cyberCoreGroup);

        const ballGeometry = new THREE.IcosahedronGeometry(0.8, 1);
        const ballWireframeMat = new THREE.MeshBasicMaterial({
            color: 0xFFD700, wireframe: true, transparent: true, opacity: 0.8
        });
        techBallMesh = new THREE.Mesh(ballGeometry, ballWireframeMat);
        cyberCoreGroup.add(techBallMesh);

        const innerCoreGeo = new THREE.SphereGeometry(0.75, 16, 16);
        const innerCoreMat = new THREE.MeshBasicMaterial({
            color: 0x002060, transparent: true, opacity: 0.45
        });
        const innerBallMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
        techBallMesh.add(innerBallMesh);

        const particleCount = 200;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for(let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 1.3 + Math.random() * 0.4;
            positions[i*3] = Math.cos(angle) * radius;
            positions[i*3+1] = (Math.random() - 0.5) * 0.2;
            positions[i*3+2] = Math.sin(angle) * radius;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x5286ff, size: 0.035, transparent: true, opacity: 0.9
        });
        ringParticles = new THREE.Points(particleGeometry, particleMaterial);
        cyberCoreGroup.add(ringParticles);

        const gridHelper = new THREE.GridHelper(4, 20, 0x002060, 0x07122c);
        gridHelper.position.y = -1.2;
        scene.add(gridHelper);

        // ⚽ 3D Particles Burst Effect
        gsap.fromTo(techBallMesh.scale, 
            { x: 0, y: 0, z: 0 }, 
            { x: 1, y: 1, z: 1, duration: 1.5, ease: "elastic.out(1, 0.3)", delay: 0.2 }
        );
        gsap.fromTo(ringParticles.scale, 
            { x: 4, y: 4, z: 4 }, 
            { x: 1, y: 1, z: 1, duration: 1.8, ease: "power4.out" }
        );

        let clock = new THREE.Clock();

        function renderMatrixLoop() {
            requestAnimationFrame(renderMatrixLoop);
            const elapsed = clock.getElapsedTime();
            const sequence = Math.floor(elapsed / 3.5) % 3;

            techBallMesh.rotation.y += 0.008;
            techBallMesh.rotation.x += 0.003;
            ringParticles.rotation.y -= 0.015;
            cyberCoreGroup.position.y = Math.sin(elapsed * 2) * 0.12;

            if (sequence === 0) {
                matrixText.innerText = "STREAM INGEST";
                particleMaterial.color.setHex(0x5286ff);
            } else if (sequence === 1) {
                matrixText.innerText = "MATRIX ACTIVE";
                particleMaterial.color.setHex(0xFFD700);
            } else if (sequence === 2) {
                matrixText.innerText = "TELEMETRY SYNC";
                particleMaterial.color.setHex(0x00ff66);
            }
            renderer.render(scene, camera);
        }
        renderMatrixLoop();

        window.addEventListener("resize", () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }


    // ==========================================
    // 📄 GSAP LAYOUT ANIMATIONS ENGINE
    // ==========================================
    function startMainSiteAnimations() {
        // 💥 TEXT EXPLOSION ENGINE
        const titleEl = document.querySelector(".exploding-title");
        const lettersStr = titleEl.textContent.split("");
        titleEl.innerHTML = "";

        lettersStr.forEach(char => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.className = "exploding-letter";
            titleEl.appendChild(span);
        });

        const tlHero = gsap.timeline();
        tlHero.from(".logo", { opacity: 0, x: -30, duration: 0.8, ease: "power3.out" })
              .from(".nav-right-elements", { opacity: 0, x: 30, duration: 0.8, ease: "power3.out" }, "-=0.8")
              .from(".hero-tag", { opacity: 0, y: 20, duration: 0.5 })
              .from(".exploding-letter", {
                  opacity: 0, scale: 4,
                  x: () => Math.random() * 400 - 200,
                  y: () => Math.random() * 400 - 200,
                  z: () => Math.random() * 400 - 200,
                  rotationX: () => Math.random() * 180 - 90,
                  rotationY: () => Math.random() * 180 - 90,
                  filter: "blur(15px)", duration: 1.4, stagger: 0.02, ease: "power4.out"
              }, "-=0.3")
              .from(".hero-content p", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.8");

        // 💨 SCROLL VAPORIZATION EFFECT
        gsap.to([".hero-content", ".hero-animation-arena"], {
            scrollTrigger: {
                trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1
            },
            opacity: 0, y: -120, filter: "blur(25px)", scale: 0.93, transformOrigin: "center top", ease: "none"
        });

        gsap.utils.toArray(".anim-scroll").forEach(element => {
            gsap.from(element, {
                scrollTrigger: { trigger: element, start: "top 88%" },
                opacity: 0, y: 35, duration: 0.8, ease: "power3.out"
            });
        });
    }


    // ==========================================
    // 🎛️ SLIDING ADMIN DRAWER & GATE ACCESS
    // ==========================================
    const adminSidebar = document.getElementById("admin-sidebar");
    const adminMenuBtn = document.getElementById("admin-menu-btn");
    const adminCloseBtn = document.getElementById("admin-close-btn");

    const authScreen = document.getElementById("admin-auth-screen");
    const controlsContent = document.getElementById("admin-controls-content");
    const passInput = document.getElementById("admin-pass-input");
    const authSubmitBtn = document.getElementById("btn-auth-submit");
    const authErrorMsg = document.getElementById("auth-error-msg");

    function openAdminSidebar() { gsap.to(adminSidebar, { right: 0, duration: 0.5, ease: "power3.out" }); }
    function closeAdminSidebar() { gsap.to(adminSidebar, { right: "-480px", duration: 0.4, ease: "power3.in" }); }

    adminMenuBtn.addEventListener("click", openAdminSidebar);
    adminCloseBtn.addEventListener("click", closeAdminSidebar);
    
    authSubmitBtn.addEventListener("click", () => {
        const targetGateKey = "Yenuka is back";
        if (passInput.value === targetGateKey) {
            passInput.value = "";
            gsap.to(authScreen, { opacity: 0, duration: 0.3, onComplete: () => {
                authScreen.style.display = "none";
                controlsContent.style.display = "block";
                gsap.fromTo(controlsContent, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
            }});
        } else {
            authErrorMsg.innerText = "ACCESS DENIED: INVALID QUANTUM KEY";
            gsap.fromTo(passInput, { x: -10 }, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
        }
    });

    passInput.addEventListener("keypress", (e) => { if(e.key === "Enter") authSubmitBtn.click(); });


    // ==========================================
    // 📊 CORE UI RENDERING MATRIX
    // ==========================================
    function applyDataToUI() {
        document.getElementById("ov-home-name").innerText = state.homeTeam;
        document.getElementById("ov-away-name").innerText = state.awayTeam;
        document.getElementById("ov-home-score").innerText = state.homeScore;
        document.getElementById("ov-away-score").innerText = state.awayScore;
        document.getElementById("ctrl-home-label").innerText = state.homeTeam;
        document.getElementById("ctrl-away-label").innerText = state.awayTeam;
        document.getElementById("ctrl-home-score-view").innerText = state.homeScore;
        document.getElementById("ctrl-away-score-view").innerText = state.awayScore;

        document.getElementById("lbl-an-hshots").innerText = state.hShots;
        document.getElementById("lbl-an-ashots").innerText = state.aShots;
        document.getElementById("lbl-an-hcorners").innerText = state.hCorners;
        document.getElementById("lbl-an-acorners").innerText = state.aCorners;
        document.getElementById("lbl-an-hfouls").innerText = state.hFouls;
        document.getElementById("lbl-an-afouls").innerText = state.aFouls;

        calculateBarWidth("bar-an-shots", state.hShots, state.aShots);
        calculateBarWidth("bar-an-corners", state.hCorners, state.aCorners);
        calculateBarWidth("bar-an-fouls", state.hFouls, state.aFouls);

        let displayMin = state.minutes < 10 ? "0" + state.minutes : state.minutes;
        let displaySec = state.seconds < 10 ? "0" + state.seconds : state.seconds;
        let formattedTime = displayMin + ":" + displaySec;
        document.getElementById("ov-timer").innerText = formattedTime;
        document.getElementById("deck-timer-view").innerText = formattedTime;
    }

    function calculateBarWidth(elementId, homeVal, awayVal) {
        let total = homeVal + awayVal;
        let percentage = total === 0 ? 50 : (homeVal / total) * 100;
        document.getElementById(elementId).style.width = percentage + "%";
    }

    window.changeTelemetry = function(key, val) { state[key] += val; syncAndRender(); };
    window.resetTelemetry = function(group) { state['h' + group] = 0; state['a' + group] = 0; syncAndRender(); };

    document.getElementById("btn-update-names").addEventListener("click", () => {
        state.homeTeam = document.getElementById("input-home-name").value.toUpperCase();
        state.awayTeam = document.getElementById("input-away-name").value.toUpperCase();
        syncAndRender();
    });

    document.getElementById("btn-home-up").addEventListener("click", () => { state.homeScore++; syncAndRender(); });
    document.getElementById("btn-home-down").addEventListener("click", () => { if(state.homeScore > 0) state.homeScore--; syncAndRender(); });
    document.getElementById("btn-away-up").addEventListener("click", () => { state.awayScore++; syncAndRender(); });
    document.getElementById("btn-away-down").addEventListener("click", () => { if(state.awayScore > 0) state.awayScore--; syncAndRender(); });

    function initiateLocalClockLoop() {
        if (clockInterval) clearInterval(clockInterval);
        clockInterval = setInterval(() => {
            // Only the master/admin active tab updates the tick to prevent duplicate increments
            state.seconds++;
            if (state.seconds >= 60) { state.seconds = 0; state.minutes++; }
            syncAndRender();
        }, 1000);
    }

    document.getElementById("btn-start").addEventListener("click", () => { state.isClockRunning = true; syncAndRender(); });
    document.getElementById("btn-pause").addEventListener("click", () => { state.isClockRunning = false; syncAndRender(); });
    document.getElementById("btn-reset").addEventListener("click", () => { state.isClockRunning = false; state.minutes = 0; state.seconds = 0; syncAndRender(); });
    document.getElementById("btn-set-time").addEventListener("click", () => {
        let userMin = parseInt(document.getElementById("input-custom-min").value);
        if(!isNaN(userMin) && userMin >= 0) { state.minutes = userMin; state.seconds = 0; syncAndRender(); }
    });
});