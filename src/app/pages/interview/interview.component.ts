import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';
import { InterviewQuestion } from '../../models/content.models';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [BreadcrumbComponent, CodeBlockComponent],
  template: `
    <div class="container page-container">
      <app-breadcrumb [items]="[{ label: 'Interview Preparation' }]"></app-breadcrumb>

      <div class="page-header">
        <span class="badge badge-category">Technical Interview Prep</span>
        <h1 class="page-title">Senior Developer Interview Questions</h1>
        <p class="page-desc">
          Rigorous, in-depth technical questions with concise executive summaries, deep architectural explanations, and practical code examples.
        </p>

        <!-- Category Filter Chips -->
        <div class="category-filters">
          <button 
            type="button" 
            class="chip"
            [class.active]="selectedCategory() === 'all'"
            (click)="selectedCategory.set('all')">
            All Categories
          </button>
          @for (cat of ['Angular', 'JavaScript', 'TypeScript', 'CSS', 'Git']; track cat) {
            <button 
              type="button" 
              class="chip"
              [class.active]="selectedCategory() === cat"
              (click)="selectedCategory.set(cat)">
              {{ cat }}
            </button>
          }
        </div>
      </div>

      <!-- Questions List -->
      <div class="questions-list">
        @for (iq of filteredQuestions(); track iq.id) {
          <article class="question-card card" [id]="iq.id">
            <div class="q-header" (click)="toggleExpand(iq.id)">
              <div class="q-title-box">
                <div class="q-badges">
                  <span class="badge badge-category">{{ iq.category }}</span>
                  <span class="badge" [class]="'badge-' + iq.difficulty.toLowerCase()">{{ iq.difficulty }}</span>
                </div>
                <h2 class="q-title">{{ iq.question }}</h2>
              </div>
              <button 
                type="button" 
                class="btn-toggle" 
                [attr.aria-expanded]="isExpanded(iq.id)"
                aria-label="Toggle detailed answer">
                <span class="material-symbols-outlined">
                  {{ isExpanded(iq.id) ? 'expand_less' : 'expand_more' }}
                </span>
              </button>
            </div>

            <!-- Short Answer (Always Visible for Quick Review) -->
            <div class="short-answer-box">
              <span class="answer-badge">Executive Summary</span>
              <p class="short-answer">{{ iq.shortAnswer }}</p>
            </div>

            <!-- Expanded Deep Dive -->
            @if (isExpanded(iq.id)) {
              <div class="expanded-answer">
                <div class="explanation-flow">
                  <h3>Comprehensive Architectural Explanation</h3>
                  @for (para of iq.detailedExplanation; track para) {
                    <p>{{ para }}</p>
                  }
                </div>

                @if (iq.codeExample) {
                  <div class="code-example-wrap">
                    <h3>Code Example & Demonstration</h3>
                    <app-code-block
                      [language]="iq.codeExample.language"
                      [code]="iq.codeExample.code"
                      [explanation]="iq.codeExample.explanation">
                    </app-code-block>
                  </div>
                }

                <div class="key-takeaway-box">
                  <span class="material-symbols-outlined icon">key</span>
                  <p><strong>Candidate Takeaway:</strong> {{ iq.keyTakeaway }}</p>
                </div>
              </div>
            }
          </article>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2.5rem 1.25rem 4rem;
      max-width: 960px;
    }

    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 0.75rem;
      }

      .page-desc {
        font-size: 1.05rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .category-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        .chip {
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.15s ease;

          &:hover {
            border-color: var(--border-hover);
            color: var(--text-main);
          }

          &.active {
            background: var(--primary);
            color: #ffffff;
            border-color: var(--primary);
          }
        }
      }
    }

    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .question-card {
      padding: 1.75rem;

      .q-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        cursor: pointer;

        .q-title-box {
          .q-badges {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .q-title {
            font-size: 1.25rem;
            line-height: 1.4;
            margin: 0;
            color: var(--text-main);
          }
        }

        .btn-toggle {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          flex-shrink: 0;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-main);
          }
        }
      }

      .short-answer-box {
        margin-top: 1.25rem;
        padding: 1rem 1.25rem;
        background: rgba(0, 0, 0, 0.25);
        border-radius: var(--radius-sm);
        border-left: 3px solid #38bdf8;

        .answer-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #38bdf8;
          display: block;
          margin-bottom: 0.35rem;
        }

        .short-answer {
          font-size: 0.92rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0;
        }
      }

      .expanded-answer {
        margin-top: 1.75rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-subtle);

        h3 {
          font-size: 1.05rem;
          margin-bottom: 0.75rem;
          color: #f1f5f9;
        }

        .explanation-flow {
          margin-bottom: 1.5rem;

          p {
            font-size: 0.92rem;
            color: #cbd5e1;
            line-height: 1.7;
            margin-bottom: 1rem;
          }
        }

        .code-example-wrap {
          margin-bottom: 1.5rem;
        }

        .key-takeaway-box {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          padding: 0.85rem 1.25rem;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-sm);

          .icon { font-size: 22px; color: #34d399; flex-shrink: 0; }

          p {
            font-size: 0.88rem;
            color: #e2e8f0;
            margin: 0;
          }
        }
      }
    }
  `]
})
export class InterviewComponent implements OnInit {
  content = inject(ContentService);
  seo = inject(SeoService);

  selectedCategory = signal('all');
  expandedIds = signal<Set<string>>(new Set(['iq-angular-signals-vs-rxjs']));

  allQuestions = () => this.content.getInterviewQuestions();

  filteredQuestions = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.allQuestions();
    return this.allQuestions().filter(q => q.category === cat);
  });

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  toggleExpand(id: string): void {
    const current = new Set(this.expandedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.expandedIds.set(current);
  }

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Technical Interview Questions & Answers - Full-Stack & Frontend',
      description: 'Prepare for technical interviews in Angular, JavaScript, TypeScript, CSS, and Git with detailed architectural explanations and code snippets.',
      urlPath: '/interview',
      breadcrumbs: [{ name: 'Interview Questions', item: '/interview' }]
    });
  }
}
