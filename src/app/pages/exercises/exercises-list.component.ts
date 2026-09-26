import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';
import { Difficulty } from '../../models/content.models';

@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, AdSlotComponent],
  template: `
    <div class="container exercises-page">
      <app-breadcrumb [items]="[{ label: 'Exercises' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Practical Problem Solving</span>
        <h1 class="page-title">Interactive Coding Exercises</h1>
        <p class="lead-text">
          Sharpen your programming skills with real algorithmic problems, input/output test specifications, hints, and step-by-step verified solutions.
        </p>

        <!-- Filters Bar -->
        <div class="filter-bar">
          <div class="filter-group">
            <span class="filter-label">Difficulty:</span>
            <div class="btn-group">
              @for (diff of difficulties; track diff) {
                <button 
                  type="button" 
                  class="filter-btn" 
                  [class.active]="selectedDifficulty() === diff"
                  (click)="selectedDifficulty.set(diff)">
                  {{ diff }}
                </button>
              }
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">Category:</span>
            <div class="btn-group">
              @for (cat of categories(); track cat) {
                <button 
                  type="button" 
                  class="filter-btn" 
                  [class.active]="selectedCategory() === cat"
                  (click)="selectedCategory.set(cat)">
                  {{ cat }}
                </button>
              }
            </div>
          </div>
        </div>
      </header>

      <!-- Exercise Cards Matrix -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (ex of filteredExercises(); track ex.id) {
          <div class="card exercise-card">
            <div class="card-meta">
              <span class="topic-tag">{{ ex.topic }}</span>
              <span class="badge" [class.badge-beginner]="ex.difficulty === 'Beginner'" [class.badge-intermediate]="ex.difficulty === 'Intermediate'">
                {{ ex.difficulty }}
              </span>
            </div>

            <div class="title-row">
              <h2 class="exercise-title">
                <a [routerLink]="['/exercises', ex.slug]">{{ ex.title }}</a>
              </h2>
              @if (storage.isCompleted(ex.id)) {
                <span class="material-symbols-outlined completed-icon" title="Solved">check_circle</span>
              }
            </div>

            <p class="exercise-desc">{{ ex.description }}</p>

            <div class="card-footer">
              <span class="lang-tag">{{ ex.language }}</span>
              <a [routerLink]="['/exercises', ex.slug]" class="btn btn-outline btn-sm">
                {{ storage.isCompleted(ex.id) ? 'Review Solution' : 'Solve Problem' }}
                <span class="material-symbols-outlined icon-end">arrow_forward</span>
              </a>
            </div>
          </div>
        }
      </div>

      <div class="my-8">
        <app-ad-slot slotName="Exercises List Bottom"></app-ad-slot>
      </div>
    </div>
  `,
  styles: [`
    .exercises-page {
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

    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 1rem 1.25rem;

      .filter-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .filter-label {
          font-size: 0.825rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .btn-group {
          display: flex;
          gap: 0.25rem;
        }

        .filter-btn {
          padding: 0.25rem 0.65rem;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          font-size: 0.8rem;
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
    }

    .exercise-card {
      display: flex;
      flex-direction: column;
      padding: 1.5rem;

      .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;

        .topic-tag {
          font-size: 0.75rem;
          color: #94a3b8;
          font-family: var(--font-mono);
          font-weight: 600;
        }
      }

      .title-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.5rem;

        .exercise-title {
          font-size: 1.15rem;
          margin: 0;

          a {
            color: var(--text-main);
            text-decoration: none;

            &:hover {
              color: var(--primary);
            }
          }
        }

        .completed-icon {
          font-size: 1.2rem;
          color: #10b981;
          flex-shrink: 0;
        }
      }

      .exercise-desc {
        font-size: 0.875rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0 0 1.25rem;
        flex-grow: 1;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--border-color);
        padding-top: 0.85rem;

        .lang-tag {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: #64748b;
          text-transform: uppercase;
        }
      }
    }
  `]
})
export class ExercisesListComponent implements OnInit {
  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  readonly difficulties: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate'];
  selectedDifficulty = signal<Difficulty | 'All'>('All');
  selectedCategory = signal<string>('All');

  categories = computed(() => {
    const list = ['All'];
    this.contentService.exercises().forEach(e => {
      if (!list.includes(e.category)) {
        list.push(e.category);
      }
    });
    return list;
  });

  filteredExercises = computed(() => {
    const diff = this.selectedDifficulty();
    const cat = this.selectedCategory();
    let items = this.contentService.exercises();

    if (diff !== 'All') {
      items = items.filter(e => e.difficulty === diff);
    }
    if (cat !== 'All') {
      items = items.filter(e => e.category.toLowerCase() === cat.toLowerCase());
    }
    return items;
  });

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Coding Exercises & Practice Problems - CodeLearn Academy',
      description: 'Practice programming with 30+ hands-on coding exercises, input/output tests, hints, and step-by-step solutions.',
      urlPath: '/exercises',
      breadcrumbs: [{ name: 'Exercises', item: '/exercises' }]
    });
  }
}

