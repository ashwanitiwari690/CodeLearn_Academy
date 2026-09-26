import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-learning-paths',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, AdSlotComponent],
  template: `
    <div class="container paths-page">
      <app-breadcrumb [items]="[{ label: 'Learning Paths' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Curriculum Overview</span>
        <h1 class="page-title">Structured Learning Paths</h1>
        <p class="lead-text">
          Progress from foundational concepts to production-grade engineering. Each path features structured lessons, runnable code demonstrations, exercises, and interview questions.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (path of contentService.learningPaths(); track path.id) {
          <div class="card path-card">
            <div class="card-top">
              <div class="icon-box">
                <span class="material-symbols-outlined">{{ path.icon }}</span>
              </div>
              <span class="badge" [class.badge-beginner]="path.difficulty === 'Beginner'" [class.badge-intermediate]="path.difficulty === 'Intermediate'" [class.badge-advanced]="path.difficulty === 'Advanced'">
                {{ path.difficulty }}
              </span>
            </div>

            <h2 class="path-title">{{ path.title }}</h2>
            <p class="path-desc">{{ path.description }}</p>

            <div class="syllabus-breakdown">
              <div class="breakdown-item">
                <span class="level-label">Beginner:</span>
                <span class="count">{{ path.beginnerLessonIds.length }} lessons</span>
              </div>
              <div class="breakdown-item">
                <span class="level-label">Intermediate:</span>
                <span class="count">{{ path.intermediateLessonIds.length }} lessons</span>
              </div>
              <div class="breakdown-item">
                <span class="level-label">Advanced:</span>
                <span class="count">{{ path.advancedLessonIds.length }} lessons</span>
              </div>
            </div>

            <div class="card-footer">
              <span class="est-hours">
                <span class="material-symbols-outlined icon">schedule</span>
                ~{{ path.estimatedHours }} hours to complete
              </span>
              <a [routerLink]="['/learn', path.slug]" class="btn btn-primary btn-block mt-3">
                Explore Curriculum
                <span class="material-symbols-outlined icon-end">arrow_forward</span>
              </a>
            </div>
          </div>
        }
      </div>

      <div class="my-8">
        <app-ad-slot slotName="Learning Paths Bottom"></app-ad-slot>
      </div>
    </div>
  `,
  styles: [`
    .paths-page {
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
        max-width: 760px;
        line-height: 1.6;
        margin: 0;
      }
    }
    .path-card {
      display: flex;
      flex-direction: column;

      .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.25rem;
      }
      .icon-box {
        width: 3rem;
        height: 3rem;
        background: rgba(56, 189, 248, 0.1);
        border: 1px solid rgba(56, 189, 248, 0.2);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);

        .material-symbols-outlined {
          font-size: 1.75rem;
        }
      }
      .path-title {
        font-size: 1.35rem;
        margin: 0 0 0.5rem;
      }
      .path-desc {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.25rem;
        flex-grow: 1;
      }
      .syllabus-breakdown {
        background: rgba(15, 23, 42, 0.5);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.75rem;
        margin-bottom: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;

          .level-label {
            color: #94a3b8;
          }
          .count {
            color: var(--text-main);
            font-weight: 600;
          }
        }
      }
      .card-footer {
        border-top: 1px solid var(--border-color);
        padding-top: 0.85rem;

        .est-hours {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-muted);

          .icon {
            font-size: 0.95rem;
          }
        }
      }
    }
  `]
})
export class LearningPathsComponent implements OnInit {
  contentService = inject(ContentService);
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Learning Paths - Comprehensive Web Development Curricula',
      description: 'Explore structured web development learning paths: HTML5, CSS Grid & Flexbox, JavaScript ES6+, TypeScript, Angular, and Git.',
      urlPath: '/learn',
      breadcrumbs: [{ name: 'Learning Paths', item: '/learn' }]
    });
  }
}

