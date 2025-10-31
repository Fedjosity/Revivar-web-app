# 🌸 Thank You Card Generator

## 🪄 Overview
A modern, responsive web app for designing and downloading personalized **Thank You** cards using any image from Unsplash.  
Search, customize, and export beautiful cards for any occasion — fast, elegant, and fun to use.

---

## ✨ Features
- 🔍 **Search and select** from all Unsplash images  
- 🖋️ **Card text/message customization**  
- ⚡ **Live preview** of your personalized card  
- ⬇️ **One-click download** (exports your final card as an image)  
- 📱 **Fully responsive design** built with Tailwind CSS  
- ⚙️ **Fast, modern stack**: React, Vite, TypeScript, and shadcn-ui  

---

## 🧰 Tech Stack
- ⚛️ **React + TypeScript**
- ⚡ **Vite**
- 🎨 **Tailwind CSS** (for layout & responsiveness)
- 🧱 **shadcn-ui** (modern UI components)
- 🖼️ **Unsplash API** (for fetching images)
- 🌐 **Axios** (for API calls)
- 🔔 **Sonner** (toasts & notifications)
- 🎞️ **Framer Motion** (animations & transitions)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone <YOUR_GIT_URL>
cd thank-you-card-generator
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables
Create a `.env` file in the project root with:
```
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
```

### 4️⃣ Start the development server
```bash
npm run dev
```

Then visit **http://localhost:5173** in your browser 🎨

---

## 🪶 Usage
1. **Search** images using any keyword (e.g., “flowers”, “nature”, “city”).  
2. **Select** an image to begin customization.  
3. **Add your message** — adjust font, color, and layout.  
4. **Preview** your card live.  
5. **Download** your finished card as an image with one click.

---

## 🏗️ Deployment
To create a production build:
```bash
npm run build
```
Deploy the generated **`dist/`** folder to any static host:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

---

## 📁 Main Files & Structure
```
src/
 ├─ pages/
 │   ├─ Index.tsx          → Homepage (image search & selection)
 │   └─ Customize.tsx      → Card customization page
 ├─ components/
 │   ├─ ImageCard.tsx      → Displays Unsplash image cards
 │   ├─ SearchBar.tsx      → Search bar component
 │   └─ CardPreview.tsx    → Live thank-you card preview
 ├─ lib/
 │   └─ unsplash.ts        → Unsplash API service (fetch/search/download)
 ├─ types/
 │   └─ unsplash.ts        → TypeScript types for Unsplash API
```

---

## 🧩 Codebase & Logic Walkthrough

### 🏠 `src/pages/Index.tsx`
**Purpose:** Homepage — allows users to search Unsplash or view random images.  
**Logic:**
- Fetches and displays 4 random Unsplash images on load.
- Allows search queries with pagination.
- Handles loading and error states.
- Clicking an image navigates to customization.

### 🖋️ `src/pages/Customize.tsx`
**Purpose:** Main card design interface.  
**Logic:**
- Displays the selected image and live text overlay.
- Lets users edit the thank-you message and name.
- Uses html2canvas to export a PNG image.
- Responsive layout via Tailwind classes.

### 🧱 `src/components/`
- **ImageCard.tsx:** Displays images with hover/selection animations.  
- **SearchBar.tsx:** Manages user input for searches.  
- **CardPreview.tsx:** Live preview of the card with text overlays.  

### 🌐 `src/lib/unsplash.ts`
Handles Unsplash API integration:
- `fetchRandomImages(count)` → Fetches diverse random images.  
- `searchImages(query, page, perPage)` → Paginated image search.  
- `triggerDownload(downloadLocation)` → API-compliant download tracking.

### 🧾 `src/types/unsplash.ts`
Defines strong TypeScript interfaces for Unsplash image data and responses.

---

## 🧭 How It Works (User Flow)
1. User lands on the homepage → sees beautiful Unsplash images.  
2. User searches or selects any image.  
3. App navigates to customization page.  
4. User adds text and styles → live preview updates instantly.  
5. User downloads the final image.  
6. The entire experience is smooth, animated, and mobile-friendly.

---

## 💎 Credits
Built with ❤️ using **React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Unsplash API**.  
Created as a **software engineering internship assessment project**.
