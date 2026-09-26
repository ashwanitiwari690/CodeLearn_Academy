import { Category } from '../models/content.models';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-html',
    slug: 'html',
    name: 'HTML5 & Standards',
    description: 'Master semantic web architecture, accessible landmarks, and modern form validation.',
    icon: 'code',
    color: '#e34f26'
  },
  {
    id: 'cat-css',
    slug: 'css',
    name: 'Modern CSS',
    description: 'Create responsive, fluid layouts with CSS Grid, Flexbox, custom properties, and animations.',
    icon: 'palette',
    color: '#1572b6'
  },
  {
    id: 'cat-javascript',
    slug: 'javascript',
    name: 'JavaScript (ES6+)',
    description: 'Deep dive into asynchronous runtimes, the Event Loop, closures, and DOM manipulation.',
    icon: 'javascript',
    color: '#f7df1e'
  },
  {
    id: 'cat-typescript',
    slug: 'typescript',
    name: 'TypeScript',
    description: 'Enforce type safety with interfaces, generics, utility types, and strict compiler options.',
    icon: 'integration_instructions',
    color: '#3178c6'
  },
  {
    id: 'cat-angular',
    slug: 'angular',
    name: 'Angular Architecture',
    description: 'Build enterprise SPAs with standalone components, Signals, routing, and reactive forms.',
    icon: 'deployed_code',
    color: '#dd0031'
  },
  {
    id: 'cat-git',
    slug: 'git',
    name: 'Git & Version Control',
    description: 'Master branch strategies, rebase workflows, pull requests, and merge conflict resolution.',
    icon: 'fork_right',
    color: '#f05032'
  }
];

