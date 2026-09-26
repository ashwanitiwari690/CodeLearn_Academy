import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },

  // Learning Paths & Lessons
  {
    path: 'learn',
    loadComponent: () => import('./pages/learn/learning-paths.component').then(m => m.LearningPathsComponent)
  },
  {
    path: 'learn/:pathSlug',
    loadComponent: () => import('./pages/learn/path-detail.component').then(m => m.PathDetailComponent)
  },
  {
    path: 'learn/:pathSlug/:lessonSlug',
    loadComponent: () => import('./pages/learn/lesson-detail.component').then(m => m.LessonDetailComponent)
  },

  // Tutorials
  {
    path: 'tutorials',
    loadComponent: () => import('./pages/tutorials/tutorials-list.component').then(m => m.TutorialsListComponent)
  },
  {
    path: 'tutorials/:slug',
    loadComponent: () => import('./pages/tutorials/tutorial-detail.component').then(m => m.TutorialDetailComponent)
  },

  // Exercises
  {
    path: 'exercises',
    loadComponent: () => import('./pages/exercises/exercises-list.component').then(m => m.ExercisesListComponent)
  },
  {
    path: 'exercises/:slug',
    loadComponent: () => import('./pages/exercises/exercise-detail.component').then(m => m.ExerciseDetailComponent)
  },

  // Challenges
  {
    path: 'challenges',
    loadComponent: () => import('./pages/challenges/challenges-list.component').then(m => m.ChallengesListComponent)
  },
  {
    path: 'challenges/:slug',
    loadComponent: () => import('./pages/challenges/challenge-detail.component').then(m => m.ChallengeDetailComponent)
  },

  // Projects
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects-list.component').then(m => m.ProjectsListComponent)
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/projects/project-detail.component').then(m => m.ProjectDetailComponent)
  },

  // Troubleshooting
  {
    path: 'troubleshooting',
    loadComponent: () => import('./pages/troubleshooting/troubleshooting-list.component').then(m => m.TroubleshootingListComponent)
  },
  {
    path: 'troubleshooting/:slug',
    loadComponent: () => import('./pages/troubleshooting/troubleshooting-detail.component').then(m => m.TroubleshootingDetailComponent)
  },

  // Interview Questions
  {
    path: 'interview',
    loadComponent: () => import('./pages/interview/interview.component').then(m => m.InterviewComponent)
  },

  // Search
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
  },

  // User Progress & Bookmarks
  {
    path: 'progress',
    loadComponent: () => import('./pages/progress/progress.component').then(m => m.ProgressComponent)
  },
  {
    path: 'bookmarks',
    loadComponent: () => import('./pages/bookmarks/bookmarks.component').then(m => m.BookmarksComponent)
  },

  // Author profiles
  {
    path: 'authors/:slug',
    loadComponent: () => import('./pages/author-detail/author-detail.component').then(m => m.AuthorDetailComponent)
  },

  // Informational & Trust Pages
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'editorial-guidelines',
    loadComponent: () => import('./pages/editorial-guidelines/editorial-guidelines.component').then(m => m.EditorialGuidelinesComponent)
  },

  // Legal Pages
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'cookie-policy',
    loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'disclaimer',
    loadComponent: () => import('./pages/disclaimer/disclaimer.component').then(m => m.DisclaimerComponent)
  },

  // Wildcard 404
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
