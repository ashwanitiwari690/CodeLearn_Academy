import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, CodeBlockComponent, AdSlotComponent],
  template: `
    @if (lesson(); as l) {
      <div class="container lesson-page">
        <app-breadcrumb [items]="[
          { label: 'Learning Paths', url: '/learn' },
          { label: path()?.title || 'Path', url: '/learn/' + l.pathSlug },
          { label: l.title }
        ]"></app-breadcrumb>

        <!-- Lesson Header -->
        <header class="lesson-header">
          <div class="header-tags">
            <span class="badge badge-category">{{ l.category }}</span>
            <span class="badge" [class.badge-beginner]="l.difficulty === 'Beginner'" [class.badge-intermediate]="l.difficulty === 'Intermediate'" [class.badge-advanced]="l.difficulty === 'Advanced'">
              {{ l.difficulty }}
            </span>
            <span class="read-estimate">
              <span class="material-symbols-outlined icon">schedule</span>
              {{ l.readingTimeMinutes }} min read
            </span>
          </div>

          <h1 class="page-title">{{ l.title }}</h1>
          <p class="lead-text">{{ l.description }}</p>

          <!-- Author and Action Row -->
          <div class="action-bar">
            @if (author(); as a) {
              <div class="author-info">
                <img [src]="a.avatar" [alt]="a.name" class="author-avatar" width="40" height="40">
                <div>
                  <a [routerLink]="['/authors', a.slug]" class="author-name">{{ a.name }}</a>
                  <span class="author-role">{{ a.role }}</span>
                </div>
              </div>
            }

            <div class="user-actions">
              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isBookmarked(l.id)" 
                [class.btn-primary]="storage.isBookmarked(l.id)"
                (click)="toggleBookmark(l)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isBookmarked(l.id) ? 'bookmark_added' : 'bookmark_border' }}
                </span>
                {{ storage.isBookmarked(l.id) ? 'Saved' : 'Bookmark' }}
              </button>

              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isCompleted(l.id)" 
                [class.btn-primary]="storage.isCompleted(l.id)"
                (click)="storage.toggleCompleted(l.id)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isCompleted(l.id) ? 'check_circle' : 'radio_button_unchecked' }}
                </span>
                {{ storage.isCompleted(l.id) ? 'Completed' : 'Mark Complete' }}
              </button>
            </div>
          </div>
        </header>

        <div class="lesson-layout">
          <!-- Main Content -->
          <main class="lesson-main">
            <!-- Learning Objectives Box -->
            @if (l.learningObjectives.length > 0) {
              <div class="card objectives-box">
                <h3 class="box-title">
                  <span class="material-symbols-outlined icon">target</span>
                  What You Will Learn
                </h3>
                <ul class="objectives-list">
                  @for (obj of l.learningObjectives; track obj) {
                    <li>{{ obj }}</li>
                  }
                </ul>
              </div>
            }

            <!-- Prerequisites if any -->
            @if (l.prerequisites.length > 0) {
              <div class="prereq-note">
                <strong>Prerequisites:</strong> {{ l.prerequisites.join(', ') }}
              </div>
            }

            <!-- Content Sections -->
            <article class="prose lesson-body">
              @for (section of l.sections; track section.heading) {
                <section class="lesson-section">
                  <h2>{{ section.heading }}</h2>
                  <p class="section-paragraph">{{ section.content }}</p>

                  @if (section.codeExample) {
                    <app-code-block 
                      [code]="section.codeExample.code" 
                      [language]="section.codeExample.language"
                      [explanation]="section.codeExample.explanation"
                      [expectedOutput]="section.codeExample.expectedOutput">
                    </app-code-block>
                  }
                </section>
              }
            </article>

            <!-- Ethical Ad Slot -->
            <div class="my-6">
              <app-ad-slot slotName="Lesson In-Content"></app-ad-slot>
            </div>

            <!-- Key Takeaways Card -->
            @if (l.keyTakeaways.length > 0) {
              <div class="card takeaways-card">
                <h3>
                  <span class="material-symbols-outlined icon">lightbulb</span>
                  Key Takeaways
                </h3>
                <ul>
                  @for (t of l.keyTakeaways; track t) {
                    <li>{{ t }}</li>
                  }
                </ul>
              </div>
            }

            <!-- Common Mistakes -->
            @if (l.commonMistakes.length > 0) {
              <div class="card mistakes-card">
                <h3>
                  <span class="material-symbols-outlined icon">warning</span>
                  Common Mistakes & How to Fix Them
                </h3>
                <div class="mistakes-list">
                  @for (m of l.commonMistakes; track m.mistake) {
                    <div class="mistake-pair">
                      <p class="mistake-text">❌ <strong>Mistake:</strong> {{ m.mistake }}</p>
                      <p class="fix-text">✅ <strong>Fix:</strong> {{ m.fix }}</p>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Lesson Navigation (Prev / Next) -->
            <nav class="lesson-pager" aria-label="Lesson Pagination">
              @if (prevLesson(); as prev) {
                <a [routerLink]="['/learn', prev.pathSlug, prev.slug]" class="pager-btn prev-btn">
                  <span class="pager-direction">← Previous Lesson</span>
                  <span class="pager-title">{{ prev.title }}</span>
                </a>
              } @else {
                <div></div>
              }

              @if (nextLesson(); as next) {
                <a [routerLink]="['/learn', next.pathSlug, next.slug]" class="pager-btn next-btn">
                  <span class="pager-direction">Next Lesson →</span>
                  <span class="pager-title">{{ next.title }}</span>
                </a>
              }
            </nav>
          </main>

          <!-- Lesson Sidebar -->
          <aside class="lesson-sidebar">
            <div class="card sidebar-box">
              <h4>Module Navigation</h4>
              <ul class="module-nav">
                @for (item of pathLessons(); track item.id) {
                  <li [class.active]="item.slug === l.slug">
                    <a [routerLink]="['/learn', item.pathSlug, item.slug]">
                      <span class="material-symbols-outlined item-status">
                        {{ storage.isCompleted(item.id) ? 'check_circle' : 'radio_button_unchecked' }}
                      </span>
                      <span class="item-title">{{ item.title }}</span>
                    </a>
                  </li>
                }
              </ul>
            </div>

            <!-- Ad Slot -->
            <app-ad-slot slotName="Lesson Sidebar"></app-ad-slot>
          </aside>
        </div>
      </div>
    } @else {
      <div class="container not-found-box">
        <h2>Lesson Not Found</h2>
        <p>The lesson you requested does not exist or has been relocated.</p>
        <a routerLink="/learn" class="btn btn-primary">Browse All Learning Paths</a>
      </div>
    }
  `,
  styles: [`
    .lesson-page {
      padding: 1.5rem 0.85rem 3rem;
      min-width: 0;

      @media (min-width: 640px) {
        padding: 2.5rem 1.25rem 4rem;
      }
    }
    .lesson-header {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.25rem;

      @media (min-width: 640px) {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
      }

      .header-tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .read-estimate {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-left: 0.25rem;

          .icon {
            font-size: 0.95rem;
          }
        }
      }

      .page-title {
        font-size: clamp(1.4rem, 5vw, 2.35rem);
        line-height: 1.25;
        margin: 0 0 0.75rem;
        word-break: break-word;
      }
      .lead-text {
        font-size: clamp(0.95rem, 2.5vw, 1.15rem);
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.25rem;
      }

      .action-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          .author-avatar {
            border-radius: 50%;
            border: 1px solid var(--border-color);
          }
          .author-name {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-main);
            text-decoration: none;

            &:hover {
              color: var(--primary);
            }
          }
          .author-role {
            font-size: 0.75rem;
            color: var(--text-muted);
          }
        }

        .user-actions {
          display: flex;
          gap: 0.5rem;
        }
      }
    }

    .lesson-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 300px;
      }
    }

    .lesson-main {
      min-width: 0;

      .objectives-box {
        padding: 1.25rem 1.5rem;
        background: rgba(56, 189, 248, 0.05);
        border: 1px solid rgba(56, 189, 248, 0.2);
        margin-bottom: 1.5rem;

        .box-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 1rem;
          color: #38bdf8;
          margin: 0 0 0.75rem;

          .icon {
            font-size: 1.2rem;
          }
        }

        .objectives-list {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: #e2e8f0;
          line-height: 1.6;
        }
      }

      .prereq-note {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin-bottom: 1.5rem;
        padding: 0.5rem 0.75rem;
        background: var(--bg-card);
        border-left: 3px solid var(--primary);
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }

      .lesson-section {
        margin-bottom: 2.5rem;

        h2 {
          font-size: 1.5rem;
          margin: 0 0 1rem;
          color: var(--text-main);
          border-bottom: 1px solid rgba(51, 65, 85, 0.5);
          padding-bottom: 0.4rem;
        }

        .section-paragraph {
          font-size: 1rem;
          line-height: 1.75;
          color: #cbd5e1;
        }
      }

      .takeaways-card {
        padding: 1.5rem;
        background: rgba(16, 185, 129, 0.05);
        border: 1px solid rgba(16, 185, 129, 0.2);
        margin: 2rem 0;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.15rem;
          color: #34d399;
          margin: 0 0 1rem;

          .icon {
            font-size: 1.3rem;
          }
        }

        ul {
          margin: 0;
          padding-left: 1.25rem;
          color: #e2e8f0;
          line-height: 1.6;
        }
      }

      .mistakes-card {
        padding: 1.5rem;
        background: rgba(245, 158, 11, 0.05);
        border: 1px solid rgba(245, 158, 11, 0.2);
        margin: 2rem 0;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.15rem;
          color: #fbbf24;
          margin: 0 0 1rem;

          .icon {
            font-size: 1.3rem;
          }
        }

        .mistakes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mistake-pair {
          font-size: 0.9rem;
          line-height: 1.5;

          p {
            margin: 0 0 0.25rem;
          }
          .mistake-text {
            color: #fca5a5;
          }
          .fix-text {
            color: #a7f3d0;
          }
        }
      }

      .lesson-pager {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);

        @media (min-width: 640px) {
          flex-direction: row;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 2rem;

          .pager-btn {
            max-width: 48%;
          }
        }

        .pager-btn {
          display: flex;
          flex-direction: column;
          padding: 0.85rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          text-decoration: none;
          width: 100%;
          transition: all 0.15s ease;

          &:hover {
            border-color: var(--primary);
            background: var(--surface-hover);
          }

          .pager-direction {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 0.25rem;
          }

          .pager-title {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--text-main);
          }

          &.next-btn {
            text-align: right;
            margin-left: auto;
          }
        }
      }
    }

    .lesson-sidebar {
      .sidebar-box {
        padding: 1.25rem;

        h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 1rem;
        }
      }

      .module-nav {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        li {
          a {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.45rem 0.6rem;
            border-radius: var(--radius-sm);
            color: var(--text-muted);
            text-decoration: none;
            font-size: 0.85rem;
            transition: all 0.15s ease;

            &:hover {
              color: var(--text-main);
              background: var(--surface-hover);
            }
          }

          .item-status {
            font-size: 1rem;
            color: #64748b;
          }

          &.active a {
            background: rgba(56, 189, 248, 0.1);
            color: var(--primary);
            font-weight: 600;

            .item-status {
              color: var(--primary);
            }
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
export class LessonDetailComponent implements OnInit {
  pathSlug = input<string>('');
  lessonSlug = input<string>('');

  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  lesson = () => this.contentService.getLessonBySlug(this.lessonSlug());
  path = () => this.contentService.getLearningPathBySlug(this.pathSlug());
  author = () => {
    const l = this.lesson();
    return l ? this.contentService.getAuthorById(l.authorId) : undefined;
  };

  pathLessons = () => {
    const l = this.lesson();
    return l ? this.contentService.getLessonsByPathSlug(l.pathSlug) : [];
  };

  nextLesson = () => {
    const l = this.lesson();
    return l?.nextLessonSlug ? this.contentService.getLessonBySlug(l.nextLessonSlug) : undefined;
  };

  prevLesson = () => {
    const l = this.lesson();
    return l?.prevLessonSlug ? this.contentService.getLessonBySlug(l.prevLessonSlug) : undefined;
  };

  toggleBookmark(l: any): void {
    this.storage.toggleBookmark({
      id: l.id,
      type: 'lesson',
      title: l.title,
      category: l.category,
      url: `/learn/${l.pathSlug}/${l.slug}`
    });
  }

  ngOnInit(): void {
    const l = this.lesson();
    if (l) {
      const auth = this.author();
      this.seo.updateSeo({
        title: l.title,
        description: l.description,
        urlPath: `/learn/${l.pathSlug}/${l.slug}`,
        type: 'article',
        publishedTime: l.publishedDate,
        modifiedTime: l.updatedDate,
        authorName: auth?.name || 'CodeLearn Editorial Team',
        breadcrumbs: [
          { name: 'Learning Paths', item: '/learn' },
          { name: this.path()?.title || 'Path', item: `/learn/${l.pathSlug}` },
          { name: l.title, item: `/learn/${l.pathSlug}/${l.slug}` }
        ]
      });
    }
  }
}

