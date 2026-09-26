import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ContentType, Difficulty } from '../../models/content.models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, FormsModule, BreadcrumbComponent],
  template: `
    <div class="container search-page">
      <app-breadcrumb [items]="[{ label: 'Search' }]"></app-breadcrumb>

      <div class="search-header">
        <h1 class="page-title">Search CodeLearn Academy</h1>
        <p class="page-desc">
          Search across all tutorials, structured lessons, coding exercises, portfolio projects, interview questions, and troubleshooting guides.
        </p>

        <!-- Main Search Bar -->
        <div class="search-box-card card">
          <div class="search-input-wrapper">
            <span class="material-symbols-outlined search-icon">search</span>
            <input 
              type="text" 
              placeholder="Search tutorials, lessons, exercises..."
              [(ngModel)]="query" 
              class="main-search-input"
              aria-label="Search curriculum"
              autofocus />
            @if (query()) {
              <button type="button" class="btn-clear" (click)="clearSearch()" aria-label="Clear search input">
                <span class="material-symbols-outlined">close</span>
              </button>
            }
          </div>

          <!-- Faceted Filter Bars -->
          <div class="facets-row">
            <!-- Content Type Filter -->
            <div class="facet-group">
              <label for="type-select">Resource Type</label>
              <select id="type-select" [ngModel]="selectedType()" (ngModelChange)="selectedType.set($event)" class="facet-select">
                <option value="all">All Resource Types</option>
                <option value="lesson">Lessons</option>
                <option value="tutorial">Tutorials</option>
                <option value="exercise">Exercises</option>
                <option value="project">Projects</option>
                <option value="challenge">Challenges</option>
                <option value="troubleshooting">Troubleshooting</option>
                <option value="interview">Interview Questions</option>
              </select>
            </div>

            <!-- Category Filter -->
            <div class="facet-group">
              <label for="cat-select">Category</label>
              <select id="cat-select" [ngModel]="selectedCategory()" (ngModelChange)="selectedCategory.set($event)" class="facet-select">
                <option value="all">All Categories</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Angular">Angular</option>
                <option value="Git & GitHub">Git & GitHub</option>
                <option value="APIs">APIs</option>
                <option value="HTTP">HTTP</option>
              </select>
            </div>

            <!-- Difficulty Filter -->
            <div class="facet-group">
              <label for="diff-select">Difficulty</label>
              <select id="diff-select" [ngModel]="selectedDifficulty()" (ngModelChange)="selectedDifficulty.set($event)" class="facet-select">
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            @if (hasActiveFilters()) {
              <button type="button" class="btn btn-outline btn-sm reset-btn" (click)="resetAllFilters()">
                Reset Filters
              </button>
            }
          </div>
        </div>

        <div class="search-metrics">
          <span class="count-badge">Found {{ results().length }} matching resources</span>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="results-list">
        @for (item of results(); track item.id) {
          <article class="result-card card">
            <div class="result-meta">
              <span class="type-badge" [class]="'type-' + item.type">{{ item.type }}</span>
              <span class="cat-badge">{{ item.category }}</span>
              @if (item.difficulty) {
                <span class="badge" [class]="'badge-' + item.difficulty.toLowerCase()">{{ item.difficulty }}</span>
              }
            </div>

            <h2 class="result-title">
              <a [routerLink]="item.url">{{ item.title }}</a>
            </h2>

            <p class="result-desc">{{ item.description }}</p>

            <div class="result-footer">
              <a [routerLink]="item.url" class="btn btn-secondary btn-sm">
                Open Resource &rarr;
              </a>
            </div>
          </article>
        } @empty {
          <div class="empty-state card">
            <span class="material-symbols-outlined empty-icon">manage_search</span>
            <h2>No resources found</h2>
            <p>We couldn't find any lessons, tutorials, or exercises matching "{{ query() }}".</p>
            <div class="suggestion-buttons">
              <button type="button" class="btn btn-outline btn-sm" (click)="setSuggestion('signals')">Search "signals"</button>
              <button type="button" class="btn btn-outline btn-sm" (click)="setSuggestion('flexbox')">Search "flexbox"</button>
              <button type="button" class="btn btn-outline btn-sm" (click)="setSuggestion('promises')">Search "promises"</button>
              <button type="button" class="btn btn-outline btn-sm" (click)="resetAllFilters()">Clear All Filters</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .search-page {
      padding: 1.5rem 0.85rem 3rem;
      max-width: 960px;
      margin: 0 auto;
      min-width: 0;

      @media (min-width: 640px) {
        padding: 2.5rem 1.25rem 4rem;
      }
    }

    .search-header {
      margin-bottom: 1.5rem;

      @media (min-width: 640px) {
        margin-bottom: 2rem;
      }

      .page-title {
        font-size: clamp(1.4rem, 5vw, 2.25rem);
        line-height: 1.25;
        margin: 0.5rem 0 0.5rem;
        word-break: break-word;
      }

      .page-desc {
        font-size: clamp(0.9rem, 2.5vw, 1.05rem);
        color: var(--text-muted);
        line-height: 1.55;
        margin-bottom: 1.25rem;

        @media (min-width: 640px) {
          margin-bottom: 1.75rem;
        }
      }
    }

    .search-box-card {
      padding: 1rem;
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 0;

      @media (min-width: 640px) {
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        gap: 1.25rem;
      }
    }

    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #060911;
      border: 1px solid var(--border-hover);
      border-radius: var(--radius-md);
      padding: 0.65rem 0.85rem;

      @media (min-width: 640px) {
        padding: 0.75rem 1rem;
        gap: 0.75rem;
      }

      .search-icon { 
        font-size: 20px; 
        color: #38bdf8; 
        flex-shrink: 0;

        @media (min-width: 640px) {
          font-size: 24px;
        }
      }

      .main-search-input {
        width: 100%;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text-main);
        font-size: 0.95rem;

        @media (min-width: 640px) {
          font-size: 1.05rem;
        }

        &::placeholder { 
          color: var(--text-dim); 
          font-size: 0.875rem;
        }
      }

      .btn-clear {
        background: transparent;
        border: none;
        color: var(--text-dim);
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        &:hover { color: var(--text-main); }
      }
    }

    .facets-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
      width: 100%;

      @media (min-width: 640px) {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: flex-end;
      }

      .facet-group {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        width: 100%;

        @media (min-width: 640px) {
          width: auto;
          flex: 1 1 160px;
        }

        label {
          font-size: 0.75rem;
          color: var(--text-dim);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .facet-select {
          width: 100%;
          background: #060911;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-main);
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s ease;

          &:focus { border-color: var(--primary); }
        }
      }

      .reset-btn {
        width: 100%;
        padding: 0.55rem 0.85rem;

        @media (min-width: 640px) {
          width: auto;
          margin-top: auto;
        }
      }
    }

    .search-metrics {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .count-badge {
        font-size: 0.85rem;
        color: var(--text-dim);
      }
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 640px) {
        gap: 1.25rem;
      }
    }

    .result-card {
      padding: 1.15rem;
      display: flex;
      flex-direction: column;
      min-width: 0;

      @media (min-width: 640px) {
        padding: 1.5rem;
      }

      .result-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 0.6rem;

        @media (min-width: 640px) {
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .type-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;

          &.type-troubleshooting { background: rgba(244, 63, 94, 0.15); color: #fb7185; }
          &.type-exercise { background: rgba(16, 185, 129, 0.15); color: #34d399; }
          &.type-project { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
          &.type-interview { background: rgba(139, 92, 246, 0.15); color: #c084fc; }
        }

        .cat-badge {
          font-size: 0.8rem;
          color: var(--text-dim);
        }
      }

      .result-title {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;

        a {
          color: var(--text-main);
          &:hover { color: #60a5fa; }
        }
      }

      .result-desc {
        font-size: 0.92rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 1.25rem;
      }

      .result-footer {
        border-top: 1px solid var(--border-subtle);
        padding-top: 0.75rem;
      }
    }

    .empty-state {
      text-align: center;
      padding: 4rem 1.5rem;

      .empty-icon { font-size: 48px; color: var(--text-dim); margin-bottom: 1rem; }
      h2 { font-size: 1.45rem; margin-bottom: 0.5rem; }
      p { color: var(--text-muted); margin-bottom: 1.5rem; }

      .suggestion-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
      }
    }
  `]
})
export class SearchComponent implements OnInit {
  searchService = inject(SearchService);
  seo = inject(SeoService);
  route = inject(ActivatedRoute);

  query = signal('');
  selectedType = signal<ContentType | 'all'>('all');
  selectedCategory = signal('all');
  selectedDifficulty = signal<Difficulty | 'all'>('all');

  results = computed(() => {
    return this.searchService.search({
      query: this.query(),
      contentType: this.selectedType(),
      category: this.selectedCategory(),
      difficulty: this.selectedDifficulty()
    });
  });

  hasActiveFilters = computed(() => {
    return !!this.query() || this.selectedType() !== 'all' || this.selectedCategory() !== 'all' || this.selectedDifficulty() !== 'all';
  });

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Search Developer Curriculum',
      description: 'Instant client-side search across all programming lessons, tutorials, exercises, projects, and troubleshooting articles.',
      urlPath: '/search',
      breadcrumbs: [{ name: 'Search', item: '/search' }]
    });

    // Check query params if any
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.query.set(params['q']);
      }
      if (params['type']) {
        this.selectedType.set(params['type']);
      }
    });
  }

  clearSearch(): void {
    this.query.set('');
  }

  setSuggestion(term: string): void {
    this.query.set(term);
  }

  resetAllFilters(): void {
    this.query.set('');
    this.selectedType.set('all');
    this.selectedCategory.set('all');
    this.selectedDifficulty.set('all');
  }
}
