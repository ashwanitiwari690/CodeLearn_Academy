import { InterviewQuestion } from '../models/content.models';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int-js-event-loop',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    question: 'How does the JavaScript Event Loop coordinate execution between the call stack, microtask queue, and macrotask queue?',
    shortAnswer: 'JavaScript executes synchronous code on a single call stack. When asynchronous operations finish, microtasks (Promise callbacks, queueMicrotask) are prioritized immediately after the stack empties, before any macrotask (setTimeout, setInterval, I/O) runs.',
    detailedExplanation: [
      'JavaScript has a single-threaded runtime environment composed of the Memory Heap and the Call Stack.',
      'When asynchronous operations complete, their callbacks enter specific queues rather than interrupting active execution.',
      'The Microtask queue handles Promise handlers (.then, .catch, .finally), MutationObserver callbacks, and queueMicrotask().',
      'The Macrotask (or Task) queue handles setTimeout, setInterval, setImmediate (Node.js), and DOM event listeners.',
      'In each tick of the event loop, after the call stack becomes empty, the engine exhausts ALL pending microtasks before selecting the single oldest macrotask to execute. If a microtask schedules another microtask, it will be executed within the same cycle before macrotasks.'
    ],
    codeExample: {
      language: 'javascript',
      code: `console.log('1: Sync script start');

setTimeout(() => {
  console.log('2: Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Microtask 1');
}).then(() => {
  console.log('4: Microtask 2');
});

console.log('5: Sync script end');

// Output sequence:
// 1: Sync script start
// 5: Sync script end
// 3: Microtask 1
// 4: Microtask 2
// 2: Macrotask (setTimeout)`,
      explanation: 'Microtasks resolve immediately upon stack completion, guaranteeing microtask 1 & 2 finish before the macrotask timer callback executes.'
    },
    keyTakeaway: 'Always remember: Synchronous Call Stack -> Entire Microtask Queue Drain -> Browser Render / Repaint -> Oldest Macrotask.',
    relatedQuestionIds: ['int-js-closures', 'int-js-promises-async']
  },
  {
    id: 'int-js-closures',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    question: 'What is a closure in JavaScript, and what are its practical use cases and memory leak risks?',
    shortAnswer: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment. A closure gives an inner function access to an outer function scope even after the outer function has returned.',
    detailedExplanation: [
      'In JavaScript, functions retain a reference to their enclosing scope (lexical environment) created at function declaration time.',
      'Practical use cases include data privacy / encapsulation (creating private state without ES classes), function factories, currying, and memoization caches.',
      'A potential memory leak occurs when closures maintain references to large outer scope objects or DOM elements in event handlers that are never detached.'
    ],
    codeExample: {
      language: 'javascript',
      code: `function createCounter(initialValue = 0) {
  let count = initialValue; // Private state variable

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    getValue() {
      return count;
    }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getValue());   // 11
// 'count' cannot be accessed or modified directly from outside.`,
      explanation: 'The returned methods close over the private "count" variable, forming a persistent encapsulated state.'
    },
    keyTakeaway: 'Closures preserve lexical environment state across lifecycles, enabling private scopes and state encapsulation.',
    relatedQuestionIds: ['int-js-event-loop']
  },
  {
    id: 'int-js-promises-async',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    question: 'What is the mechanical difference between Promise chaining and async/await syntax?',
    shortAnswer: 'async/await is syntactic sugar over native Promises. An async function always returns a Promise, and await pauses function execution until the Promise settles, yielding control back to the event loop while unwrapping the resolved value or throwing rejected errors.',
    detailedExplanation: [
      'Under the hood, async/await utilizes generator functions and Promise microtask scheduling.',
      'While .then() requires nesting or sequential return chains that can lead to scope leakage or callback clutter, async/await allows developers to write asynchronous logic using synchronous control structures (try/catch, for...of, if/else).',
      'A common anti-pattern is executing independent awaits sequentially instead of utilizing Promise.all() for concurrent network requests.'
    ],
    codeExample: {
      language: 'javascript',
      code: `// Sequential: Takes 2000ms total
async function fetchSequential() {
  const user = await fetchUser(); // 1000ms
  const posts = await fetchPosts(); // 1000ms
  return { user, posts };
}

// Concurrent: Takes 1000ms total
async function fetchConcurrent() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}`,
      explanation: 'Use Promise.all when tasks are independent to avoid unintentional sequential blocking of network requests.'
    },
    keyTakeaway: 'Always evaluate if asynchronous calls are dependent before placing consecutive await statements.',
    relatedQuestionIds: ['int-js-event-loop']
  },
  {
    id: 'int-ts-interface-vs-type',
    category: 'TypeScript',
    difficulty: 'Beginner',
    question: 'What are the core differences between an interface and a type alias in TypeScript?',
    shortAnswer: 'Both define contracts for object shapes. Interfaces can be reopened and merged (declaration merging) and are ideal for public APIs and OOP inheritance. Type aliases are more versatile and can represent primitives, unions, intersections, tuples, and mapped types.',
    detailedExplanation: [
      'Declaration Merging: Declaring an interface twice with the same name combines their properties automatically. Type aliases will throw a compiler error "Duplicate identifier".',
      'Unions and Primitives: Type aliases can define union types (type Status = "idle" | "loading") or aliases for primitive values, which interfaces cannot do directly.',
      'Extending: Interfaces extend using the "extends" keyword (`interface B extends A`). Types use intersection operators (`type B = A & { extra: string }`).',
      'Modern TypeScript recommendation: Use interfaces for defining object structures and API boundaries; use types for unions, complex transformations, and utility types.'
    ],
    codeExample: {
      language: 'typescript',
      code: `// Interface declaration merging
interface UserSettings {
  theme: 'light' | 'dark';
}
interface UserSettings {
  notifications: boolean; // Merged into UserSettings!
}

// Type aliases for unions and conditional structures
type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };`,
      explanation: 'Interfaces allow additive merging across modules; type aliases empower union discrimination.'
    },
    keyTakeaway: 'Default to interface for extensible entity models and types for unions, tuples, and mapped transformations.',
    relatedQuestionIds: ['int-ts-generics']
  },
  {
    id: 'int-ts-generics',
    category: 'TypeScript',
    difficulty: 'Intermediate',
    question: 'How do generic constraints work in TypeScript using the "extends" keyword?',
    shortAnswer: 'Generic constraints restrict the types that can be passed to a generic parameter by asserting that the type must satisfy a minimum contract (T extends ExpectedShape).',
    detailedExplanation: [
      'Unconstrained generics like `<T>` accept any type (string, number, null, object).',
      'When your function or class needs to access specific properties on `T` (such as `.id` or `.length`), you must constrain the type using `extends`.',
      'You can also constrain one generic parameter against another, e.g., `K extends keyof T` to guarantee type-safe property lookups.'
    ],
    codeExample: {
      language: 'typescript',
      code: `interface Identifiable {
  id: string | number;
}

// Constrain T so it is guaranteed to possess an 'id'
function findById<T extends Identifiable>(items: T[], targetId: string | number): T | undefined {
  return items.find(item => item.id === targetId);
}

// Keyof constraint for safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
      explanation: 'Generic constraints preserve exact input types while guaranteeing compiler verification of accessed properties.'
    },
    keyTakeaway: 'Use `T extends Base` to enforce structural prerequisites without losing the specific type argument.',
    relatedQuestionIds: ['int-ts-interface-vs-type']
  },
  {
    id: 'int-ng-signals-vs-rxjs',
    category: 'Angular',
    difficulty: 'Intermediate',
    question: 'What is the architectural purpose of Angular Signals, and how do they compare to RxJS Observables?',
    shortAnswer: 'Signals represent fine-grained, synchronous, reactive state with glitch-free pull semantics and automatic dependency tracking, eliminating Zone.js change detection overhead. RxJS Observables represent asynchronous event streams over time (user clicks, HTTP requests, WebSockets).',
    detailedExplanation: [
      'Signals are synchronous reactive values: a signal always holds a current value, read via `mySignal()`.',
      'Change Detection: Signals tell the framework exactly which template expressions or nodes need updating, avoiding full-tree Zone.js dirty checking.',
      'RxJS is powerful for complex async orchestration: debounceTime, switchMap, mergeMap, retryWhen, and cancellation.',
      'Modern Angular combines both: Use Signals for component UI state and template bindings, and use RxJS for complex asynchronous streams, converting between them via `toSignal()` and `toObservable()` from `@angular/core/rxjs-interop`.'
    ],
    codeExample: {
      language: 'typescript',
      code: `import { signal, computed, effect } from '@angular/core';

const quantity = signal(2);
const unitPrice = signal(49.99);

// Computed signal: auto-tracks quantity and unitPrice
const subtotal = computed(() => quantity() * unitPrice());

// Read synchronously
console.log(subtotal()); // 99.98

// Side-effects run only when dependencies change
effect(() => {
  console.log('Cart subtotal updated:', subtotal());
});`,
      explanation: 'Signals automatically track read dependencies during execution with zero subscription leaks.'
    },
    keyTakeaway: 'Use Signals for synchronous application and component state; use RxJS for asynchronous event streams.',
    relatedQuestionIds: ['int-ng-standalone', 'int-ng-di']
  },
  {
    id: 'int-ng-standalone',
    category: 'Angular',
    difficulty: 'Beginner',
    question: 'What are Standalone Components in Angular, and why did they supersede NgModules?',
    shortAnswer: 'Standalone components, directives, and pipes declare their dependencies directly in their `@Component({ imports: [...] })` decorator, eliminating the cognitive and structural boilerplate of NgModules, simplifying lazy loading, and enabling better tree-shaking.',
    detailedExplanation: [
      'Prior to standalone components, every Angular component had to be declared in an `@NgModule`, creating indirection and circular dependency hazards.',
      'Standalone components make dependencies explicit and localized to the component file.',
      'Routing is dramatically simplified: routes can directly `loadComponent: () => import(...)` without requiring intermediate routing modules.',
      'Applications can bootstrap directly with `bootstrapApplication(AppComponent, appConfig)` without an `AppModule`.'
    ],
    codeExample: {
      language: 'typescript',
      code: `// Standalone Component definition
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: \`
    <div class="profile">
      <h3>{{ username }}</h3>
      <a routerLink="/settings">Edit Profile</a>
    </div>
  \`
})
export class UserProfileComponent {
  username = 'Sarah Jenkins';
}`,
      explanation: 'Dependencies like RouterLink are imported directly where they are consumed.'
    },
    keyTakeaway: 'Standalone architecture is the modern standard for all new Angular applications, reducing boilerplate and optimizing build chunks.',
    relatedQuestionIds: ['int-ng-signals-vs-rxjs', 'int-ng-di']
  },
  {
    id: 'int-ng-di',
    category: 'Angular',
    difficulty: 'Intermediate',
    question: 'How does Dependency Injection work in Angular, and what is the difference between root and component-level providers?',
    shortAnswer: 'Angular DI uses a hierarchical injector tree. Services provided in root (`providedIn: "root"`) create a singleton instance shared across the entire application. Services provided in a component\'s `providers: [...]` array instantiate a fresh instance scoped to that component and its children.',
    detailedExplanation: [
      'The injector tree mirrors the DOM and router hierarchy.',
      'When a component requests a dependency using `inject(MyService)` or constructor parameters, Angular searches up the injector tree starting from the component injector until it finds a provider or reaches the root/platform injector.',
      'Root singletons are tree-shakable when defined via `@Injectable({ providedIn: "root" })`.',
      'Component providers are useful for ephemeral state that should be destroyed when the component unmounts (e.g. an active editing buffer or form draft).'
    ],
    codeExample: {
      language: 'typescript',
      code: `@Injectable({ providedIn: 'root' })
export class GlobalAuthService {
  // Shared single instance across the entire application
}

@Component({
  selector: 'app-editor-modal',
  standalone: true,
  providers: [DraftWorkspaceService], // Local instance destroyed with modal
  template: \`...\`
})
export class EditorModalComponent {
  private draft = inject(DraftWorkspaceService);
}`,
      explanation: 'Component providers guarantee isolated instance lifecycles bound to component existence.'
    },
    keyTakeaway: 'Use `providedIn: "root"` for cross-cutting services; use component `providers` when you require lifecycle-scoped state isolation.',
    relatedQuestionIds: ['int-ng-standalone']
  },
  {
    id: 'int-css-box-model',
    category: 'CSS',
    difficulty: 'Beginner',
    question: 'Explain the CSS Box Model and why "box-sizing: border-box" is widely adopted across modern CSS frameworks.',
    shortAnswer: 'The CSS Box Model consists of content, padding, border, and margin. Under standard "content-box", element width only applies to the content, causing padding and border to expand the total rendered size. "border-box" includes padding and border within the declared width, making layout math predictable.',
    detailedExplanation: [
      'content-box: Total Width = declared width + left/right padding + left/right border.',
      'border-box: Total Width = declared width (padding and border are absorbed inside the dimension).',
      'Margin remains outside the border in both models.',
      'Universal adoption: `*, *::before, *::after { box-sizing: border-box; }` ensures that if an element is assigned `width: 50%`, it will never unexpectedly wrap due to padding.'
    ],
    codeExample: {
      language: 'css',
      code: `/* Standard modern CSS baseline reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.box {
  width: 300px;
  padding: 20px;
  border: 5px solid #38bdf8;
  /* With border-box, total rendered width remains exactly 300px. */
}`,
      explanation: 'Border-box prevents layout overflow by keeping border and padding within declared boundaries.'
    },
    keyTakeaway: 'Always apply universal border-box to eliminate layout math discrepancies and prevent grid column breaks.',
    relatedQuestionIds: []
  },
  {
    id: 'int-web-cors',
    category: 'Web Development',
    difficulty: 'Intermediate',
    question: 'What is CORS, and why does a CORS error happen in the browser rather than in backend-to-backend requests?',
    shortAnswer: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism based on the Same-Origin Policy. The browser restricts cross-origin HTTP requests initiated by JavaScript unless the receiving server sends explicit response headers (like Access-Control-Allow-Origin) authorizing that origin.',
    detailedExplanation: [
      'Origin consists of protocol + hostname + port (e.g. http://localhost:4200 vs https://api.example.com).',
      'Same-Origin Policy is enforced strictly by web browsers to protect user credentials, cookies, and sensitive sessions from malicious scripts on third-party sites.',
      'Preflight Request: For non-simple requests (custom headers like Authorization, Content-Type: application/json, or methods like PUT/DELETE), the browser automatically dispatches an HTTP OPTIONS preflight request before the actual request.',
      'Backend-to-backend servers (curl, Postman, Node.js) do not enforce CORS because they are not sandboxed browser client runtimes executing untrusted third-party code.'
    ],
    codeExample: {
      language: 'http',
      code: `OPTIONS /api/v1/users HTTP/1.1
Host: api.example.com
Origin: https://codelearn.academy
Access-Control-Request-Method: POST
Access-Control-Request-Headers: authorization,content-type

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://codelearn.academy
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 86400`,
      explanation: 'The server must respond to the OPTIONS preflight with corresponding Access-Control headers before the browser issues the real POST request.'
    },
    keyTakeaway: 'CORS is a browser security constraint. Fix CORS by configuring the API server headers or using a local dev proxy.',
    relatedQuestionIds: []
  },
  {
    id: 'int-git-merge-rebase',
    category: 'Git',
    difficulty: 'Intermediate',
    question: 'What is the conceptual difference between "git merge" and "git rebase", and when should each be used?',
    shortAnswer: 'Git merge joins two branches together by creating a new 3-way merge commit, preserving complete historical chronology. Git rebase moves or reapplies a series of commits on top of a new base commit, creating a linear history without merge commits.',
    detailedExplanation: [
      'Merge: Non-destructive. Preserves the exact commit history and branching context. Can result in cluttered commit histories if branches are merged frequently.',
      'Rebase: Rewrites commit hashes. Produces a clean, linear git log that is easy to navigate and bisect.',
      'Golden Rule of Rebasing: Never rebase commits that have been pushed to a public/shared branch (such as main or develop), because rewriting shared commit hashes causes diverged history for collaborators.'
    ],
    codeExample: {
      language: 'bash',
      code: `# Rebase feature branch onto latest main
git checkout feature/auth
git fetch origin
git rebase origin/main

# If conflicts occur:
# 1. Edit conflicted files
# 2. git add <resolved-file>
# 3. git rebase --continue

# Squash commits during interactive rebase:
git rebase -i HEAD~3`,
      explanation: 'Rebasing keeps feature branches updated with main cleanly before opening a Pull Request.'
    },
    keyTakeaway: 'Use rebase locally to keep your private feature branch linear; use merge (or squash merge via PR) when integrating into shared branches.',
    relatedQuestionIds: []
  }
];

