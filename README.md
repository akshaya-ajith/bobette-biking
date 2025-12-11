# 🍦 Bobette's Ice Cream Bike Tracker

A playful, single-page website that humorously tracks "Bobette" the ice cream cyclist's location in real-time around Baltimore, MD. Built as a fun school project featuring Johns Hopkins Homewood Campus, Charles Village, and Hampden neighborhoods.

![Ice Cream Bike](https://img.shields.io/badge/Status-Delivering%20Joy-FF69B4?style=for-the-badge)
![Baltimore](https://img.shields.io/badge/Location-Baltimore%2C%20MD-FFB347?style=for-the-badge)

## ✨ Features

### 🗺️ Animated Map Tracker
- Interactive map powered by Leaflet.js
- Smooth, continuous animation of Bobette's movement
- Custom ice cream bike marker (🍦🚴‍♀️)
- Visual trail showing recent path
- Looping route through Baltimore neighborhoods

### 📍 Fake "Live" Updates
- Current location/neighborhood display
- Timestamp updates ("Last seen: 2 minutes ago")
- Fake ETA calculations
- Current speed indicator (8-15 mph range)

### 📊 Fun Stats Dashboard
- Live "Scoops Served Today" counter
- Rotating "Flavor of the Day"
- Distance traveled tracker
- Happy customers count
- All stats update periodically to feel live!

### 🎨 Visual Design
- Ice cream aesthetic with warm browns, peachy-oranges, and pinks
- Colorful sprinkle decorations falling across the page
- Glassmorphism UI cards
- Smooth animations and hover effects
- Playful fonts (Fredoka One & Quicksand)
- Fully mobile responsive

### 🎁 Bonus Features
- **Trail System**: See where Bobette has been
- **Customer Reviews**: Fake testimonials appear periodically
- **Sound Toggle**: Ice cream truck music control
- **Silly Order Button**: Click for a surprise! 🎉

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process needed.

```bash
# Simple local server (optional)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

Follow these steps to deploy your ice cream tracker to GitHub Pages for free:

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository: `bob-bike` (or any name you prefer)
4. Set it to **Public**
5. Click "Create repository"

### Step 2: Upload Your Files

**Option A: Via GitHub Web Interface**
1. In your new repository, click "uploading an existing file"
2. Drag and drop all files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Click "Commit changes"

**Option B: Via Git Command Line**
```bash
cd /Users/akshaya/.gemini/antigravity/scratch/bob-bike

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Bobette's Ice Cream Bike Tracker"

# Add your GitHub repository as remote
git remote add origin https://github.com/akshaya-ajith/bob-bike.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, click **Settings**
2. Scroll down to **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Live Site

Your site will be available at:
```
https://akshaya-ajith.github.io/bob-bike/
```

🎉 **That's it!** Share the link with friends and watch them try to order ice cream!

## 🛠️ Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Custom styling with modern features
  - CSS Variables
  - Flexbox & Grid
  - Animations & Transitions
  - Glassmorphism effects
- **JavaScript (ES6+)**: Core functionality
  - RequestAnimationFrame for smooth animations
  - Geospatial calculations
  - Dynamic DOM manipulation
- **Leaflet.js**: Interactive mapping library
- **Google Fonts**: Fredoka One & Quicksand

## 📱 Browser Compatibility

Works great on:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Color Palette

- **Chocolate Browns**: `#654321`, `#8B4513`
- **Waffle Cone Orange**: `#FFB347`, `#FFCC99`
- **Ice Cream Pinks**: `#FFB6C1`, `#FF69B4`
- **Vanilla Cream**: `#FFF8DC`
- **Sprinkle Colors**: Rainbow accents

## 📍 Baltimore Route

The tracker follows a fun route through:
1. Johns Hopkins Homewood Campus
2. Wyman Park
3. Charles Village (St. Paul, Calvert, N Charles St)
4. Guilford
5. York Road
6. Tuscany-Canterbury
7. Homeland
8. Evergreen
9. Hampden (The Avenue & 36th Street)
10. Remington
11. Old Goucher
12. Barclay

## 🤝 Contributing

This is a school project joke website, but feel free to fork it and make your own version! Ideas:
- Change the route to your city
- Add different ice cream flavors
- Customize the color scheme
- Add your own silly features

## 📄 License

MIT License - Feel free to use this for your own fun projects!

## 🙏 Credits

- Built with ❤️ and 🍦
- Map tiles by [OpenStreetMap](https://www.openstreetmap.org/)
- Icons: Emoji (native)
- Fonts: [Google Fonts](https://fonts.google.com/)

## ⚠️ Disclaimer

This is a **joke website** for a school project. There is no actual ice cream delivery service. Bobette is not real (unfortunately). If you click the "Order" button, you'll just get confetti and disappointment! 😂

---

**Bob and Her Bike** - Spreading joy, one scoop at a time! 🍦🚴‍♀️
