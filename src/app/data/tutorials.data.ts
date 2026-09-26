import { Tutorial } from '../models/content.models';

export const TUTORIALS: Tutorial[] = [
  {
    id: 'tut-angular-standalone-component',
    slug: 'how-to-create-angular-component',
    title: 'How to Create and Structure an Angular Standalone Component',
    shortIntroduction: 'Learn how to generate, configure, and structure an Angular standalone component with modern input/output signals, scoped SCSS styling, and template control flow.',
    category: 'Angular',
    difficulty: 'Beginner',
    authorId: 'auth-alex-morgan',
    publishedDate: '2026-01-10',
    updatedDate: '2026-02-28',
    readingTimeMinutes: 12,
    prerequisites: [
      'Basic familiarity with HTML, CSS, and TypeScript',
      'Node.js and Angular CLI installed locally'
    ],
    tableOfContents: [
      { id: 'introduction', title: 'Why Standalone Components Matter' },
      { id: 'generating-component', title: 'Generating with Angular CLI' },
      { id: 'anatomy', title: 'Anatomy of the Component File' },
      { id: 'signals-binding', title: 'Adding Reactive Signals and Inputs' },
      { id: 'template-control-flow', title: 'Modern Template Control Flow' },
      { id: 'common-pitfalls', title: 'Common Mistakes to Avoid' }
    ],
    contentSections: [
      {
        id: 'introduction',
        title: 'Why Standalone Components Matter',
        paragraphs: [
          'Angular historically relied on NgModules to bundle declarations, imports, and exports. While powerful, modules introduced unnecessary indirection, steep learning curves, and bundle fragmentation.',
          'Standalone components eliminate NgModules entirely. Each component directly declares the directives, pipes, and other components it requires via its imports array. This makes code self-contained, effortlessly tree-shakable, and straightforward to test and lazy-load.'
        ]
      },
      {
        id: 'generating-component',
        title: 'Generating with Angular CLI',
        paragraphs: [
          'In modern Angular (v17+), standalone is the default mode. You can generate a new component using the Angular CLI command `ng generate component` (or `ng g c`).'
        ],
        codeSnippets: [
          {
            filename: 'terminal',
            language: 'bash',
            code: `ng generate component components/user-card --style=scss`,
            explanation: 'Generates user-card.component.ts, user-card.component.html, user-card.component.scss, and user-card.component.spec.ts.'
          }
        ]
      },
      {
        id: 'anatomy',
        title: 'Anatomy of the Component File',
        paragraphs: [
          'A modern standalone component features the `@Component` decorator with `standalone: true`, an explicit `imports: [...]` array, and concise TypeScript class logic.'
        ],
        codeSnippets: [
          {
            filename: 'user-card.component.ts',
            language: 'typescript',
            code: `import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface User {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  // Signal input: read via user()
  user = input.required<User>();

  // Event output emitter
  statusToggle = output<string>();

  onToggle(): void {
    this.statusToggle.emit(this.user().id);
  }
}`,
            explanation: 'Uses signal-based input.required() and modern output() functions instead of legacy @Input() and @Output() decorators.'
          }
        ]
      },
      {
        id: 'template-control-flow',
        title: 'Modern Template Control Flow',
        paragraphs: [
          'Instead of importing `*ngIf` or `*ngFor` structural directives, modern Angular templates use native built-in control flow blocks: `@if`, `@else`, `@for`, and `@switch`.'
        ],
        codeSnippets: [
          {
            filename: 'user-card.component.html',
            language: 'html',
            code: `<div class="user-card" [class.active]="user().isActive">
  <div class="user-header">
    <h3 class="user-name">{{ user().name }}</h3>
    <span class="badge">{{ user().role }}</span>
  </div>

  @if (user().isActive) {
    <p class="status-indicator online">Currently Active</p>
  } @else {
    <p class="status-indicator offline">Inactive</p>
  }

  <button type="button" class="btn" (click)="onToggle()">
    Toggle Status
  </button>
</div>`,
            explanation: 'Notice the use of user() function invocation to read the input signal value and clean @if / @else syntax.'
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: 'Forgetting to import RouterLink or CommonModule',
        explanation: 'Because standalone components do not inherit imports from a parent NgModule, any directive used in the template (such as routerLink) must be listed in imports.',
        solution: 'Add RouterLink or required directives directly to the @Component({ imports: [RouterLink] }) list.'
      },
      {
        title: 'Reading signal input without parentheses in TypeScript',
        explanation: 'Writing `this.user.name` instead of `this.user().name` causes compile errors because `user` is a signal function.',
        solution: 'Always call `this.user()` with parentheses to extract the current value.'
      }
    ],
    troubleshootingTips: [
      {
        symptom: 'NG8002: Can\'t bind to "routerLink" since it isn\'t a known property of "a".',
        cause: 'The component template uses [routerLink] but RouterLink is missing from imports.',
        resolution: 'Add `import { RouterLink } from "@angular/router";` and add `RouterLink` to the component\'s `imports` array.'
      }
    ],
    faqs: [
      {
        question: 'Can standalone components be used alongside NgModules?',
        answer: 'Yes! Standalone components can be imported into NgModule imports arrays, and NgModule exports can be imported into standalone components.'
      },
      {
        question: 'Should I use inline templates or external HTML files?',
        answer: 'For components under 40-50 lines of markup, inline templates keep all logic in one file. For larger views, separate HTML and SCSS files improve readability.'
      }
    ],
    relatedTutorialSlugs: ['how-to-use-angular-signals', 'how-to-fetch-data-angular-httpclient'],
    nextTutorialSlug: 'how-to-use-angular-signals'
  },
  {
    id: 'tut-angular-signals',
    slug: 'how-to-use-angular-signals',
    title: 'Mastering Angular Signals: State, Computeds, and Effects',
    shortIntroduction: 'A comprehensive guide to modern reactive programming in Angular using Signals, computed properties, effects, and interoperability with RxJS streams.',
    category: 'Angular',
    difficulty: 'Intermediate',
    authorId: 'auth-alex-morgan',
    publishedDate: '2026-01-18',
    updatedDate: '2026-03-01',
    readingTimeMinutes: 15,
    prerequisites: [
      'Basic understanding of Angular standalone components',
      'Familiarity with reactive programming principles'
    ],
    tableOfContents: [
      { id: 'what-are-signals', title: 'What are Angular Signals?' },
      { id: 'writable-signals', title: 'Writable Signals (set & update)' },
      { id: 'computed-signals', title: 'Computed Signals & Dependency Tracking' },
      { id: 'effects', title: 'Side Effects with effect()' },
      { id: 'rxjs-interop', title: 'Interoperability with RxJS' },
      { id: 'summary', title: 'Key Takeaways' }
    ],
    contentSections: [
      {
        id: 'what-are-signals',
        title: 'What are Angular Signals?',
        paragraphs: [
          'Signals represent values that change over time and notify interested consumers when mutations occur. Unlike RxJS Observables, Signals are strictly synchronous and always maintain a current value that can be read on demand with zero subscription management overhead.',
          'Signals enable fine-grained reactivity in Angular, allowing the template engine to pinpoint exactly what DOM elements need updating without checking the entire component tree.'
        ]
      },
      {
        id: 'writable-signals',
        title: 'Writable Signals (set & update)',
        paragraphs: [
          'Writable signals are created with the `signal()` function. You can replace their value with `.set(newValue)` or derive a new value from the current one with `.update(prev => next)`.'
        ],
        codeSnippets: [
          {
            filename: 'cart.service.ts',
            language: 'typescript',
            code: `import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // Private writable signal
  private itemsSignal = signal<CartItem[]>([]);

  // Public read-only view
  readonly items = this.itemsSignal.asReadonly();

  addItem(newItem: CartItem): void {
    this.itemsSignal.update(items => {
      const existing = items.find(i => i.id === newItem.id);
      if (existing) {
        return items.map(i => i.id === newItem.id 
          ? { ...i, quantity: i.quantity + newItem.quantity } 
          : i
        );
      }
      return [...items, newItem];
    });
  }

  clearCart(): void {
    this.itemsSignal.set([]);
  }
}`,
            explanation: 'Demonstrates immutable signal updates with .update() and resetting with .set().'
          }
        ]
      },
      {
        id: 'computed-signals',
        title: 'Computed Signals & Dependency Tracking',
        paragraphs: [
          'Computed signals are derived reactive values created with `computed()`. They dynamically track any signals read within their calculation function and recompute lazily only when their dependencies change.'
        ],
        codeSnippets: [
          {
            filename: 'cart-summary.component.ts',
            language: 'typescript',
            code: `import { Component, computed, inject } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  template: \`
    <div class="summary">
      <p>Total Items: {{ totalCount() }}</p>
      <p>Total Cost: {{ totalCost() | currency }}</p>
    </div>
  \`
})
export class CartSummaryComponent {
  private cartService = inject(CartService);

  readonly totalCount = computed(() => 
    this.cartService.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly totalCost = computed(() => 
    this.cartService.items().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );
}`,
            explanation: 'computed() signals automatically memorize results and recompute only when items() emits changes.'
          }
        ]
      },
      {
        id: 'effects',
        title: 'Side Effects with effect()',
        paragraphs: [
          'An `effect()` runs code whenever one or more tracked signals change. Effects must be instantiated within an injection context (such as a constructor or field initializer) and should be reserved for logging, analytics, or syncing with browser APIs like localStorage.'
        ],
        codeSnippets: [
          {
            filename: 'local-sync.ts',
            language: 'typescript',
            code: `import { effect, inject } from '@angular/core';
import { CartService } from './cart.service';

export class CartSync {
  private cart = inject(CartService);

  constructor() {
    effect(() => {
      // Re-runs whenever this.cart.items() changes!
      const serialized = JSON.stringify(this.cart.items());
      localStorage.setItem('saved_cart', serialized);
      console.log('Cart synchronized to storage');
    });
  }
}`,
            explanation: 'Effects automatically track any signals accessed inside the callback.'
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: 'Writing to signals inside an effect() without allowSignalWrites',
        explanation: 'By default, Angular disallows mutating signals inside effect callbacks to prevent cyclical re-renders and infinite loops.',
        solution: 'Use computed() to derive state instead of updating another signal inside an effect.'
      },
      {
        title: 'Mutating signal values directly instead of immutably',
        explanation: 'Writing `this.items().push(item)` does not change the array memory reference, so Angular cannot detect the update.',
        solution: 'Always return a new array or object using `this.itemsSignal.update(items => [...items, item])`.'
      }
    ],
    troubleshootingTips: [
      {
        symptom: 'NG0203: effect() can only be used within an injection context.',
        cause: 'effect() was called inside a regular method (e.g. ngOnInit) instead of constructor or property initialization.',
        resolution: 'Move the effect call to the class constructor or pass an explicit Injector reference.'
      }
    ],
    faqs: [
      {
        question: 'Do Signals replace RxJS entirely?',
        answer: 'No. Signals excel at synchronous state management and UI bindings. RxJS remains the best tool for asynchronous operations like debounceTime, switchMap, and WebSockets.'
      }
    ],
    relatedTutorialSlugs: ['how-to-create-angular-component', 'how-to-fetch-data-angular-httpclient'],
    prevTutorialSlug: 'how-to-create-angular-component',
    nextTutorialSlug: 'how-to-fetch-data-angular-httpclient'
  },
  {
    id: 'tut-angular-httpclient',
    slug: 'how-to-fetch-data-angular-httpclient',
    title: 'How to Fetch and Mutate Data using Angular HttpClient & Interceptors',
    shortIntroduction: 'Master making REST API requests, type-safe response handling, HTTP interceptors, and error handling in modern Angular with provideHttpClient.',
    category: 'Angular',
    difficulty: 'Intermediate',
    authorId: 'auth-alex-morgan',
    publishedDate: '2026-01-24',
    updatedDate: '2026-03-02',
    readingTimeMinutes: 14,
    prerequisites: [
      'Angular Standalone Components',
      'TypeScript Interfaces & Generics'
    ],
    tableOfContents: [
      { id: 'setup', title: 'Configuring provideHttpClient' },
      { id: 'service-pattern', title: 'Building the Data Service' },
      { id: 'functional-interceptors', title: 'Functional HTTP Interceptors' },
      { id: 'error-handling', title: 'Robust Error Handling' }
    ],
    contentSections: [
      {
        id: 'setup',
        title: 'Configuring provideHttpClient',
        paragraphs: [
          'In standalone applications, configure HTTP services in `app.config.ts` using `provideHttpClient()` with optional features like `withFetch()` and `withInterceptors()`.',
          'Using `withFetch()` leverages the modern browser native Fetch API under the hood instead of legacy XMLHttpRequest, enabling streaming and performance improvements.'
        ],
        codeSnippets: [
          {
            filename: 'app.config.ts',
            language: 'typescript',
            code: `import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    )
  ]
};`,
            explanation: 'Configures provideHttpClient with native fetch and functional interceptors.'
          }
        ]
      },
      {
        id: 'service-pattern',
        title: 'Building the Data Service',
        paragraphs: [
          'Encapsulate API endpoints in an `@Injectable` service using `inject(HttpClient)`. Always supply TypeScript models to GET, POST, PUT, and DELETE methods for strict typing.'
        ],
        codeSnippets: [
          {
            filename: 'article.service.ts',
            language: 'typescript',
            code: `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Article {
  id: string;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.codelearn.academy/v1/articles';

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Failed to load articles:', error);
        return throwError(() => new Error('Could not fetch articles. Please try again.'));
      })
    );
  }

  createArticle(article: Omit<Article, 'id'>): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }
}`,
            explanation: 'Strictly typed HTTP methods returning clean Observable streams with RxJS catchError.'
          }
        ]
      },
      {
        id: 'functional-interceptors',
        title: 'Functional HTTP Interceptors',
        paragraphs: [
          'Modern Angular uses lightweight functional interceptors of type `HttpInterceptorFn` instead of class-based interceptors.'
        ],
        codeSnippets: [
          {
            filename: 'auth.interceptor.ts',
            language: 'typescript',
            code: `import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: \`Bearer \${token}\`
      }
    });
    return next(cloned);
  }

  return next(req);
};`,
            explanation: 'Clones the request immutably to attach Authorization headers when a token exists.'
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: 'Mutating HttpHeaders or HttpRequest directly',
        explanation: 'HttpRequest and HttpHeaders objects are immutable. Calling req.headers.set(...) returns a new instance without mutating the existing request.',
        solution: 'Use `req.clone({ setHeaders: { ... } })` to produce the modified clone.'
      }
    ],
    troubleshootingTips: [
      {
        symptom: 'NullInjectorError: No provider for HttpClient!',
        cause: 'provideHttpClient() was not included in the application bootstrap providers list.',
        resolution: 'Add provideHttpClient() to the providers array in app.config.ts.'
      }
    ],
    faqs: [
      {
        question: 'Should I convert Observables to Signals for template display?',
        answer: 'Yes! You can use `toSignal(this.articleService.getArticles(), { initialValue: [] })` from `@angular/core/rxjs-interop` to bind cleanly to templates without the async pipe.'
      }
    ],
    relatedTutorialSlugs: ['how-to-create-angular-component', 'how-to-use-angular-signals'],
    prevTutorialSlug: 'how-to-use-angular-signals'
  },
  {
    id: 'tut-css-grid-layouts',
    slug: 'how-to-build-responsive-layout-css-grid',
    title: 'Building Modern Responsive Web Layouts with CSS Grid and Subgrid',
    shortIntroduction: 'Learn how to construct resilient, fluid responsive multi-column layouts, magazine headers, and cards using CSS Grid without media-query bloat.',
    category: 'CSS',
    difficulty: 'Intermediate',
    authorId: 'auth-alex-morgan',
    publishedDate: '2026-02-05',
    updatedDate: '2026-03-01',
    readingTimeMinutes: 11,
    prerequisites: [
      'HTML structure basics',
      'CSS Box Model understanding'
    ],
    tableOfContents: [
      { id: 'grid-vs-flexbox', title: 'Grid vs Flexbox: When to Use Which' },
      { id: 'fluid-columns', title: 'Fluid Columns with repeat() & minmax()' },
      { id: 'grid-template-areas', title: 'Visual Layouts with grid-template-areas' },
      { id: 'subgrid', title: 'Aligning Card Footers with CSS Subgrid' }
    ],
    contentSections: [
      {
        id: 'grid-vs-flexbox',
        title: 'Grid vs Flexbox: When to Use Which',
        paragraphs: [
          'Flexbox is one-dimensional (content flows either horizontally across a row or vertically down a column). It is ideal for navigation bars, button clusters, and linear item distributions.',
          'CSS Grid is two-dimensional (simultaneously managing both rows and columns). It is the premier tool for overall page skeletons, photo galleries, dashboards, and card matrices.'
        ]
      },
      {
        id: 'fluid-columns',
        title: 'Fluid Columns with repeat() & minmax()',
        paragraphs: [
          'The ultimate modern CSS pattern for responsive card grids is `repeat(auto-fit, minmax(minSize, 1fr))`. This instructs the browser to place as many columns as fit the viewport, expanding each item to fill surplus space equally, with zero media queries needed.'
        ],
        codeSnippets: [
          {
            filename: 'grid.css',
            language: 'css',
            code: `.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}`,
            explanation: 'On a 320px phone screen, items stack in 1 column. On a 900px tablet, 3 columns render automatically.'
          }
        ]
      },
      {
        id: 'grid-template-areas',
        title: 'Visual Layouts with grid-template-areas',
        paragraphs: [
          'Grid template areas allow you to draw the page layout directly in CSS like an ASCII art map, making responsive restructuring intuitive.'
        ],
        codeSnippets: [
          {
            filename: 'layout.css',
            language: 'css',
            code: `.dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

@media (max-width: 768px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}`,
            explanation: 'Re-assigning grid-template-areas inside a media query rearranges complete page sections cleanly.'
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: 'Using 100% width on grid items',
        explanation: 'Adding width: 100% inside grid cells can fight against grid track sizing and trigger unexpected horizontal scrollbars when gaps are applied.',
        solution: 'Let the grid tracks dictate width. Avoid hardcoding width on direct grid children.'
      }
    ],
    troubleshootingTips: [
      {
        symptom: 'Grid columns overflow horizontal screen boundary on mobile.',
        cause: 'Code inside the cell (like preformatted code or long URLs) is wider than the minmax track minimum.',
        resolution: 'Add `min-width: 0;` to the grid child or set `overflow-wrap: break-word;`.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between auto-fit and auto-fill?',
        answer: 'auto-fill creates empty tracks to fill the container even if there are no items; auto-fit collapses empty tracks down to 0px, expanding existing items to fill the container.'
      }
    ],
    relatedTutorialSlugs: ['how-to-create-angular-component'],
    prevTutorialSlug: 'how-to-fetch-data-angular-httpclient'
  }
];

