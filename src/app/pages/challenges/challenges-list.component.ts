import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';
import { Difficulty } from '../../models/content.models';

@Component({
  selector: 'app-challenges-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, AdSlotComponent],
  template: `
    <div class="container challenges-page">
      <app-breadcrumb [items]="[{ label: 'Challenges' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Algorithmic & Engineering Problems</span>
        <h1 class="page-title">Developer Coding Challenges</h1>
        <p class="lead-text">
          Tackle real algorithmic patterns, data structure manipulations, and design patterns. No fake leaderboards or artificial timers—focus on clean code, time complexity, and architectural comprehension.
        </p>

        <!-- Transparency Callout -->
        <div class="privacy-note">
          <span class="material-symbols-outlined icon">verified_user</span>
          <span>Your solved challenge history is stored strictly on your local machine using standard browser local storage.</span>
        </div>

        <!-- Difficulty Filters -->
        <div class="filter-pills" role="tablist">
          @for (d of difficulties; track d) {
            <button 
              type="button" 
              class="pill-btn" 
              [class.active]="selectedDifficulty() === d"
              (click)="selectedDifficulty.set(d)">
              {{ d }}
            </button>
          }
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (ch of filteredChallenges(); track ch.id) {
          <div class="card challenge-card">
            <div class="card-meta">
              <span class="badge" [class.badge-beginner]="ch.difficulty === 'Beginner'" [class.badge-intermediate]="ch.difficulty === 'Intermediate'" [class.badge-advanced]="ch.difficulty === 'Advanced'">
                {{ ch.difficulty }}
              </span>
              <span class="est-time">
                <span class="material-symbols-outlined icon">timer</span>
                ~{{ ch.estimatedMinutes }} mins
              </span>
            </div>

            <div class="title-row">
              <h2 class="challenge-title">
                <a [routerLink]="['/challenges', ch.slug]">{{ ch.title }}</a>
              </h2>
              @if (storage.isCompleted(ch.id)) {
                <span class="material-symbols-outlined completed-icon" title="Completed">check_circle</span>
              }
            </div>

            <p class="challenge-desc">{{ ch.problem.slice(0, 160) }}...</p>

            <div class="concepts-list">
              @for (c of ch.concepts; track c) {
                <span class="concept-chip">{{ c }}</span>
              }
            </div>

            <div class="card-footer">
              <span class="lang-tag">{{ ch.language }}</span>
              <a [routerLink]="['/challenges', ch.slug]" class="btn btn-outline btn-sm">
                {{ storage.isCompleted(ch.id) ? 'Review Challenge' : 'Take Challenge' }}
                <span class="material-symbols-outlined icon-end">arrow_forward</span>
              </a>
            </div>
          </div>
        }
      </div>

      <div class="my-8">
        <app-ad-slot slotName="Challenges List Bottom"></app-ad-slot>
      </div>
    </div>
  `,
  styles: [`
    .challenges-page {
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
        margin: 0 0 1.25rem;
      }
    }

    .privacy-note {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.85rem;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: var(--radius-sm);
      font-size: 0.825rem;
      color: #a7f3d0;
      margin-bottom: 1.5rem;

      .icon {
        font-size: 1.1rem;
        color: #10b981;
      }
    }

    .filter-pills {
      display: flex;
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
          background: rgba(56, 189, 248, 0.15);
          color: var(--primary);
          border-color: var(--primary);
          font-weight: 600;
        }
      }
    }

    .challenge-card {
      display: flex;
      flex-direction: column;
      padding: 1.75rem;

      .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;

        .est-time {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-muted);

          .icon {
            font-size: 0.95rem;
          }
        }
      }

      .title-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .challenge-title {
          font-size: 1.2rem;
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

      .challenge-desc {
        font-size: 0.875rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0 0 1.25rem;
        flex-grow: 1;
      }

      .concepts-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-bottom: 1.25rem;

        .concept-chip {
          font-size: 0.725rem;
          padding: 0.15rem 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: #cbd5e1;
        }
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
export class ChallengesListComponent implements OnInit {
  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  readonly difficulties: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  selectedDifficulty = signal<Difficulty | 'All'>('All');

  filteredChallenges = computed(() => {
    const diff = this.selectedDifficulty();
    const all = this.contentService.challenges();
    if (diff === 'All') return all;
    return all.filter(c => c.difficulty === diff);
  });

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Coding Challenges & Problem Solving - CodeLearn Academy',
      description: 'Strengthen algorithm skills with practical engineering challenges, requirements, progressive hints, and verified solutions.',
      urlPath: '/challenges',
      breadcrumbs: [{ name: 'Challenges', item: '/challenges' }]
    });
  }
}

