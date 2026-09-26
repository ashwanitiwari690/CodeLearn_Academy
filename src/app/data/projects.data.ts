import { ProjectBlueprint } from '../models/content.models';

export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: 'proj-dev-portfolio',
    slug: 'personal-developer-portfolio',
    title: 'Modern Responsive Developer Portfolio',
    category: 'Frontend',
    difficulty: 'Beginner',
    estimatedHours: 8,
    description: 'Design and build a professional developer portfolio website that showcases projects, technical skills, and contact information with fluid responsive typography and accessible semantic markup.',
    skillsRequired: ['Semantic HTML5', 'Modern CSS Grid & Flexbox', 'Responsive Design', 'CSS Custom Properties', 'Git Version Control'],
    prerequisites: ['Basic understanding of HTML elements', 'CSS box model and flexbox basics', 'Basic Git workflow'],
    features: {
      core: [
        'Semantic landmarks (header, nav, main, section, footer)',
        'Hero section with dynamic introduction and CV download link',
        'Responsive project cards grid with tags and live demo/repo links',
        'Technical skills showcase categorized by frontend, tools, and libraries',
        'Functional contact section with mailto or accessible form controls',
        'Dark and light color theme support via CSS variables'
      ],
      bonus: [
        'Smooth scroll navigation with active section indicator',
        'Print-optimized styling stylesheet for printable resume',
        'Accessible skip-to-content link for keyboard navigators'
      ]
    },
    stepByStepPlan: [
      {
        stepNumber: 1,
        title: 'Project Architecture & Semantic Markup',
        objective: 'Draft index.html using semantic landmarks and accessible headings hierarchy.',
        instructions: [
          'Create `index.html`, `styles.css`, and an `assets/` directory.',
          'Define the `<head>` with mobile viewport meta tag and descriptive title.',
          'Structure `<header>`, `<main>`, `<section id="projects">`, `<section id="skills">`, `<section id="contact">`, and `<footer>`.'
        ],
        codeGuidance: `<nav aria-label="Primary Navigation">
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`
      },
      {
        stepNumber: 2,
        title: 'CSS Custom Properties & Layout System',
        objective: 'Establish a cohesive color palette, typography scale, and responsive grid.',
        instructions: [
          'Define `:root` CSS variables for background, text, accent colors, and font families.',
          'Set universal box-sizing reset: `*, *::before, *::after { box-sizing: border-box; }`.',
          'Use CSS Grid with `repeat(auto-fit, minmax(280px, 1fr))` for fluid project cards without messy media queries.'
        ],
        codeGuidance: `:root {
  --bg: #0f172a;
  --text: #f8fafc;
  --primary: #38bdf8;
  --surface: #1e293b;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}`
      },
      {
        stepNumber: 3,
        title: 'Interactive Project Cards & Accessibility Polish',
        objective: 'Ensure cards have focus rings, descriptive link text, and image alt descriptions.',
        instructions: [
          'Give every project screenshot a meaningful `alt` attribute describing its user interface.',
          'Ensure all links have clear text (avoid "click here", use "View Code Repository for Weather App").',
          'Test keyboard navigation using the Tab key.'
        ]
      }
    ],
    folderStructure: `portfolio/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── images/
    │   ├── project-1.png
    │   └── avatar.jpg
    └── resume.pdf`,
    implementationGuidance: [
      'Focus on mobile-first responsive CSS: write base styles for small screens, then enhance using min-width media queries.',
      'Test your colors for WCAG AA contrast compliance (minimum 4.5:1 for normal text).'
    ],
    commonMistakes: [
      {
        mistake: 'Using non-semantic div soup instead of header, nav, main, and section landmarks.',
        prevention: 'Always utilize native HTML5 structural elements to ensure screen readers can navigate effectively.'
      },
      {
        mistake: 'Hardcoded pixel heights on text containers leading to overflow on small screens.',
        prevention: 'Use min-height or let intrinsic content determine box height.'
      }
    ],
    possibleImprovements: [
      'Add a client-side theme switcher toggle persisted in localStorage.',
      'Deploy the site to Netlify or GitHub Pages with custom domain configuration.'
    ]
  },
  {
    id: 'proj-task-manager',
    slug: 'task-manager-todo',
    title: 'Accessible Task Manager with Local Storage',
    category: 'JavaScript',
    difficulty: 'Beginner',
    estimatedHours: 10,
    description: 'Build an interactive task management application supporting CRUD operations, priority filtering, and browser localStorage persistence without relying on third-party libraries.',
    skillsRequired: ['JavaScript DOM Manipulation', 'Array Methods (map, filter, reduce)', 'Event Delegation', 'localStorage API', 'Accessible Form Controls'],
    prerequisites: ['JavaScript Functions & Arrays', 'DOM Querying & Events', 'HTML Form Elements'],
    features: {
      core: [
        'Add new tasks with title, category, and due date',
        'Mark tasks as completed with visual strike-through',
        'Delete tasks with confirmation',
        'Filter tasks by All, Active, and Completed states',
        'Persist task list in browser localStorage across page reloads',
        'Live task counter showing remaining active items'
      ],
      bonus: [
        'Keyboard shortcuts: Enter to add, Escape to cancel editing',
        'Inline task title editing with double-click',
        'Drag-and-drop reordering using HTML5 Drag and Drop API'
      ]
    },
    stepByStepPlan: [
      {
        stepNumber: 1,
        title: 'State Architecture & Local Storage Layer',
        objective: 'Define the Task data structure and storage sync functions.',
        instructions: [
          'Create a single state array: `let tasks = [];`.',
          'Implement `saveTasks()` that JSON.stringifies state to `localStorage.setItem("tasks", ...)`.',
          'Implement `loadTasks()` that parses from storage or defaults to an empty array.'
        ],
        codeGuidance: `interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}`
      },
      {
        stepNumber: 2,
        title: 'DOM Rendering & Event Delegation',
        objective: 'Render the tasks efficiently and attach a single event listener to the list container.',
        instructions: [
          'Write a pure `render(tasks)` function that creates DOM elements or template literals.',
          'Attach click listeners to the parent `<ul>` element using event delegation (`e.target.closest("button")`).',
          'Update task state and trigger `render()` and `saveTasks()`.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Form Validation & Accessibility',
        objective: 'Prevent empty task submissions and provide accessible aria-live status alerts.',
        instructions: [
          'Add an `aria-live="polite"` container that announces "Task added" or "Task deleted" to screen readers.',
          'Trim whitespace on submission and reject empty strings.'
        ]
      }
    ],
    folderStructure: `todo-app/
├── index.html
├── styles.css
└── app.js`,
    implementationGuidance: [
      'Keep state as the single source of truth; never scrape DOM text nodes to determine current state.',
      'Always use unique IDs (e.g. `crypto.randomUUID()` or timestamp) for tasks rather than relying on array indices.'
    ],
    commonMistakes: [
      {
        mistake: 'Attaching separate click event listeners to every individual list item.',
        prevention: 'Use event delegation on the parent container to handle dynamic additions cleanly.'
      }
    ],
    possibleImprovements: [
      'Add priority tags (High, Medium, Low) with custom sorting.',
      'Export tasks to JSON and import from JSON backup file.'
    ]
  },
  {
    id: 'proj-expense-tracker',
    slug: 'personal-expense-tracker',
    title: 'Personal Expense & Budget Tracker',
    category: 'TypeScript',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    description: 'Construct a structured financial tracking application in TypeScript that calculates total income, expenses, net balance, and visualizes spending breakdown by category.',
    skillsRequired: ['TypeScript Strict Mode', 'Modular Architecture', 'State Reducers', 'SVG / Canvas Charting', 'Form Validation'],
    prerequisites: ['TypeScript Basics and Interfaces', 'JavaScript Array transformations', 'ES Modules'],
    features: {
      core: [
        'Add transactions with type (income/expense), amount, date, and category',
        'Real-time calculation of total balance, total income, and total expenses',
        'Filterable transaction log with search by keyword and category',
        'Visual SVG donut or bar chart showing spending breakdown',
        'Data persistence in localStorage with schema validation'
      ],
      bonus: [
        'Monthly budget thresholds with warning alerts when exceeding 80%',
        'CSV export functionality generated client-side using Blob API',
        'Multi-currency formatting via Intl.NumberFormat'
      ]
    },
    stepByStepPlan: [
      {
        stepNumber: 1,
        title: 'TypeScript Models & Store Setup',
        objective: 'Define strong types for transactions and calculation summaries.',
        instructions: [
          'Define `TransactionType = "income" | "expense"`.',
          'Create `Transaction` interface with id, description, amount, type, category, date.',
          'Create an `ExpenseStore` class that encapsulates transactions and calculation getters.'
        ],
        codeGuidance: `export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: 'Food' | 'Housing' | 'Utilities' | 'Salary' | 'Entertainment' | 'Other';
  date: string;
}`
      },
      {
        stepNumber: 2,
        title: 'Calculations & Currency Formatting',
        objective: 'Implement accurate financial math and formatted display values.',
        instructions: [
          'Calculate total income and expenses using `Array.prototype.reduce`.',
          'Format amounts using `new Intl.NumberFormat(navigator.language, { style: "currency", currency: "USD" })`.',
          'Handle floating-point precision caveats by rounding to two decimal places.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Dynamic Chart Visualization',
        objective: 'Render an interactive SVG spending breakdown without external charting libraries.',
        instructions: [
          'Group expenses by category into key-value pairs.',
          'Calculate category percentages of total expenditure.',
          'Render responsive SVG rectangles or path wedges representing proportions.'
        ]
      }
    ],
    folderStructure: `expense-tracker/
├── src/
│   ├── models/
│   │   └── transaction.ts
│   ├── services/
│   │   ├── storage.ts
│   │   └── calculator.ts
│   ├── components/
│   │   ├── chart.ts
│   │   └── transaction-list.ts
│   └── main.ts
├── index.html
├── tsconfig.json
└── package.json`,
    implementationGuidance: [
      'Ensure numbers are sanitized from form inputs using `parseFloat()` or `Number()` before performing arithmetic.',
      'Check for negative numbers or zero amounts during input validation.'
    ],
    commonMistakes: [
      {
        mistake: 'Directly concatenating currency strings with numbers leading to string concatenation bugs.',
        prevention: 'Store amounts strictly as primitive numbers and format only in the presentation layer.'
      }
    ],
    possibleImprovements: [
      'Add recurring transaction scheduling emulation.',
      'Add historical month-over-month trend comparison.'
    ]
  },
  {
    id: 'proj-kanban-board',
    slug: 'project-management-kanban',
    title: 'Enterprise Kanban Project Management Board',
    category: 'Angular',
    difficulty: 'Advanced',
    estimatedHours: 24,
    description: 'Architect a full-featured Kanban project management application with Angular standalone components, Signals, drag-and-drop column transitions, customizable board filters, and local persistence.',
    skillsRequired: ['Angular Standalone Components', 'Angular Signals & Computeds', 'Angular CDK Drag & Drop', 'Reactive Forms', 'Component Composition'],
    prerequisites: ['Angular Components & Signals', 'Dependency Injection', 'TypeScript Generics'],
    features: {
      core: [
        'Multi-column workflow board (Backlog, In Progress, Review, Done)',
        'Drag-and-drop task movement between columns using Angular CDK',
        'Modal dialog to create and edit task details, assignee, tags, and priorities',
        'Global search and tag filters with reactive computed signal updates',
        'State management service handling immutable board updates',
        'Keyboard accessible card reordering controls'
      ],
      bonus: [
        'Activity audit log showing task move timestamps and edits',
        'Column WIP (Work in Progress) limits with visual threshold warnings',
        'Local JSON export and import for team project backups'
      ]
    },
    stepByStepPlan: [
      {
        stepNumber: 1,
        title: 'Board State Architecture with Angular Signals',
        objective: 'Design the reactive BoardService using Signals and Computeds.',
        instructions: [
          'Create `Column` and `Card` models.',
          'In `BoardService`, hold `readonly board = signal<Board>(initialState);`.',
          'Expose methods `moveCard(cardId, fromColumnId, toColumnId, targetIndex)` that update signal immutably.'
        ],
        codeGuidance: `import { signal, computed, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private boardSignal = signal<Board>(this.loadBoard());
  readonly board = this.boardSignal.asReadonly();

  moveCard(cardId: string, sourceColId: string, targetColId: string, newIndex: number) {
    this.boardSignal.update(current => {
      // Return new immutable state tree
      return updatedBoard;
    });
  }
}`
      },
      {
        stepNumber: 2,
        title: 'CDK Drag and Drop Integration',
        objective: 'Implement cdkDropListGroup, cdkDropList, and cdkDrag directives.',
        instructions: [
          'Import `DragDropModule` from `@angular/cdk/drag-drop` into standalone board component.',
          'Connect columns via `cdkDropListGroup` and bind `(cdkDropListDropped)="onDrop($event)"`.',
          'Call `moveItemInArray` or `transferArrayItem` from the CDK helper functions.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Task Editor Modal & Reactive Validation',
        objective: 'Build an accessible modal dialog with FormGroup controls.',
        instructions: [
          'Build `TaskEditModalComponent` using Reactive Forms (`FormBuilder`, `Validators.required`).',
          'Add focus trap to prevent keyboard focus escaping while modal is active.',
          'Save changes directly into the BoardService signal.'
        ]
      }
    ],
    folderStructure: `src/app/
├── models/
│   └── kanban.models.ts
├── services/
│   └── board.service.ts
├── components/
│   ├── kanban-board/
│   │   ├── kanban-board.component.ts
│   │   └── kanban-board.component.scss
│   ├── kanban-column/
│   │   ├── kanban-column.component.ts
│   │   └── kanban-column.component.scss
│   ├── kanban-card/
│   │   ├── kanban-card.component.ts
│   │   └── kanban-card.component.scss
│   └── task-modal/
│       ├── task-modal.component.ts
│       └── task-modal.component.scss
└── app.component.ts`,
    implementationGuidance: [
      'Maintain immutability when updating column arrays to ensure Signals compute fine-grained DOM updates.',
      'Ensure drop targets have minimum heights so empty columns remain valid drop zones.'
    ],
    commonMistakes: [
      {
        mistake: 'Mutating task objects in-place instead of returning new object references.',
        prevention: 'Use object spread `{ ...card, status: newStatus }` when updating signal values.'
      }
    ],
    possibleImprovements: [
      'Add Markdown rendering support for task descriptions.',
      'Implement real-time collaboration using WebSockets or BroadcastChannel API across tabs.'
    ]
  }
];

