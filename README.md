<div align="center">

# 🏡 Acrolia Homestay — Web Application

  <p align="center">
    <strong>Modern, High-Performance Landing Page & Booking Showcase for Acrolia Homestay Malioboro, Jogja</strong>
  </p>

  <p align="center">
    <a href="#key-features">Key Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#database-schema">Database Schema</a> •
    <a href="#project-structure">Project Structure</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Responsive-Yes-brightgreen?style=for-the-badge" alt="Responsive" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </p>
</div>

---

## 📌 Overview

**Acrolia Homestay Web Application** is a premium, lightweight, and modern website crafted for **Acrolia Homestay**, located just a **1-minute walk from Malioboro & Beringharjo Market**, Yogyakarta.

Designed with elegant typography (*Cormorant Garamond* & *Plus Jakarta Sans*), rich micro-interactions, and a custom Supabase integration, this web application delivers an immersive showcase for potential guests seeking comfortable accommodations for families and groups (6–8 guests).

---

## ✨ Key Features

### 🌟 1. Dynamic Review System & Resilient Fallback
- **Supabase Integration**: Synchronizes verified guest reviews directly from a cloud PostgreSQL database (covering Google Reviews, Booking.com, and Airbnb).
- **Fault-Tolerant Architecture**: Automatically fallback to a curated local dataset (`FALLBACK_REVIEWS`) if Supabase is blocked by client-side adblockers or privacy shields (e.g., Brave Shields).

### 🎠 2. Custom 3-Circle Infinite Hero Carousel
- 3D-styled visual hierarchy with smooth transitions (`active`, `prev-item`, `next-item`).
- Auto-sliding timer (4s interval) with smart hover pause (`mouseenter` / `mouseleave`).
- Seamless touch & click navigation.

### 🖼️ 3. Interactive Space Switcher
- Instant visual documentation preview for different house areas (Living Room, Bedrooms, Kitchen, Amenities).
- Smooth opacity-blend transitions and active tab badging.

### 📸 4. Category-Scoped Lightbox Gallery
- Categorized photo showcase (Interior, Exterior, Bedrooms, Bathroom, Facilities).
- Smooth horizontal page-track scrolling with custom arrow navigation.
- Fullscreen Lightbox Modal supporting category-isolated image sliders.

### 📱 5. Mobile-Native & Touch Optimized
- Fully responsive across desktop, tablet, and mobile breakpoints.
- Custom touch-swipe gesture support (`touchstart` / `touchend`) on review and image sliders.
- Animated mobile navigation drawer with custom toggle buttons.

### ⚡ 6. High Performance (60 FPS Native)
- Zero framework bloat (Vanilla JS & Modern CSS3).
- **Intersection Observer API** for scroll-triggered fade-in animations.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend Core** | HTML5 / Vanilla CSS3 / ES6+ JavaScript | Lightweight, zero-dependency foundation |
| **Database** | [Supabase](https://supabase.com/) | Real-time PostgreSQL BaaS for dynamic guest reviews |
| **Typography** | [Google Fonts](https://fonts.google.com/) | *Cormorant Garamond* (Serif display) & *Plus Jakarta Sans* (Body) |
| **Icons & UI** | Custom SVG & CSS Utilities | Optimized vectors & glassmorphism aesthetic |

---

## 📁 Project Structure

```text
Homestay_1_Simple_Web/
├── assets/                  # High-resolution media & image assets
├── connection/
│   └── supabase.js          # Supabase client setup & safe initialization
├── css/
│   ├── main.css             # Main stylesheet (Hero, Reviews, Space Switcher)
│   ├── gallery.css          # Gallery & Lightbox modal styles
│   └── about.css            # Property details & facility breakdown styles
├── js/
│   ├── main.js              # Home page carousel, review renderer, scroll observer
│   ├── gallery.js           # Category carousels & Lightbox modal controller
│   └── about.js             # About page interactions
├── pages/
│   ├── gallery.html         # Photo gallery page
│   ├── about.html           # Property info, amenities, and location guide
│   └── review.html          # Detailed review page
├── index.html               # Main landing page
└── README.md                # Project documentation
```

---

## 🗄️ Database Schema (Supabase)

The review showcase connects to a Supabase table named `reviews`. Below is the schema structure used by the app:

```sql
CREATE TABLE reviews (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_subtitle TEXT,
  platform TEXT CHECK (platform IN ('google', 'booking', 'airbnb')),
  platform_label TEXT NOT NULL,
  avatar_initial VARCHAR(5),
  review_short TEXT NOT NULL,
  review_full TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

### Sample Data Insertion
```sql
INSERT INTO reviews (guest_name, guest_subtitle, platform, platform_label, avatar_initial, review_short, review_full, display_order)
VALUES 
  ('Felix', '4 reviews • 2 photos', 'google', 'Google 5.0 ★', 'F', 'This place is very affordable and cozy near Malioboro...', 'This place is very affordable and cozy near Malioboro...', 1),
  ('Hani', 'Airbnb Guest', 'airbnb', 'Airbnb 5.0 ★', 'H', 'The place is very strategic, very close to Malioboro...', 'The place is very strategic, very close to Malioboro...', 2);
```

---

## 🚀 Getting Started

Since this project uses pure HTML5/CSS3/JS, no build step or `npm install` is required!

### Option 1: Live Server (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Homestay_1_Simple_Web.git
   cd Homestay_1_Simple_Web
   ```
2. Open with VS Code and start the **Live Server** extension on `index.html`.

### Option 2: Python Local HTTP Server
```bash
# Python 3
python -m http.server 8000
```
Then open your browser at `http://localhost:8000`.

---

## 🔒 Privacy Shield & Adblock Compatibility

Some browsers (like **Brave** or extensions like **uBlock Origin**) may restrict third-party API calls to Supabase. To maintain an uncompromised user experience, `js/main.js` incorporates a fail-safe fallback logic:

```javascript
try {
  const { data, error } = await supabaseClient.from('reviews').select('*');
  if (!error && data.length > 0) {
    reviews = data;
  }
} catch (err) {
  console.warn('Supabase fetch blocked/failed, switching to fallback reviews');
  reviews = FALLBACK_REVIEWS;
}
```

---

## 📍 Location & Contact

- **Property**: Acrolia Homestay Jogja
- **Location**: Near Malioboro Street & Beringharjo Market, Yogyakarta, Indonesia
- **Capacity**: 6–8 Guests (Family & Group Friendly)

---

## 📝 License

This project is licensed under the MIT License - feel free to use and adapt for your web projects.
