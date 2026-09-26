import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-path-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, AdSlotComponent],
  template: `
    @if (path(); as p) {
      <div class="container path-detail-page">
        <app-breadcrumb [items]="[
          { label: 'Learning Paths', url: '/learn' },
          { label: p.title }
        ]"></app-breadcrumb>

        <header class="path-header">
          <div class="header-badges">
            <span class="badge badge-category">{{ p.category }}</span>
            <span class="badge" [class.badge-beginner]="p.difficulty === 'Beginner'" [class.badge-intermediate]="p.difficulty === 'Intermediate'" [class.badge-advanced]="p.difficulty === 'Advanced'">
              {{ p.difficulty }}
            </span>
          </div>

          <h1 class="page-title">{{ p.title }}</h1>
          <p class="lead-text">{{ p.description }}</p>

          <div class="quick-stats-bar">
            <div class="stat-pill">
              <span class="material-symbols-outlined icon">schedule</span>
              <span>Estimated: ~{{ p.estimatedHours }} Hours</span>
            </div>
            <div class="stat-pill">
              <span class="material-symbols-outlined icon">library_books</span>
              <span>Total Lessons: {{ beginnerLessons().length + intermediateLessons().length + advancedLessons().length }}</span>
            </div>
            <div class="stat-pill">
              <span class="material-symbols-outlined icon">code</span>
              <span>{{ p.exerciseIds.length }} Exercises</span>
            </div>
          </div>
        </header>

        <div class="layout-grid">
          <!-- Main Syllabus Column -->
          <div class="syllabus-col">
            <!-- Prerequisites Card -->
            @if (p.prerequisites.length > 0) {
              <section class="card section-card">
                <h2 class="section-title">
                  <span class="material-symbols-outlined icon">checklist</span>
                  Recommended Prerequisites
                </h2>
                <ul class="prereq-list">
                  @for (req of p.prerequisites; track req) {
                    <li>{{ req }}</li>
                  }
                </ul>
              </section>
            }

            <!-- Beginner Lessons -->
            <section class="card section-card">
              <div class="level-header">
                <span class="badge badge-beginner">Tier 1</span>
                <h2>Beginner Modules</h2>
              </div>
              <p class="level-desc">Fundamental syntax, core concepts, and base mechanics.</p>
              
              <div class="lessons-list">
                @for (lesson of beginnerLessons(); track lesson.id) {
                  <a [routerLink]="['/learn', p.slug, lesson.slug]" class="lesson-row">
                    <div class="lesson-info">
                      <div class="title-with-status">
                        <span class="lesson-title">{{ lesson.title }}</span>
                        @if (storage.isCompleted(lesson.id)) {
                          <span class="material-symbols-outlined completed-icon" title="Completed">check_circle</span>
                        }
                      </div>
                      <p class="lesson-snippet">{{ lesson.description }}</p>
                    </div>
                    <div class="lesson-meta">
                      <span class="read-mins">{{ lesson.readingTimeMinutes }} min</span>
                      <span class="material-symbols-outlined icon-end">chevron_right</span>
                    </div>
                  </a>
                }
              </div>
            </section>

            <!-- Intermediate Lessons -->
            <section class="card section-card">
              <div class="level-header">
                <span class="badge badge-intermediate">Tier 2</span>
                <h2>Intermediate Modules</h2>
              </div>
              <p class="level-desc">Architecture, state manipulation, async flows, and standard design patterns.</p>
              
              <div class="lessons-list">
                @for (lesson of intermediateLessons(); track lesson.id) {
                  <a [routerLink]="['/learn', p.slug, lesson.slug]" class="lesson-row">
                    <div class="lesson-info">
                      <div class="title-with-status">
                        <span class="lesson-title">{{ lesson.title }}</span>
                        @if (storage.isCompleted(lesson.id)) {
                          <span class="material-symbols-outlined completed-icon" title="Completed">check_circle</span>
                        }
                      </div>
                      <p class="lesson-snippet">{{ lesson.description }}</p>
                    </div>
                    <div class="lesson-meta">
                      <span class="read-mins">{{ lesson.readingTimeMinutes }} min</span>
                      <span class="material-symbols-outlined icon-end">chevron_right</span>
                    </div>
                  </a>
                }
              </div>
            </section>

            <!-- Advanced Lessons -->
            @if (advancedLessons().length > 0) {
              <section class="card section-card">
                <div class="level-header">
                  <span class="badge badge-advanced">Tier 3</span>
                  <h2>Advanced Modules</h2>
                </div>
                <p class="level-desc">Performance profiling, internals, memory management, and production optimizations.</p>
                
                <div class="lessons-list">
                  @for (lesson of advancedLessons(); track lesson.id) {
                    <a [routerLink]="['/learn', p.slug, lesson.slug]" class="lesson-row">
                      <div class="lesson-info">
                        <div class="title-with-status">
                          <span class="lesson-title">{{ lesson.title }}</span>
                          @if (storage.isCompleted(lesson.id)) {
                            <span class="material-symbols-outlined completed-icon" title="Completed">check_circle</span>
                          }
                        </div>
                        <p class="lesson-snippet">{{ lesson.description }}</p>
                      </div>
                      <div class="lesson-meta">
                        <span class="read-mins">{{ lesson.readingTimeMinutes }} min</span>
                        <span class="material-symbols-outlined icon-end">chevron_right</span>
                      </div>
                    </a>
                  }
                </div>
              </section>
            }

            <!-- Common Mistakes -->
            @if (p.commonMistakes && p.commonMistakes.length > 0) {
              <section class="card section-card">
                <h2 class="section-title">
                  <span class="material-symbols-outlined icon">warning</span>
                  Common Mistakes to Avoid
                </h2>
                <div class="mistakes-container">
                  @for (m of p.commonMistakes; track m.mistake) {
                    <div class="mistake-item">
                      <h4 class="mistake-title">⚠️ {{ m.mistake }}</h4>
                      <p class="mistake-correction"><strong>Fix:</strong> {{ m.correction }}</p>
                      <p class="mistake-expl">{{ m.explanation }}</p>
                    </div>
                  }
                </div>
              </section>
            }
          </div>

          <!-- Sidebar Column -->
          <aside class="sidebar-col">
            <!-- Learning Progress Card -->
            <div class="card progress-box">
              <h3>Track Your Progress</h3>
              <p>Your lesson completion marks are stored locally on your device.</p>
              <a routerLink="/progress" class="btn btn-outline btn-sm btn-block">
                View Learning Dashboard
              </a>
            </div>

            <!-- Path Exercises -->
            <div class="card sidebar-card">
              <h3>Related Coding Exercises</h3>
              <ul class="sidebar-links">
                @for (exId of p.exerciseIds; track exId) {
                  @if (contentService.getExerciseBySlug(exId); as ex) {
                    <li>
                      <a [routerLink]="['/exercises', ex.slug]">{{ ex.title }}</a>
                    </li>
                  }
                }
              </ul>
            </div>

            <!-- Ad Slot -->
            <app-ad-slot slotName="Learning Path Sidebar"></app-ad-slot>

            <!-- External References -->
            @if (p.relatedResources.length > 0) {
              <div class="card sidebar-card">
                <h3>Official Standards & References</h3>
                <ul class="sidebar-links">
                  @for (res of p.relatedResources; track res.title) {
                    <li>
                      <a [href]="res.url" target="_blank" rel="noopener noreferrer">
                        {{ res.title }}
                        <span class="material-symbols-outlined ext-icon">open_in_new</span>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            }
          </aside>
        </div>
      </div>
    } @else {
      <div class="container not-found-box">
        <h2>Learning Path Not Found</h2>
        <p>The requested curriculum path does not exist or may have moved.</p>
        <a routerLink="/learn" class="btn btn-primary">Browse All Paths</a>
      </div>
    }
  `,
  styles: [`
    .path-detail-page {
      padding: 2.5rem 1.25rem 4rem;
    }
    .path-header {
      margin-bottom: 2.5rem;

      .header-badges {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .page-title {
        font-size: 2.5rem;
        margin: 0 0 0.75rem;
      }
      .lead-text {
        font-size: 1.15rem;
        color: var(--text-muted);
        line-height: 1.6;
        max-width: 820px;
        margin: 0 0 1.5rem;
      }
    }
    .quick-stats-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      .stat-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.4rem 0.85rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        font-size: 0.85rem;
        color: #94a3b8;

        .icon {
          font-size: 1.1rem;
          color: var(--primary);
        }
      }
    }

    .layout-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 340px;
      }
    }

    .syllabus-col {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .section-card {
      padding: 1.75rem;

      .section-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;
        margin: 0 0 1rem;

        .icon {
          color: var(--primary);
        }
      }

      .level-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.25rem;

        h2 {
          font-size: 1.35rem;
          margin: 0;
        }
      }
      .level-desc {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin: 0 0 1.25rem;
      }
    }

    .prereq-list {
      margin: 0;
      padding-left: 1.25rem;
      color: #cbd5e1;
      font-size: 0.925rem;
      line-height: 1.6;
    }

    .lessons-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .lesson-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      text-decoration: none;
      transition: all 0.15s ease;

      &:hover {
        background: var(--surface-hover);
        border-color: #475569;
        transform: translateX(4px);
      }

      .lesson-info {
        flex-grow: 1;
        padding-right: 1rem;

        .title-with-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .lesson-title {
          font-weight: 600;
          color: var(--text-main);
          font-size: 1rem;
        }

        .completed-icon {
          font-size: 1.1rem;
          color: #10b981;
        }

        .lesson-snippet {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin: 0.25rem 0 0;
          line-height: 1.4;
        }
      }

      .lesson-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;

        .read-mins {
          font-size: 0.8rem;
          color: #94a3b8;
        }
        .icon-end {
          font-size: 1.25rem;
          color: var(--text-muted);
        }
      }
    }

    .mistakes-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      .mistake-item {
        background: rgba(15, 23, 42, 0.4);
        border-left: 3px solid #f59e0b;
        padding: 0.85rem 1rem;
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;

        .mistake-title {
          font-size: 0.95rem;
          margin: 0 0 0.35rem;
          color: #fbbf24;
        }
        .mistake-correction {
          font-size: 0.875rem;
          color: var(--text-main);
          margin: 0 0 0.25rem;
        }
        .mistake-expl {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.5;
        }
      }
    }

    .sidebar-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .progress-box {
        padding: 1.5rem;

        h3 {
          font-size: 1.1rem;
          margin: 0 0 0.5rem;
        }
        p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0 0 1rem;
        }
      }

      .sidebar-card {
        padding: 1.5rem;

        h3 {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 1rem;
        }
      }

      .sidebar-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-main);
          text-decoration: none;
          font-size: 0.9rem;

          &:hover {
            color: var(--primary);
            text-decoration: underline;
          }

          .ext-icon {
            font-size: 0.9rem;
            color: var(--text-muted);
          }
        }
      }
    }

    .not-found-box {
      text-align: center;
      padding: 5rem 1rem;
    }
  `]
})
export class PathDetailComponent implements OnInit {
  pathSlug = input<string>('');
  
  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  path = () => this.contentService.getLearningPathBySlug(this.pathSlug());

  beginnerLessons = () => {
    const p = this.path();
    return p ? this.contentService.getLessonsByIds(p.beginnerLessonIds) : [];
  };

  intermediateLessons = () => {
    const p = this.path();
    return p ? this.contentService.getLessonsByIds(p.intermediateLessonIds) : [];
  };

  advancedLessons = () => {
    const p = this.path();
    return p ? this.contentService.getLessonsByIds(p.advancedLessonIds) : [];
  };

  ngOnInit(): void {
    const p = this.path();
    if (p) {
      this.seo.updateSeo({
        title: `${p.title} - Complete Curriculum`,
        description: p.description,
        urlPath: `/learn/${p.slug}`,
        type: 'course',
        breadcrumbs: [
          { name: 'Learning Paths', item: '/learn' },
          { name: p.title, item: `/learn/${p.slug}` }
        ]
      });
    }
  }
}

