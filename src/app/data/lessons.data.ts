import { Lesson } from '../models/content.models';

export const LESSONS: Lesson[] = [
  // 1. HTML Basics
  {
    id: 'lesson-html-basics',
    slug: 'html-basics',
    pathSlug: 'html',
    title: 'HTML Basics: Fundamentals of Web Markup',
    description: 'Understand what HTML is, how elements and tags construct documents, and how browsers parse web pages.',
    category: 'HTML',
    difficulty: 'Beginner',
    tags: ['html', 'markup', 'elements', 'attributes', 'doctype'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-01-10',
    updatedDate: '2026-02-15',
    readingTimeMinutes: 7,
    learningObjectives: [
      'Understand the role of HTML in the modern web stack',
      'Learn the standard structure of an HTML document',
      'Distinguish between elements, tags, and attributes',
      'Write valid, well-formed HTML5 code'
    ],
    prerequisites: ['Basic familiarity with text editors and web browsers'],
    sections: [
      {
        heading: 'What is HTML?',
        content: 'HyperText Markup Language (HTML) is the foundational language of the World Wide Web. It provides structure and semantic meaning to web content. Rather than dictating visual styling or logic, HTML tells the browser what kind of content each block represents: paragraphs, headings, navigation links, images, and data tables.'
      },
      {
        heading: 'Anatomy of an HTML Document',
        content: 'Every modern HTML document begins with a doctype declaration followed by the root <html> element, containing a <head> for metadata and a <body> for rendered user content.',
        codeExample: {
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to CodeLearn Academy</h1>
    <p>HTML provides the core structure for every web application.</p>
  </body>
</html>`,
          explanation: '<!DOCTYPE html> declares modern HTML5 mode. The viewport meta tag ensures proper scaling across mobile screens.',
          expectedOutput: 'A clean document with a prominent H1 heading and a descriptive paragraph.'
        }
      },
      {
        heading: 'Tags vs Elements vs Attributes',
        content: 'An opening tag like <p> and closing tag like </p> enclose content to form an HTML element. Attributes provide extra configuration, such as class="lead" or href="https://example.com". Always use double quotes around attribute values for consistency.'
      }
    ],
    keyTakeaways: [
      'HTML defines structure, while CSS defines presentation and JavaScript defines behavior.',
      'Always specify the lang attribute on <html> for accessibility and search indexing.',
      'Never omit the viewport meta tag in modern responsive projects.'
    ],
    commonMistakes: [
      { mistake: 'Forgetting to close container tags like <div> or <p>', fix: 'Use closing tags consistently and check HTML validator.' },
      { mistake: 'Omitting alt attributes on <img> tags', fix: 'Always provide descriptive alt text or alt="" if purely decorative.' }
    ],
    nextLessonSlug: 'html-semantic-elements',
    relatedLessonSlugs: ['html-semantic-elements', 'html-forms', 'css-basics']
  },

  // 2. HTML Semantic Elements
  {
    id: 'lesson-html-semantic-elements',
    slug: 'html-semantic-elements',
    pathSlug: 'html',
    title: 'HTML Semantic Elements: Meaningful Document Structure',
    description: 'Why semantic elements like <header>, <nav>, <main>, <article>, and <section> are vital for accessibility and SEO.',
    category: 'HTML',
    difficulty: 'Beginner',
    tags: ['html', 'semantics', 'accessibility', 'seo', 'screen-readers'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-01-12',
    updatedDate: '2026-02-18',
    readingTimeMinutes: 8,
    learningObjectives: [
      'Replace generic <div> tags with semantic HTML5 landmarks',
      'Understand the structural difference between <section> and <article>',
      'Optimize document outline for assistive technologies and web crawlers'
    ],
    prerequisites: ['HTML Basics'],
    sections: [
      {
        heading: 'The Problem with "Div Soup"',
        content: 'Historically, web pages were built out of dozens of nested <div> elements with classes like "header-wrapper" or "main-content-box". While functional visually, these provide zero context to screen readers, search engines, or voice assistants. Semantic HTML solves this by attaching innate meaning to structural tags.'
      },
      {
        heading: 'Core Semantic Landmarks',
        content: 'Modern HTML provides semantic containers for major page areas: <header> for banner content, <nav> for navigation links, <main> for primary unique page content, <article> for self-contained syndicatable entries, and <footer> for bottom metadata.',
        codeExample: {
          language: 'html',
          code: `<header>
  <a href="/" class="logo">CodeLearn</a>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/learn">Learn</a></li>
      <li><a href="/tutorials">Tutorials</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Semantic Web Design</h1>
    <p>Articles represent self-contained pieces of information.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 CodeLearn Academy. All rights reserved.</p>
</footer>`,
          explanation: 'Only one <main> element should be visible per page. The <nav> tag receives an aria-label if multiple navigation menus exist.',
          expectedOutput: 'Accessible page outline recognizable by screen reader landmark menus.'
        }
      }
    ],
    keyTakeaways: [
      'Semantic tags convey intent to assistive devices without needing extra ARIA roles.',
      'An <article> should make sense even if syndicated outside the current website.',
      'A <section> groups related thematic content and should almost always have a heading.'
    ],
    commonMistakes: [
      { mistake: 'Using multiple visible <main> tags on a single page', fix: 'Keep only one <main> tag representing the unique content of that page.' },
      { mistake: 'Using <b> and <i> for styling instead of <strong> and <em>', fix: 'Use <strong> for important text and <em> for stress emphasis.' }
    ],
    prevLessonSlug: 'html-basics',
    nextLessonSlug: 'html-forms',
    relatedLessonSlugs: ['html-basics', 'html-accessibility', 'css-basics']
  },

  // 3. HTML Forms
  {
    id: 'lesson-html-forms',
    slug: 'html-forms',
    pathSlug: 'html',
    title: 'HTML Forms: Input Types, Validation, and Accessibility',
    description: 'Build interactive forms using modern HTML5 input types, explicit labels, and native constraint validation.',
    category: 'HTML',
    difficulty: 'Beginner',
    tags: ['html', 'forms', 'inputs', 'labels', 'validation'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-01-15',
    updatedDate: '2026-02-20',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Pair every input with an explicit <label> using the for/id pattern',
      'Select proper input types (email, number, tel, search, date)',
      'Leverage built-in browser validation attributes like required, pattern, and minlength'
    ],
    prerequisites: ['HTML Basics'],
    sections: [
      {
        heading: 'Explicit Form Labels',
        content: 'A form control without a properly associated label is an accessibility barrier. Clicking a label should also focus its matching input, providing a larger touch and click target on mobile devices.',
        codeExample: {
          language: 'html',
          code: `<form action="/submit-feedback" method="POST">
  <div class="form-group">
    <label for="user-email">Email Address:</label>
    <input 
      type="email" 
      id="user-email" 
      name="email" 
      required 
      autocomplete="email"
      placeholder="alex@example.com">
  </div>

  <div class="form-group">
    <label for="feedback-message">Message:</label>
    <textarea 
      id="feedback-message" 
      name="message" 
      rows="4" 
      required 
      minlength="10"></textarea>
  </div>

  <button type="submit">Send Feedback</button>
</form>`,
          explanation: 'The for attribute on <label> strictly matches the id on the <input>. type="email" triggers email keyboards on mobile phones.',
          expectedOutput: 'A validated form that prevents blank submissions and prompts users for correct email formats.'
        }
      },
      {
        heading: 'Native Client-Side Validation',
        content: 'HTML5 attributes like required, min, max, minlength, maxlength, and pattern="[A-Za-z]+" provide instant client validation without requiring heavy JavaScript.'
      }
    ],
    keyTakeaways: [
      'Every interactive input must have an accessible name via <label for="..."> or aria-label.',
      'Utilize autocomplete hints to speed up mobile user data entry.',
      'Always validate submissions on the backend in production environments.'
    ],
    commonMistakes: [
      { mistake: 'Using placeholder text instead of an explicit <label>', fix: 'Placeholders disappear when typing; always keep permanent labels visible.' },
      { mistake: 'Omitting type="button" on non-submit buttons inside forms', fix: 'Default button type is submit; specify type="button" for custom actions.' }
    ],
    prevLessonSlug: 'html-semantic-elements',
    nextLessonSlug: 'html-accessibility',
    relatedLessonSlugs: ['html-accessibility', 'angular-reactive-forms']
  },

  // 4. HTML Accessibility
  {
    id: 'lesson-html-accessibility',
    slug: 'html-accessibility',
    pathSlug: 'html',
    title: 'HTML Accessibility: Building Inclusive Web Experiences',
    description: 'Practical techniques to build web applications that comply with WCAG 2.1 AA standards and support assistive technology.',
    category: 'HTML',
    difficulty: 'Intermediate',
    tags: ['html', 'accessibility', 'a11y', 'wcag', 'aria'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-01-18',
    updatedDate: '2026-02-22',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Understand the four core WCAG principles (POUR)',
      'Manage heading levels in strict hierarchical order (H1 to H6)',
      'Follow the First Rule of ARIA: use native HTML elements first',
      'Support keyboard navigation with visible focus rings'
    ],
    prerequisites: ['HTML Basics', 'HTML Semantic Elements'],
    sections: [
      {
        heading: 'The First Rule of ARIA',
        content: 'The first rule of Accessible Rich Internet Applications (ARIA) is: If you can use a native HTML element or attribute with the semantics and behavior you require already built in, do so instead of re-purposing an element and adding ARIA. A native <button> handles keyboard Enter and Space activation automatically; a <div onclick="..."> requires manual role, tabindex, and keyboard event listeners.'
      },
      {
        heading: 'Accessible Interactive Elements',
        content: 'When custom widgets are necessary, use ARIA attributes like aria-expanded, aria-controls, and aria-live to broadcast state changes to screen readers.',
        codeExample: {
          language: 'html',
          code: `<!-- Accessible Accordion Trigger -->
<button 
  type="button" 
  class="accordion-trigger" 
  aria-expanded="false" 
  aria-controls="faq-panel-1"
  id="faq-btn-1">
  What is CodeLearn Academy?
  <span class="icon" aria-hidden="true">&#9662;</span>
</button>

<div 
  id="faq-panel-1" 
  role="region" 
  aria-labelledby="faq-btn-1" 
  hidden>
  <p>CodeLearn Academy is a practical, project-focused programming education platform.</p>
</div>`,
          explanation: 'aria-expanded communicates open/closed state. aria-controls links the trigger to the target section. aria-hidden="true" silences decorative icons.',
          expectedOutput: 'Assistive software announces button expanded/collapsed status correctly.'
        }
      }
    ],
    keyTakeaways: [
      'Accessible code is cleaner, faster, and benefits all users including keyboard and mobile users.',
      'Never remove outline: none in CSS without providing a visible focus-visible alternative.',
      'Headings must reflect document hierarchy; do not skip from H2 to H4 for styling reasons.'
    ],
    commonMistakes: [
      { mistake: 'Removing keyboard focus indicators (outline: 0)', fix: 'Use :focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }' },
      { mistake: 'Overusing aria-label on decorative elements', fix: 'Only label interactive or structural elements; hide icons with aria-hidden="true".' }
    ],
    prevLessonSlug: 'html-forms',
    nextLessonSlug: 'css-basics',
    relatedLessonSlugs: ['html-semantic-elements', 'css-basics', 'angular-components']
  },

  // 5. CSS Basics
  {
    id: 'lesson-css-basics',
    slug: 'css-basics',
    pathSlug: 'css',
    title: 'CSS Basics: Selectors, Specificity, and the Box Model',
    description: 'Learn how browsers calculate layout, compute cascade specificity, and render the CSS box model.',
    category: 'CSS',
    difficulty: 'Beginner',
    tags: ['css', 'selectors', 'box-model', 'specificity', 'cascade'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-01-20',
    updatedDate: '2026-02-25',
    readingTimeMinutes: 8,
    learningObjectives: [
      'Master the CSS Box Model: content, padding, border, and margin',
      'Understand the benefit of box-sizing: border-box',
      'Calculate CSS specificity and avoid specificity wars'
    ],
    prerequisites: ['HTML Basics'],
    sections: [
      {
        heading: 'The CSS Box Model',
        content: 'Every element rendered in the browser is considered a rectangular box. By default in content-box sizing, padding and borders are added to the specified width, causing layout bugs. Modern web design always applies box-sizing: border-box across all elements.'
      },
      {
        heading: 'Modern CSS Reset and Box Sizing',
        content: 'Applying border-box globally makes UI sizing predictable: a 300px element with 20px padding remains exactly 300px wide.',
        codeExample: {
          language: 'css',
          code: `/* Universal box-sizing reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card {
  width: 320px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1e293b;
}`,
          explanation: 'The card element will measure exactly 320px in total outer width, including its 1.5rem padding and 1px border.',
          expectedOutput: 'A clean card component with predictable dimensions across all browsers.'
        }
      }
    ],
    keyTakeaways: [
      'Use border-box to keep total dimensions equal to width and height.',
      'Keep selector specificity low by favoring single class names over deep nesting.',
      'Separate structural margins from internal element padding.'
    ],
    commonMistakes: [
      { mistake: 'Overusing !important to override styles', fix: 'Restructure class hierarchy or rely on CSS cascade layers instead of !important.' },
      { mistake: 'Confusing padding (inner space) with margin (outer space)', fix: 'Use padding for background-contained space and margin for neighbor spacing.' }
    ],
    prevLessonSlug: 'html-accessibility',
    nextLessonSlug: 'css-flexbox',
    relatedLessonSlugs: ['css-flexbox', 'css-grid', 'responsive-web-design']
  },

  // 6. CSS Flexbox
  {
    id: 'lesson-css-flexbox',
    slug: 'css-flexbox',
    pathSlug: 'css',
    title: 'CSS Flexbox: One-Dimensional Layout Masterclass',
    description: 'Align items, distribute extra space, manage wrapping, and build flexible navigation bars using Flexbox.',
    category: 'CSS',
    difficulty: 'Beginner',
    tags: ['css', 'flexbox', 'layout', 'alignment', 'responsive'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-01-22',
    updatedDate: '2026-02-26',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Understand main axis vs cross axis orientation',
      'Align elements effortlessly with justify-content and align-items',
      'Control item flexibility using flex-grow, flex-shrink, and flex-basis',
      'Use gap instead of clumsy margin hacks'
    ],
    prerequisites: ['CSS Basics'],
    sections: [
      {
        heading: 'Flex Container and Axes',
        content: 'Setting display: flex turns an element into a flex container. By default, flex-direction is row, meaning the main axis runs horizontally from left to right, and the cross axis runs vertically from top to bottom. Setting flex-direction: column swaps these axes.'
      },
      {
        heading: 'Building a Modern Navigation Bar',
        content: 'Flexbox solves the classic navbar requirement: logo on the left, navigation items spaced neatly, and an action button aligned to the far right.',
        codeExample: {
          language: 'css',
          code: `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #0f172a;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #ffffff;
}`,
          explanation: 'justify-content: space-between pushes outer items to opposite ends. gap provides uniform space between items.',
          expectedOutput: 'A robust horizontal header bar with perfectly centered items and clean spacing.'
        }
      }
    ],
    keyTakeaways: [
      'justify-content aligns items along the main axis.',
      'align-items aligns items along the cross axis.',
      'gap property works seamlessly in modern flexbox, removing the need for margin-right on children.'
    ],
    commonMistakes: [
      { mistake: 'Applying justify-content or align-items to flex children instead of the container', fix: 'Set alignment rules on the container with display: flex, or use align-self on specific children.' },
      { mistake: 'Forgetting flex-wrap: wrap when laying out dynamic badge lists', fix: 'Add flex-wrap: wrap to prevent horizontal container overflow on small screens.' }
    ],
    prevLessonSlug: 'css-basics',
    nextLessonSlug: 'css-grid',
    relatedLessonSlugs: ['css-grid', 'responsive-web-design']
  },

  // 7. CSS Grid
  {
    id: 'lesson-css-grid',
    slug: 'css-grid',
    pathSlug: 'css',
    title: 'CSS Grid: Two-Dimensional Layouts and Responsive Grids',
    description: 'Create multi-column cards, template areas, and responsive fluid layouts without media queries using repeat(auto-fit, minmax(...)).',
    category: 'CSS',
    difficulty: 'Intermediate',
    tags: ['css', 'grid', 'layout', 'minmax', 'auto-fit'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-01-25',
    updatedDate: '2026-02-28',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Understand the power of simultaneous row and column track control',
      'Build auto-responsive card grids using repeat(auto-fit, minmax(...))',
      'Use grid-template-areas for readable full-page layouts'
    ],
    prerequisites: ['CSS Basics', 'CSS Flexbox'],
    sections: [
      {
        heading: 'Flexbox vs CSS Grid',
        content: 'While Flexbox is designed primarily for 1-dimensional content distribution (either row or column), CSS Grid is designed for 2-dimensional layouts where alignment across both rows and columns is synchronized.'
      },
      {
        heading: 'The Holy Grail Responsive Grid',
        content: 'The most popular CSS Grid pattern lets cards automatically wrap into fewer or more columns depending on viewport width, completely eliminating breakpoint media queries.',
        codeExample: {
          language: 'css',
          code: `.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
}

.course-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}`,
          explanation: 'minmax(280px, 1fr) ensures each card is at least 280px wide. If there is leftover space, cards stretch equally (1fr). When the screen shrinks below 560px, it smoothly drops to 1 column.',
          expectedOutput: 'Fluid multi-column grid adapting from 4 columns on desktop to 1 on mobile.'
        }
      }
    ],
    keyTakeaways: [
      'CSS Grid manages rows and columns simultaneously.',
      'The fr unit allocates a fraction of the available free space.',
      'Use auto-fit when you want items to stretch across the full container width.'
    ],
    commonMistakes: [
      { mistake: 'Using CSS Grid when a simple 1D row layout with Flexbox was simpler', fix: 'Use Flexbox for simple inline toolbars and CSS Grid for structured multi-item matrices.' }
    ],
    prevLessonSlug: 'css-flexbox',
    nextLessonSlug: 'responsive-web-design',
    relatedLessonSlugs: ['css-flexbox', 'responsive-web-design']
  },

  // 8. Responsive Web Design
  {
    id: 'lesson-responsive-web-design',
    slug: 'responsive-web-design',
    pathSlug: 'css',
    title: 'Responsive Web Design: Mobile-First Strategy & Media Queries',
    description: 'Design websites that adapt gracefully from 320px mobile screens to 4K displays using fluid typography, clamps, and mobile-first CSS.',
    category: 'CSS',
    difficulty: 'Intermediate',
    tags: ['css', 'responsive', 'mobile-first', 'media-queries', 'clamp'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-01-28',
    updatedDate: '2026-03-01',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Write mobile-first CSS using min-width media queries',
      'Implement fluid typography using CSS clamp()',
      'Prevent horizontal scrolling on small mobile screens',
      'Optimize touch targets to at least 44x44 CSS pixels'
    ],
    prerequisites: ['CSS Basics', 'CSS Flexbox', 'CSS Grid'],
    sections: [
      {
        heading: 'Why Mobile-First?',
        content: 'Mobile-first means writing base CSS rules targeting small screens first, then layering complex layouts progressively using min-width queries. This results in cleaner code, faster mobile parsing, and avoids overriding desktop rules.'
      },
      {
        heading: 'Fluid Typography with CSS Clamp',
        content: 'Instead of defining font sizes at multiple media queries, clamp() allows text to scale fluidly between a minimum and maximum bound based on viewport width.',
        codeExample: {
          language: 'css',
          code: `:root {
  /* Fluid heading: min 1.75rem, ideal 4vw + 1rem, max 3rem */
  --font-h1: clamp(1.75rem, 4vw + 1rem, 3rem);
  --container-max: 1200px;
}

h1 {
  font-size: var(--font-h1);
  line-height: 1.2;
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding-inline: 2rem;
  }
}`,
          explanation: 'margin-inline: auto centers the container. clamp() creates smooth typography scaling without abrupt jumps.',
          expectedOutput: 'Headlines look proportionate on both iPhone SE (320px) and ultra-wide desktop monitors.'
        }
      }
    ],
    keyTakeaways: [
      'Mobile-first architectures use min-width breakpoints (e.g. 640px, 768px, 1024px, 1280px).',
      'Never hardcode fixed pixel widths on container elements; use max-width and percentages.',
      'Ensure touch targets for buttons and links are at least 44x44px for thumb accessibility.'
    ],
    commonMistakes: [
      { mistake: 'Writing max-width media queries that fight desktop defaults', fix: 'Adopt mobile-first min-width queries to let mobile styles cascade cleanly upward.' },
      { mistake: 'Elements with width: 100vw causing horizontal scrollbars', fix: 'Use width: 100% instead of 100vw to account for OS scrollbar widths.' }
    ],
    prevLessonSlug: 'css-grid',
    nextLessonSlug: 'javascript-variables',
    relatedLessonSlugs: ['css-flexbox', 'css-grid', 'javascript-dom']
  },

  // 9. JavaScript Variables
  {
    id: 'lesson-javascript-variables',
    slug: 'javascript-variables',
    pathSlug: 'javascript',
    title: 'JavaScript Variables: const, let, Scope, and Data Types',
    description: 'Learn block scope, the temporal dead zone, variable mutability, and JavaScript primitive vs reference types.',
    category: 'JavaScript',
    difficulty: 'Beginner',
    tags: ['javascript', 'variables', 'scope', 'let', 'const', 'data-types'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-02-01',
    updatedDate: '2026-03-03',
    readingTimeMinutes: 8,
    learningObjectives: [
      'Understand why var is legacy and why const/let should be used exclusively',
      'Distinguish block scope from function scope',
      'Recognize primitive types vs reference types',
      'Understand const immutability vs object mutation'
    ],
    prerequisites: ['HTML Basics'],
    sections: [
      {
        heading: 'Modern Variable Declaration',
        content: 'In modern JavaScript (ES6+), always default to declaring variables with const. If a variable must be reassigned later (such as a counter or accumulator), use let. Never use var, as it hoists with undefined value and ignores block scoping.'
      },
      {
        heading: 'const Does Not Mean Value Immutability',
        content: 'Declaring an object or array with const locks the variable binding, preventing reassignment of the variable itself, but its internal properties can still be modified.',
        codeExample: {
          language: 'javascript',
          code: `const user = {
  id: 101,
  username: 'coder_sam',
  isActive: true
};

user.isActive = false; // Valid property mutation

const score = 95;           // Number
const name = 'Sam';         // String
const isGraduated = true;   // Boolean
const emptySlot = null;     // Null
let pendingValue;           // Undefined`,
          explanation: 'Primitives are immutable and passed by value. Objects and arrays are passed by reference.',
          expectedOutput: 'user.isActive updates to false without rebinding the user identifier.'
        }
      }
    ],
    keyTakeaways: [
      'Default to const; only use let when reassignment is strictly required.',
      'const and let are block-scoped ({ ... }) and reside in the Temporal Dead Zone before declaration.',
      'JavaScript has 7 primitive types: string, number, bigint, boolean, symbol, undefined, null.'
    ],
    commonMistakes: [
      { mistake: 'Assuming const array cannot have items pushed to it', fix: 'const prevents array variable reassignment, not array.push() mutations.' },
      { mistake: 'Using loose equality (==) which performs unexpected type coercion', fix: 'Always use strict equality (===) to compare both value and type.' }
    ],
    prevLessonSlug: 'responsive-web-design',
    nextLessonSlug: 'javascript-functions',
    relatedLessonSlugs: ['javascript-functions', 'javascript-arrays', 'typescript-basics']
  },

  // 10. JavaScript Functions
  {
    id: 'lesson-javascript-functions',
    slug: 'javascript-functions',
    pathSlug: 'javascript',
    title: 'JavaScript Functions: Declarations, Arrow Functions, and Parameters',
    description: 'Master function declarations, arrow functions, lexical this binding, default parameters, and rest parameters.',
    category: 'JavaScript',
    difficulty: 'Beginner',
    tags: ['javascript', 'functions', 'arrow-functions', 'this', 'parameters'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-02-04',
    updatedDate: '2026-03-05',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Distinguish function declarations from arrow functions',
      'Understand lexical this binding in arrow functions',
      'Utilize default parameters and rest parameter syntax (...args)'
    ],
    prerequisites: ['JavaScript Variables'],
    sections: [
      {
        heading: 'Function Declarations vs Arrow Functions',
        content: 'Traditional function declarations are hoisted to the top of their scope and establish their own this context. Arrow functions offer concise syntax and retain the lexical this of their enclosing scope.'
      },
      {
        heading: 'Modern Function Syntax and Rest Parameters',
        content: 'Rest parameters capture indefinite arguments into a true array, replacing the outdated arguments object.',
        codeExample: {
          language: 'javascript',
          code: `function calculateTax(amount, rate = 0.08) {
  return amount * (1 + rate);
}

const sumNumbers = (...numbers) => {
  return numbers.reduce((total, n) => total + n, 0);
};

console.log(calculateTax(100)); // 108
console.log(sumNumbers(10, 20, 30, 40)); // 100`,
          explanation: 'rate = 0.08 defaults if undefined is provided. ...numbers gathers all passed numbers into an array.',
          expectedOutput: 'Output 108 and 100 logged to the console.'
        }
      }
    ],
    keyTakeaways: [
      'Arrow functions do not bind their own this, arguments, super, or new.target.',
      'Always use rest parameters (...args) instead of arguments for type safety and array methods.',
      'Keep functions small, pure, and focused on doing a single task.'
    ],
    commonMistakes: [
      { mistake: 'Using an arrow function as an object method requiring this', fix: 'Use standard method syntax (method() {}) when accessing this inside an object.' }
    ],
    prevLessonSlug: 'javascript-variables',
    nextLessonSlug: 'javascript-arrays',
    relatedLessonSlugs: ['javascript-arrays', 'javascript-objects', 'javascript-promises']
  },

  // 11. JavaScript Arrays
  {
    id: 'lesson-javascript-arrays',
    slug: 'javascript-arrays',
    pathSlug: 'javascript',
    title: 'JavaScript Arrays: Essential Methods (map, filter, reduce)',
    description: 'Transform, filter, and aggregate arrays immutably using modern functional array methods.',
    category: 'JavaScript',
    difficulty: 'Beginner',
    tags: ['javascript', 'arrays', 'map', 'filter', 'reduce', 'immutability'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-02-07',
    updatedDate: '2026-03-07',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Transform array data with map() without mutating the original array',
      'Filter subsets of data with filter()',
      'Accumulate totals and grouped data with reduce()',
      'Use find(), some(), every(), and flatMap()'
    ],
    prerequisites: ['JavaScript Variables', 'JavaScript Functions'],
    sections: [
      {
        heading: 'Immutable Array Transformations',
        content: 'In modern frontend frameworks like Angular, mutating arrays in place (like with push, pop, or splice) can break change detection. Instead, use non-mutating methods like map, filter, concat, and the spread operator ([...arr]).'
      },
      {
        heading: 'Chaining map, filter, and reduce',
        content: 'Combining methods allows declarative, readable data pipelines.',
        codeExample: {
          language: 'javascript',
          code: `const lessons = [
  { id: 1, title: 'HTML Basics', durationMinutes: 15, isCompleted: true },
  { id: 2, title: 'CSS Flexbox', durationMinutes: 20, isCompleted: false },
  { id: 3, title: 'JS Arrays', durationMinutes: 25, isCompleted: true },
  { id: 4, title: 'Angular Signals', durationMinutes: 30, isCompleted: true }
];

const completedLessons = lessons.filter(l => l.isCompleted);
const completedTitles = completedLessons.map(l => l.title);
const totalCompletedMinutes = completedLessons.reduce((sum, l) => sum + l.durationMinutes, 0);

console.log(completedTitles); // ['HTML Basics', 'JS Arrays', 'Angular Signals']
console.log(totalCompletedMinutes); // 70`,
          explanation: 'filter returns a new array meeting criteria. reduce takes an accumulator and initial value (0).',
          expectedOutput: 'Titles array and total 70 minutes computed immutably.'
        }
      }
    ],
    keyTakeaways: [
      'map() produces a new array of identical length transformed by the callback.',
      'filter() produces a subset array containing elements that returned truthy.',
      'reduce() aggregates array items into any single value (number, object, or map).'
    ],
    commonMistakes: [
      { mistake: 'Forgetting to return a value inside the map() callback', fix: 'Ensure explicit return or concise arrow expression (x => x * 2).' }
    ],
    prevLessonSlug: 'javascript-functions',
    nextLessonSlug: 'javascript-objects',
    relatedLessonSlugs: ['javascript-objects', 'typescript-basics']
  },

  // 12. JavaScript Objects
  {
    id: 'lesson-javascript-objects',
    slug: 'javascript-objects',
    pathSlug: 'javascript',
    title: 'JavaScript Objects: Destructuring, Spread, and Object Methods',
    description: 'Work with object literals, destructuring assignment, property shorthand, optional chaining, and nullish coalescing.',
    category: 'JavaScript',
    difficulty: 'Beginner',
    tags: ['javascript', 'objects', 'destructuring', 'spread', 'optional-chaining'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-02-10',
    updatedDate: '2026-03-09',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Extract properties cleanly with object destructuring',
      'Clone and merge objects safely using the spread operator',
      'Safely traverse nested properties with optional chaining (?.)',
      'Provide fallback values using nullish coalescing (??)'
    ],
    prerequisites: ['JavaScript Variables'],
    sections: [
      {
        heading: 'Modern Object Syntax and Destructuring',
        content: 'Destructuring unpacks values from objects into distinct variables. Renaming and default values can be declared directly in the pattern.'
      },
      {
        heading: 'Optional Chaining (?.) and Nullish Coalescing (??)',
        content: 'Accessing nested properties on undefined objects used to throw "Cannot read property of undefined". Optional chaining stops evaluation and returns undefined if the reference is null or undefined.',
        codeExample: {
          language: 'javascript',
          code: `const userProfile = {
  id: 42,
  name: 'Elena Rostova',
  preferences: {
    theme: 'dark'
  }
};

const { name, role = 'Student' } = userProfile;
const emailNotifications = userProfile.preferences?.notifications?.email ?? true;
const postalCode = userProfile.address?.postalCode ?? 'N/A';

console.log(role); // 'Student'
console.log(emailNotifications); // true
console.log(postalCode); // 'N/A'`,
          explanation: '?? only falls back on null or undefined, unlike || which also triggers on 0 or empty string "".',
          expectedOutput: 'Graceful handling of omitted nested properties without runtime errors.'
        }
      }
    ],
    keyTakeaways: [
      'Use optional chaining (?.) whenever an object path might be nullish.',
      'Use nullish coalescing (??) when 0 or "" are valid intentional values.',
      'Object.entries(), Object.keys(), and Object.values() provide clean iteration over object properties.'
    ],
    commonMistakes: [
      { mistake: 'Using || instead of ?? causing false/0 to be replaced unintentionally', fix: 'Use ?? when 0, false, or "" should be preserved as valid inputs.' }
    ],
    prevLessonSlug: 'javascript-arrays',
    nextLessonSlug: 'javascript-dom',
    relatedLessonSlugs: ['javascript-arrays', 'typescript-interfaces']
  },

  // 13. JavaScript DOM
  {
    id: 'lesson-javascript-dom',
    slug: 'javascript-dom',
    pathSlug: 'javascript',
    title: 'JavaScript DOM: Document Object Model & Element Manipulation',
    description: 'Select elements, modify classes and attributes, create dynamic elements, and understand browser reflow and repaint.',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    tags: ['javascript', 'dom', 'queryselector', 'classlist', 'manipulation'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-02-13',
    updatedDate: '2026-03-10',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Query elements using querySelector and querySelectorAll',
      'Manipulate classes safely with classList (add, remove, toggle)',
      'Create and append elements with createElement and appendChild/append',
      'Understand the performance cost of DOM thrashing'
    ],
    prerequisites: ['HTML Basics', 'JavaScript Functions'],
    sections: [
      {
        heading: 'What is the DOM?',
        content: 'The Document Object Model (DOM) is a tree-like object representation of the HTML document created by the browser engine. JavaScript interacts with this tree to read and alter document contents, styles, and attributes dynamically.'
      },
      {
        heading: 'Selecting and Modifying Elements',
        content: 'Modern DOM methods use standard CSS selector syntax via querySelector.',
        codeExample: {
          language: 'javascript',
          code: `const alertBox = document.querySelector('.notification');

if (alertBox) {
  alertBox.classList.toggle('is-visible');
  alertBox.setAttribute('role', 'alert');
}

const listContainer = document.querySelector('#skills-list');
const fragment = document.createDocumentFragment();

['TypeScript', 'Angular', 'SCSS'].forEach(skill => {
  const li = document.createElement('li');
  li.textContent = skill;
  li.className = 'badge-item';
  fragment.appendChild(li);
});

listContainer?.appendChild(fragment);`,
          explanation: 'Using a DocumentFragment batches DOM insertions into a single reflow instead of reflowing on every iteration.',
          expectedOutput: 'New list items rendered cleanly into the DOM with minimal CPU recalculation.'
        }
      }
    ],
    keyTakeaways: [
      'querySelector returns the first match or null; querySelectorAll returns a NodeList.',
      'Use textContent rather than innerHTML when inserting plain text to eliminate XSS security vulnerabilities.',
      'Batch DOM mutations or use DocumentFragment to prevent browser layout thrashing.'
    ],
    commonMistakes: [
      { mistake: 'Using innerHTML with untrusted user input', fix: 'Use textContent or proper sanitization to prevent Cross-Site Scripting (XSS).' }
    ],
    prevLessonSlug: 'javascript-objects',
    nextLessonSlug: 'javascript-events',
    relatedLessonSlugs: ['javascript-events', 'angular-components']
  },

  // 14. JavaScript Events
  {
    id: 'lesson-javascript-events',
    slug: 'javascript-events',
    pathSlug: 'javascript',
    title: 'JavaScript Events: Event Listeners, Bubbling, and Delegation',
    description: 'Master event handling, preventDefault, stopPropagation, event bubbling/capturing phases, and event delegation.',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    tags: ['javascript', 'events', 'bubbling', 'delegation', 'addeventlistener'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-02-16',
    updatedDate: '2026-03-12',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Register events cleanly with addEventListener',
      'Understand the 3 event phases: capture, target, and bubbling',
      'Implement Event Delegation to manage dynamic lists with high performance',
      'Remove listeners properly to prevent memory leaks'
    ],
    prerequisites: ['JavaScript DOM'],
    sections: [
      {
        heading: 'Event Bubbling and Capturing',
        content: 'When an event triggers on a DOM element (such as clicking a button), it first descends through ancestors in the capturing phase, reaches the target, and then bubbles back up through parent elements to the window. Most event handlers listen during the bubbling phase.'
      },
      {
        heading: 'High-Performance Event Delegation',
        content: 'Instead of attaching 500 event listeners to 500 individual table rows or list items, attach a single listener to their common parent container and inspect event.target.',
        codeExample: {
          language: 'javascript',
          code: `const list = document.querySelector('#task-list');

list.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.btn-delete');
  
  if (deleteBtn) {
    const taskId = deleteBtn.dataset.taskId;
    console.log('Deleting task id:', taskId);
    deleteBtn.closest('li')?.remove();
  }
});`,
          explanation: 'closest() traverses upward to find matching selectors. Any new tasks dynamically added will automatically inherit click handling without reattaching listeners.',
          expectedOutput: 'Clicking any delete button removes its row effortlessly with zero extra event listeners.'
        }
      }
    ],
    keyTakeaways: [
      'Event delegation attaches one listener to a parent to handle all present and future children.',
      'event.preventDefault() cancels browser default actions (like link navigation or form reloads).',
      'event.stopPropagation() halts the event from bubbling up to ancestor nodes.'
    ],
    commonMistakes: [
      { mistake: 'Using inline onclick="..." attributes in HTML', fix: 'Keep presentation and behavior decoupled by using addEventListener in scripts.' }
    ],
    prevLessonSlug: 'javascript-dom',
    nextLessonSlug: 'javascript-promises',
    relatedLessonSlugs: ['javascript-dom', 'javascript-promises']
  },

  // 15. JavaScript Promises
  {
    id: 'lesson-javascript-promises',
    slug: 'javascript-promises',
    pathSlug: 'javascript',
    title: 'JavaScript Promises: Asynchronous Control Flow',
    description: 'Understand the three promise states, chaining with .then() and .catch(), and running parallel promises with Promise.all().',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    tags: ['javascript', 'promises', 'async', 'then', 'catch', 'promise-all'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-02-19',
    updatedDate: '2026-03-14',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Understand Promise states: pending, fulfilled, and rejected',
      'Construct custom promises using the new Promise((resolve, reject) => ...) pattern',
      'Avoid callback hell with promise chaining',
      'Use Promise.all, Promise.allSettled, and Promise.race'
    ],
    prerequisites: ['JavaScript Functions'],
    sections: [
      {
        heading: 'Why Promises?',
        content: 'Before Promises, asynchronous code in JavaScript relied on callbacks passed as parameters. When multiple asynchronous actions depended on each other, code quickly spiraled into deeply nested, unmaintainable "callback hell". Promises provide a standardized representation of a future value.'
      },
      {
        heading: 'Creating and Handling a Promise',
        content: 'A promise receives an executor function with resolve and reject arguments.',
        codeExample: {
          language: 'javascript',
          code: `function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error('User ID is required.'));
      return;
    }
    
    setTimeout(() => {
      resolve({ id: userId, name: 'Maya Lin', tier: 'Pro' });
    }, 500);
  });
}

fetchUserData(101)
  .then(user => {
    console.log('User fetched:', user.name);
    return user.tier;
  })
  .catch(err => {
    console.error('Failed to fetch:', err.message);
  });`,
          explanation: 'Each .then() returns a new promise, allowing values to be transformed along the chain. .catch() handles any rejection in preceding steps.',
          expectedOutput: 'Console outputs user name, tier, and finally block message sequentially.'
        }
      }
    ],
    keyTakeaways: [
      'A Promise can settle only once: either fulfilled or rejected.',
      'Always catch promise rejections to avoid unhandled rejection warnings in modern runtimes.',
      'Promise.allSettled() is safer than Promise.all() when you want all requests to finish even if one fails.'
    ],
    commonMistakes: [
      { mistake: 'Forgetting to return a value or promise inside a .then() block', fix: 'Always return data so the subsequent .then() handler receives the payload.' }
    ],
    prevLessonSlug: 'javascript-events',
    nextLessonSlug: 'javascript-async-await',
    relatedLessonSlugs: ['javascript-async-await', 'angular-http-client']
  },

  // 16. JavaScript Async/Await
  {
    id: 'lesson-javascript-async-await',
    slug: 'javascript-async-await',
    pathSlug: 'javascript',
    title: 'JavaScript Async/Await: Clean Asynchronous Code',
    description: 'Write asynchronous code that looks and behaves like synchronous code using async functions, await expressions, and try/catch.',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    tags: ['javascript', 'async', 'await', 'fetch', 'error-handling'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-02-22',
    updatedDate: '2026-03-15',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Declare and call async functions',
      'Pause execution cleanly using await inside async contexts',
      'Implement structured error handling using try/catch/finally blocks',
      'Execute concurrent independent requests without sequential blocking'
    ],
    prerequisites: ['JavaScript Promises'],
    sections: [
      {
        heading: 'Syntactic Sugar Over Promises',
        content: 'async/await is built on top of native Promises. Marking a function with async guarantees it returns a Promise. The await keyword pauses the execution of the async function until the awaited promise settles, producing cleaner linear code.'
      },
      {
        heading: 'Real-World Data Fetching with try/catch',
        content: 'Handling network errors and HTTP error status codes gracefully.',
        codeExample: {
          language: 'javascript',
          code: `async function loadLessons(courseSlug) {
  try {
    const response = await fetch('/api/courses/' + courseSlug + '/lessons');
    
    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ': ' + response.statusText);
    }
    
    const lessons = await response.json();
    return lessons;
  } catch (error) {
    console.error('Failed to load lessons:', error.message);
    throw error;
  }
}`,
          explanation: 'fetch only rejects on network failure, not HTTP 404/500 errors. Checking response.ok is mandatory.',
          expectedOutput: 'Predictable async data retrieval with robust spinner management and error handling.'
        }
      }
    ],
    keyTakeaways: [
      'await can only be used inside async functions (or at top-level in ES modules).',
      'Always wrap awaited operations in try/catch to manage unexpected network failures.',
      'Do not await independent promises in series; launch them concurrently with Promise.all([p1, p2]).'
    ],
    commonMistakes: [
      { mistake: 'Assuming fetch() throws on HTTP 404 or 500', fix: 'Always verify if (!response.ok) { throw new Error(...) }.' }
    ],
    prevLessonSlug: 'javascript-promises',
    nextLessonSlug: 'typescript-basics',
    relatedLessonSlugs: ['typescript-basics', 'angular-http-client']
  },

  // 17. TypeScript Basics
  {
    id: 'lesson-typescript-basics',
    slug: 'typescript-basics',
    pathSlug: 'typescript',
    title: 'TypeScript Basics: Type Annotations, Inference, and Setup',
    description: 'Learn why static typing prevents production bugs, how TypeScript compiles to plain JavaScript, and how type inference works.',
    category: 'TypeScript',
    difficulty: 'Beginner',
    tags: ['typescript', 'types', 'inference', 'annotations', 'compiler'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-02-25',
    updatedDate: '2026-03-16',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Understand the relationship between TypeScript and JavaScript',
      'Annotate variables, function parameters, and return types',
      'Leverage TypeScript type inference to avoid redundant annotations',
      'Understand the special types: any, unknown, never, and void'
    ],
    prerequisites: ['JavaScript Variables', 'JavaScript Functions'],
    sections: [
      {
        heading: 'What is TypeScript?',
        content: 'TypeScript is a strongly typed superset of JavaScript developed by Microsoft. It adds static types to the JavaScript language, allowing code editors and compiler tools to detect typos, mismatched parameters, and null pointer exceptions before code ever runs in a browser.'
      },
      {
        heading: 'Type Annotations and Inference',
        content: 'TypeScript infers types automatically whenever an initial value is assigned. Explicit annotations are most valuable on function signatures and external data structures.',
        codeExample: {
          language: 'typescript',
          code: `let platform = 'CodeLearn Academy';

function formatScore(score: number, maxScore: number = 100): string {
  const percentage = Math.round((score / maxScore) * 100);
  return 'Score: ' + percentage + '%';
}

function processRawInput(data: unknown): void {
  if (typeof data === 'string') {
    console.log(data.toUpperCase());
  }
}`,
          explanation: 'unknown enforces type checking before performing operations, preventing runtime crashes.',
          expectedOutput: 'Type checks pass without warnings; editor autocomplete operates accurately.'
        }
      }
    ],
    keyTakeaways: [
      'TypeScript code is erased at compile time; it has zero runtime overhead.',
      'Avoid any because it turns off type checking; prefer unknown when shape is uncertain.',
      'Rely on type inference for local variables to keep code clean and readable.'
    ],
    commonMistakes: [
      { mistake: 'Sprinkling any everywhere to bypass compiler errors', fix: 'Write specific types, union types, or use unknown with type guards.' }
    ],
    prevLessonSlug: 'javascript-async-await',
    nextLessonSlug: 'typescript-interfaces',
    relatedLessonSlugs: ['typescript-interfaces', 'typescript-types', 'angular-components']
  },

  // 18. TypeScript Interfaces
  {
    id: 'lesson-typescript-interfaces',
    slug: 'typescript-interfaces',
    pathSlug: 'typescript',
    title: 'TypeScript Interfaces: Structuring Object Contracts',
    description: 'Define object shapes, optional properties, readonly fields, index signatures, and interface inheritance with extends.',
    category: 'TypeScript',
    difficulty: 'Intermediate',
    tags: ['typescript', 'interfaces', 'contracts', 'extends', 'readonly'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-02-28',
    updatedDate: '2026-03-18',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Define clear contracts for objects using interfaces',
      'Use optional properties (?) and immutable fields (readonly)',
      'Extend interfaces to compose complex data structures',
      'Enforce class implementation contracts using implements'
    ],
    prerequisites: ['TypeScript Basics'],
    sections: [
      {
        heading: 'Why Use Interfaces?',
        content: 'Interfaces define the public contract that an object must satisfy. They allow teams to coordinate data models across components, services, and API responses with total predictability.'
      },
      {
        heading: 'Interface Inheritance and Readonly Properties',
        content: 'Interfaces can extend one or more base interfaces to share common properties like ids and timestamps.',
        codeExample: {
          language: 'typescript',
          code: `interface BaseEntity {
  readonly id: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Student extends BaseEntity {
  name: string;
  email: string;
  enrolledCourseIds: string[];
}

const studentUser: Student = {
  id: 'usr_892',
  createdAt: new Date(),
  name: 'Liam Davis',
  email: 'liam@example.com',
  enrolledCourseIds: ['course-angular', 'course-ts']
};`,
          explanation: 'The readonly modifier protects the id from accidental mutation. Student inherits id and createdAt from BaseEntity.',
          expectedOutput: 'Clean object adhering strictly to the contract with compile-time safety.'
        }
      }
    ],
    keyTakeaways: [
      'Interfaces are ideal for defining object shapes and public APIs in Angular.',
      'readonly fields prevent mutations after initialization.',
      'Interfaces support declaration merging, making them extensible across libraries.'
    ],
    commonMistakes: [
      { mistake: 'Forgetting the ? on optional API properties that might be omitted', fix: 'Mark properties that may be undefined with property?: type.' }
    ],
    prevLessonSlug: 'typescript-basics',
    nextLessonSlug: 'typescript-types',
    relatedLessonSlugs: ['typescript-types', 'typescript-generics', 'angular-components']
  },

  // 19. TypeScript Types
  {
    id: 'lesson-typescript-types',
    slug: 'typescript-types',
    pathSlug: 'typescript',
    title: 'TypeScript Type Aliases: Unions, Intersections, and Tuples',
    description: 'Master type aliases, union types, discriminated unions, intersection types, and when to use type vs interface.',
    category: 'TypeScript',
    difficulty: 'Intermediate',
    tags: ['typescript', 'types', 'unions', 'discriminated-unions', 'intersections'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-03-02',
    updatedDate: '2026-03-19',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Create custom type aliases for primitives, unions, and tuples',
      'Harness discriminated unions for flawless state modeling',
      'Understand the key differences between type and interface'
    ],
    prerequisites: ['TypeScript Basics', 'TypeScript Interfaces'],
    sections: [
      {
        heading: 'Type vs Interface',
        content: 'While interfaces are designed specifically for object shapes and class implementations, type aliases can represent any valid TypeScript type, including primitives, unions, tuples, and function signatures.'
      },
      {
        heading: 'Discriminated Unions for Safe UI State Modeling',
        content: 'Discriminated unions use a common literal property (like status or kind) to allow TypeScript to narrow complex state machines safely.',
        codeExample: {
          language: 'typescript',
          code: `type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: string[] };
type ErrorState = { status: 'error'; errorMessage: string };

type AsyncState = LoadingState | SuccessState | ErrorState;

function renderState(state: AsyncState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading content, please wait...';
    case 'success':
      return 'Loaded ' + state.data.length + ' items.';
    case 'error':
      return 'Error occurred: ' + state.errorMessage;
  }
}`,
          explanation: 'TypeScript verifies exhaustiveness in the switch statement based on the unique status tag.',
          expectedOutput: 'Flawless UI state handling with zero risk of accessing data when in error state.'
        }
      }
    ],
    keyTakeaways: [
      'Use union types (A | B) when a value can be one of multiple forms.',
      'Discriminated unions provide unmatched type safety for handling API response states.',
      'Use interface for expandable object shapes and type for unions, tuples, and complex transformations.'
    ],
    commonMistakes: [
      { mistake: 'Modeling state with optional fields (isLoading, isError, data, error) in one object', fix: 'Use a discriminated union so invalid states like { isLoading: true, data: [...] } are impossible.' }
    ],
    prevLessonSlug: 'typescript-interfaces',
    nextLessonSlug: 'typescript-generics',
    relatedLessonSlugs: ['typescript-interfaces', 'typescript-generics', 'angular-signals']
  },

  // 20. TypeScript Generics
  {
    id: 'lesson-typescript-generics',
    slug: 'typescript-generics',
    pathSlug: 'typescript',
    title: 'TypeScript Generics: Reusable and Type-Safe Code',
    description: 'Write flexible components, helper functions, and API response wrappers without sacrificing static type checking.',
    category: 'TypeScript',
    difficulty: 'Advanced',
    tags: ['typescript', 'generics', 'constraints', 'type-safety', 'keyof'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-03-05',
    updatedDate: '2026-03-20',
    readingTimeMinutes: 11,
    learningObjectives: [
      'Understand the concept of type parameters (<T>)',
      'Create generic functions, interfaces, and classes',
      'Apply generic constraints using the extends keyword',
      'Use keyof and lookup types to enforce object property safety'
    ],
    prerequisites: ['TypeScript Interfaces', 'TypeScript Types'],
    sections: [
      {
        heading: 'Why Generics Matter',
        content: 'Without generics, a reusable function would either have to lock into a single type (like string) or revert to any (losing all type checking). Generics act as variables for types, capturing the type the caller provides and preserving it throughout.'
      },
      {
        heading: 'Generic API Response Wrapper and Constrained Generics',
        content: 'Generics are the standard way Angular packages HTTP responses and Signal values.',
        codeExample: {
          language: 'typescript',
          code: `interface ApiResponse<TData> {
  success: boolean;
  statusCode: number;
  data: TData;
  timestamp: string;
}

interface User {
  id: string;
  name: string;
}

function findById<T extends { id: string }>(items: T[], targetId: string): T | undefined {
  return items.find(item => item.id === targetId);
}

const users: User[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

const foundUser = findById(users, '2');
console.log(foundUser?.name); // 'Bob'`,
          explanation: '<T extends { id: string }> guarantees that any argument passed into findById has an id property, keeping code safe and reusable.',
          expectedOutput: 'Perfect autocomplete and type checking on foundUser without manual casting.'
        }
      }
    ],
    keyTakeaways: [
      'Generics enable reusable abstractions without dropping into the unsafe any type.',
      'Constraints (<T extends ...>) restrict the allowed types while retaining specific inference.',
      'Angular HttpClient methods like http.get<T>(...) rely fundamentally on generics.'
    ],
    commonMistakes: [
      { mistake: 'Creating overly complex nested generic types when a simple interface suffices', fix: 'Introduce generics only when code is truly reusable across varying data types.' }
    ],
    prevLessonSlug: 'typescript-types',
    nextLessonSlug: 'angular-components',
    relatedLessonSlugs: ['typescript-interfaces', 'angular-components', 'angular-services']
  },

  // 21. Angular Components
  {
    id: 'lesson-angular-components',
    slug: 'angular-components',
    pathSlug: 'angular',
    title: 'Angular Components: Standalone Architecture and Templates',
    description: 'Build modern Angular applications using standalone components, new control flow (@if, @for), inputs, and outputs.',
    category: 'Angular',
    difficulty: 'Beginner',
    tags: ['angular', 'components', 'standalone', 'control-flow', 'inputs-outputs'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-03-07',
    updatedDate: '2026-03-21',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Understand the role of Standalone Components in modern Angular',
      'Use the built-in control flow syntax (@if, @for, @switch)',
      'Pass data to child components using input() signal inputs',
      'Emit custom events using output()'
    ],
    prerequisites: ['TypeScript Basics', 'HTML Basics'],
    sections: [
      {
        heading: 'Standalone Components in Modern Angular',
        content: 'Angular no longer requires complex NgModules. Standalone components are the default standard. Every component declares its own dependencies in its imports array, making components modular, portable, and easy to tree-shake.'
      },
      {
        heading: 'Modern Signal Inputs and Built-in Control Flow',
        content: 'Modern Angular uses input() and output() functions along with @if and @for blocks.',
        codeExample: {
          language: 'typescript',
          code: `import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-lesson-card',
  standalone: true,
  template: \`
    <div class="card">
      <h3>{{ title() }}</h3>
      <p>Duration: {{ duration() }} mins</p>
      
      @if (isCompleted()) {
        <span class="badge-success">Completed</span>
      } @else {
        <button (click)="markComplete.emit(title())">Mark Complete</button>
      }
    </div>
  \`
})
export class LessonCardComponent {
  title = input.required<string>();
  duration = input<number>(10);
  isCompleted = input<boolean>(false);
  markComplete = output<string>();
}`,
          explanation: 'input.required<T>() requires parent components to supply the value. @if replaces legacy *ngIf without needing CommonModule.',
          expectedOutput: 'An encapsulated, self-contained standalone component with reactive signal inputs.'
        }
      }
    ],
    keyTakeaways: [
      'Standalone components simplify Angular by eliminating NgModules.',
      '@if and @for provide faster, cleaner template control flow with zero module imports.',
      'Signal inputs (input()) provide reactive read-only inputs directly compatible with Angular Signals.'
    ],
    commonMistakes: [
      { mistake: 'Forgetting track in @for loops', fix: 'Always specify @for (item of items; track item.id) for efficient DOM reconciliation.' }
    ],
    prevLessonSlug: 'typescript-generics',
    nextLessonSlug: 'angular-routing',
    relatedLessonSlugs: ['angular-routing', 'angular-signals', 'angular-services']
  },

  // 22. Angular Routing
  {
    id: 'lesson-angular-routing',
    slug: 'angular-routing',
    pathSlug: 'angular',
    title: 'Angular Routing: Standalone Routes, Lazy Loading, and Params',
    description: 'Configure client-side navigation using provideRouter, functional route guards, route parameters, and lazy loading.',
    category: 'Angular',
    difficulty: 'Intermediate',
    tags: ['angular', 'routing', 'lazy-loading', 'guards', 'params'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-03-09',
    updatedDate: '2026-03-21',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Configure application routes with app.routes.ts and RouterOutlet',
      'Lazy load component chunks with loadComponent to minimize initial bundle size',
      'Extract route parameters using withComponentInputBinding() or ActivatedRoute',
      'Protect routes using functional canActivate guards'
    ],
    prerequisites: ['Angular Components'],
    sections: [
      {
        heading: 'Setting Up Modern Standalone Routing',
        content: 'Angular routes are defined in a clean Routes array and provided via provideRouter(routes). Lazy loading is achieved using dynamic ES import expressions in loadComponent.'
      },
      {
        heading: 'Lazy-Loaded Routes Configuration',
        content: 'Lazy loading delays downloading route code until the user actually navigates to that path.',
        codeExample: {
          language: 'typescript',
          code: `import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    title: 'CodeLearn Academy - Learn Programming'
  },
  {
    path: 'tutorials/:slug',
    loadComponent: () => import('./pages/tutorials/tutorial-detail.component')
      .then(m => m.TutorialDetailComponent)
  }
];`,
          explanation: 'loadComponent dynamically imports the component chunk.',
          expectedOutput: 'Small initial bundle size with seamless on-demand route chunk downloads.'
        }
      }
    ],
    keyTakeaways: [
      'Lazy loading routes keeps initial page load blazing fast.',
      'withComponentInputBinding() automatically binds route params directly into component signal inputs.',
      'Always include a 404 wildcard route at the bottom of your routes array.'
    ],
    commonMistakes: [
      { mistake: 'Placing the wildcard (**) route at the top of the routes array', fix: 'The wildcard route must always be the very last entry in the routes array.' }
    ],
    prevLessonSlug: 'angular-components',
    nextLessonSlug: 'angular-signals',
    relatedLessonSlugs: ['angular-components', 'angular-signals', 'angular-services']
  },

  // 23. Angular Signals
  {
    id: 'lesson-angular-signals',
    slug: 'angular-signals',
    pathSlug: 'angular',
    title: 'Angular Signals: Reactive State Management Primitive',
    description: 'Master writable signals, computed values, and effects for fine-grained reactivity without Zone.js overhead.',
    category: 'Angular',
    difficulty: 'Intermediate',
    tags: ['angular', 'signals', 'reactivity', 'computed', 'effects'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-03-11',
    updatedDate: '2026-03-22',
    readingTimeMinutes: 11,
    learningObjectives: [
      'Understand the core Signal model: signal(), computed(), and effect()',
      'Update signal values with set() and update()',
      'Derive reactive state cleanly with computed() signals',
      'Understand how Signals optimize Angular change detection'
    ],
    prerequisites: ['Angular Components'],
    sections: [
      {
        heading: 'What are Angular Signals?',
        content: 'Signals represent values that notify interested consumers when they change. Unlike RxJS Observables which represent streams of values over time, Signals are synchronous, value-holding state containers. They bring fine-grained reactivity to Angular, eliminating unnecessary change detection cycles.'
      },
      {
        heading: 'Working with Signals and Computed Values',
        content: 'Writable signals hold state, and computed signals derive values automatically whenever dependencies change.',
        codeExample: {
          language: 'typescript',
          code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-cart-counter',
  standalone: true,
  template: \`
    <div>
      <p>Exercises Completed: {{ completedCount() }}</p>
      <p>Progress: {{ progressPercent() }}%</p>
      <button (click)="increment()">Complete Next Exercise</button>
    </div>
  \`
})
export class ProgressTrackerComponent {
  totalExercises = signal(30);
  completedCount = signal(12);

  progressPercent = computed(() => {
    return Math.round((this.completedCount() / this.totalExercises()) * 100);
  });

  increment(): void {
    this.completedCount.update(count => Math.min(count + 1, this.totalExercises()));
  }
}`,
          explanation: 'computed() values are memoized and only recalculate when their upstream dependencies change.',
          expectedOutput: 'Progress updates instantly on click with optimal fine-grained DOM recalculation.'
        }
      }
    ],
    keyTakeaways: [
      'Signals are read by invoking them like a function: mySignal().',
      'computed() signals are read-only and automatically track any signal read inside their callback.',
      'Use update() when deriving the new state from the previous state.'
    ],
    commonMistakes: [
      { mistake: 'Writing side effects inside a computed() signal', fix: 'Keep computed() pure and deterministic.' }
    ],
    prevLessonSlug: 'angular-routing',
    nextLessonSlug: 'angular-services',
    relatedLessonSlugs: ['angular-components', 'angular-services']
  },

  // 24. Angular Services
  {
    id: 'lesson-angular-services',
    slug: 'angular-services',
    pathSlug: 'angular',
    title: 'Angular Services & Dependency Injection: Scalable Architecture',
    description: 'Decouple business logic and state from UI components using Injectable services and the inject() function.',
    category: 'Angular',
    difficulty: 'Intermediate',
    tags: ['angular', 'services', 'dependency-injection', 'inject', 'singleton'],
    authorId: 'author-alex-morgan',
    publishedDate: '2026-03-13',
    updatedDate: '2026-03-22',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Create singleton application services using @Injectable({ providedIn: \'root\' })',
      'Use the modern inject() function instead of constructor parameter injection',
      'Organize business logic, caching, and state outside components'
    ],
    prerequisites: ['Angular Components', 'Angular Signals'],
    sections: [
      {
        heading: 'Why Dependency Injection?',
        content: 'Angular’s Dependency Injection (DI) system creates and delivers instances of classes where needed. Marking a service with providedIn: "root" ensures the service is a singleton shared across the entire application and is automatically tree-shaken if unused.'
      },
      {
        heading: 'Stateful Service with Signals and inject()',
        content: 'Modern Angular prefers the inject(Service) token over verbose constructor injection.',
        codeExample: {
          language: 'typescript',
          code: `import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarkedSlugs = signal<string[]>([]);
  
  readonly bookmarks = this.bookmarkedSlugs.asReadonly();
  readonly count = computed(() => this.bookmarkedSlugs().length);

  toggleBookmark(slug: string): void {
    this.bookmarkedSlugs.update(list => 
      list.includes(slug) ? list.filter(s => s !== slug) : [...list, slug]
    );
  }
}`,
          explanation: 'private signal with asReadonly() prevents external components from modifying state directly without going through service methods.',
          expectedOutput: 'Centralized state management accessible anywhere in the application with type safety.'
        }
      }
    ],
    keyTakeaways: [
      '@Injectable({ providedIn: "root" }) creates an application-wide singleton service.',
      'inject(MyService) is cleaner and works outside constructors.',
      'Keep UI components focused on rendering; delegate data storage to services.'
    ],
    commonMistakes: [
      { mistake: 'Providing a singleton service in component providers unnecessarily', fix: 'Only provide in component providers when a separate instance per component is needed.' }
    ],
    prevLessonSlug: 'angular-signals',
    nextLessonSlug: 'angular-reactive-forms',
    relatedLessonSlugs: ['angular-signals', 'angular-reactive-forms', 'angular-http-client']
  },

  // 25. Angular Reactive Forms
  {
    id: 'lesson-angular-reactive-forms',
    slug: 'angular-reactive-forms',
    pathSlug: 'angular',
    title: 'Angular Reactive Forms: Typed Forms, Controls, and Validation',
    description: 'Build robust, typed forms using FormGroup, FormControl, Validators, and custom validation logic.',
    category: 'Angular',
    difficulty: 'Intermediate',
    tags: ['angular', 'forms', 'reactive-forms', 'validation', 'typed-forms'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-03-15',
    updatedDate: '2026-03-23',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Import ReactiveFormsModule into standalone components',
      'Create strongly typed FormGroups and FormControls',
      'Apply built-in Validators (required, email, minLength)',
      'Display contextual validation errors dynamically in templates'
    ],
    prerequisites: ['Angular Components'],
    sections: [
      {
        heading: 'Why Reactive Forms?',
        content: 'Reactive forms are synchronous, predictable, and strongly typed. The model is defined programmatically in TypeScript, providing full control over testing, validation timing, and value transformations.'
      },
      {
        heading: 'Building a Strongly Typed Feedback Form',
        content: 'Defining form structure with Validators.',
        codeExample: {
          language: 'typescript',
          code: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Name:</label>
        <input id="name" formControlName="name" />
      </div>
      <button type="submit" [disabled]="contactForm.invalid">Submit</button>
    </form>
  \`
})
export class ContactFormComponent {
  contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Submitted:', this.contactForm.getRawValue());
    }
  }
}`,
          explanation: 'nonNullable: true ensures reset() reverts controls to their initial empty strings rather than null.',
          expectedOutput: 'Accessible form with dynamic error indicators and button disabled state.'
        }
      }
    ],
    keyTakeaways: [
      'Typed forms in Angular prevent reading incorrect property types on form values.',
      'Always verify form.valid before proceeding with submission payloads.',
      'Use getRawValue() if you want to include disabled control values.'
    ],
    commonMistakes: [
      { mistake: 'Forgetting to import ReactiveFormsModule in standalone component imports', fix: 'Add ReactiveFormsModule directly to component imports array.' }
    ],
    prevLessonSlug: 'angular-services',
    nextLessonSlug: 'angular-http-client',
    relatedLessonSlugs: ['angular-services', 'angular-http-client']
  },

  // 26. Angular HTTP Client
  {
    id: 'lesson-angular-http-client',
    slug: 'angular-http-client',
    pathSlug: 'angular',
    title: 'Angular HTTP Client: Requests, Interceptors, and Typed Responses',
    description: 'Fetch and send remote data using provideHttpClient, typed methods (get, post), and functional HTTP interceptors.',
    category: 'Angular',
    difficulty: 'Intermediate',
    tags: ['angular', 'http', 'httpclient', 'interceptors', 'rxjs'],
    authorId: 'author-david-chen',
    publishedDate: '2026-03-17',
    updatedDate: '2026-03-23',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Provide HttpClient in standalone applications via provideHttpClient()',
      'Execute typed HTTP requests (get<T>, post<T>)',
      'Create functional HTTP interceptors for headers and error logging',
      'Convert Observables to Signals with toSignal() or subscribe cleanly'
    ],
    prerequisites: ['Angular Services', 'TypeScript Generics'],
    sections: [
      {
        heading: 'Configuring HttpClient in Modern Angular',
        content: 'HttpClient is enabled in app.config.ts using provideHttpClient(withFetch(), withInterceptors([...])). withFetch() configures Angular to use the modern browser Fetch API internally.'
      },
      {
        heading: 'Consuming Typed REST Endpoints in a Service',
        content: 'Typing API responses prevents unexpected runtime undefined errors.',
        codeExample: {
          language: 'typescript',
          code: `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserStats {
  solvedCount: number;
  totalXP: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {
  private http = inject(HttpClient);

  getUserStats(userId: string): Observable<UserStats> {
    return this.http.get<UserStats>('/api/users/' + userId + '/stats');
  }
}`,
          explanation: 'http.get<UserStats> types the emitted Observable to UserStats.',
          expectedOutput: 'Type-safe asynchronous data retrieval with error handling.'
        }
      }
    ],
    keyTakeaways: [
      'Always type HTTP calls with generics like http.get<T>(url).',
      'Functional interceptors (HttpInterceptorFn) replace bulky class-based interceptors.',
      'Use withFetch() in provideHttpClient() for optimal modern browser performance.'
    ],
    commonMistakes: [
      { mistake: 'Forgetting provideHttpClient() in app.config.ts', fix: 'Add provideHttpClient() to providers in app.config.ts.' }
    ],
    prevLessonSlug: 'angular-reactive-forms',
    nextLessonSlug: 'angular-error-handling',
    relatedLessonSlugs: ['angular-services', 'angular-error-handling']
  },

  // 27. Angular Error Handling
  {
    id: 'lesson-angular-error-handling',
    slug: 'angular-error-handling',
    pathSlug: 'angular',
    title: 'Angular Error Handling: Global ErrorHandler and Defensive UI',
    description: 'Implement centralized error handling with custom ErrorHandler classes, route error boundaries, and user-friendly error fallbacks.',
    category: 'Angular',
    difficulty: 'Advanced',
    tags: ['angular', 'errors', 'errorhandler', 'debugging', 'resilience'],
    authorId: 'author-priya-patel',
    publishedDate: '2026-03-19',
    updatedDate: '2026-03-24',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Override Angular\'s default Global ErrorHandler',
      'Capture and log unhandled client-side runtime errors',
      'Build defensive UI states for network errors and missing data'
    ],
    prerequisites: ['Angular Services', 'Angular Components'],
    sections: [
      {
        heading: 'Centralized Error Handling in Angular',
        content: 'By default, unhandled errors in Angular are printed to the browser console. By implementing the ErrorHandler interface and providing it in app.config.ts, you can log exceptions to a telemetry service and show helpful guidance to users.'
      },
      {
        heading: 'Custom Global ErrorHandler Implementation',
        content: 'Intercepting unhandled errors without crashing the browser experience.',
        codeExample: {
          language: 'typescript',
          code: `import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalLoggingErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[GlobalErrorHandler Captured]:', message);
  }
}`,
          explanation: 'GlobalLoggingErrorHandler intercepts uncaught exceptions occurring inside templates or lifecycle hooks.',
          expectedOutput: 'Clean error capturing without unhandled promise rejections crashing the application.'
        }
      }
    ],
    keyTakeaways: [
      'Never leave errors unhandled in production; intercept and sanitize messages.',
      'Show users actionable recovery options rather than raw stack traces.',
      'Use defensive programming when parsing external API responses.'
    ],
    commonMistakes: [
      { mistake: 'Displaying raw internal exception stack traces to end users', fix: 'Show human-friendly messages and log technical details internally.' }
    ],
    prevLessonSlug: 'angular-http-client',
    nextLessonSlug: 'angular-deployment',
    relatedLessonSlugs: ['angular-http-client', 'angular-deployment']
  },

  // 28. Angular Deployment
  {
    id: 'lesson-angular-deployment',
    slug: 'angular-deployment',
    pathSlug: 'angular',
    title: 'Angular Deployment: Production Builds, Static Hosting, and SPA Routing',
    description: 'Build optimized production bundles, configure SPA rewrite rules for Vercel/Netlify/Firebase, and optimize assets.',
    category: 'Angular',
    difficulty: 'Intermediate',
    tags: ['angular', 'deployment', 'production', 'hosting', 'spa-routing'],
    authorId: 'author-david-chen',
    publishedDate: '2026-03-20',
    updatedDate: '2026-03-24',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Generate production bundles using ng build',
      'Understand how static hosting handles client-side SPA routing (index.html rewrites)',
      'Deploy easily to platforms like Vercel, Netlify, and Firebase Hosting',
      'Verify caching headers, robots.txt, and sitemap.xml in production'
    ],
    prerequisites: ['Angular Routing'],
    sections: [
      {
        heading: 'Building for Production',
        content: 'Running ng build triggers Ahead-Of-Time (AOT) compilation, code minification, dead-code elimination (tree shaking), and file content hashing for optimal browser caching.'
      },
      {
        heading: 'The SPA Routing Rewrite Rule',
        content: 'Because Angular handles routing in the browser, direct navigation to /tutorials/angular-components will cause static servers to return 404 unless configured to rewrite all unknown requests to index.html.',
        codeExample: {
          language: 'json',
          code: `// vercel.json rewrite configuration:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,
          explanation: 'The rewrite rule tells the host: if a file does not exist on disk, serve index.html with HTTP status 200 so the Angular client router can resolve the path.',
          expectedOutput: 'Direct URL visits and browser page refreshes work smoothly without 404 errors.'
        }
      }
    ],
    keyTakeaways: [
      'ng build compiles and bundles the app into dist/ with fingerprinting for immutable caching.',
      'Always configure your host to rewrite non-file requests to index.html.',
      'Verify that robots.txt and sitemap.xml remain directly accessible at their root URLs.'
    ],
    commonMistakes: [
      { mistake: 'Forgetting the SPA rewrite rule resulting in 404 on page refresh', fix: 'Add vercel.json, _redirects, or netlify.toml rewrite rules.' }
    ],
    prevLessonSlug: 'angular-error-handling',
    nextLessonSlug: 'git-basics',
    relatedLessonSlugs: ['angular-routing', 'git-basics']
  },

  // 29. Git Basics
  {
    id: 'lesson-git-basics',
    slug: 'git-basics',
    pathSlug: 'git',
    title: 'Git Basics: Distributed Version Control & Core Commands',
    description: 'Learn repository initialization, staging area concepts, committing snapshots, inspecting logs, and branch management.',
    category: 'Git & GitHub',
    difficulty: 'Beginner',
    tags: ['git', 'version-control', 'commit', 'branching', 'staging'],
    authorId: 'author-david-chen',
    publishedDate: '2026-03-21',
    updatedDate: '2026-03-24',
    readingTimeMinutes: 9,
    learningObjectives: [
      'Understand Git\'s three trees: Working Directory, Staging Area, and Git Directory (Commit History)',
      'Use git status, git add, and git commit effectively',
      'Inspect past history using git log --oneline --graph',
      'Create and switch branches with git switch / git branch'
    ],
    prerequisites: ['Basic command line familiarity'],
    sections: [
      {
        heading: 'What is Git?',
        content: 'Git is a distributed version control system that tracks changes in source code over time. Unlike older centralized systems, every developer has a full clone of the repository history locally on their machine, allowing instant branching, committing, and inspecting history offline.'
      },
      {
        heading: 'Core Git Commands in Practice',
        content: 'The essential daily development loop.',
        codeExample: {
          language: 'bash',
          code: `# Initialize a new git repository
git init

# Check state of working directory and staged files
git status

# Stage specific modified files
git add src/app/app.routes.ts

# Stage all tracked and untracked changes
git add .

# Create a commit with a clear imperative message
git commit -m "feat: add lazy-loaded tutorials route"

# Create and switch to a new feature branch
git switch -c feature/interactive-code-runner`,
          explanation: 'git switch -c replaces the older overloaded git checkout -b.',
          expectedOutput: 'Clear version snapshots recorded locally in your .git directory.'
        }
      }
    ],
    keyTakeaways: [
      'Commits represent permanent snapshots of staged files, not differential deltas.',
      'Write commit messages in the imperative mood ("feat: add user profile" not "added user profile").',
      'Keep branches short-lived and focused on single distinct features or fixes.'
    ],
    commonMistakes: [
      { mistake: 'Committing node_modules or environment secrets to git history', fix: 'Always configure a .gitignore file before making your initial commit.' }
    ],
    prevLessonSlug: 'angular-deployment',
    nextLessonSlug: 'github-workflow',
    relatedLessonSlugs: ['github-workflow']
  },

  // 30. GitHub Workflow
  {
    id: 'lesson-github-workflow',
    slug: 'github-workflow',
    pathSlug: 'git',
    title: 'GitHub Workflow: Remote Repositories, Pull Requests, and Merge Conflicts',
    description: 'Collaborate with teams using remote repositories, SSH keys, feature branching, pull request reviews, and conflict resolution.',
    category: 'Git & GitHub',
    difficulty: 'Intermediate',
    tags: ['git', 'github', 'pull-requests', 'remotes', 'merge-conflicts'],
    authorId: 'author-david-chen',
    publishedDate: '2026-03-22',
    updatedDate: '2026-03-25',
    readingTimeMinutes: 10,
    learningObjectives: [
      'Connect local repositories to remote remotes using git remote add origin',
      'Push branches and open informative Pull Requests on GitHub',
      'Conduct constructive code reviews and address feedback',
      'Safely diagnose and resolve Git merge conflicts'
    ],
    prerequisites: ['Git Basics'],
    sections: [
      {
        heading: 'The GitHub Flow',
        content: 'The GitHub flow is a lightweight branch-based workflow: create a branch from main, commit changes with clear descriptions, open a Pull Request (PR) for team discussion and CI testing, review and approve, and merge back into main.'
      },
      {
        heading: 'Resolving Merge Conflicts Confidently',
        content: 'A merge conflict occurs when two branches modify the exact same lines of a file in conflicting ways.',
        codeExample: {
          language: 'bash',
          code: `# 1. Fetch latest changes from remote
git fetch origin

# 2. Merge main into your branch
git merge origin/main

# 3. Edit the file to keep the desired resolution, delete markers, then:
git add src/environments/environment.ts
git commit -m "chore: resolve merge conflict in environment api endpoint"

# 4. Push updated branch to remote
git push origin feature/my-feature`,
          explanation: 'Never fear merge conflicts: they are simply Git asking you which lines are correct.',
          expectedOutput: 'Clean merged commit history with no remaining conflict markers.'
        }
      }
    ],
    keyTakeaways: [
      'Pull requests facilitate peer review, automated testing, and team knowledge sharing.',
      'Always pull the latest main branch before starting work or submitting a pull request.',
      'Resolve merge conflicts deliberately; test your code locally before pushing resolved files.'
    ],
    commonMistakes: [
      { mistake: 'Accidentally leaving conflict markers in committed code', fix: 'Search for conflict markers and run a local build (ng build) before committing.' }
    ],
    prevLessonSlug: 'git-basics',
    relatedLessonSlugs: ['git-basics', 'angular-deployment']
  }
];

