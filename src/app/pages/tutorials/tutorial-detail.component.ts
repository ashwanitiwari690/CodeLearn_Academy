import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-tutorial-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, CodeBlockComponent, AdSlotComponent],
  template: `
    @if (tutorial(); as tut) {
      <div class="container tutorial-page">
        <app-breadcrumb [items]="[
          { label: 'Tutorials', url: '/tutorials' },
          { label: tut.title }
        ]"></app-breadcrumb>

        <!-- Article Header -->
        <header class="tutorial-header">
          <div class="meta-pills">
            <span class="badge badge-category">{{ tut.category }}</span>
            <span class="badge" [class.badge-beginner]="tut.difficulty === 'Beginner'" [class.badge-intermediate]="tut.difficulty === 'Intermediate'" [class.badge-advanced]="tut.difficulty === 'Advanced'">
              {{ tut.difficulty }}
            </span>
            <span class="meta-item">
              <span class="material-symbols-outlined icon">schedule</span>
              {{ tut.readingTimeMinutes }} min read
            </span>
            <span class="meta-item">
              <span class="material-symbols-outlined icon">event</span>
              Updated: {{ tut.updatedDate }}
            </span>
          </div>

          <h1 class="page-title">{{ tut.title }}</h1>
          <p class="lead-intro">{{ tut.shortIntroduction }}</p>

          <!-- Author Box & Bookmarking -->
          <div class="author-row">
            @if (author(); as a) {
              <div class="author-card">
                <img [src]="a.avatar" [alt]="a.name" class="avatar-img" width="48" height="48">
                <div class="author-details">
                  <div class="author-name-line">
                    <a [routerLink]="['/authors', a.slug]" class="author-link">{{ a.name }}</a>
                    <span class="author-role">{{ a.role }}</span>
                  </div>
                  <p class="author-bio">{{ a.bio }}</p>
                </div>
              </div>
            }

            <button 
              type="button" 
              class="btn btn-sm bookmark-btn" 
              [class.btn-outline]="!storage.isBookmarked(tut.id)" 
              [class.btn-primary]="storage.isBookmarked(tut.id)"
              (click)="toggleBookmark(tut)">
              <span class="material-symbols-outlined icon">
                {{ storage.isBookmarked(tut.id) ? 'bookmark_added' : 'bookmark_border' }}
              </span>
              {{ storage.isBookmarked(tut.id) ? 'Saved to Bookmarks' : 'Bookmark Guide' }}
            </button>
          </div>
        </header>

        <div class="tutorial-layout">
          <!-- Main Tutorial Column -->
          <main class="tutorial-content">
            <!-- Prerequisites -->
            @if (tut.prerequisites.length > 0) {
              <div class="card prereq-card">
                <h3>
                  <span class="material-symbols-outlined icon">checklist</span>
                  Before You Begin: Prerequisites
                </h3>
                <ul>
                  @for (req of tut.prerequisites; track req) {
                    <li>{{ req }}</li>
                  }
                </ul>
              </div>
            }

            <!-- Main Tutorial Sections -->
            <article class="prose tutorial-prose">
              @for (sec of tut.contentSections; track sec.id) {
                <section [id]="sec.id" class="content-block">
                  <h2>{{ sec.title }}</h2>
                  @for (p of sec.paragraphs; track p) {
                    <p>{{ p }}</p>
                  }

                  @if (sec.codeSnippets) {
                    @for (snippet of sec.codeSnippets; track snippet.code) {
                      <app-code-block
                        [filename]="snippet.filename"
                        [language]="snippet.language"
                        [code]="snippet.code"
                        [explanation]="snippet.explanation"
                        [expectedOutput]="snippet.expectedResult">
                      </app-code-block>
                    }
                  }
                </section>
              }
            </article>

            <!-- Ethical Ad Slot -->
            <div class="my-6">
              <app-ad-slot slotName="Tutorial In-Content"></app-ad-slot>
            </div>

            <!-- Common Mistakes -->
            @if (tut.commonMistakes && tut.commonMistakes.length > 0) {
              <section class="card section-card mistakes-section">
                <h3>
                  <span class="material-symbols-outlined icon">warning</span>
                  Common Mistakes to Watch Out For
                </h3>
                <div class="mistakes-grid">
                  @for (m of tut.commonMistakes; track m.title) {
                    <div class="mistake-item">
                      <h4 class="mistake-title">{{ m.title }}</h4>
                      <p class="mistake-expl">{{ m.explanation }}</p>
                      <div class="mistake-solution">
                        <strong>Solution:</strong> {{ m.solution }}
                      </div>
                    </div>
                  }
                </div>
              </section>
            }

            <!-- Troubleshooting Tips -->
            @if (tut.troubleshootingTips && tut.troubleshootingTips.length > 0) {
              <section class="card section-card tb-section">
                <h3>
                  <span class="material-symbols-outlined icon">build</span>
                  Troubleshooting Common Issues
                </h3>
                <div class="tb-items">
                  @for (tip of tut.troubleshootingTips; track tip.symptom) {
                    <div class="tb-tip">
                      <p class="symptom"><strong>Symptom:</strong> {{ tip.symptom }}</p>
                      <p class="cause"><strong>Cause:</strong> {{ tip.cause }}</p>
                      <p class="resolution"><strong>Resolution:</strong> {{ tip.resolution }}</p>
                    </div>
                  }
                </div>
              </section>
            }

            <!-- FAQ Section -->
            @if (tut.faqs && tut.faqs.length > 0) {
              <section class="card section-card faq-section">
                <h3>
                  <span class="material-symbols-outlined icon">help</span>
                  Frequently Asked Questions
                </h3>
                <div class="faq-list">
                  @for (faq of tut.faqs; track faq.question) {
                    <div class="faq-item">
                      <h4 class="faq-q">{{ faq.question }}</h4>
                      <p class="faq-a">{{ faq.answer }}</p>
                    </div>
                  }
                </div>
              </section>
            }

            <!-- Pagination (Prev / Next) -->
            <nav class="tutorial-pager" aria-label="Tutorial Navigation">
              @if (prevTutorial(); as prev) {
                <a [routerLink]="['/tutorials', prev.slug]" class="pager-btn prev-btn">
                  <span class="pager-label">← Previous Tutorial</span>
                  <span class="pager-title">{{ prev.title }}</span>
                </a>
              } @else {
                <div></div>
              }

              @if (nextTutorial(); as next) {
                <a [routerLink]="['/tutorials', next.slug]" class="pager-btn next-btn">
                  <span class="pager-label">Next Tutorial →</span>
                  <span class="pager-title">{{ next.title }}</span>
                </a>
              }
            </nav>
          </main>

          <!-- Table of Contents & Sidebar -->
          <aside class="tutorial-sidebar">
            <div class="card toc-box">
              <h4 class="toc-title">
                <span class="material-symbols-outlined icon">list</span>
                Table of Contents
              </h4>
              <nav aria-label="Table of Contents">
                <ul class="toc-list">
                  @for (heading of tut.tableOfContents; track heading.id) {
                    <li>
                      <a [href]="'#' + heading.id" class="toc-link">{{ heading.title }}</a>
                    </li>
                  }
                </ul>
              </nav>
            </div>

            <!-- Ad Slot -->
            <app-ad-slot slotName="Tutorial Sidebar"></app-ad-slot>

            <!-- Related Tutorials -->
            @if (relatedTutorials().length > 0) {
              <div class="card related-box">
                <h4>Related Tutorials</h4>
                <ul class="related-list">
                  @for (rel of relatedTutorials(); track rel.id) {
                    <li>
                      <a [routerLink]="['/tutorials', rel.slug]">{{ rel.title }}</a>
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
        <h2>Tutorial Not Found</h2>
        <p>The requested tutorial guide could not be located.</p>
        <a routerLink="/tutorials" class="btn btn-primary">Browse All Tutorials</a>
      </div>
    }
  `,
  styles: [`
    .tutorial-page {
      padding: 1.5rem 0.85rem 3rem;
      min-width: 0;

      @media (min-width: 640px) {
        padding: 2.5rem 1.25rem 4rem;
      }
    }
    .tutorial-header {
      margin-bottom: 1.75rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.5rem;

      @media (min-width: 640px) {
        margin-bottom: 2.5rem;
        padding-bottom: 2rem;
      }

      .meta-pills {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        @media (min-width: 640px) {
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: var(--text-muted);

          .icon {
            font-size: 0.95rem;
          }
        }
      }

      .page-title {
        font-size: clamp(1.4rem, 5vw, 2.4rem);
        line-height: 1.25;
        margin: 0 0 0.75rem;
        word-break: break-word;
      }
      .lead-intro {
        font-size: clamp(0.95rem, 2.5vw, 1.15rem);
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.25rem;
        max-width: 840px;

        @media (min-width: 640px) {
          margin-bottom: 1.75rem;
        }
      }

      .author-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 1rem 1.25rem;

        .author-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 580px;

          .avatar-img {
            border-radius: 50%;
            border: 2px solid var(--primary);
            flex-shrink: 0;
          }
          .author-name-line {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
          }
          .author-link {
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--text-main);
            text-decoration: none;

            &:hover {
              color: var(--primary);
            }
          }
          .author-role {
            font-size: 0.75rem;
            color: #94a3b8;
          }
          .author-bio {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin: 0.25rem 0 0;
            line-height: 1.4;
          }
        }
      }
    }

    .tutorial-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 320px;
      }
    }

    .tutorial-content {
      min-width: 0;

      .prereq-card {
        padding: 1.25rem 1.5rem;
        background: rgba(56, 189, 248, 0.05);
        border: 1px solid rgba(56, 189, 248, 0.2);
        margin-bottom: 2rem;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 1rem;
          color: #38bdf8;
          margin: 0 0 0.5rem;

          .icon {
            font-size: 1.15rem;
          }
        }
        ul {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: #cbd5e1;
          line-height: 1.6;
        }
      }

      .content-block {
        margin-bottom: 2.5rem;

        h2 {
          font-size: 1.5rem;
          margin: 0 0 1rem;
          color: var(--text-main);
          border-bottom: 1px solid rgba(51, 65, 85, 0.5);
          padding-bottom: 0.4rem;
        }
        p {
          font-size: 1rem;
          line-height: 1.75;
          color: #cbd5e1;
        }
      }

      .section-card {
        padding: 1.75rem;
        margin: 2.5rem 0;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          margin: 0 0 1.25rem;

          .icon {
            font-size: 1.35rem;
          }
        }
      }

      .mistakes-section {
        background: rgba(245, 158, 11, 0.04);
        border-color: rgba(245, 158, 11, 0.2);

        h3 .icon {
          color: #fbbf24;
        }

        .mistakes-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .mistake-item {
          background: rgba(15, 23, 42, 0.4);
          padding: 1rem;
          border-left: 3px solid #fbbf24;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;

          .mistake-title {
            font-size: 0.95rem;
            color: #fbbf24;
            margin: 0 0 0.4rem;
          }
          .mistake-expl {
            font-size: 0.875rem;
            color: var(--text-muted);
            line-height: 1.5;
            margin: 0 0 0.5rem;
          }
          .mistake-solution {
            font-size: 0.85rem;
            color: #a7f3d0;
            background: rgba(16, 185, 129, 0.1);
            padding: 0.4rem 0.6rem;
            border-radius: var(--radius-sm);
          }
        }
      }

      .tb-section {
        background: rgba(239, 68, 68, 0.04);
        border-color: rgba(239, 68, 68, 0.2);

        h3 .icon {
          color: #f87171;
        }

        .tb-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tb-tip {
          background: rgba(15, 23, 42, 0.4);
          padding: 1rem;
          border-left: 3px solid #f87171;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.875rem;
          line-height: 1.5;

          p {
            margin: 0 0 0.35rem;
          }
          .symptom {
            color: #fca5a5;
          }
          .cause {
            color: var(--text-muted);
          }
          .resolution {
            color: #a7f3d0;
          }
        }
      }

      .faq-section {
        h3 .icon {
          color: var(--primary);
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .faq-item {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;

          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .faq-q {
            font-size: 1rem;
            color: var(--text-main);
            margin: 0 0 0.4rem;
          }
          .faq-a {
            font-size: 0.9rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin: 0;
          }
        }
      }

      .tutorial-pager {
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

          .pager-label {
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

    .tutorial-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .toc-box {
        position: sticky;
        top: 5.5rem;
        padding: 1.25rem;

        .toc-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 0.85rem;

          .icon {
            font-size: 1.1rem;
          }
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .toc-link {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 0.85rem;
            line-height: 1.4;
            transition: color 0.15s ease;

            &:hover {
              color: var(--primary);
              text-decoration: underline;
            }
          }
        }
      }

      .related-box {
        padding: 1.25rem;

        h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 0.75rem;
        }

        .related-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          a {
            color: var(--text-main);
            text-decoration: none;
            font-size: 0.85rem;

            &:hover {
              color: var(--primary);
              text-decoration: underline;
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
export class TutorialDetailComponent implements OnInit {
  slug = input<string>('');

  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  tutorial = () => this.contentService.getTutorialBySlug(this.slug());

  author = () => {
    const tut = this.tutorial();
    return tut ? this.contentService.getAuthorById(tut.authorId) : undefined;
  };

  nextTutorial = () => {
    const tut = this.tutorial();
    return tut?.nextTutorialSlug ? this.contentService.getTutorialBySlug(tut.nextTutorialSlug) : undefined;
  };

  prevTutorial = () => {
    const tut = this.tutorial();
    return tut?.prevTutorialSlug ? this.contentService.getTutorialBySlug(tut.prevTutorialSlug) : undefined;
  };

  relatedTutorials = () => {
    const tut = this.tutorial();
    if (!tut || !tut.relatedTutorialSlugs) return [];
    return tut.relatedTutorialSlugs
      .map(s => this.contentService.getTutorialBySlug(s))
      .filter((t): t is NonNullable<typeof t> => t !== undefined);
  };

  toggleBookmark(tut: any): void {
    this.storage.toggleBookmark({
      id: tut.id,
      type: 'tutorial',
      title: tut.title,
      category: tut.category,
      url: `/tutorials/${tut.slug}`
    });
  }

  ngOnInit(): void {
    const tut = this.tutorial();
    if (tut) {
      const auth = this.author();
      this.seo.updateSeo({
        title: tut.title,
        description: tut.shortIntroduction,
        urlPath: `/tutorials/${tut.slug}`,
        type: 'article',
        publishedTime: tut.publishedDate,
        modifiedTime: tut.updatedDate,
        authorName: auth?.name || 'CodeLearn Editorial Team',
        breadcrumbs: [
          { name: 'Tutorials', item: '/tutorials' },
          { name: tut.title, item: `/tutorials/${tut.slug}` }
        ]
      });
    }
  }
}

