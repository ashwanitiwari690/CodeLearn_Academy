import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, CodeBlockComponent, AdSlotComponent],
  template: `
    @if (project(); as p) {
      <div class="container project-detail-page">
        <app-breadcrumb [items]="[
          { label: 'Projects', url: '/projects' },
          { label: p.title }
        ]"></app-breadcrumb>

        <!-- Header -->
        <header class="project-header">
          <div class="meta-row">
            <span class="badge" [class.badge-beginner]="p.difficulty === 'Beginner'" [class.badge-intermediate]="p.difficulty === 'Intermediate'" [class.badge-advanced]="p.difficulty === 'Advanced'">
              {{ p.difficulty }}
            </span>
            <span class="category-pill">{{ p.category }}</span>
            <span class="est-hours">
              <span class="material-symbols-outlined icon">schedule</span>
              Estimated Build: ~{{ p.estimatedHours }} Hours
            </span>
          </div>

          <div class="title-action-row">
            <h1 class="page-title">{{ p.title }}</h1>
            <div class="action-buttons">
              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isBookmarked(p.id)" 
                [class.btn-primary]="storage.isBookmarked(p.id)"
                (click)="toggleBookmark(p)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isBookmarked(p.id) ? 'bookmark_added' : 'bookmark_border' }}
                </span>
                {{ storage.isBookmarked(p.id) ? 'Saved' : 'Bookmark' }}
              </button>

              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isCompleted(p.id)" 
                [class.btn-primary]="storage.isCompleted(p.id)"
                (click)="storage.toggleCompleted(p.id)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isCompleted(p.id) ? 'check_circle' : 'radio_button_unchecked' }}
                </span>
                {{ storage.isCompleted(p.id) ? 'Completed' : 'Mark as Built' }}
              </button>
            </div>
          </div>

          <p class="lead-text">{{ p.description }}</p>
        </header>

        <div class="project-layout">
          <!-- Main Content Column -->
          <main class="project-main">
            <!-- Features Overview -->
            <section class="card section-card">
              <h2 class="card-title">
                <span class="material-symbols-outlined icon">checklist_rtl</span>
                Feature Specifications
              </h2>

              <div class="features-split">
                <div class="feat-box core-box">
                  <h3>Core Requirements</h3>
                  <ul>
                    @for (feat of p.features.core; track feat) {
                      <li>
                        <span class="material-symbols-outlined icon">done</span>
                        <span>{{ feat }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <div class="feat-box bonus-box">
                  <h3>Bonus Enhancements</h3>
                  <ul>
                    @for (bonus of p.features.bonus; track bonus) {
                      <li>
                        <span class="material-symbols-outlined icon">star</span>
                        <span>{{ bonus }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </section>

            <!-- Recommended Folder Structure -->
            <section class="card section-card">
              <h2 class="card-title">
                <span class="material-symbols-outlined icon">folder_open</span>
                Recommended Project Architecture & Folder Layout
              </h2>
              <p class="sub-text">Adopt a scalable modular folder structure before writing code:</p>
              <pre class="folder-tree" tabindex="0"><code>{{ p.folderStructure }}</code></pre>
            </section>

            <!-- Step-by-Step Implementation Plan -->
            <section class="implementation-steps">
              <h2 class="section-heading">
                <span class="material-symbols-outlined icon">format_list_numbered</span>
                Step-by-Step Implementation Plan
              </h2>

              <div class="steps-container">
                @for (step of p.stepByStepPlan; track step.stepNumber) {
                  <article class="card step-card">
                    <div class="step-num-badge">Step {{ step.stepNumber }}</div>
                    <h3 class="step-title">{{ step.title }}</h3>
                    <p class="step-objective"><strong>Objective:</strong> {{ step.objective }}</p>

                    <ul class="step-instructions">
                      @for (inst of step.instructions; track inst) {
                        <li>{{ inst }}</li>
                      }
                    </ul>

                    @if (step.codeGuidance) {
                      <div class="step-code">
                        <app-code-block
                          [code]="step.codeGuidance"
                          language="typescript"
                          filename="Implementation Guidance">
                        </app-code-block>
                      </div>
                    }
                  </article>
                }
              </div>
            </section>

            <!-- Ethical Ad Slot -->
            <div class="my-6">
              <app-ad-slot slotName="Project Plan In-Content"></app-ad-slot>
            </div>

            <!-- Common Mistakes -->
            @if (p.commonMistakes && p.commonMistakes.length > 0) {
              <section class="card section-card mistakes-section">
                <h2 class="card-title">
                  <span class="material-symbols-outlined icon">warning</span>
                  Common Pitfalls & Architectural Traps
                </h2>
                <div class="mistakes-list">
                  @for (m of p.commonMistakes; track m.mistake) {
                    <div class="mistake-item">
                      <p class="mistake">⚠️ <strong>Mistake:</strong> {{ m.mistake }}</p>
                      <p class="prevention">💡 <strong>Prevention:</strong> {{ m.prevention }}</p>
                    </div>
                  }
                </div>
              </section>
            }

            <!-- Possible Improvements -->
            @if (p.possibleImprovements && p.possibleImprovements.length > 0) {
              <section class="card section-card improvements-section">
                <h2 class="card-title">
                  <span class="material-symbols-outlined icon">rocket_launch</span>
                  Further Exploration & Production Hardening
                </h2>
                <ul class="improvements-list">
                  @for (imp of p.possibleImprovements; track imp) {
                    <li>{{ imp }}</li>
                  }
                </ul>
              </section>
            }
          </main>

          <!-- Sidebar -->
          <aside class="project-sidebar">
            <!-- Prerequisites -->
            <div class="card sidebar-card">
              <h4>Prerequisites</h4>
              <ul class="clean-list">
                @for (req of p.prerequisites; track req) {
                  <li>{{ req }}</li>
                }
              </ul>
            </div>

            <!-- Required Skills -->
            <div class="card sidebar-card">
              <h4>Skills Tested</h4>
              <div class="skills-list">
                @for (skill of p.skillsRequired; track skill) {
                  <span class="chip">{{ skill }}</span>
                }
              </div>
            </div>

            <!-- Implementation Tips -->
            <div class="card sidebar-card tips-card">
              <h4>Guidance Tips</h4>
              <ul class="clean-list">
                @for (tip of p.implementationGuidance; track tip) {
                  <li>{{ tip }}</li>
                }
              </ul>
            </div>

            <!-- Ad Slot -->
            <app-ad-slot slotName="Project Detail Sidebar"></app-ad-slot>
          </aside>
        </div>
      </div>
    } @else {
      <div class="container not-found-box">
        <h2>Project Blueprint Not Found</h2>
        <p>The requested project blueprint could not be located.</p>
        <a routerLink="/projects" class="btn btn-primary">Browse All Projects</a>
      </div>
    }
  `,
  styles: [`
    .project-detail-page {
      padding: 2.5rem 1.25rem 4rem;
    }
    .project-header {
      margin-bottom: 2.5rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.75rem;

      .meta-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;

        .category-pill {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .est-hours {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.825rem;
          color: var(--text-muted);

          .icon {
            font-size: 1rem;
          }
        }
      }

      .title-action-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;

        .page-title {
          font-size: 2.35rem;
          margin: 0;
          line-height: 1.25;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
      }

      .lead-text {
        font-size: 1.15rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0;
        max-width: 820px;
      }
    }

    .project-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 340px;
      }
    }

    .project-main {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
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

      .sub-text {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin: 0 0 1rem;
      }
    }

    .features-split {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;

      @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
      }

      .feat-box {
        background: rgba(15, 23, 42, 0.5);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 1.25rem;

        h3 {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 0.85rem;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          li {
            display: flex;
            align-items: flex-start;
            gap: 0.4rem;
            font-size: 0.875rem;
            color: #cbd5e1;
            line-height: 1.4;

            .icon {
              font-size: 1rem;
              margin-top: 0.15rem;
              flex-shrink: 0;
            }
          }
        }

        &.core-box {
          border-left: 3px solid #38bdf8;
          h3 { color: #38bdf8; }
          .icon { color: #38bdf8; }
        }

        &.bonus-box {
          border-left: 3px solid #a855f7;
          h3 { color: #c084fc; }
          .icon { color: #c084fc; }
        }
      }
    }

    .folder-tree {
      background: #090d16;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 1.25rem;
      margin: 0;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: #a7f3d0;
      line-height: 1.6;
      overflow-x: auto;
    }

    .implementation-steps {
      .section-heading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        margin: 0 0 1.5rem;

        .icon {
          color: var(--primary);
        }
      }

      .steps-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .step-card {
        padding: 1.75rem;

        .step-num-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(56, 189, 248, 0.1);
          color: var(--primary);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.5rem;
        }

        .step-title {
          font-size: 1.25rem;
          margin: 0 0 0.5rem;
        }

        .step-objective {
          font-size: 0.9rem;
          color: #e2e8f0;
          margin: 0 0 1rem;
        }

        .step-instructions {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .step-code {
          margin-top: 1.25rem;
        }
      }
    }

    .mistakes-section {
      background: rgba(245, 158, 11, 0.04);
      border-color: rgba(245, 158, 11, 0.2);

      h2 .icon {
        color: #fbbf24;
      }

      .mistakes-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .mistake-item {
          background: rgba(15, 23, 42, 0.4);
          padding: 1rem;
          border-left: 3px solid #fbbf24;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;

          p {
            margin: 0 0 0.25rem;
            font-size: 0.875rem;
          }

          .mistake { color: #fca5a5; }
          .prevention { color: #a7f3d0; margin: 0; }
        }
      }
    }

    .improvements-section {
      ul {
        margin: 0;
        padding-left: 1.25rem;
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.6;
      }
    }

    .project-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .sidebar-card {
        padding: 1.25rem;

        h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 0.85rem;
        }

        .clean-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          li {
            font-size: 0.85rem;
            color: #cbd5e1;
            line-height: 1.4;
          }
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;

          .chip {
            font-size: 0.75rem;
            padding: 0.2rem 0.5rem;
            background: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            color: #cbd5e1;
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
export class ProjectDetailComponent implements OnInit {
  slug = input<string>('');

  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  project = () => this.contentService.getProjectBySlug(this.slug());

  toggleBookmark(p: any): void {
    this.storage.toggleBookmark({
      id: p.id,
      type: 'project',
      title: p.title,
      category: p.category,
      url: `/projects/${p.slug}`
    });
  }

  ngOnInit(): void {
    const p = this.project();
    if (p) {
      this.seo.updateSeo({
        title: `${p.title} - Project Blueprint`,
        description: p.description,
        urlPath: `/projects/${p.slug}`,
        breadcrumbs: [
          { name: 'Projects', item: '/projects' },
          { name: p.title, item: `/projects/${p.slug}` }
        ]
      });
    }
  }
}

