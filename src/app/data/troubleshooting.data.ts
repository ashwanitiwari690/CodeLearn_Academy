import { TroubleshootingArticle } from '../models/content.models';

export const TROUBLESHOOTING_ARTICLES: TroubleshootingArticle[] = [
  {
    id: 'tb-cors-policy',
    slug: 'cors-policy-no-access-control-allow-origin',
    title: "How to Fix 'Access to fetch has been blocked by CORS policy: No Access-Control-Allow-Origin header is present'",
    category: 'APIs',
    errorSignature: "Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
    summary: 'The browser blocked your HTTP request because the remote server did not return the required Access-Control-Allow-Origin header matching your client origin.',
    publishedDate: '2026-01-15',
    updatedDate: '2026-03-01',
    whatItMeans: 'The browser strictly enforces the Same-Origin Policy. When your frontend client runs on http://localhost:4200 and requests resources from another origin (different port, domain, or protocol), the browser checks if the server allows this by looking for specific CORS headers.',
    whyItHappens: [
      'The backend API server has not configured CORS middleware or headers.',
      'The API server requires authentication credentials (cookies/Bearer token) but does not have Access-Control-Allow-Credentials set to true.',
      'A preflight HTTP OPTIONS request was rejected with a 403 or 401 status code before the actual GET/POST was processed.',
      'Frontend code is hitting a third-party public API that was only designed for backend-to-backend consumption without CORS support.'
    ],
    howToDiagnose: [
      'Open Browser DevTools -> Network Tab -> Filter by Fetch/XHR.',
      'Look for the request marked in red or with status "(failed)".',
      'Check if there is a preceding OPTIONS request right before your target request.',
      'Inspect the Response Headers of the OPTIONS or actual request: check if Access-Control-Allow-Origin is missing or set to a different origin.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'For Local Development: Configure Angular Dev Server Proxy',
        description: 'Create a proxy configuration file to route API calls through the local Angular CLI server, avoiding browser CORS restrictions entirely in development.',
        code: `// proxy.conf.json
{
  "/api": {
    "target": "http://api.backend-service.local:5000",
    "secure": false,
    "changeOrigin": true
  }
}

// In angular.json under architect -> serve -> options:
// "proxyConfig": "proxy.conf.json"`
      },
      {
        step: 2,
        title: 'For Production: Configure CORS on the Backend Server',
        description: 'Enable appropriate origin headers on your backend service (Node.js/Express, Python, or Go). Never use wildcards ("*") if credentials or authorization headers are used.',
        code: `// Express.js backend example:
import cors from 'cors';

const allowedOrigins = ['http://localhost:4200', 'https://codelearn.academy'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`
      },
      {
        step: 3,
        title: 'Handle Preflight OPTIONS Requests on the Server',
        description: 'Ensure your server routes return HTTP 204 or 200 with the headers for OPTIONS requests instead of throwing a 404 or authentication failure.'
      }
    ],
    practicalExample: {
      brokenCode: `// Client attempting direct call to non-CORS server
fetch('https://api.external-weather.com/data')
  .then(res => res.json())
  .catch(err => console.error(err)); // Throws CORS blocked error`,
      fixedCode: `// Client calling via configured proxy route
fetch('/api/weather/data')
  .then(res => {
    if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
    return res.json();
  })
  .then(data => console.log('Weather data loaded:', data));`,
      explanation: 'Routing requests through `/api` allows the local development server (or production reverse proxy / edge function) to forward the request server-to-server without browser CORS barriers.'
    },
    preventionTips: [
      'Always configure a dev-proxy during local Angular development.',
      'Treat CORS as a backend configuration task, not a frontend hack.',
      'Never attempt to disable browser web security flags for normal development.'
    ],
    relatedErrorSlugs: ['angular-404-on-page-refresh', 'node-err-module-not-found']
  },
  {
    id: 'tb-spa-404-refresh',
    slug: 'angular-404-on-page-refresh',
    title: 'How to Fix 404 Not Found on Page Refresh in Angular SPA Deployments',
    category: 'Angular',
    errorSignature: '404 Not Found: Cannot GET /learn/javascript (nginx / Apache / Vercel / Netlify)',
    summary: 'When you refresh or directly navigate to a deep URL like /learn/javascript on a production web server, the web server looks for a physical file at that directory path on disk and returns a 404 error.',
    publishedDate: '2026-01-20',
    updatedDate: '2026-03-02',
    whatItMeans: 'Single Page Applications (SPAs) use client-side routing. There is only one physical HTML file: index.html. When clicking links inside the app, the Angular Router updates the browser URL using the HTML5 History API without requesting a new page from the server. But when a user enters the URL directly or presses Refresh, the request hits the physical server first.',
    whyItHappens: [
      'Web servers by default look for a static file matching the request URL (e.g. /learn/javascript/index.html).',
      'Because no physical file exists at that subpath, the web server issues a standard 404 Not Found response.',
      'The server needs to be configured with a fallback rule that routes all non-file requests back to /index.html.'
    ],
    howToDiagnose: [
      'Navigate to the homepage: loads correctly.',
      'Click a link to `/tutorials`: loads correctly via client router.',
      'Press Browser Refresh (F5): Server responds with a 404 HTML page.',
      'DevTools Network tab shows `GET /tutorials 404 Not Found` directly from the web server.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'For Netlify Deployments: Add _redirects File',
        description: 'Place a `_redirects` file in your `public/` directory (or output folder) with this single rule:',
        code: `/*    /index.html   200`
      },
      {
        step: 2,
        title: 'For Vercel Deployments: Add vercel.json',
        description: 'Configure rewrites in your root `vercel.json` file:',
        code: `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`
      },
      {
        step: 3,
        title: 'For Nginx Servers: Configure try_files',
        description: 'In your Nginx site configuration block, point non-existent file lookups to index.html:',
        code: `server {
    listen 80;
    server_name codelearn.academy;
    root /var/www/codelearn/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}`
      }
    ],
    practicalExample: {
      brokenCode: `# Default Nginx configuration (Causes 404 on refresh)
location / {
    try_files $uri $uri/ =404;
}`,
      fixedCode: `# SPA Fallback Nginx configuration
location / {
    try_files $uri $uri/ /index.html;
}`,
      explanation: 'The fallback instructs Nginx that if no file ($uri) or directory ($uri/) exists on disk, it must serve /index.html with a 200 status, allowing Angular Router to initialize and mount the target route.'
    },
    preventionTips: [
      'Include SPA rewrite rules in your repository deployment configuration from day one.',
      'Verify deep links in staging environments before deploying to production.'
    ],
    relatedErrorSlugs: ['cors-policy-no-access-control-allow-origin']
  },
  {
    id: 'tb-npm-eresolve',
    slug: 'npm-eresolve-unable-to-resolve-dependency-tree',
    title: "How to Fix 'npm ERR! ERESOLVE unable to resolve dependency tree'",
    category: 'Node.js',
    errorSignature: 'npm ERR! code ERESOLVE\nnpm ERR! ERESOLVE unable to resolve dependency tree\nnpm ERR! While resolving: my-app@1.0.0\nnpm ERR! Found: @angular/core@19.0.0\nnpm ERR! peer @angular/core@"^18.0.0" from some-legacy-package@2.1.0',
    summary: 'npm strict peer dependency resolution discovered a version mismatch between two or more packages in your package.json.',
    publishedDate: '2026-01-25',
    updatedDate: '2026-02-28',
    whatItMeans: 'Since npm v7, npm automatically installs peer dependencies and aborts with ERESOLVE if two dependencies specify incompatible version ranges for a shared peer dependency.',
    whyItHappens: [
      'A third-party library has not yet updated its peerDependencies range to declare compatibility with the latest Angular or TypeScript release.',
      'Multiple packages in package.json request conflicting major versions of a shared utility (like RxJS or Zone.js).',
      'Corrupted `node_modules` or out-of-sync `package-lock.json`.'
    ],
    howToDiagnose: [
      'Read the npm error log carefully: find the lines beginning with "Found:" and "peer ... from ...".',
      'Identify which library is requesting the older version.',
      'Check the library\'s GitHub releases or npm page to see if an updated version is available.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Check for Package Updates',
        description: 'Often the author has released a newer version supporting your current framework version.',
        code: `npm outdated
npm update <outdated-package-name>`
      },
      {
        step: 2,
        title: 'Clean Reinstall Lockfile',
        description: 'Delete node_modules and package-lock.json to re-evaluate clean resolutions.',
        code: `rm -rf node_modules package-lock.json
npm install`
      },
      {
        step: 3,
        title: 'Use --legacy-peer-deps as a Temporary Workaround',
        description: 'If you verified that the package works at runtime despite the metadata mismatch, you can bypass the strict check:',
        code: `npm install --legacy-peer-deps`
      }
    ],
    practicalExample: {
      brokenCode: `# Fails with ERESOLVE
npm install ngx-legacy-calendar`,
      fixedCode: `# Resolves safely without failing the entire tree
npm install ngx-legacy-calendar --legacy-peer-deps`,
      explanation: 'The flag instructs npm to emulate npm v6 behavior, ignoring conflicting peerDependencies declarations when building the tree.'
    },
    preventionTips: [
      'Check the maintenance status and dependencies of third-party libraries before adding them to your project.',
      'Commit `package-lock.json` to source control to lock verified trees.'
    ],
    relatedErrorSlugs: ['node-err-module-not-found']
  },
  {
    id: 'tb-git-conflict',
    slug: 'git-merge-conflict-both-modified',
    title: 'How to Resolve Git Merge Conflicts: "Automatic merge failed; fix conflicts and then commit"',
    category: 'Git',
    errorSignature: 'CONFLICT (content): Merge conflict in src/app/auth.service.ts\nAutomatic merge failed; fix conflicts and then commit the result.',
    summary: 'Git was unable to automatically combine changes because two commits modified the same lines in the same file differently.',
    publishedDate: '2026-02-01',
    updatedDate: '2026-03-01',
    whatItMeans: 'Git can automatically merge changes made to different files or different lines of the same file. But when two branches touch the exact same lines, Git stops and leaves conflict markers in the file so a human developer can choose the correct final version.',
    whyItHappens: [
      'You pulled the latest changes from `main` into your feature branch after someone else edited the same lines.',
      'Two developers refactored the same method or component concurrently.',
      'Cherry-picking a commit onto an older branch state.'
    ],
    howToDiagnose: [
      'Run `git status` to see the list of files marked under "Unmerged paths" / "both modified".',
      'Open the conflicted file in your IDE. Look for the conflict markers: `<<<<<<< HEAD`, `=======`, and `>>>>>>>`.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Inspect the Conflict Markers in the File',
        description: 'Understand what `HEAD` (your current branch) contains versus what incoming changes contain:',
        code: `<<<<<<< HEAD
const API_URL = 'https://api.v2.codelearn.academy';
=======
const API_URL = 'https://production-api.codelearn.academy';
>>>>>>> origin/main`
      },
      {
        step: 2,
        title: 'Edit the File to Keep the Desired Result',
        description: 'Delete the conflict marker lines (`<<<<<<<`, `=======`, `>>>>>>>`) and combine or select the correct code.',
        code: `// Resolved clean code:
const API_URL = 'https://api.v2.codelearn.academy';`
      },
      {
        step: 3,
        title: 'Stage and Finalize the Merge',
        description: 'Once all conflicts are resolved and tests pass, stage the file and complete the commit:',
        code: `git add src/app/auth.service.ts
git commit -m "chore: resolve merge conflicts in auth service"
git push origin <feature-branch>`
      }
    ],
    practicalExample: {
      brokenCode: `<<<<<<< HEAD
export const MAX_RETRY_COUNT = 3;
=======
export const MAX_RETRY_COUNT = 5;
>>>>>>> origin/main`,
      fixedCode: `export const MAX_RETRY_COUNT = 5;`,
      explanation: 'Removing all conflict delimiter symbols and picking the updated value resolves the conflict cleanly.'
    },
    preventionTips: [
      'Keep feature branches short-lived and rebase regularly from main.',
      'Communicate with teammates before refactoring shared core service modules.'
    ],
    relatedErrorSlugs: []
  },
  {
    id: 'tb-js-typeerror-undefined',
    slug: 'javascript-typeerror-cannot-read-properties-of-undefined',
    title: "How to Fix 'TypeError: Cannot read properties of undefined (reading '... ')'",
    category: 'JavaScript',
    errorSignature: "TypeError: Cannot read properties of undefined (reading 'avatar') at UserCardComponent.render",
    summary: 'JavaScript attempted to access a property or call a method on a value that evaluates to undefined or null.',
    publishedDate: '2026-02-10',
    updatedDate: '2026-03-02',
    whatItMeans: 'In JavaScript, primitive values `undefined` and `null` do not have object prototypes. Attempting property lookup (`undefined.prop`) triggers a fatal runtime TypeError that halts script execution unless caught.',
    whyItHappens: [
      'An asynchronous HTTP response has not arrived yet when the template initially renders.',
      'An API returned an empty payload, null field, or altered JSON property name.',
      'Array lookup index out of bounds (`items[10].title` when array has only 3 items).'
    ],
    howToDiagnose: [
      'Inspect the call stack in DevTools Console to locate the exact file and line number.',
      'Add a `debugger;` statement or `console.log()` immediately before the failing line to print the target variable.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Use Optional Chaining (?.)',
        description: 'Optional chaining returns undefined instead of throwing a TypeError if the left-hand operand is nullish.',
        code: `// Safe navigation
const avatarUrl = user?.profile?.avatar?.url;`
      },
      {
        step: 2,
        title: 'Provide Nullish Coalescing Fallbacks (??)',
        description: 'Provide an explicit default value when accessing potentially missing fields:',
        code: `const avatarUrl = user?.profile?.avatar?.url ?? '/assets/images/default-avatar.svg';`
      },
      {
        step: 3,
        title: 'In Angular Templates: Use Control Flow (@if)',
        description: 'Protect component template trees until asynchronous data is guaranteed to exist:',
        code: `@if (currentUser(); as user) {
  <div class="user-card">
    <img [src]="user.avatar" [alt]="user.name">
    <h3>{{ user.name }}</h3>
  </div>
} @else {
  <div class="skeleton-loader">Loading profile...</div>
}`
      }
    ],
    practicalExample: {
      brokenCode: `// Crashes if user is null during initial load
function displayUserEmail(user) {
  return user.email.toLowerCase(); // Throws TypeError if user is undefined
}`,
      fixedCode: `function displayUserEmail(user) {
  return user?.email ? user.email.toLowerCase() : 'No email provided';
}`,
      explanation: 'Optional chaining safely short-circuits evaluation without raising a runtime exception.'
    },
    preventionTips: [
      'Enable "strictNullChecks": true in tsconfig.json so the compiler catches potential undefined accesses at build time.',
      'Always guard asynchronous template variables with `@if` blocks.'
    ],
    relatedErrorSlugs: ['typescript-ts2322-type-not-assignable']
  },
  {
    id: 'tb-ts-type-mismatch',
    slug: 'typescript-ts2322-type-not-assignable',
    title: "How to Fix 'TS2322: Type X is not assignable to type Y'",
    category: 'TypeScript',
    errorSignature: "error TS2322: Type 'string | undefined' is not assignable to type 'string'. Type 'undefined' is not assignable to type 'string'.",
    summary: 'The TypeScript compiler detected that the value you are providing does not strictly satisfy the expected destination type contract.',
    publishedDate: '2026-02-15',
    updatedDate: '2026-03-01',
    whatItMeans: 'TypeScript employs structural typing. When a function or property expects a strictly defined type (e.g. `string`), passing a wider union type (`string | undefined`) is flagged as unsafe to prevent runtime bugs.',
    whyItHappens: [
      'Passing an optional property (`name?: string`) into a function that requires a guaranteed `string`.',
      'Mismatch in object properties: missing required fields or incorrect property types.',
      'Array methods like `.find()` returning `T | undefined` when destination assumes guaranteed `T`.'
    ],
    howToDiagnose: [
      'Read the compiler error message: TS specifies the exact point of incompatibility.',
      'Hover over the identifier in your IDE to check its inferred type vs the target type.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Use Type Narrowing with Type Guards',
        description: 'Use `if (val !== undefined)` or `typeof` to narrow union types before assignment:',
        code: `function processUsername(name: string | undefined): void {
  if (typeof name === 'string') {
    // Inside this block, TypeScript narrows name to 'string'
    saveToDatabase(name);
  } else {
    saveToDatabase('Guest');
  }
}`
      },
      {
        step: 2,
        title: 'Use Non-Null Assertion with Caution (!)',
        description: 'Only use the exclamation mark operator if you can prove to the compiler that the value cannot be null at runtime:',
        code: `const item = items.find(i => i.id === targetId);
if (!item) {
  throw new Error('Item not found');
}
// item is safely narrowed here!`
      }
    ],
    practicalExample: {
      brokenCode: `interface LessonCard {
  id: string;
  title: string;
}

const item = lessons.find(l => l.id === '1');
// Error TS2322: Type 'LessonCard | undefined' is not assignable to type 'LessonCard'
const currentLesson: LessonCard = item;`,
      fixedCode: `const item = lessons.find(l => l.id === '1');
if (!item) {
  throw new Error('Lesson not found');
}
const currentLesson: LessonCard = item; // Safely typed!`,
      explanation: 'Checking and throwing or returning when item is undefined narrows the variable to LessonCard.'
    },
    preventionTips: [
      'Embrace strict typing rather than using `as any` casting.',
      'Handle fallback states explicitly for functions that return undefined.'
    ],
    relatedErrorSlugs: ['javascript-typeerror-cannot-read-properties-of-undefined']
  }
];

