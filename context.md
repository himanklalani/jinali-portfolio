# Jinali Mehta Portfolio – Project Context & Architecture

This document serves as the comprehensive source of truth for the "Jinali Mehta" brand strategist portfolio. It details the aesthetic philosophy, the interactive components, the animation standards, and the technical architecture of the single-page application. 

It is designed to be ingested by AI agents (like Claude/Cursor) to establish immediate alignment on the codebase structure and design directives.

---

## 1. Project Overview & Vibe
- **Target Audience:** Premium brands, high-tier creators, and creative agencies.
- **Aesthetic:** "Ethereal Glass" / "Industrial Elegance" mixed with "Cinematic Brutalism".
- **Color Palette:** Deep OLED Black (`#050505`), Pure White (`#FFFFFF`), with extremely subtle, highly diffused Mesh Gradients (Emerald/Purple) operating at 10-30% opacity in the background.
- **Copywriting Style:** "Humanized". The tone is conversational, opinionated, and punchy. No robotic lists, no corporate jargon, and **no em dashes**. 

---

## 2. Tech Stack & Dependencies
- **Framework:** Next.js 14+ (App Router) with React 19.
- **Styling:** Tailwind CSS (v4) with fluid responsive design.
- **3D Engine:** Three.js, `@react-three/fiber`, and `@react-three/drei`.
- **Animation (Physics/Springs):** `motion/react` (Framer Motion) for layout transitions, drag gestures, and enter/exit states.
- **Animation (Scroll/Timelines):** GSAP (`@gsap/react`) for advanced scroll-linked timeline manipulation.
- **Scroll Hijacking:** Lenis (`lenis/react`) for butter-smooth, 60fps scrolling tied to `requestAnimationFrame`, unified with GSAP's ticker in `SmoothScroll.tsx`.

---

## 3. Core Components Reference

### **The Orchestration Layer**
#### `Preloader.tsx` (Cinematic Gatekeeper)
- **Purpose:** Prevents initial load jank by masking the viewport while heavy WebGL/Three.js shaders compile.
- **Mechanics:** Enforces a minimum 2.5s "cinematic hold" while tracking active asset loading. Displays a massive serif progress counter (00-99%).
- **Performance:** Progress bar utilizes GPU-accelerated `transform: scaleX` mapped to `transformOrigin: left` to completely avoid layout thrashing.
- **Orchestration (`isReady` pattern):** The global `isLoaded` state in `page.tsx` is passed as an `isReady` prop to heavy hero components (like `FadeUp` and `VolumetricStudio`). Animations *only* begin executing once the preloader cleanly exits (`translateY(-100%)`).

### **3D & Interactive Experiences**
#### `VolumetricStudio.tsx` (Hero Environment)
- **Purpose:** Renders a 3D volumetric lighting environment (stage lights, dust particles, flickering ballasts) behind the Hero typography.
- **Z-Index Stacking:** The WebGL canvas runs at `z-40`, meaning any full-screen overlay components (like `FluidNav.tsx`) MUST be positioned at `z-[90]` or `z-[100]` to avoid transparency bugs.

#### `FortuneCookie.tsx` (The Connect CTA)
- **Purpose:** A fully 3D interactive physics object rendered via R3F at the bottom of the page.
- **Interaction:** Users can drag and pull the 3D cookie model apart. Includes a custom hand-drawn SVG arrow overlaid in the DOM prompting the user to "Tap to open". The final message reveal is mathematically delayed (e.g., `frame > 27`) to perfectly sync with the visual split of the cookie shell.

#### `InteractiveBook.tsx` (Reading List)
- **Purpose:** A 3D interactive book that users can click to open and flip through pages.
- **Tech:** Built with Framer Motion utilizing `transformStyle: "preserve-3d"`, nested `rotateY`, and `perspective`.
- **Page Assembly:** Requires exactly an even number of front/back leaves (12 pages total). Ensure the Inside Back Cover matches interior textures (parchment) and the Outside Back Cover renders the exterior finish (leather + logos) to prevent auto-appending of raw `#111` placeholder divs.

### **Carousel Architecture (Responsive Bifurcation)**
*We utilize distinct carousel structures depending on the viewport to ensure maximum performance and UX.*

#### 1. `MediaEmbedModal.tsx` & `InfiniteMenu.tsx` (Campaign Showcases)
- **Purpose:** Handles the infinite horizontal scrolling loop of campaign thumbnails.
- **Media Sourcing:** Instagram expiring CDN links (like `fbcdn.net`) are aggressively blocked. All external campaign thumbnails MUST be downloaded and served locally via `public/campaigns/thumb_*.jpg` to ensure they never break.

#### 2. `DepthCarousel.tsx` (Desktop Case Studies)
- **Purpose:** A heavily layered 3D carousel for viewing case studies on large screens. 
- **Tech:** Translates images along the Z-axis for a deeply physical, floating effect. Rendered exclusively on desktop (`hidden md:block`).

#### 3. `StickyCard.tsx` (Mobile Case Studies)
- **Purpose:** A mobile-optimized alternative to `DepthCarousel` that stacks images like physical cards.
- **Tech:** Uses GSAP `ScrollTrigger` with `pin: true` to hold the container in place while users scroll, smoothly sliding subsequent cards up over previous ones. Rendered exclusively on mobile (`block md:hidden`).

#### 4. `MusicCarousel.tsx` (On Repeat)
- **Purpose:** Displays an Apple Music-style 3D swiping cover flow featuring real Spotify track routing and high-fidelity Apple Music iTunes album covers.
- **Interaction:** Tapping the active center card triggers a Framer Motion sequence that ejects a spinning vinyl record from the sleeve, and opens the exact Spotify track ID.

#### 5. `BrandMarquee.tsx` & Logo Assets
- **Purpose:** A smooth infinite scroll marquee for brand logos.
- **Asset Sourcing:** All logos MUST be stored locally in `public/logo/` to ensure performance and prevent external CDN failures. Logos with dark text require a dynamically injected light background pill (`needsBg: true`) to remain legible against the OLED black theme.

### **UI Primitives**
#### `DoubleBezel.tsx` (Card Architecture)
- **Purpose:** The foundational container for all grids and content blocks.
- **Design:** Wraps content in two layers: an outer hairline shell and an inner core with an inset highlight (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`). Creates a machined, physical hardware aesthetic rather than flat UI.

#### `MagneticButton.tsx` (CTAs)
- **Purpose:** Buttons that physically translate toward the user's cursor on hover using bounding box math.

#### `ExpandableDrawers.tsx` (Accordion)
- **Purpose:** A premium accordion component used for the "What I Believe" section.
- **Mechanics:** Each drawer manages its own independent open/close state. Uses `framer-motion` (`AnimatePresence`) to smoothly animate height from `0` to `auto`. Features a minimalist `+` to `x` rotating icon on toggle.

#### `TvShowCard.tsx` (Interactive Lists)
- **Purpose:** An interactive CRT TV component with an accompanying selectable list.
- **Aesthetic:** Utilizes high-contrast typography, interactive rows that set active states, and a Framer Motion `layoutId` pill to smoothly track the currently selected list item.

---

## 4. Animation & Motion Guidelines (Design Engineering)

### The "Awwwards" Baseline
- **Easing Curve:** Standard `linear` or default `ease-in-out` transitions are strictly banned. Almost all CSS and Framer Motion transitions utilize the custom cubic-bezier: `ease-[cubic-bezier(0.32,0.72,0,1)]`.
- **Tactile Polish:** All interactive elements (close buttons, nav links, modals) MUST provide immediate physical feedback utilizing `active:scale-[0.97]` or Framer Motion `whileTap={{ scale: 0.98 }}`. The UI must feel weighty and mechanical.
- **Optical Reveal (FadeUp):** No element appears statically. As elements enter the viewport, they use the `<FadeUp>` wrapper. This does not just animate opacity—it heavily utilizes optical blur masking (`filter: blur(8px)` fading to `0px`) for a premium, ethereal entrance.
- **Staggering:** Grid elements strictly use `delay={i * 0.1}` inside mapping functions to create a cascading reveal effect.
- **Performance Guardrails:** Animations target GPU-accelerated properties (`transform`, `opacity`, `filter`) exclusively. We DO NOT animate `width`, `height`, `top`, `left`, or margins to prevent expensive layout thrashing.
- **Mobile GPU Protection:** 
  - Never use full-screen `mix-blend-mode: overlay` or `screen` overlays, as they force massive full-screen compositing every frame. Use standard `opacity` instead on dark themes.
  - Custom WebGL/Three.js contexts (like `InfiniteMenu`) MUST cap Device Pixel Ratio (DPR) to `1x` on mobile devices (`window.innerWidth < 768`) to prevent GPU stalling on 3x density screens.

---

## 5. Layout & Visual Directives
- **Macro-Whitespace:** The layout must breathe, but flow smoothly. Standard vertical paddings are carefully tuned (e.g. `py-16 md:py-24`) to separate sections distinctly without creating dead scroll zones.
- **Typography Formatting:** `text-balance` is applied to all major headings and paragraphs to ensure mathematically perfect line breaks. Massive headings use `-tracking-tight`.
- **Image Optimization:** All Cloudinary image URLs must be injected with `f_auto,q_auto` to ensure they are served in next-gen formats (WebP/AVIF) without manual compression. Local assets live in `/public/campaigns/`.
- **No Overflow Clipping on 3D:** Elements executing 3D transforms (like `InteractiveBook`) must never sit inside an `overflow-hidden` parent, or their Z-axis rotational extremities will be aggressively sliced off by the browser renderer.
