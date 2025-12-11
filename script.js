// ============================================
// Global Variables and Configuration
// ============================================

let map;
let marker;
let trail;
let routeIndex = 0;
let progress = 0;
let soundEnabled = false;
let audio;

// Baltimore Route - Centered around Johns Hopkins Homewood Campus area
const baltimorRoute = [
    { lat: 39.3299, lng: -76.6205, name: "Johns Hopkins Homewood Campus" },
    { lat: 39.3310, lng: -76.6220, name: "MSE Library" },
    { lat: 39.3285, lng: -76.6225, name: "Freshman Quad" },
    { lat: 39.3275, lng: -76.6195, name: "Wyman Quad" },
    { lat: 39.3290, lng: -76.6185, name: "Gilman Hall" },
    { lat: 39.3305, lng: -76.6175, name: "Bloomberg Student Center" },
    { lat: 39.3280, lng: -76.6165, name: "Brody Learning Commons" },
    { lat: 39.3265, lng: -76.6180, name: "The Rec" },
    { lat: 39.3270, lng: -76.6210, name: "Wyman Park Dell" },
    { lat: 39.3285, lng: -76.6240, name: "Art Museum Drive" },
    { lat: 39.3300, lng: -76.6235, name: "San Martin Drive" },
    { lat: 39.3310, lng: -76.6210, name: "N Charles St" }
];

// Stats
let stats = {
    scoops: 127,
    distance: 3.2,
    customers: 45,
    flavorIndex: 0
};

const flavors = [
    "Chocolate Chip",
    "Strawberry Dream",
    "Vanilla Bean",
    "Mango Sorbet",
    "Cookie Dough",
    "Coconut Paradise",
    "Lemon Zest",
    "Mint Chip",
    "Peach Cobbler",
    "Banana Split"
];

const reviews = [
    { author: "Sarah M.", stars: 5, text: "Bobette's ice cream saved my study session! Best chocolate chip ever!" },
    { author: "Mike T.", stars: 5, text: "Saw her biking down St. Paul St - the ice cream is as sweet as her smile!" },
    { author: "Emily R.", stars: 5, text: "The mango sorbet is INCREDIBLE. Worth chasing the bike for!" },
    { author: "David L.", stars: 5, text: "Hopkins students unite! This is our new favorite dessert spot on wheels!" },
    { author: "Jessica K.", stars: 5, text: "Found her near campus - the cookie dough flavor is too good!" },
    { author: "Alex P.", stars: 5, text: "Real talk: I've been tracking this bike all day. No regrets. Pure joy." },
    { author: "Rachel W.", stars: 5, text: "Bobette brightened my day in Charles Village. 10/10 would recommend!" },
    { author: "Tom H.", stars: 5, text: "The peach cobbler ice cream tastes like grandma's kitchen. Amazing!" }
];

let reviewIndex = 0;

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initSprinkles();
    initStats();
    initEventListeners();
    startAnimations();

    // Start audio (muted)
    initAudio();
});

// ============================================
// Map Initialization
// ============================================

function initMap() {
    // Center map on Johns Hopkins area
    map = L.map('map').setView([39.3299, -76.6205], 14);

    // Add tile layer with a nice style
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Create custom ice cream bike icon
    const iceCreamIcon = L.divIcon({
        className: 'ice-cream-marker',
        html: `<div style="font-size: 2rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🍦🚴‍♀️</div>`,
        iconSize: [60, 60],
        iconAnchor: [30, 30]
    });

    // Add marker
    marker = L.marker([baltimorRoute[0].lat, baltimorRoute[0].lng], {
        icon: iceCreamIcon
    }).addTo(map);

    // Initialize trail (polyline)
    trail = L.polyline([], {
        color: '#FF69B4',
        weight: 3,
        opacity: 0.6,
        dashArray: '10, 5',
        lineJoin: 'round'
    }).addTo(map);

    // Draw the full route as a reference
    const routeCoords = baltimorRoute.map(point => [point.lat, point.lng]);
    L.polyline(routeCoords, {
        color: '#FFB347',
        weight: 2,
        opacity: 0.3,
        dashArray: '5, 10'
    }).addTo(map);
}

// ============================================
// Sprinkles Animation
// ============================================

function initSprinkles() {
    const container = document.getElementById('sprinklesContainer');
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D4EDD'];

    // Create 30 sprinkles
    for (let i = 0; i < 30; i++) {
        createSprinkle(container, colors);
    }
}

function createSprinkle(container, colors) {
    const sprinkle = document.createElement('div');
    sprinkle.className = 'sprinkle';
    sprinkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    sprinkle.style.left = `${Math.random() * 100}%`;
    sprinkle.style.animationDuration = `${5 + Math.random() * 10}s`;
    sprinkle.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(sprinkle);
}

// ============================================
// Stats Initialization
// ============================================

function initStats() {
    // Set flavor based on today's date so it stays the same all day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    stats.flavorIndex = dayOfYear % flavors.length;

    updateScoops();
    updateFlavor();
    updateDistance();
    updateCustomers();
}

function updateScoops() {
    document.getElementById('scoopsServed').textContent = stats.scoops;
}

function updateFlavor() {
    document.getElementById('flavorOfDay').textContent = flavors[stats.flavorIndex];
}

function updateDistance() {
    document.getElementById('distanceTraveled').textContent = stats.distance.toFixed(1) + ' mi';
}

function updateCustomers() {
    document.getElementById('happyCustomers').textContent = stats.customers;
}

// ============================================
// Event Listeners
// ============================================

function initEventListeners() {
    // Sound toggle
    document.getElementById('soundToggle').addEventListener('click', toggleSound);

    // Order button
    document.getElementById('orderButton').addEventListener('click', handleOrder);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const icon = document.getElementById('soundIcon');

    if (soundEnabled) {
        icon.textContent = '🔊';
        if (audio) audio.play().catch(() => { });
    } else {
        icon.textContent = '🔇';
        if (audio) audio.pause();
    }
}

function handleOrder() {
    // Create confetti
    createConfetti();

    // Show silly message
    const btn = document.getElementById('orderButton');
    const originalText = btn.textContent;
    const originalBg = btn.style.background;
    btn.textContent = "Just kidding! This is a joke site!";
    btn.style.background = 'linear-gradient(135deg, #FF69B4 0%, #9D4EDD 100%)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = originalBg;
    }, 3000);
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D4EDD', '#FF69B4'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '0';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// ============================================
// Audio Initialization
// ============================================

function initAudio() {
    // Create AudioContext for ice cream truck melody
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    // Ice cream truck melody notes (in Hz)
    // "Turkey in the Straw" style melody
    const melody = [
        { freq: 659.25, duration: 0.2 }, // E
        { freq: 587.33, duration: 0.2 }, // D
        { freq: 523.25, duration: 0.2 }, // C
        { freq: 587.33, duration: 0.2 }, // D
        { freq: 659.25, duration: 0.4 }, // E
        { freq: 659.25, duration: 0.4 }, // E
        { freq: 587.33, duration: 0.2 }, // D
        { freq: 587.33, duration: 0.2 }, // D
        { freq: 659.25, duration: 0.2 }, // E
        { freq: 783.99, duration: 0.4 }, // G
        { freq: 783.99, duration: 0.4 }, // G
    ];

    let currentNote = 0;
    let isPlaying = false;
    let scheduledTime = audioContext.currentTime;

    function playNote(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        // Envelope for smoother sound
        gainNode.gain.setValueAtTime(0, scheduledTime);
        gainNode.gain.linearRampToValueAtTime(0.1, scheduledTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0.05, scheduledTime + duration - 0.01);
        gainNode.gain.linearRampToValueAtTime(0, scheduledTime + duration);

        oscillator.start(scheduledTime);
        oscillator.stop(scheduledTime + duration);

        scheduledTime += duration;
        currentNote = (currentNote + 1) % melody.length;

        // Schedule next note
        if (isPlaying) {
            setTimeout(() => {
                if (isPlaying) {
                    const note = melody[currentNote];
                    playNote(note.freq, note.duration);
                }
            }, duration * 1000);
        }
    }

    audio = {
        play: () => {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            isPlaying = true;
            scheduledTime = audioContext.currentTime;
            currentNote = 0;
            const note = melody[currentNote];
            playNote(note.freq, note.duration);
            return Promise.resolve();
        },
        pause: () => {
            isPlaying = false;
        }
    };
}

// ============================================
// Main Animation Loop
// ============================================

function startAnimations() {
    // Animate marker movement
    animateMarker();

    // Update stats periodically
    setInterval(updateLiveStats, 10000); // Every 10 seconds

    // Update speed and ETA periodically (not every frame)
    setInterval(updateSpeed, 5000); // Every 5 seconds
    setInterval(updateETA, 5000); // Every 5 seconds
    updateSpeed(); // Initial update
    updateETA(); // Initial update

    // Add reviews periodically
    setInterval(addReview, 45000); // Every 45 seconds
    addReview(); // Add first review immediately

    // Update timestamps
    setInterval(updateTimestamp, 30000); // Every 30 seconds
    updateTimestamp();
}

function animateMarker() {
    requestAnimationFrame(animate);
}

function animate() {
    // Smooth interpolation between route points
    const start = baltimorRoute[routeIndex];
    const end = baltimorRoute[(routeIndex + 1) % baltimorRoute.length];

    // Lerp (linear interpolation)
    const lat = start.lat + (end.lat - start.lat) * progress;
    const lng = start.lng + (end.lng - start.lng) * progress;

    // Update marker position
    marker.setLatLng([lat, lng]);

    // Update trail
    const trailCoords = trail.getLatLngs();
    trailCoords.push([lat, lng]);

    // Keep trail to last 50 points
    if (trailCoords.length > 50) {
        trailCoords.shift();
    }
    trail.setLatLngs(trailCoords);

    // Update progress
    progress += 0.001; // Smooth movement speed

    if (progress >= 1) {
        progress = 0;
        routeIndex = (routeIndex + 1) % baltimorRoute.length;

        // Update location display
        updateLocation();
    }

    requestAnimationFrame(animate);
}

// ============================================
// Live Updates
// ============================================

function updateLocation() {
    const location = baltimorRoute[routeIndex].name;
    document.getElementById('currentLocation').textContent = location;
}

function updateTimestamp() {
    const minutes = Math.floor(Math.random() * 3) + 1; // 1-3 minutes ago
    document.getElementById('lastSeen').textContent = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
}

function updateSpeed() {
    const speed = (10 + Math.random() * 3).toFixed(1); // 10-13 mph
    document.getElementById('speed').textContent = `${speed} mph`;
}

function updateETA() {
    const eta = Math.floor(Math.random() * 11) + 10; // 10-20 minutes
    document.getElementById('eta').textContent = `${eta} minutes`;
}

function updateLiveStats() {
    // Increment scoops
    stats.scoops += Math.floor(Math.random() * 5) + 1;
    updateScoops();

    // Increment distance slightly
    stats.distance += Math.random() * 0.3;
    updateDistance();

    // Increment customers
    stats.customers += Math.floor(Math.random() * 3);
    updateCustomers();

    // Flavor stays the same all day - don't change it
}

// ============================================
// Reviews System
// ============================================

function addReview() {
    const container = document.getElementById('reviewsContainer');
    const review = reviews[reviewIndex % reviews.length];

    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';

    reviewCard.innerHTML = `
        <div class="review-header">
            <span class="review-author">${review.author}</span>
            <span class="review-stars">${'⭐'.repeat(review.stars)}</span>
        </div>
        <div class="review-text">${review.text}</div>
    `;

    container.insertBefore(reviewCard, container.firstChild);

    // Keep only last 5 reviews visible
    while (container.children.length > 5) {
        container.removeChild(container.lastChild);
    }

    reviewIndex++;
}

// ============================================
// Initial Location Update
// ============================================

updateLocation();
