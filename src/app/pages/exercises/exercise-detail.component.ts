import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, CodeBlockComponent, AdSlotComponent],
  template: `
    @if (exercise(); as ex) {
      <div class="container exercise-detail-page">
        <app-breadcrumb [items]="[
          { label: 'Exercises', url: '/exercises' },
          { label: ex.title }
        ]"></app-breadcrumb>

        <!-- Header -->
        <header class="exercise-header">
          <div class="meta-row">
            <span class="badge badge-category">{{ ex.category }}</span>
            <span class="badge" [class.badge-beginner]="ex.difficulty === 'Beginner'" [class.badge-intermediate]="ex.difficulty === 'Intermediate'">
              {{ ex.difficulty }}
            </span>
            <span class="topic-tag">{{ ex.topic }}</span>
          </div>

          <div class="title-action-row">
            <h1 class="page-title">{{ ex.title }}</h1>
            <div class="action-buttons">
              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isBookmarked(ex.id)" 
                [class.btn-primary]="storage.isBookmarked(ex.id)"
                (click)="toggleBookmark(ex)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isBookmarked(ex.id) ? 'bookmark_added' : 'bookmark_border' }}
                </span>
                {{ storage.isBookmarked(ex.id) ? 'Saved' : 'Save' }}
              </button>

              <button 
                type="button" 
                class="btn btn-sm" 
                [class.btn-outline]="!storage.isCompleted(ex.id)" 
                [class.btn-primary]="storage.isCompleted(ex.id)"
                (click)="storage.toggleCompleted(ex.id)">
                <span class="material-symbols-outlined icon">
                  {{ storage.isCompleted(ex.id) ? 'check_circle' : 'radio_button_unchecked' }}
                </span>
                {{ storage.isCompleted(ex.id) ? 'Solved' : 'Mark as Solved' }}
              </button>
            </div>
          </div>

          <p class="lead-text">{{ ex.description }}</p>
        </header>

        <div class="exercise-layout">
          <!-- Main Problem Column -->
          <div class="problem-col">
            <!-- Problem Statement -->
            <section class="card section-card">
              <h2 class="card-heading">
                <span class="material-symbols-outlined icon">description</span>
                Problem Statement
              </h2>
              <p class="statement-text">{{ ex.problemStatement }}</p>

              <!-- Example Input / Output -->
              <div class="example-boxes">
                <div class="example-box">
                  <span class="example-label">Example Input:</span>
                  <code>{{ ex.exampleInput }}</code>
                </div>
                <div class="example-box">
                  <span class="example-label">Example Output:</span>
                  <code class="output">{{ ex.exampleOutput }}</code>
                </div>
              </div>
            </section>

            <!-- Test Cases Specification -->
            <section class="card section-card">
              <h2 class="card-heading">
                <span class="material-symbols-outlined icon">fact_check</span>
                Test Cases Specification
              </h2>
              <p class="sub-text">Your solution should pass all of the following condition scenarios:</p>

              <div class="test-cases-table">
                <div class="table-header">
                  <span>Input Scenario</span>
                  <span>Expected Output</span>
                </div>
                @for (test of ex.testCases; track test.inputDescription) {
                  <div class="table-row">
                    <span class="test-input"><code>{{ test.inputDescription }}</code></span>
                    <span class="test-output"><code>{{ test.expectedOutputDescription }}</code></span>
                  </div>
                }
              </div>
            </section>

            <!-- Starter Code -->
            <section class="starter-code-section">
              <h2 class="card-heading">
                <span class="material-symbols-outlined icon">code</span>
                Starter Code
              </h2>
              <app-code-block
                [code]="ex.starterCode"
                [language]="ex.language"
                filename="solution.js"
                explanation="You can copy this starter template to your local editor or draft your logic below.">
              </app-code-block>
            </section>

            <!-- Code Drafting Area (Client-side playground) -->
            <section class="card section-card drafting-card">
              <div class="draft-header">
                <h2 class="card-heading mb-0">
                  <span class="material-symbols-outlined icon">edit_note</span>
                  Local Code Scratchpad
                </h2>
                <span class="safe-tag">Safe Client-side Workspace</span>
              </div>
              <p class="sub-text">Draft your solution locally before inspecting the verified answer:</p>
              <textarea 
                class="draft-editor" 
                rows="8" 
                [value]="draftCode()" 
                (input)="onDraftChange($event)"
                placeholder="// Write or paste your logic here..."></textarea>
            </section>

            <!-- Hints Section -->
            @if (ex.hints && ex.hints.length > 0) {
              <section class="card section-card hints-card">
                <div class="hints-header">
                  <h2 class="card-heading mb-0">
                    <span class="material-symbols-outlined icon">tips_and_updates</span>
                    Need a Hint?
                  </h2>
                  <button type="button" class="btn btn-outline btn-xs" (click)="toggleHints()">
                    {{ showHints() ? 'Hide Hints' : 'Reveal Hints' }}
                  </button>
                </div>

                @if (showHints()) {
                  <div class="hints-list">
                    @for (hint of ex.hints; track hint; let idx = $index) {
                      <div class="hint-item">
                        <strong>Hint {{ idx + 1 }}:</strong> {{ hint }}
                      </div>
                    }
                  </div>
                }
              </section>
            }

            <!-- Solution Section -->
            <section class="card section-card solution-card">
              <div class="solution-header">
                <div>
                  <h2 class="card-heading mb-1">
                    <span class="material-symbols-outlined icon">check_circle</span>
                    Official Solution & Architectural Explanation
                  </h2>
                  <p class="sub-text mb-0">Try to solve the problem on your own before revealing the solution!</p>
                </div>
                <button type="button" class="btn btn-primary btn-sm" (click)="toggleSolution()">
                  {{ showSolution() ? 'Hide Solution' : 'Reveal Solution' }}
                </button>
              </div>

              @if (showSolution()) {
                <div class="solution-content">
                  <app-code-block
                    [code]="ex.solution"
                    [language]="ex.language"
                    filename="verified-solution.js">
                  </app-code-block>

                  <div class="explanation-box">
                    <h4>Why This Solution Works:</h4>
                    <p>{{ ex.explanation }}</p>
                  </div>
                </div>
              }
            </section>
          </div>

          <!-- Sidebar -->
          <aside class="sidebar-col">
            <!-- Progress Status -->
            <div class="card status-box">
              <h4>Exercise Status</h4>
              <div class="status-indicator-row">
                <span class="material-symbols-outlined status-icon" [class.solved]="storage.isCompleted(ex.id)">
                  {{ storage.isCompleted(ex.id) ? 'check_circle' : 'pending' }}
                </span>
                <div>
                  <strong>{{ storage.isCompleted(ex.id) ? 'Solved' : 'Incomplete' }}</strong>
                  <p class="status-note">
                    {{ storage.isCompleted(ex.id) ? 'Great job! This exercise is recorded in your local progress.' : 'Mark as solved when you have verified your code.' }}
                  </p>
                </div>
              </div>

              <button 
                type="button" 
                class="btn btn-block btn-sm mt-3"
                [class.btn-outline]="storage.isCompleted(ex.id)"
                [class.btn-primary]="!storage.isCompleted(ex.id)"
                (click)="storage.toggleCompleted(ex.id)">
                {{ storage.isCompleted(ex.id) ? 'Mark Incomplete' : 'Mark as Solved' }}
              </button>
            </div>

            <!-- Related Lesson -->
            @if (relatedLesson(); as lesson) {
              <div class="card sidebar-card">
                <h4>Related Lesson</h4>
                <p class="sidebar-p">Study the core concepts behind this problem:</p>
                <a [routerLink]="['/learn', lesson.pathSlug, lesson.slug]" class="related-lesson-link">
                  <span class="material-symbols-outlined icon">menu_book</span>
                  <span>{{ lesson.title }}</span>
                </a>
              </div>
            }

            <!-- Ad Slot -->
            <app-ad-slot slotName="Exercise Detail Sidebar"></app-ad-slot>
          </aside>
        </div>
      </div>
    } @else {
      <div class="container not-found-box">
        <h2>Exercise Not Found</h2>
        <p>The exercise you requested could not be located.</p>
        <a routerLink="/exercises" class="btn btn-primary">Browse All Exercises</a>
      </div>
    }
  `,
  styles: [`
    .exercise-detail-page {
      padding: 2.5rem 1.25rem 4rem;
    }
    .exercise-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.5rem;

      .meta-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .topic-tag {
          font-size: 0.8rem;
          color: #94a3b8;
          font-family: var(--font-mono);
          font-weight: 600;
        }
      }

      .title-action-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 0.75rem;

        .page-title {
          font-size: 2.25rem;
          margin: 0;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
      }

      .lead-text {
        font-size: 1.1rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0;
      }
    }

    .exercise-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1fr 320px;
      }
    }

    .problem-col {
      display: flex;
      flex-direction: column;
      gap: 2rem;
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
      .statement-text {
        font-size: 1rem;
        line-height: 1.7;
        color: #e2e8f0;
        margin: 0 0 1.25rem;
      }
      .sub-text {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin: 0 0 1rem;
      }
    }

    .example-boxes {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
      }

      .example-box {
        background: #090d16;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.85rem 1rem;

        .example-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin-bottom: 0.35rem;
        }

        code {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: #38bdf8;
          background: transparent;
          padding: 0;

          &.output {
            color: #a7f3d0;
          }
        }
      }
    }

    .test-cases-table {
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      overflow: hidden;

      .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0.6rem 1rem;
        background: var(--bg-card-hover);
        border-bottom: 1px solid var(--border-color);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #94a3b8;
      }

      .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0.6rem 1rem;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.85rem;

        &:last-child {
          border-bottom: none;
        }

        code {
          background: transparent;
          padding: 0;
          font-family: var(--font-mono);
        }

        .test-input code {
          color: #cbd5e1;
        }
        .test-output code {
          color: #38bdf8;
        }
      }
    }

    .drafting-card {
      .draft-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;

        .safe-tag {
          font-size: 0.7rem;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
        }
      }

      .draft-editor {
        width: 100%;
        background: #090d16;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 1rem;
        color: #f8fafc;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        line-height: 1.5;
        resize: vertical;

        &:focus {
          outline: 2px solid var(--primary);
          border-color: transparent;
        }
      }
    }

    .hints-card {
      .hints-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .hints-list {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .hint-item {
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
      .solution-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      .solution-content {
        margin-top: 1.5rem;
        animation: fadeIn 0.3s ease-out;

        .explanation-box {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          margin-top: 1rem;

          h4 {
            font-size: 1rem;
            margin: 0 0 0.5rem;
            color: var(--text-main);
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

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .sidebar-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .status-box {
        padding: 1.25rem;

        h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 1rem;
        }

        .status-indicator-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;

          .status-icon {
            font-size: 1.5rem;
            color: #64748b;

            &.solved {
              color: #10b981;
            }
          }

          .status-note {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin: 0.25rem 0 0;
            line-height: 1.4;
          }
        }
      }

      .sidebar-card {
        padding: 1.25rem;

        h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 0 0 0.5rem;
        }

        .sidebar-p {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin: 0 0 0.75rem;
        }

        .related-lesson-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.75rem;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: var(--radius-sm);
          color: var(--primary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;

          &:hover {
            background: rgba(56, 189, 248, 0.15);
            text-decoration: underline;
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
export class ExerciseDetailComponent implements OnInit {
  slug = input<string>('');

  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  showHints = signal<boolean>(false);
  showSolution = signal<boolean>(false);
  draftCode = signal<string>('');

  exercise = () => this.contentService.getExerciseBySlug(this.slug());

  relatedLesson = () => {
    const ex = this.exercise();
    return ex?.relatedLessonSlug ? this.contentService.getLessonBySlug(ex.relatedLessonSlug) : undefined;
  };

  toggleHints(): void {
    this.showHints.update(v => !v);
  }

  toggleSolution(): void {
    this.showSolution.update(v => !v);
  }

  onDraftChange(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    this.draftCode.set(target.value);
  }

  toggleBookmark(ex: any): void {
    this.storage.toggleBookmark({
      id: ex.id,
      type: 'exercise',
      title: ex.title,
      category: ex.category,
      url: `/exercises/${ex.slug}`
    });
  }

  ngOnInit(): void {
    const ex = this.exercise();
    if (ex) {
      this.draftCode.set(ex.starterCode);
      this.seo.updateSeo({
        title: `${ex.title} - Coding Exercise`,
        description: ex.description,
        urlPath: `/exercises/${ex.slug}`,
        breadcrumbs: [
          { name: 'Exercises', item: '/exercises' },
          { name: ex.title, item: `/exercises/${ex.slug}` }
        ]
      });
    }
  }
}

