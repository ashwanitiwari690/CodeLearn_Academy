import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-tutorials-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, AdSlotComponent],
  template: `
    <div class="container tutorials-page">
      <app-breadcrumb [items]="[{ label: 'Tutorials' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Step-by-Step Guides</span>
        <h1 class="page-title">Technical Tutorials & Architectural Walkthroughs</h1>
        <p class="lead-text">
          Practical, in-depth developer guides covering modern Angular architecture, reactive Signals, HTTP interceptors, CSS Grid layouts, and resilient asynchronous coding.
        </p>

        <!-- Category Filters -->
        <div class="filter-pills" role="tablist" aria-label="Tutorial Category Filters">
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
        @for (tut of filteredTutorials(); track tut.id) {
          <article class="card tutorial-card">
            <div class="card-meta">
              <span class="badge badge-category">{{ tut.category }}</span>
              <span class="badge" [class.badge-beginner]="tut.difficulty === 'Beginner'" [class.badge-intermediate]="tut.difficulty === 'Intermediate'" [class.badge-advanced]="tut.difficulty === 'Advanced'">
                {{ tut.difficulty }}
              </span>
              <span class="read-time">
                <span class="material-symbols-outlined icon">schedule</span>
                {{ tut.readingTimeMinutes }} min
              </span>
            </div>

            <h2 class="tutorial-title">
              <a [routerLink]="['/tutorials', tut.slug]">{{ tut.title }}</a>
            </h2>

            <p class="tutorial-desc">{{ tut.shortIntroduction }}</p>

            <div class="tutorial-footer">
              <span class="date-tag">Updated {{ tut.updatedDate }}</span>
              <a [routerLink]="['/tutorials', tut.slug]" class="btn btn-outline btn-sm">
                Read Tutorial
                <span class="material-symbols-outlined icon-end">arrow_forward</span>
              </a>
            </div>
          </article>
        }
      </div>

      <div class="my-8">
        <app-ad-slot slotName="Tutorials List Bottom"></app-ad-slot>
      </div>
    </div>
  `,
  styles: [`
    .tutorials-page {
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
        max-width: 800px;
        margin: 0 0 1.5rem;
      }
    }
    .filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .pill-btn {
        padding: 0.4rem 0.85rem;
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
          background: rgba(56, 189, 248, 0.15);
          color: var(--primary);
          border-color: var(--primary);
          font-weight: 600;
        }
      }
    }

    .tutorial-card {
      display: flex;
      flex-direction: column;
      padding: 1.75rem;

      .card-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .read-time {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-left: auto;

          .icon {
            font-size: 0.95rem;
          }
        }
      }

      .tutorial-title {
        font-size: 1.3rem;
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

      .tutorial-desc {
        font-size: 0.925rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.5rem;
        flex-grow: 1;
      }

      .tutorial-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--border-color);
        padding-top: 1rem;

        .date-tag {
          font-size: 0.8rem;
          color: #64748b;
        }
      }
    }
  `]
})
export class TutorialsListComponent implements OnInit {
  contentService = inject(ContentService);
  private seo = inject(SeoService);

  selectedCategory = signal<string>('All');

  categories = computed(() => {
    const list = ['All'];
    this.contentService.tutorials().forEach(t => {
      if (!list.includes(t.category)) {
        list.push(t.category);
      }
    });
    return list;
  });

  filteredTutorials = computed(() => {
    const cat = this.selectedCategory();
    const all = this.contentService.tutorials();
    if (cat === 'All') return all;
    return all.filter(t => t.category.toLowerCase() === cat.toLowerCase());
  });

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Tutorials & Practical Developer Guides - CodeLearn Academy',
      description: 'Explore step-by-step programming tutorials for Angular, TypeScript, CSS Grid, and JavaScript with complete code and explanations.',
      urlPath: '/tutorials',
      breadcrumbs: [{ name: 'Tutorials', item: '/tutorials' }]
    });
  }
}

