# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start dev server at localhost:3000
- `npm run build` - Production build (also runs TypeScript checking)
- `npm run lint` - ESLint
- No test framework is configured

## Architecture

Single-page marketing landing page for **Audience Labs** — a growth agency for Kick & Twitch streamers that distributes streamer clips across TikTok and Instagram Reels through a distributed clipper network. Built with Next.js 16 App Router, Tailwind CSS v4, Framer Motion, and TypeScript. Supports **English and Turkish** via a `[locale]` dynamic segment pattern with JSON dictionary files.

**Design System:** "The Neon Curator" / Organic Cyberpunk — futuristic and aggressive yet professional. Sharp corners (0.125rem default radius), No-Line Rule (no 1px borders for structure, use background color shifts instead), glassmorphism, grainy gradient textures.

### i18n System

Uses the Next.js App Router `[locale]` dynamic segment pattern with no external i18n libraries. URL structure: `/en/...` and `/tr/...`.

- **`src/lib/i18n/config.ts`** — Exports `i18n` config (`defaultLocale: "en"`, `locales: ["en", "tr"]`) and `Locale` type.
- **`src/lib/i18n/dictionaries.ts`** — Server-only dictionary loader. Lazily imports JSON dictionaries via `import()`.
- **`src/lib/i18n/dictionaries/en.json`** / **`tr.json`** — All translatable strings organized by section: `metadata`, `nav`, `hero`, `status`, `engine`, `services`, `clipperNetwork`, `workflow`, `aboutMe`, `faq`, `cta`, `privacy`, `terms`, `cookies`, `footer`. Both files must have identical structure.
- **`middleware.ts`** (project root) — Redirects `/` to `/en` or `/tr` based on `Accept-Language` header. i18n config values are inlined directly (not imported) to avoid Vercel Edge Runtime errors.
- **`src/types/index.ts`** — Exports `Dictionary` type (derived from `en.json` shape) plus per-section subtypes (`NavDict`, `HeroDict`, `ServicesDict`, `AboutMeDict`, `EngineDict`, `WorkflowDict`, `FAQDict`, `CTADict`, `FooterDict`, `LegalPageDict`, etc.).

### Page Structure

`src/app/[locale]/page.tsx` assembles 7 section components in order:
1. **HeroSection** — Left-aligned massive heading with word-by-word reveal animation, flex layout (text left, CSS/SVG visual right with glassmorphic stat box)
2. **EngineSection** — Horizontal-to-vertical content transformation flow with SVG animated dots
3. **ServicesSection** (`#services`) — 5-card asymmetric bento grid with custom CSS/SVG visuals
4. **WorkflowSection** (`#how-it-works`) — Horizontal scrollable 4-step process
5. **AboutSection** (`#founders`) — Horizontal founder cards (avatar left, text right), centered grid
6. **FAQSection** (`#faq`) — Centered accordion with click ripple effect
7. **CTASection** (`#contact`) — "Viral Loop?" with glitch effect, lime CTA

Nav links anchor to: Services → How It Works → About Us → FAQ.

`src/app/[locale]/layout.tsx` is the main layout: loads Manrope + Space Grotesk fonts, wraps pages with Navbar and Footer. `<main>` has `pt-24` to offset the fixed navbar.

Legal pages (`privacy/page.tsx`, `terms/page.tsx`, `cookies/page.tsx`) render prose-style legal content from dictionary sections. Legal content guidelines: Audience Labs sells **distribution and visibility**, not results. Campaign-based model, no performance guarantees, no operational details disclosed.

### Tailwind v4 Theming

Uses Tailwind CSS v4 `@theme inline` in `globals.css` (not tailwind.config). Color palette:

- **Primary:** `#e08dff` (neon purple), `primary-dim` `#bc00fb`
- **Secondary:** `#c3f400` (cyber lime) — used for growth metrics, hover accents, status indicators
- **Tertiary:** `#c1fffe` (cyan) — used for tech/system info
- **Error:** `#ff6e84`
- **Surface hierarchy:** `surface` (#0e0e0e) → `surface-container-lowest` (#000000) → `surface-container-low` (#131313) → `surface-container` (#1a1919) → `surface-container-high` (#201f1f) → `surface-container-highest` (#262626) → `surface-bright` (#2c2c2c)
- **Text:** `on-surface` (#ffffff), `on-surface-variant` (#adaaaa)
- **Borders:** `outline-variant` (#494847) at low opacity only (ghost borders)
- **Typography:** `font-sans` → Manrope, `font-headline` → Space Grotesk
- **Border radius:** Sharp tech look — `0.125rem` default

### Component Layers

- **`components/ui/`** — Atomic components: `Button` (variants: `primary`/`secondary`/`lime`/`surface`/`ghost`, all uppercase Space Grotesk), `Container` (max-w-7xl), `SectionHeading` (text-5xl font-black uppercase tracking-tighter), `CalComLogo`.
- **`components/animations/`** — Framer Motion wrappers: `FadeInWhenVisible` (scroll-triggered with direction), `StaggerChildren` (stagger container), `CountUp` (number count-up animation).
- **`components/sections/`** — Each section is a `"use client"` component receiving a typed `dict` prop. Section backgrounds use surface color hierarchy for separation (No-Line Rule).
- **`components/layout/`** — `Navbar` (glassmorphism backdrop, `bg-surface-bright/60`, "AUDIENCE LABS" uppercase logo, nav links with primary active state, "Start Growing" CTA → Cal.com), `Footer` (4-column: Brand/Network/Legal/Status with lime pulsing dot), `LanguageSwitcher` (flag toggle EN/TR).

### Design Rules

- **No-Line Rule:** 1px solid borders prohibited for structural separation. Use background color shifts between surface layers instead. Ghost borders (`border border-outline-variant/5`) only where accessibility demands.
- **Card pattern:** Outer `bg-surface-container-low p-1 rounded-xl`, inner `bg-surface-container-lowest border border-outline-variant/5`.
- **Hover state:** `secondary` (#c3f400) 2px left accent border for selection indication.
- **Headlines:** Space Grotesk, `font-black uppercase tracking-tighter`, extreme size contrast.
- **Ambient shadows:** Primary color at 8% opacity, 40-60px blur (neon underglow, not grey shadows).
- **Grainy gradients:** `linear-gradient(45deg, #e08dff, #bc00fb)` with noise texture pseudo-element.
- **Glassmorphism:** `surface-bright` at 60% opacity + 20px backdrop blur.

### Data & Types

Non-translatable data in `src/lib/constants.ts`: `CALENDLY_URL` and `TRUST_BRANDS`. All translatable text lives in JSON dictionary files. TypeScript interfaces in `src/types/index.ts` include `WorkflowStep`, `EngineDict`, `WorkflowDict`, and derived dictionary subtypes. `CALENDLY_URL` is used in Navbar, HeroSection, and CTASection — all CTA buttons link to Cal.com.

### Key Patterns

- Section components use `"use client"` because they depend on Framer Motion or React state.
- **All section components receive a typed `dict` prop.** Text comes from the dictionary, not hardcoded.
- **Marketing copy avoids em dashes (`—`).** Legal pages are exempt.
- Framer Motion `Variants` type must be explicitly annotated and ease values need `as const`.
- CSS keyframes in `globals.css`: `float`, `shimmer-sweep`, `glow-rotate`, `dash-flow`, `pulse-glow`, `status-pulse-lime`, `sync-pulse`, `glitch-text`, `click-ripple`, `particle-float-1`/`particle-float-2`, `equalizer-pulse`, `bar-grow`, `blob-drift`, `badge-pulse`.
- HeroSection uses flex layout (not grid): left text column (`flex-1`, left-aligned with `pl-8 lg:pl-16`) + right visual column (fixed width `w-[320px] lg:w-[380px]`). Word-by-word `motion.span` reveal with stagger (0.15s per word). Right column has abstract CSS/SVG visual with glassmorphic stat box. Hero "View Network" CTA links to `#how-it-works`.
- EngineSection shows horizontal→vertical transformation with SVG `animateMotion` flow dots and `sync-pulse` animated RefreshCw icon. "SYSTEM" watermark has scroll parallax.
- WorkflowSection is horizontal scroll on desktop (scroll-snap), vertical stack on mobile. 4 steps with colored left borders (primary/tertiary/secondary/white).
- ServicesSection uses asymmetric bento grid (`grid-cols-12`) with 5 cards, each with unique CSS/SVG visual sub-components (ClipFlowVisual, CalendarVisual, EqualizerVisual, BarChartVisual, VideoEditorVisual).
- CTASection has "Viral Loop?" text with `glitch-text` CSS animation on first appearance (0.5s duration), then stable. Two CTA buttons: lime "Apply Now" + surface "Book a Demo".
- AboutSection has 2 horizontal founder cards (avatar left, text right on desktop, stacked on mobile) with GitHub avatars, lime GitHub button, lime status dot. Grid is centered (`max-w-5xl mx-auto`).
- FAQSection uses centered AnimatePresence accordion (`max-w-3xl mx-auto`) with click ripple effect and `secondary` left accent on hover.
- Icons come from `lucide-react`. Platform-specific inline SVGs (Kick, TikTok) defined locally.
- Static images in `/public/`: `logo.png` (flask favicon), `calcom-logo.avif` (CTA button logo). All other visuals are CSS/SVG-based.
