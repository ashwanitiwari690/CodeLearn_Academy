# CodeLearn Academy — Modern Programming Education Platform

> **"Learn Programming. Build Projects. Solve Real Problems."**

CodeLearn Academy is a production-grade educational technology web application built entirely with **Angular 22**, **TypeScript**, **Angular Standalone Components**, and **Angular Signals**.

The platform is designed from the ground up to provide genuine, substantial educational value for developers learning modern web engineering. It eliminates superficial "Hello World" filler and teaches real browser mechanics, framework internals, algorithmic problem solving, and error troubleshooting.

---

## 1. Project Overview

* **Type**: Frontend-First Single-Page Application (SPA)
* **Framework**: Angular 22 (Latest Stable)
* **Runtime**: Node.js v24.19.0 (compatible with LTS v20+)
* **Styling**: SCSS with semantic CSS Custom Properties (Dark Theme first)
* **State Management**: Angular Signals, Computeds, and Effects
* **Client Storage**: Browser `localStorage` (Private, local-only progress tracking)
* **Target Deployments**: Vercel, Netlify, Firebase Hosting, Cloudflare Pages, Nginx

---

## 2. Key Platform Features

* **Structured Learning Paths**: Dedicated tracks for **HTML5**, **CSS Grid & Flexbox**, **JavaScript (ES6+)**, **TypeScript**, **Angular Architecture**, and **Git Version Control**.
* **30+ Substantive Starter Lessons**: Each lesson features clear learning objectives, prerequisites, conceptual breakdowns, production code blocks with expected outputs, key takeaways, and common mistakes.
* **30 Interactive Coding Exercises**: Real algorithmic problems with input/output test specifications, progressive hint reveals, a safe client-side code scratchpad (no dangerous `eval()` execution), and verified solutions.
* **Algorithmic Challenges**: Multi-difficulty problem scenarios focusing on time complexity, data structures (stacks, hash maps, two pointers), and design patterns.
* **Production Project Blueprints**: Comprehensive blueprints (Portfolios, Expense Trackers, Kanban Boards) featuring folder trees, prerequisites, core & bonus features, and step-by-step implementation plans.
* **Troubleshooting & Diagnostics Hub**: Practical guides for real errors developers face daily:
  * CORS origin blocks (`No Access-Control-Allow-Origin`)
  * SPA 404 page refreshes on static hosts
  * `npm ERR! ERESOLVE` peer dependency conflicts
  * Git merge conflicts (`Automatic merge failed`)
  * JavaScript `TypeError: Cannot read properties of undefined`
  * TypeScript `TS2322: Type X is not assignable to type Y`
* **Senior Technical Interview Bank**: In-depth Q&A with executive summaries, Event Loop mechanics, closures, Signals vs RxJS, and box model behavior.
* **Local Learning Dashboard & Bookmarks**: Zero-login progress tracker and bookmarks system that saves user milestones locally on their machine.
* **Instant Client-Side Search**: Faceted search with real-time filtering across resource types, categories, and difficulty levels.
* **Google AdSense Architecture**: Compliant and ethical ad component system (`adsEnabled = false` by default, valid fallback placeholders, and pre-configured `ads.txt`).

---

## 3. Technology Stack

* **Angular 22.2.0**: Standalone components, functional guards, functional interceptors, built-in template control flow (`@if`, `@for`, `@switch`).
* **Angular Signals**: Fine-grained synchronous reactivity without Zone.js overhead.
* **Angular Router**: Lazy-loaded route architecture with scroll position restoration to top and anchor scrolling.
* **Angular Reactive Forms & FormsModule**: Form handling and search bindings.
* **Angular HttpClient**: Configured with `provideHttpClient(withFetch())`.
* **TypeScript 6.0.2**: Strict mode enabled (`strict: true`, `strictNullChecks: true`).
* **Design & Icons**: JetBrains Mono for code blocks, Inter font family, and Google Material Symbols.

---

## 4. Directory & Code Architecture

```
codelearn-app/
├── public/
│   ├── _redirects            # Netlify SPA fallback routing
│   ├── ads.txt               # Authorized Digital Sellers file
│   ├── robots.txt            # Search engine crawl guidelines
│   └── sitemap.xml           # Search engine sitemap
├── src/
│   ├── index.html            # Preconnect fonts and root shell
│   ├── styles.scss           # Global typography, color tokens, and utility classes
│   ├── main.ts               # Application bootstrap
│   └── app/
│       ├── app.component.ts  # Root container with Header, Footer, and Cookie banner
│       ├── app.routes.ts     # Central lazy-loading router table
│       ├── app.config.ts     # Routing, HttpClient, and fetch providers
│       ├── models/
│       │   └── content.models.ts  # Typed interfaces for all curriculum entities
│       ├── data/             # Educational datasets (30+ lessons, exercises, etc.)
│       │   ├── authors.data.ts
│       │   ├── categories.data.ts
│       │   ├── learning-paths.data.ts
│       │   ├── lessons.data.ts
│       │   ├── tutorials.data.ts
│       │   ├── exercises.data.ts
│       │   ├── challenges.data.ts
│       │   ├── projects.data.ts
│       │   ├── troubleshooting.data.ts
│       │   └── interviews.data.ts
│       ├── services/
│       │   ├── content.service.ts # Centralized data queries and Signals
│       │   ├── storage.service.ts # LocalStorage progress, bookmarks, and consent
│       │   ├── search.service.ts  # Client-side multi-facet search engine
│       │   └── seo.service.ts     # Dynamic titles, meta tags, and JSON-LD schema
│       ├── components/
│       │   ├── header/            # Responsive navbar with progress pill
│       │   ├── footer/            # Semantic footer with legal links
│       │   ├── breadcrumb/        # Accessible breadcrumb trail
│       │   ├── code-block/        # Syntax-highlighted box with copy button
│       │   ├── ad-slot/           # Ethical AdSense container
│       │   └── cookie-consent/    # Transparent local storage consent banner
│       └── pages/
│           ├── home/              # Hero, paths, tutorials, and philosophy
│           ├── learn/             # Path list, syllabus detail, and lesson views
│           ├── tutorials/         # Guides list and tutorial article view
│           ├── exercises/         # Exercise directory and problem workbench
│           ├── challenges/        # Algorithmic challenges directory and details
│           ├── projects/          # Portfolio blueprints list and guides
│           ├── troubleshooting/   # Diagnostic hub and error solutions
│           ├── interview/         # Senior technical interview questions
│           ├── search/            # Instant multi-faceted curriculum search
│           ├── progress/          # Local learning dashboard & stats
│           ├── bookmarks/         # Saved bookmarks list
│           ├── author-detail/     # Author credentials, bio, and articles
│           ├── about/             # Mission statement and curriculum standards
│           ├── editorial-guidelines/ # Content verification methodology
│           ├── contact/           # Contact form and feedback channels
│           ├── privacy-policy/    # GDPR/CCPA transparent privacy disclosure
│           ├── cookie-policy/     # Browser storage explanation
│           ├── terms/             # Educational Terms of Use
│           ├── disclaimer/        # Educational fair use disclaimer
│           └── not-found/         # Accessible 404 handler
├── angular.json              # Angular CLI project configuration
├── tsconfig.json             # TypeScript root config
├── vercel.json               # Vercel deployment rewrite rules
└── package.json              # Project scripts and dependencies
```

---

## 5. Setup & Local Development Instructions

### Prerequisites
* **Node.js**: v24.19.0 or any Node LTS >= 20.x
* **npm**: v10.x or v11.x

### Installation
```bash
# 1. Clone repository or navigate to directory
cd "e:/angular website/Programming learning website"

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```
Navigate to `http://localhost:4200/`. The application will hot-reload automatically when modifying any source file.

### Production Build
```bash
npm run build
```
Compiled static assets will be output to `dist/codelearn-app/browser/`.

---

## 6. How to Add New Content

### Adding a New Lesson
1. Open `src/app/data/lessons.data.ts`.
2. Add a new object conforming to the `Lesson` interface:
```typescript
{
  id: 'les-new-topic',
  slug: 'my-new-topic',
  pathSlug: 'javascript', // Must match learning path slug
  title: 'Understanding Topic X',
  description: 'A comprehensive guide to Topic X...',
  category: 'JavaScript',
  difficulty: 'Intermediate',
  tags: ['javascript', 'topic-x'],
  authorId: 'auth-alex-morgan',
  publishedDate: '2026-03-10',
  updatedDate: '2026-03-10',
  readingTimeMinutes: 10,
  learningObjectives: ['Objective 1', 'Objective 2'],
  prerequisites: ['Basic JavaScript'],
  sections: [
    {
      heading: 'Introduction',
      content: 'Detailed explanation for humans...',
      codeExample: {
        language: 'javascript',
        code: 'const x = 10;',
        explanation: 'Why x is defined as 10.'
      }
    }
  ],
  keyTakeaways: ['Point 1'],
  commonMistakes: [{ mistake: 'Doing Y', fix: 'Do Z instead' }],
  relatedLessonSlugs: []
}
```
3. Register the lesson ID in `src/app/data/learning-paths.data.ts` under the appropriate tier (`beginnerLessonIds`, `intermediateLessonIds`, or `advancedLessonIds`).

### Adding a New Coding Exercise
1. Open `src/app/data/exercises.data.ts`.
2. Add an `Exercise` entry with input/output test specifications:
```typescript
{
  id: 'ex-31-my-exercise',
  slug: 'my-exercise-name',
  title: 'Exercise Title',
  description: 'Short summary of the task.',
  difficulty: 'Beginner',
  topic: 'Arrays',
  category: 'JavaScript',
  problemStatement: 'Full problem description...',
  starterCode: 'function solve() {\n  // Logic\n}',
  language: 'javascript',
  exampleInput: 'solve([1, 2])',
  exampleOutput: '3',
  testCases: [
    { inputDescription: '[1, 2]', expectedOutputDescription: '3' }
  ],
  hints: ['Hint 1'],
  explanation: 'Explanation of optimal time and space complexity.',
  solution: 'function solve() {\n  return 3;\n}'
}
```

### Adding a New Troubleshooting Guide
1. Open `src/app/data/troubleshooting.data.ts`.
2. Provide the `errorSignature`, `whatItMeans`, `whyItHappens`, `howToDiagnose`, and `stepByStepSolution`.

---

## 7. Local Progress & Bookmarking Architecture

CodeLearn Academy prioritizes user privacy:
* **No mandatory user accounts or logins**.
* **Zero tracking pixels or telemetry beacons**.
* Progress status (`completedItems`) and bookmarks (`bookmarks`) are saved strictly inside the user's browser using `window.localStorage`.
* Methods in `StorageService` are wrapped in Angular Signals with `isPlatformBrowser` checks, ensuring safe SSR hydration and static pre-rendering.
* Users can export or clear their stored data at any time from `/progress`.

---

## 8. Google AdSense & Monetization Architecture

CodeLearn Academy complies with Google's Webmaster & AdSense Publisher Policies:
* **Educational Priority**: Content is written to teach, not to manipulate ad views.
* **Default Off State**: In `src/app/components/ad-slot/ad-slot.component.ts`, `adsEnabled = false` by default. While disabled, a clean fallback label (`"Educational Resource Partner Placeholder"`) is displayed.
* **How to Enable Real Ads**:
  1. Once AdSense approval is granted, update `adsEnabled = true` in `ad-slot.component.ts`.
  2. Set your Google Ad Client ID (`ca-pub-XXXXXXXXXXXXXXXX`) and slot IDs.
  3. Include the official AdSense script tag in `src/index.html`.
* **ads.txt**: Pre-configured in `public/ads.txt`. Replace the sample publisher ID with your authorized seller credentials before production launch.

---

## 9. Search Engine Optimization (SEO) & Structured Data

The `SeoService` (`src/app/services/seo.service.ts`) dynamically sets:
* Unique descriptive `<title>` tags for every route.
* Canonical `<link rel="canonical">` links preventing duplicate content issues.
* Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) for social sharing.
* Twitter Card meta tags.
* Dynamic **Schema.org JSON-LD** scripts:
  * `BreadcrumbList` for Google rich results breadcrumb navigation.
  * `TechArticle` for all lesson, tutorial, and troubleshooting guides.
  * `Course` schema for learning paths.
* **XML Sitemap**: Located at `public/sitemap.xml` linking all canonical URLs.
* **robots.txt**: Configured at `public/robots.txt`.

---

## 10. Deployment Guide

### Deploying to Netlify
1. Connect your repository to Netlify.
2. Build Settings:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist/codelearn-app/browser`
3. Netlify will automatically detect `public/_redirects` to ensure deep URLs like `/learn/javascript` don't return 404 errors.

### Deploying to Vercel
1. Connect your repository to Vercel.
2. Vercel automatically detects the Angular framework.
3. Build Settings:
   * **Output Directory**: `dist/codelearn-app/browser`
4. The root `vercel.json` file ensures all routes rewrite back to `/index.html`.

### Deploying to Nginx
```nginx
server {
    listen 80;
    server_name codelearn.academy;
    root /var/www/codelearn/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 11. Pre-Launch Production Verification Checklist

- [x] Angular application compiles with zero TypeScript errors (`npm run build`).
- [x] Zero budget warnings in production build.
- [x] `public/sitemap.xml` references correct domain paths and valid tags.
- [x] `public/robots.txt` points to `sitemap.xml`.
- [x] `public/ads.txt` ready for publisher ID replacement.
- [x] `public/_redirects` and `vercel.json` configured for SPA client routing.
- [x] Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) present throughout.
- [x] All 30 initial lessons contain non-placeholder, runnable code examples and explanations.
- [x] All 30 exercises contain problem statements, example I/O, test cases, and solutions.
- [x] Full legal disclosure pages (Privacy Policy, Terms of Use, Cookie Policy, Disclaimer, Editorial Guidelines) present and accessible in the footer.
- [x] Mobile navigation menu tested and accessible on narrow screen viewports.

---

## 12. License & Content Notice

Content on CodeLearn Academy is provided for free educational use. All code snippets and software architectural diagrams are original works maintained by the CodeLearn Academy editorial team.
