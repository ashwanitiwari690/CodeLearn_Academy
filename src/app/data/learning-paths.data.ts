import { LearningPath } from '../models/content.models';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-html',
    slug: 'html',
    title: 'HTML5 & Accessible Semantic Web',
    category: 'HTML',
    description: 'Learn modern semantic HTML5, accessible landmarks, document structures, forms, and screen-reader compatibility.',
    icon: 'code',
    difficulty: 'Beginner',
    estimatedHours: 15,
    prerequisites: ['None - No prior programming experience required'],
    beginnerLessonIds: ['les-01-html-basics', 'les-02-html-semantic', 'les-03-html-forms'],
    intermediateLessonIds: ['les-04-html-accessibility'],
    advancedLessonIds: [],
    exerciseIds: ['ex-26-dom-count-elements'],
    projectIds: ['proj-dev-portfolio'],
    commonMistakes: [
      {
        mistake: 'Using generic <div> elements for all buttons and links.',
        correction: 'Use native <button> for actions and <a> for navigation.',
        explanation: 'Native buttons provide keyboard focus, Enter/Space activation, and communicate role="button" to assistive technology.'
      },
      {
        mistake: 'Missing "alt" attributes on <img> tags.',
        correction: 'Always include alt="" for decorative images, or descriptive text for informational images.',
        explanation: 'Screen readers read the raw image URL if the alt attribute is omitted entirely.'
      }
    ],
    interviewTopicIds: ['int-html-semantics'],
    relatedResources: [
      { title: 'MDN Web Docs - HTML Elements Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', external: true },
      { title: 'W3C Web Accessibility Initiative (WAI)', url: 'https://www.w3.org/WAI/', external: true }
    ]
  },
  {
    id: 'path-css',
    slug: 'css',
    title: 'Modern CSS, Flexbox & Grid Systems',
    category: 'CSS',
    description: 'Master the CSS Box Model, CSS Flexbox, 2D CSS Grid layouts, custom properties, and responsive design systems.',
    icon: 'palette',
    difficulty: 'Beginner',
    estimatedHours: 25,
    prerequisites: ['HTML5 Basics & Semantic Elements'],
    beginnerLessonIds: ['les-05-css-basics', 'les-06-css-flexbox'],
    intermediateLessonIds: ['les-07-css-grid', 'les-08-responsive-design'],
    advancedLessonIds: [],
    exerciseIds: ['ex-28-clamp-number'],
    projectIds: ['proj-dev-portfolio'],
    commonMistakes: [
      {
        mistake: 'Using fixed pixel widths on mobile layouts.',
        correction: 'Use fluid units (%, rem, vw, clamp) and max-width: 100%.',
        explanation: 'Fixed pixel dimensions overflow small viewports, causing unwanted horizontal scrolling.'
      },
      {
        mistake: 'Misunderstanding the CSS Box Model under default content-box.',
        correction: 'Apply universal *, *::before, *::after { box-sizing: border-box; } reset.',
        explanation: 'border-box absorbs padding and border into element dimensions, preventing unexpected layout wrapping.'
      }
    ],
    interviewTopicIds: ['int-css-box-model'],
    relatedResources: [
      { title: 'CSS-Tricks: Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', external: true },
      { title: 'CSS-Tricks: Complete Guide to Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', external: true }
    ]
  },
  {
    id: 'path-javascript',
    slug: 'javascript',
    title: 'JavaScript Core, DOM & Asynchronous Architecture',
    category: 'JavaScript',
    description: 'Deep dive into ES6+ syntax, scope, closures, prototypes, DOM manipulation, Promises, and the Event Loop.',
    icon: 'javascript',
    difficulty: 'Intermediate',
    estimatedHours: 40,
    prerequisites: ['HTML5 & Modern CSS'],
    beginnerLessonIds: ['les-09-js-variables', 'les-10-js-functions', 'les-11-js-arrays', 'les-12-js-objects'],
    intermediateLessonIds: ['les-13-js-dom', 'les-14-js-events', 'les-15-js-promises', 'les-16-js-async-await'],
    advancedLessonIds: [],
    exerciseIds: ['ex-01-reverse-string', 'ex-02-find-max', 'ex-03-palindrome-check', 'ex-05-remove-duplicates', 'ex-23-sleep-promise'],
    projectIds: ['proj-task-manager'],
    commonMistakes: [
      {
        mistake: 'Mutating array state directly with methods like .push() in state reducers.',
        correction: 'Return a new array copy using the spread operator [...arr, item] or .concat().',
        explanation: 'Mutating data in place breaks change detection and leads to subtle state synchronization bugs.'
      },
      {
        mistake: 'Calling await inside an Array.prototype.forEach loop.',
        correction: 'Use a standard for...of loop or Promise.all(items.map(async ...)).',
        explanation: 'forEach does not wait for Promise completion; iterations fire concurrently and unhandled rejections can slip past.'
      }
    ],
    interviewTopicIds: ['int-js-event-loop', 'int-js-closures', 'int-js-promises-async'],
    relatedResources: [
      { title: 'JavaScript.info - The Modern JavaScript Tutorial', url: 'https://javascript.info/', external: true },
      { title: 'MDN Web Docs - JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', external: true }
    ]
  },
  {
    id: 'path-typescript',
    slug: 'typescript',
    title: 'TypeScript: Type Safety & Generic Architecture',
    category: 'TypeScript',
    description: 'Learn strict static typing, interfaces, type aliases, union types, discriminated unions, and advanced generics.',
    icon: 'integration_instructions',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    prerequisites: ['JavaScript Functions, Objects & Arrays'],
    beginnerLessonIds: ['les-17-ts-basics', 'les-18-ts-interfaces'],
    intermediateLessonIds: ['les-19-ts-types', 'les-20-ts-generics'],
    advancedLessonIds: [],
    exerciseIds: ['ex-25-ts-pick-property'],
    projectIds: ['proj-expense-tracker'],
    commonMistakes: [
      {
        mistake: 'Using "any" type to silence compiler errors.',
        correction: 'Use "unknown" with type narrowing or define explicit interfaces.',
        explanation: 'Using any defeats the purpose of TypeScript and eliminates autocomplete and compile-time safety.'
      }
    ],
    interviewTopicIds: ['int-ts-interface-vs-type', 'int-ts-generics'],
    relatedResources: [
      { title: 'Official TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/', external: true }
    ]
  },
  {
    id: 'path-angular',
    slug: 'angular',
    title: 'Angular Architecture: Standalone, Signals & Forms',
    category: 'Angular',
    description: 'Comprehensive guide to modern Angular: Standalone components, Signals, computed properties, dependency injection, routing, and HTTP client.',
    icon: 'deployed_code',
    difficulty: 'Intermediate',
    estimatedHours: 45,
    prerequisites: ['JavaScript ES6+', 'TypeScript Generics'],
    beginnerLessonIds: ['les-21-ng-components', 'les-22-ng-routing'],
    intermediateLessonIds: ['les-23-ng-signals', 'les-24-ng-services', 'les-25-ng-forms', 'les-26-ng-http'],
    advancedLessonIds: ['les-27-ng-errors', 'les-28-ng-deploy'],
    exerciseIds: ['ex-30-ng-signal-counter'],
    projectIds: ['proj-kanban-board'],
    commonMistakes: [
      {
        mistake: 'Reading a Signal in TypeScript class methods without calling it as a function.',
        correction: 'Read signals with parentheses: this.count(), not this.count.',
        explanation: 'A Signal is a getter function; omitting parentheses references the Signal wrapper object instead of its value.'
      }
    ],
    interviewTopicIds: ['int-ng-signals-vs-rxjs', 'int-ng-standalone', 'int-ng-di'],
    relatedResources: [
      { title: 'Official Angular Documentation', url: 'https://angular.dev', external: true }
    ]
  },
  {
    id: 'path-git',
    slug: 'git',
    title: 'Git Version Control & Team Collaboration',
    category: 'Git',
    description: 'Master commit hygiene, branch management, merge conflict resolution, pull requests, and collaborative code reviews.',
    icon: 'fork_right',
    difficulty: 'Beginner',
    estimatedHours: 10,
    prerequisites: ['Basic command line familiarity'],
    beginnerLessonIds: ['les-29-git-basics', 'les-30-git-workflow'],
    intermediateLessonIds: [],
    advancedLessonIds: [],
    exerciseIds: [],
    projectIds: ['proj-dev-portfolio'],
    commonMistakes: [
      {
        mistake: 'Committing node_modules or secret credentials into Git repository.',
        correction: 'Always configure a .gitignore file with node_modules/, dist/, and .env before git add .',
        explanation: 'Committed dependencies bloat repository history and leaking secrets requires git filter-branch or repository revocation.'
      }
    ],
    interviewTopicIds: ['int-git-merge-rebase'],
    relatedResources: [
      { title: 'Pro Git Book (Free)', url: 'https://git-scm.com/book/en/v2', external: true }
    ]
  }
];

