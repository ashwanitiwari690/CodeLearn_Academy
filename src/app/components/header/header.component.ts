import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header" role="banner">
      <div class="container header-container">
        <!-- Brand Logo with Native SVG Terminal Icon -->
        <a routerLink="/" class="brand-logo" aria-label="CodeLearn Academy Home">
          <div class="logo-mark">
            <svg class="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">CodeLearn</span>
            <span class="brand-suffix">Academy</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <ul class="nav-list">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">Home</a></li>
            <li><a routerLink="/learn" routerLinkActive="active" class="nav-link">Learn</a></li>
            <li><a routerLink="/tutorials" routerLinkActive="active" class="nav-link">Tutorials</a></li>
            <li><a routerLink="/exercises" routerLinkActive="active" class="nav-link">Exercises</a></li>
            <li><a routerLink="/challenges" routerLinkActive="active" class="nav-link">Challenges</a></li>
            <li><a routerLink="/projects" routerLinkActive="active" class="nav-link">Projects</a></li>
            <li><a routerLink="/troubleshooting" routerLinkActive="active" class="nav-link">Troubleshooting</a></li>
            <li><a routerLink="/interview" routerLinkActive="active" class="nav-link">Interview</a></li>
          </ul>
        </nav>

        <!-- Right Utility Actions -->
        <div class="header-actions">
          <a routerLink="/search" class="icon-btn" title="Search curriculum" aria-label="Search curriculum">
            <span class="material-symbols-outlined">search</span>
          </a>

          <a routerLink="/bookmarks" class="icon-btn" title="Saved Bookmarks" aria-label="Saved Bookmarks">
            <span class="material-symbols-outlined">bookmark</span>
            @if (storage.totalBookmarks() > 0) {
              <span class="counter-badge" aria-label="{{ storage.totalBookmarks() }} saved items">{{ storage.totalBookmarks() }}</span>
            }
          </a>

          <a routerLink="/progress" class="icon-btn progress-pill" title="My Learning Progress" aria-label="Learning Progress">
            <span class="material-symbols-outlined icon">insights</span>
            <span class="progress-label">Progress</span>
            @if (storage.totalCompleted() > 0) {
              <span class="progress-count">{{ storage.totalCompleted() }}</span>
            }
          </a>

          <!-- Mobile Menu Trigger -->
          <button 
            type="button" 
            class="mobile-toggle-btn" 
            (click)="toggleMobileMenu()" 
            [attr.aria-expanded]="mobileMenuOpen()" 
            aria-label="Toggle navigation menu">
            <span class="material-symbols-outlined">
              {{ mobileMenuOpen() ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <nav class="mobile-nav" aria-label="Mobile Navigation">
          <ul class="mobile-list">
            <li><a routerLink="/" (click)="closeMobileMenu()" class="mobile-link">Home</a></li>
            <li><a routerLink="/learn" (click)="closeMobileMenu()" class="mobile-link">Learning Paths</a></li>
            <li><a routerLink="/tutorials" (click)="closeMobileMenu()" class="mobile-link">Tutorials & Guides</a></li>
            <li><a routerLink="/exercises" (click)="closeMobileMenu()" class="mobile-link">Coding Exercises</a></li>
            <li><a routerLink="/challenges" (click)="closeMobileMenu()" class="mobile-link">Challenges</a></li>
            <li><a routerLink="/projects" (click)="closeMobileMenu()" class="mobile-link">Project Blueprints</a></li>
            <li><a routerLink="/troubleshooting" (click)="closeMobileMenu()" class="mobile-link">Troubleshooting</a></li>
            <li><a routerLink="/interview" (click)="closeMobileMenu()" class="mobile-link">Interview Prep</a></li>
            <li class="divider"></li>
            <li><a routerLink="/search" (click)="closeMobileMenu()" class="mobile-link">Search All Topics</a></li>
            <li><a routerLink="/progress" (click)="closeMobileMenu()" class="mobile-link">My Learning Progress</a></li>
            <li><a routerLink="/bookmarks" (click)="closeMobileMenu()" class="mobile-link">Saved Bookmarks</a></li>
          </ul>
        </nav>
      }
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(9, 13, 22, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(51, 65, 85, 0.4);
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4.25rem;
      gap: 1rem;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      flex-shrink: 0;

      .logo-mark {
        width: 2.25rem;
        height: 2.25rem;
        background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(2, 132, 199, 0.4);
        color: #ffffff;

        .logo-svg {
          width: 1.25rem;
          height: 1.25rem;
        }
      }

      .brand-text {
        display: flex;
        align-items: baseline;
        gap: 0.3rem;
        font-weight: 700;
        font-size: 1.2rem;
        letter-spacing: -0.02em;

        .brand-name {
          color: #f8fafc;
        }
        .brand-suffix {
          color: #38bdf8;
        }
      }
    }

    .desktop-nav {
      display: none;

      @media (min-width: 1024px) {
        display: flex;
        align-items: center;
      }

      .nav-list {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .nav-link {
        padding: 0.45rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #94a3b8;
        text-decoration: none;
        border-radius: var(--radius-sm);
        transition: all 0.15s ease;

        &:hover {
          color: #f8fafc;
          background: rgba(30, 41, 59, 0.6);
        }

        &.active {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          font-weight: 600;
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;

      .icon-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        color: #94a3b8;
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--radius-sm);
        text-decoration: none;
        transition: all 0.15s ease;

        &:hover {
          color: #f8fafc;
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(51, 65, 85, 0.5);
        }

        .material-symbols-outlined {
          font-size: 1.25rem;
        }

        &.progress-pill {
          width: auto;
          padding: 0 0.65rem;
          gap: 0.4rem;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(51, 65, 85, 0.5);

          &:hover {
            border-color: #38bdf8;
            color: #f8fafc;
          }

          .progress-label {
            font-size: 0.8rem;
            font-weight: 600;
            display: none;

            @media (min-width: 640px) {
              display: inline;
            }
          }

          .progress-count {
            font-size: 0.75rem;
            font-weight: 700;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.15);
            padding: 0.1rem 0.4rem;
            border-radius: 9999px;
          }
        }
      }

      .counter-badge {
        position: absolute;
        top: -3px;
        right: -3px;
        background: #38bdf8;
        color: #090d16;
        font-size: 0.65rem;
        font-weight: 800;
        border-radius: 9999px;
        min-width: 1.1rem;
        height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.2rem;
      }

      .mobile-toggle-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        background: transparent;
        border: 1px solid rgba(51, 65, 85, 0.5);
        border-radius: var(--radius-sm);
        color: #94a3b8;
        cursor: pointer;

        @media (min-width: 1024px) {
          display: none;
        }

        &:hover {
          color: #f8fafc;
          background: rgba(30, 41, 59, 0.8);
        }
      }
    }

    .mobile-nav {
      background: #0f172a;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
      padding: 1rem 1.25rem 1.5rem;

      @media (min-width: 1024px) {
        display: none;
      }

      .mobile-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        .divider {
          height: 1px;
          background: rgba(51, 65, 85, 0.5);
          margin: 0.5rem 0;
        }

        .mobile-link {
          display: block;
          padding: 0.5rem 0.75rem;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          border-radius: var(--radius-sm);

          &:hover {
            color: #f8fafc;
            background: rgba(30, 41, 59, 0.8);
          }
        }
      }
    }
  `]
})
export class HeaderComponent {
  storage = inject(StorageService);
  mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
