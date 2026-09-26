import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-troubleshooting-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, CodeBlockComponent, AdSlotComponent],
  template: `
    @if (article(); as art) {
      <div class="container tb-detail-page">
        <app-breadcrumb [items]="[
          { label: 'Troubleshooting', url: '/troubleshooting' },
          { label: art.title }
        ]"></app-breadcrumb>

        <!-- Header -->
        <header class="tb-header">
          <div class="meta-row">
            <span class="category-tag">
              <span class="material-symbols-outlined icon">bug_report</span>
              {{ art.category }}
            </span>
            <span class="date-tag">Updated: {{ art.updatedDate }}</span>
          </div>

          <div class="title-action-row">
            <h1 class="page-title">{{ art.title }}</h1>
            <button 
              type="button" 
              class="btn btn-sm" 
              [class.btn-outline]="!storage.isBookmarked(art.id)" 
              [class.btn-primary]="storage.isBookmarked(art.id)"
              (click)="toggleBookmark(art)">
              <span class="material-symbols-outlined icon">
                {{ storage.isBookmarked(art.id) ? 'bookmark_added' : 'bookmark_border' }}
              </span>
              {{ storage.isBookmarked(art.id) ? 'Saved' : 'Bookmark Guide' }}
            </button>
          </div>

          <p class="summary-text">{{ art.summary }}</p>

          <!-- Error Signature Banner -->
          <div class="error-signature-box">
            <div class="sig-header">
              <span class="material-symbols-outlined icon">terminal</span>
              <span>Observed Error Signature</span>
            </div>
            <pre class="sig-code" tabindex="0"><code>{{ art.errorSignature }}</code></pre>
          </div>
        </header>

        <div class="tb-layout">
          <!-- Main Diagnostics Column -->
          <main class="tb-main">
            <!-- What It Means -->
            <section class="card section-card">
              <h2 class="card-title">
                <span class="material-symbols-outlined icon">info</span>
                What This Error Means
              </h2>
              <p class="body-text">{{ art.whatItMeans }}</p>
            </section>

            <!-- Why It Happens -->
            <section class="card section-card">
              <h2 class="card-title">
                <span class="material-symbols-outlined icon">psychology_alt</span>
                Common Root Causes
              </h2>
              <ul class="styled-list">
                @for (cause of art.whyItHappens; track cause) {
                  <li>{{ cause }}</li>
                }
              </ul>
            </section>

            <!-- How To Diagnose -->
            <section class="card section-card">
              <h2 class="card-title">
                <span class="material-symbols-outlined icon">troubleshoot</span>
                How to Systematically Diagnose
              </h2>
              <ol class="numbered-list">
                @for (step of art.howToDiagnose; track step) {
                  <li>{{ step }}</li>
                }
              </ol>
            </section>

            <!-- Step by Step Solution -->
            <section class="solution-steps">
              <h2 class="section-heading">
                <span class="material-symbols-outlined icon">task_alt</span>
                Step-by-Step Resolution
              </h2>

              <div class="steps-flow">
                @for (sol of art.stepByStepSolution; track sol.step) {
                  <article class="card step-card">
                    <div class="step-num">Step {{ sol.step }}</div>
                    <h3 class="step-title">{{ sol.title }}</h3>
                    <p class="step-desc">{{ sol.description }}</p>

                    @if (sol.code) {
                      <div class="step-code">
                        <app-code-block
                          [code]="sol.code"
                          language="typescript"
                          filename="Configuration / Code Fix">
                        </app-code-block>
                      </div>
                    }
                  </article>
                }
              </div>
            </section>

            <!-- Ethical Ad Slot -->
            <div class="my-6">
              <app-ad-slot slotName="Troubleshooting In-Content"></app-ad-slot>
            </div>

            <!-- Practical Example (Broken vs Fixed) -->
            <section class="card section-card diff-section">
              <h2 class="card-title">
                <span class="material-symbols-outlined icon">compare</span>
                Practical Example: Broken vs. Fixed
              </h2>

              <div class="diff-grid">
                <div class="diff-col broken-col">
                  <h3>❌ Broken Implementation</h3>
                  <pre class="diff-pre broken"><code>{{ art.practicalExample.brokenCode }}</code></pre>
                </div>

                <div class="diff-col fixed-col">
                  <h3>✅ Fixed Implementation</h3>
                  <pre class="diff-pre fixed"><code>{{ art.practicalExample.fixedCode }}</code></pre>
                </div>
              </div>

              <div class="diff-explanation">
                <strong>Why this fixes it:</strong> {{ art.practicalExample.explanation }}
              </div>
            </section>

            <!-- Prevention Tips -->
            @if (art.preventionTips && art.preventionTips.length > 0) {
              <section class="card section-card prevention-section">
                <h2 class="card-title">
                  <span class="material-symbols-outlined icon">shield</span>
                  Best Practices to Prevent Recurrence
                </h2>
                <ul class="styled-list">
                  @for (tip of art.preventionTips; track tip) {
                    <li>{{ tip }}</li>
                  }
                </ul>
              </section>
            }
          </main>

          <!-- Sidebar -->
          <aside class="tb-sidebar">
            <!-- Related Errors -->
            @if (relatedErrors().length > 0) {
              <div class="card sidebar-box">
                <h4>Related Troubleshooting Guides</h4>
                <ul class="related-list">
                  @for (rel of relatedErrors(); track rel.id) {
                    <li>
                      <a [routerLink]="['/troubleshooting', rel.slug]">
                        <span class="rel-cat">{{ rel.category }}</span>
                        <span class="rel-title">{{ rel.title }}</span>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            }

            <!-- Need More Help? -->
            <div class="card sidebar-box">
              <h4>Still Having Issues?</h4>
              <p class="sidebar-text">
                If your exact error signature behaves differently, check our community guidance or report an issue via our contact channel.
              </p>
              <a routerLink="/contact" class="btn btn-outline btn-sm btn-block">
                Contact Technical Support
              </a>
            </div>

            <!-- Ad Slot -->
            <app-ad-slot slotName="Troubleshooting Sidebar"></app-ad-slot>
          </aside>
        </div>
      </div>
    } @else {
      <div class="container not-found-box">
        <h2>Troubleshooting Guide Not Found</h2>
        <p>The error guide you requested could not be located.</p>
        <a routerLink="/troubleshooting" class="btn btn-primary">Browse All Troubleshooting Guides</a>
      </div>
    }
  `,
  styles: [`
    .tb-detail-page {
      padding: 1.5rem 0.85rem 3rem;
      min-width: 0;

      @media (min-width: 640px) {
        padding: 2.5rem 1.25rem 4rem;
      }
    }
    .tb-header {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.25rem;

      @media (min-width: 640px) {
        margin-bottom: 2.5rem;
        padding-bottom: 2rem;
      }

      .meta-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .category-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
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

      .title-action-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        margin-bottom: 0.75rem;

        .page-title {
          font-size: clamp(1.4rem, 5vw, 2.25rem);
          margin: 0;
          line-height: 1.25;
          word-break: break-word;
        }
      }

      .summary-text {
        font-size: clamp(0.95rem, 2.5vw, 1.15rem);
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.25rem;
        max-width: 840px;
      }

      .error-signature-box {
        background: #090d16;
        border: 1px solid #ef4444;
        border-radius: var(--radius-sm);
        overflow: hidden;

        .sig-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          background: rgba(239, 68, 68, 0.15);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #fca5a5;

          .icon {
            font-size: 1rem;
          }
        }

        .sig-code {
          padding: 1rem;
          margin: 0;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #fee2e2;
          line-height: 1.5;
          overflow-x: auto;
          white-space: pre-wrap;
        }
      }
    }

    .tb-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 340px;
      }
    }

    .tb-main {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      min-width: 0;
    }

    .section-card {
      padding: 1.75rem;

      .card-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;
        margin: 0 0 1rem;

        .icon {
          color: var(--primary);
        }
      }

      .body-text {
        font-size: 1rem;
        line-height: 1.7;
        color: #cbd5e1;
        margin: 0;
      }

      .styled-list {
        margin: 0;
        padding-left: 1.25rem;
        color: #cbd5e1;
        font-size: 0.95rem;
        line-height: 1.65;
      }

      .numbered-list {
        margin: 0;
        padding-left: 1.25rem;
        color: #cbd5e1;
        font-size: 0.95rem;
        line-height: 1.65;
      }
    }

    .solution-steps {
      .section-heading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.45rem;
        margin: 0 0 1.25rem;

        .icon {
          color: #10b981;
        }
      }

      .steps-flow {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .step-card {
        padding: 1.5rem;

        .step-num {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.5rem;
        }

        .step-title {
          font-size: 1.15rem;
          margin: 0 0 0.5rem;
        }

        .step-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        .step-code {
          margin-top: 1rem;
        }
      }
    }

    .diff-section {
      .diff-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
        margin-bottom: 1.25rem;

        @media (min-width: 640px) {
          grid-template-columns: 1fr 1fr;
        }

        .diff-col {
          h3 {
            font-size: 0.9rem;
            margin: 0 0 0.5rem;
          }

          .diff-pre {
            margin: 0;
            padding: 1rem;
            border-radius: var(--radius-sm);
            font-family: var(--font-mono);
            font-size: 0.85rem;
            line-height: 1.5;
            overflow-x: auto;
            white-space: pre-wrap;

            &.broken {
              background: rgba(239, 68, 68, 0.08);
              border: 1px solid rgba(239, 68, 68, 0.3);
              color: #fca5a5;
            }

            &.fixed {
              background: rgba(16, 185, 129, 0.08);
              border: 1px solid rgba(16, 185, 129, 0.3);
              color: #a7f3d0;
            }
          }
        }
      }

      .diff-explanation {
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 1rem;
        font-size: 0.9rem;
        color: #cbd5e1;
        line-height: 1.5;

        strong {
          color: var(--text-main);
        }
      }
    }

    .prevention-section {
      background: rgba(16, 185, 129, 0.04);
      border-color: rgba(16, 185, 129, 0.2);

      h2 .icon {
        color: #10b981;
      }
    }

    .tb-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .sidebar-box {
        padding: 1.25rem;

        h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 0.85rem;
        }

        .sidebar-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0 0 1rem;
        }
      }

      .related-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        a {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          text-decoration: none;

          &:hover .rel-title {
            color: var(--primary);
            text-decoration: underline;
          }

          .rel-cat {
            font-size: 0.7rem;
            color: #f87171;
            font-weight: 700;
            text-transform: uppercase;
          }
          .rel-title {
            font-size: 0.85rem;
            color: var(--text-main);
            line-height: 1.35;
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
export class TroubleshootingDetailComponent implements OnInit {
  slug = input<string>('');

  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  article = () => this.contentService.getTroubleshootingBySlug(this.slug());

  relatedErrors = () => {
    const art = this.article();
    if (!art || !art.relatedErrorSlugs) return [];
    return art.relatedErrorSlugs
      .map(s => this.contentService.getTroubleshootingBySlug(s))
      .filter((t): t is NonNullable<typeof t> => t !== undefined);
  };

  toggleBookmark(art: any): void {
    this.storage.toggleBookmark({
      id: art.id,
      type: 'troubleshooting',
      title: art.title,
      category: art.category,
      url: `/troubleshooting/${art.slug}`
    });
  }

  ngOnInit(): void {
    const art = this.article();
    if (art) {
      this.seo.updateSeo({
        title: art.title,
        description: art.summary,
        urlPath: `/troubleshooting/${art.slug}`,
        type: 'article',
        publishedTime: art.publishedDate,
        modifiedTime: art.updatedDate,
        breadcrumbs: [
          { name: 'Troubleshooting', item: '/troubleshooting' },
          { name: art.title, item: `/troubleshooting/${art.slug}` }
        ]
      });
    }
  }
}

