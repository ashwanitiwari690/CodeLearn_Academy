import { Component, inject, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { Lesson, LearningPath } from '../../models/content.models';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent],
  template: `
    <div class="container progress-page">
      <app-breadcrumb [items]="[{ label: 'Progress' }]"></app-breadcrumb>

      <div class="page-header">
        <h1 class="page-title">My Learning Progress</h1>
        <div class="notice-card card">
          <span class="material-symbols-outlined icon">privacy_tip</span>
          <p><strong>Private by Design:</strong> Your progress is stored locally in this browser. We do not require account logins or transmit your study data to external tracking databases.</p>
        </div>
      </div>

      <!-- Top Summary Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-box card">
          <span class="metric-number">{{ storage.totalCompletedCount() }}</span>
          <span class="metric-label">Total Milestones Reached</span>
        </div>

        <div class="metric-box card">
          <span class="metric-number">{{ storage.completedLessons().length }} / {{ allLessons().length }}</span>
          <span class="metric-label">Lessons Completed</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" [style.width.%]="lessonPercent()"></div>
          </div>
        </div>

        <div class="metric-box card">
          <span class="metric-number">{{ storage.completedExercises().length }} / {{ allExercises().length }}</span>
          <span class="metric-label">Exercises Solved</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill progress-fill-emerald" [style.width.%]="exercisePercent()"></div>
          </div>
        </div>

        <div class="metric-box card">
          <span class="metric-number">{{ storage.completedProjects().length }} / {{ allProjects().length }}</span>
          <span class="metric-label">Projects Built</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill progress-fill-amber" [style.width.%]="projectPercent()"></div>
          </div>
        </div>
      </div>

      <!-- Track Progress Breakdown -->
      <div class="progress-sections">
        <!-- Learning Paths Progress -->
        <section class="card section-box">
          <h2><span class="material-symbols-outlined icon">layers</span> Curriculum Path Progression</h2>
          <div class="path-progress-grid">
            @for (p of pathStats(); track p.slug) {
              <div class="path-stat-card">
                <div class="stat-top">
                  <h3><a [routerLink]="['/learn', p.slug]">{{ p.title }}</a></h3>
                  <span class="pct">{{ p.percent }}%</span>
                </div>
                <div class="path-progress-bar">
                  <div class="bar-fill" [style.width.%]="p.percent"></div>
                </div>
                <div class="stat-bottom">
                  <span>{{ p.completedCount }} of {{ p.totalCount }} lessons finished</span>
                  <a [routerLink]="['/learn', p.slug]" class="continue-link">Continue Path &rarr;</a>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Completed Items Breakdown -->
        <section class="card section-box">
          <div class="box-header-row">
            <h2><span class="material-symbols-outlined icon">checklist</span> Completed Lessons ({{ completedLessonObjects().length }})</h2>
          </div>

          @if (completedLessonObjects().length > 0) {
            <ul class="completed-items-list">
              @for (l of completedLessonObjects(); track l.id) {
                <li class="completed-item">
                  <span class="material-symbols-outlined check-icon">check_circle</span>
                  <div class="item-text">
                    <a [routerLink]="['/learn', l.pathSlug, l.slug]">{{ l.title }}</a>
                    <span class="badge badge-category">{{ l.category }}</span>
                  </div>
                  <button type="button" class="btn-remove" (click)="removeLesson(l.id)" title="Unmark complete">
                    <span class="material-symbols-outlined">delete_outline</span>
                  </button>
                </li>
              }
            </ul>
          } @else {
            <div class="empty-list-note">
              <p>You haven't marked any lessons as complete yet. Start reading in our <a routerLink="/learn">Learning Paths</a>.</p>
            </div>
          }
        </section>

        <!-- Clear Progress Button -->
        <div class="danger-zone card">
          <div class="danger-info">
            <h3>Reset Progress Data</h3>
            <p>Clear all local lesson completion records, solved exercises, and challenges from this browser.</p>
          </div>
          <button type="button" class="btn btn-outline btn-sm btn-danger" (click)="clearAll()">
            Clear Browser Progress
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-page {
      padding: 2.5rem 1.25rem 4rem;
      max-width: 960px;
    }

    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 1rem;
      }

      .notice-card {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
        padding: 1rem 1.25rem;
        background: rgba(59, 130, 246, 0.06);
        border-color: rgba(59, 130, 246, 0.25);

        .icon { font-size: 22px; color: #38bdf8; flex-shrink: 0; margin-top: 2px; }

        p {
          font-size: 0.88rem;
          color: #cbd5e1;
          margin: 0;
          line-height: 1.5;
        }
      }
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
      margin-bottom: 2.5rem;

      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 960px) {
        grid-template-columns: repeat(4, 1fr);
      }

      .metric-box {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;

        .metric-number {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .metric-label {
          font-size: 0.8rem;
          color: var(--text-dim);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .progress-bar-wrap {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-top: auto;

          .progress-bar-fill {
            height: 100%;
            background: #3b82f6;
            transition: width 0.3s ease;
          }

          .progress-fill-emerald { background: #10b981; }
          .progress-fill-amber { background: #f59e0b; }
        }
      }
    }

    .progress-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .section-box {
      padding: 2rem;

      h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.35rem;
        margin-bottom: 1.5rem;

        .icon { font-size: 22px; color: #38bdf8; }
      }
    }

    .path-progress-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;

      @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
      }

      .path-stat-card {
        padding: 1.25rem;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);

        .stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.65rem;

          h3 {
            font-size: 1.05rem;
            margin: 0;

            a { color: var(--text-main); &:hover { color: #60a5fa; } }
          }

          .pct {
            font-weight: 700;
            color: #38bdf8;
            font-size: 0.95rem;
          }
        }

        .path-progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.65rem;

          .bar-fill {
            height: 100%;
            background: #38bdf8;
          }
        }

        .stat-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
          color: var(--text-dim);

          .continue-link {
            color: #60a5fa;
            font-weight: 600;
          }
        }
      }
    }

    .completed-items-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .completed-item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.75rem 1rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: var(--radius-sm);

        .check-icon {
          font-size: 20px;
          color: #34d399;
          flex-shrink: 0;
        }

        .item-text {
          flex-grow: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;

          a {
            color: var(--text-main);
            font-size: 0.92rem;
            &:hover { color: #60a5fa; }
          }
        }

        .btn-remove {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          padding: 0.25rem;
          &:hover { color: #f87171; }
        }
      }
    }

    .empty-list-note {
      padding: 1.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;

      a { color: #60a5fa; }
    }

    .danger-zone {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
      padding: 1.5rem;
      border-color: rgba(244, 63, 94, 0.3);
      background: rgba(244, 63, 94, 0.03);

      @media (min-width: 640px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .danger-info {
        h3 { font-size: 1.05rem; color: #fb7185; margin-bottom: 0.25rem; }
        p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }
      }

      .btn-danger {
        border-color: rgba(244, 63, 94, 0.5);
        color: #fca5a5;

        &:hover {
          background: rgba(244, 63, 94, 0.15);
          color: #ffffff;
        }
      }
    }
  `]
})
export class ProgressComponent implements OnInit {
  content = inject(ContentService);
  seo = inject(SeoService);
  storage = inject(StorageService);

  allLessons = () => this.content.getLessons();
  allExercises = () => this.content.getExercises();
  allProjects = () => this.content.getProjects();

  lessonPercent = computed(() => {
    const total = this.allLessons().length;
    if (!total) return 0;
    return Math.round((this.storage.completedLessons().length / total) * 100);
  });

  exercisePercent = computed(() => {
    const total = this.allExercises().length;
    if (!total) return 0;
    return Math.round((this.storage.completedExercises().length / total) * 100);
  });

  projectPercent = computed(() => {
    const total = this.allProjects().length;
    if (!total) return 0;
    return Math.round((this.storage.completedProjects().length / total) * 100);
  });

  completedLessonObjects = computed(() => {
    const ids = this.storage.completedLessons();
    return this.allLessons().filter((l: Lesson) => ids.includes(l.id));
  });

  pathStats = computed(() => {
    return this.content.getLearningPaths().map((path: LearningPath) => {
      const pathLessons = this.content.getLessonsByPath(path.slug);
      const total = pathLessons.length;
      const completed = pathLessons.filter((l: Lesson) => this.storage.isLessonCompleted(l.id)).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return {
        slug: path.slug,
        title: path.title,
        totalCount: total,
        completedCount: completed,
        percent
      };
    });
  });

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'My Learning Progress - CodeLearn Academy',
      description: 'Review your private local study progress, completed lessons, solved exercises, and path milestones.',
      urlPath: '/progress',
      breadcrumbs: [{ name: 'Progress', item: '/progress' }]
    });
  }

  removeLesson(id: string): void {
    this.storage.toggleLessonCompleted(id);
  }

  clearAll(): void {
    if (confirm('Are you sure you want to clear your local progress? This action cannot be undone.')) {
      this.storage.clearAllProgress();
    }
  }
}
