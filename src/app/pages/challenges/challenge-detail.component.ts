import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, CodeBlockComponent, AdSlotComponent],
  template: `
    @if (challenge(); as ch) {
      <div class="container challenge-detail-page">
        <app-breadcrumb [items]="[
          { label: 'Challenges', url: '/challenges' },
          { label: ch.title }
        ]"></app-breadcrumb>

        <!-- Header -->
        <header class="challenge-header">
          <div class="meta-row">
            <span class="badge" [class.badge-beginner]="ch.difficulty === 'Beginner'" [class.badge-intermediate]="ch.difficulty === 'Intermediate'" [class.badge-advanced]="ch.difficulty === 'Advanced'">
              {{ ch.difficulty }}
            </span>
            <span class="meta-item">
              <span class="material-symbols-outlined icon">timer</span>
              Estimated: ~{{ ch.estimatedMinutes }} mins
            </span>
          </div>

          <div class="title-action-row">
            <h1 class="page-title">{{ ch.title }}</h1>
            <div class="actions">
              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isBookmarked(ch.id)" 
                [class.btn-primary]="storage.isBookmarked(ch.id)"
                (click)="toggleBookmark(ch)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isBookmarked(ch.id) ? 'bookmark_added' : 'bookmark_border' }}
                </span>
                {{ storage.isBookmarked(ch.id) ? 'Saved' : 'Save' }}
              </button>

              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isCompleted(ch.id)" 
                [class.btn-primary]="storage.isCompleted(ch.id)"
                (click)="storage.toggleCompleted(ch.id)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isCompleted(ch.id) ? 'check_circle' : 'radio_button_unchecked' }}
                </span>
                {{ storage.isCompleted(ch.id) ? 'Completed' : 'Mark Complete' }}
              </button>
            </div>
          </div>

          <!-- Concepts Chips -->
          <div class="concepts-row">
            <span class="label">Core Concepts:</span>
            @for (c of ch.concepts; track c) {
              <span class="chip">{{ c }}</span>
            }
          </div>
        </header>

        <div class="challenge-layout">
          <!-- Main Content -->
          <main class="challenge-main">
            <!-- Problem Statement -->
            <section class="card section-card">
              <h2 class="card-heading">
                <span class="material-symbols-outlined icon">psychology</span>
                Challenge Problem Statement
              </h2>
              <p class="problem-text">{{ ch.problem }}</p>

              <!-- Explicit Requirements Checklist -->
              <div class="reqs-container">
                <h3>Technical Requirements:</h3>
                <ul class="reqs-list">
                  @for (req of ch.requirements; track req) {
                    <li>
                      <span class="material-symbols-outlined check-icon">check</span>
                      <span>{{ req }}</span>
                    </li>
                  }
                </ul>
              </div>
            </section>

            <!-- Starter Code -->
            <section class="code-section">
              <h2 class="card-heading">
                <span class="material-symbols-outlined icon">terminal</span>
                Starter Code Template
              </h2>
              <app-code-block
                [code]="ch.starterCode"
                [language]="ch.language"
                filename="challenge-starter.js">
              </app-code-block>
            </section>

            <!-- Safe Code Drafting Sandbox -->
            <section class="card section-card drafting-box">
              <div class="drafting-header">
                <h3 class="card-heading mb-0">
                  <span class="material-symbols-outlined icon">code_blocks</span>
                  Local Code Editor Scratchpad
                </h3>
                <span class="badge-safe">Local Browser Memory</span>
              </div>
              <p class="sub-text">Write your solution here or in your favorite IDE before revealing the verified approach:</p>
              <textarea 
                class="draft-textarea" 
                rows="10" 
                [value]="draft()" 
                (input)="onDraftChange($event)"
                placeholder="// Type your implementation here..."></textarea>
            </section>

            <!-- Progressive Hints -->
            @if (ch.hints && ch.hints.length > 0) {
              <section class="card section-card hints-card">
                <div class="hints-top">
                  <h3 class="card-heading mb-0">
                    <span class="material-symbols-outlined icon">lightbulb</span>
                    Guidance & Hints
                  </h3>
                  <button type="button" class="btn btn-outline btn-xs" (click)="toggleHints()">
                    {{ showHints() ? 'Hide Hints' : 'Reveal Hints' }}
                  </button>
                </div>

                @if (showHints()) {
                  <div class="hints-body">
                    @for (hint of ch.hints; track hint; let idx = $index) {
                      <div class="hint-block">
                        <strong>Hint {{ idx + 1 }}:</strong> {{ hint }}
                      </div>
                    }
                  </div>
                }
              </section>
            }

            <!-- Solution & Explanation -->
            <section class="card section-card solution-card">
              <div class="solution-top">
                <div>
                  <h3 class="card-heading mb-1">
                    <span class="material-symbols-outlined icon">task_alt</span>
                    Official Solution & Time Complexity Analysis
                  </h3>
                  <p class="sub-text mb-0">Review the verified optimal implementation.</p>
                </div>
                <button type="button" class="btn btn-primary btn-sm" (click)="toggleSolution()">
                  {{ showSolution() ? 'Hide Solution' : 'Reveal Solution' }}
                </button>
              </div>

              @if (showSolution()) {
                <div class="solution-details">
                  <app-code-block
                    [code]="ch.solution"
                    [language]="ch.language"
                    filename="verified-optimal-solution.js">
                  </app-code-block>

                  <div class="explanation-card">
                    <h4>Architectural Analysis & Complexity:</h4>
                    <p>{{ ch.explanation }}</p>
                  </div>
                </div>
              }
            </section>
          </main>

          <!-- Sidebar -->
          <aside class="challenge-sidebar">
            <div class="card status-card">
              <h4>Challenge Status</h4>
              <div class="status-row">
                <span class="material-symbols-outlined status-icon" [class.done]="storage.isCompleted(ch.id)">
                  {{ storage.isCompleted(ch.id) ? 'check_circle' : 'pending' }}
                </span>
                <div>
                  <strong>{{ storage.isCompleted(ch.id) ? 'Solved' : 'Not Yet Completed' }}</strong>
                  <p class="status-note">Tracked locally in your browser.</p>
                </div>
              </div>

              <button 
                type="button" 
                class="btn btn-block btn-sm mt-3"
                [class.btn-outline]="storage.isCompleted(ch.id)"
                [class.btn-primary]="!storage.isCompleted(ch.id)"
                (click)="storage.toggleCompleted(ch.id)">
                {{ storage.isCompleted(ch.id) ? 'Mark Incomplete' : 'Mark as Completed' }}
              </button>
            </div>

            <!-- Ad Slot -->
            <app-ad-slot slotName="Challenge Detail Sidebar"></app-ad-slot>
          </aside>
        </div>
      </div>
    } @else {
      <div class="container not-found-box">
        <h2>Challenge Not Found</h2>
        <p>The coding challenge you requested could not be located.</p>
        <a routerLink="/challenges" class="btn btn-primary">Browse All Challenges</a>
      </div>
    }
  `,
  styles: [`
    .challenge-detail-page {
      padding: 2.5rem 1.25rem 4rem;
    }
    .challenge-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.5rem;

      .meta-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;

        .meta-item {
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
          font-size: 2.25rem;
          margin: 0;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
      }

      .concepts-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        .label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .chip {
          font-size: 0.75rem;
          padding: 0.2rem 0.6rem;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 9999px;
          color: #38bdf8;
        }
      }
    }

    .challenge-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 320px;
      }
    }

    .challenge-main {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      min-width: 0;
    }

    .section-card {
      padding: 1.75rem;

      .card-heading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;
        margin: 0 0 1rem;

        .icon {
          color: var(--primary);
        }
      }
      .problem-text {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #e2e8f0;
        margin: 0 0 1.5rem;
      }
      .sub-text {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin: 0 0 1rem;
      }
    }

    .reqs-container {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 1.25rem;

      h3 {
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #94a3b8;
        margin: 0 0 0.85rem;
      }

      .reqs-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;

        li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #cbd5e1;

          .check-icon {
            font-size: 1.1rem;
            color: #10b981;
            margin-top: 0.1rem;
            flex-shrink: 0;
          }
        }
      }
    }

    .drafting-box {
      .drafting-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;

        .badge-safe {
          font-size: 0.7rem;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
        }
      }

      .draft-textarea {
        width: 100%;
        background: #090d16;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 1rem;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        color: #f8fafc;
        line-height: 1.5;
        resize: vertical;

        &:focus {
          outline: 2px solid var(--primary);
        }
      }
    }

    .hints-card {
      .hints-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .hints-body {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .hint-block {
          background: rgba(56, 189, 248, 0.05);
          border-left: 3px solid var(--primary);
          padding: 0.75rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.9rem;
          color: #cbd5e1;
        }
      }
    }

    .solution-card {
      .solution-top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      .solution-details {
        margin-top: 1.5rem;

        .explanation-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          margin-top: 1rem;

          h4 {
            font-size: 1rem;
            color: var(--text-main);
            margin: 0 0 0.5rem;
          }
          p {
            font-size: 0.925rem;
            line-height: 1.6;
            color: var(--text-muted);
            margin: 0;
          }
        }
      }
    }

    .challenge-sidebar {
      .status-card {
        padding: 1.25rem;

        h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 1rem;
        }

        .status-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;

          .status-icon {
            font-size: 1.5rem;
            color: #64748b;

            &.done {
              color: #10b981;
            }
          }

          .status-note {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin: 0.25rem 0 0;
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
export class ChallengeDetailComponent implements OnInit {
  slug = input<string>('');

  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  showHints = signal<boolean>(false);
  showSolution = signal<boolean>(false);
  draft = signal<string>('');

  challenge = () => this.contentService.getChallengeBySlug(this.slug());

  toggleHints(): void {
    this.showHints.update(v => !v);
  }

  toggleSolution(): void {
    this.showSolution.update(v => !v);
  }

  onDraftChange(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.draft.set(target.value);
  }

  toggleBookmark(ch: any): void {
    this.storage.toggleBookmark({
      id: ch.id,
      type: 'challenge',
      title: ch.title,
      category: ch.category,
      url: `/challenges/${ch.slug}`
    });
  }

  ngOnInit(): void {
    const ch = this.challenge();
    if (ch) {
      this.draft.set(ch.starterCode);
      this.seo.updateSeo({
        title: `${ch.title} - Coding Challenge`,
        description: ch.problem.slice(0, 160),
        urlPath: `/challenges/${ch.slug}`,
        breadcrumbs: [
          { name: 'Challenges', item: '/challenges' },
          { name: ch.title, item: `/challenges/${ch.slug}` }
        ]
      });
    }
  }
}

