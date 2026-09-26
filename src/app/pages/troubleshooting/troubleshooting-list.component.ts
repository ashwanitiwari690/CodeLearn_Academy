import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-troubleshooting-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, AdSlotComponent],
  template: `
    <div class="container troubleshooting-page">
      <app-breadcrumb [items]="[{ label: 'Troubleshooting' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Developer Error Diagnostics</span>
        <h1 class="page-title">Developer Troubleshooting Hub</h1>
        <p class="lead-text">
          Systematic diagnostic solutions to real-world software engineering errors: CORS policy blocks, 404 page refreshes on SPAs, npm tree conflicts, Git merge conflicts, and TypeScript compile failures.
        </p>

        <!-- Category Filters -->
        <div class="filter-pills" role="tablist">
          @for (cat of categories(); track cat) {
            <button 
              type="button" 
              class="pill-btn" 
              [class.active]="selectedCategory() === cat"
              (click)="selectedCategory.set(cat)">
              {{ cat }}
            </button>
          }
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (art of filteredArticles(); track art.id) {
          <article class="card error-card">
            <div class="error-meta">
              <span class="category-tag">
                <span class="material-symbols-outlined icon">bug_report</span>
                {{ art.category }}
              </span>
              <span class="date-tag">Updated {{ art.updatedDate }}</span>
            </div>

            <h2 class="error-title">
              <a [routerLink]="['/troubleshooting', art.slug]">{{ art.title }}</a>
            </h2>

            <div class="terminal-box" tabindex="0">
              <code>{{ art.errorSignature }}</code>
            </div>

            <p class="error-summary">{{ art.summary }}</p>

            <div class="card-footer">
              <a [routerLink]="['/troubleshooting', art.slug]" class="btn btn-outline btn-sm">
                View Diagnosis & Fix
                <span class="material-symbols-outlined icon-end">arrow_forward</span>
              </a>
            </div>
          </article>
        }
      </div>

      <div class="my-8">
        <app-ad-slot slotName="Troubleshooting List Bottom"></app-ad-slot>
      </div>
    </div>
  `,
  styles: [`
    .troubleshooting-page {
      padding: 2.5rem 1.25rem 4rem;
    }
    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 0.75rem;
      }
      .lead-text {
        font-size: 1.1rem;
        color: var(--text-muted);
        line-height: 1.6;
        max-width: 820px;
        margin: 0 0 1.5rem;
      }
    }

    .filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .pill-btn {
        padding: 0.35rem 0.85rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 9999px;
        color: var(--text-muted);
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
          color: var(--text-main);
          border-color: #475569;
        }

        &.active {
          background: rgba(239, 68, 68, 0.12);
          color: #f87171;
          border-color: #f87171;
          font-weight: 600;
        }
      }
    }

    .error-card {
      display: flex;
      flex-direction: column;
      padding: 1.75rem;

      .error-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;

        .category-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #f87171;

          .icon {
            font-size: 1rem;
          }
        }
        .date-tag {
          font-size: 0.8rem;
          color: #64748b;
        }
      }

      .error-title {
        font-size: 1.25rem;
        margin: 0 0 0.75rem;
        line-height: 1.35;

        a {
          color: var(--text-main);
          text-decoration: none;

          &:hover {
            color: var(--primary);
          }
        }
      }

      .terminal-box {
        background: #090d16;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.65rem 0.85rem;
        margin-bottom: 1rem;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: #fca5a5;
        overflow-x: auto;
        white-space: pre-wrap;
      }

      .error-summary {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.25rem;
        flex-grow: 1;
      }

      .card-footer {
        border-top: 1px solid var(--border-color);
        padding-top: 0.85rem;
      }
    }
  `]
})
export class TroubleshootingListComponent implements OnInit {
  contentService = inject(ContentService);
  private seo = inject(SeoService);

  selectedCategory = signal<string>('All');

  categories = computed(() => {
    const list = ['All'];
    this.contentService.troubleshooting().forEach(art => {
      if (!list.includes(art.category)) {
        list.push(art.category);
      }
    });
    return list;
  });

  filteredArticles = computed(() => {
    const cat = this.selectedCategory();
    const all = this.contentService.troubleshooting();
    if (cat === 'All') return all;
    return all.filter(a => a.category.toLowerCase() === cat.toLowerCase());
  });

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Troubleshooting Directory - Solve Development Errors - CodeLearn Academy',
      description: 'Step-by-step diagnostic solutions for Angular, JavaScript, TypeScript, CORS, npm, and Git errors with code fixes.',
      urlPath: '/troubleshooting',
      breadcrumbs: [{ name: 'Troubleshooting', item: '/troubleshooting' }]
    });
  }
}

