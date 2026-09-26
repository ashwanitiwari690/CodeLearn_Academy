import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AdSlotComponent],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero-section" aria-labelledby="hero-heading">
        <div class="container hero-container">
          <div class="hero-badge">
            <span class="pulse-dot"></span>
            <span>Free, Open & Transparent Developer Education</span>
          </div>

          <h1 id="hero-heading" class="hero-headline">
            Learn Programming by <span class="gradient-text">Building Real Projects</span>
          </h1>

          <p class="hero-description">
            Practical programming lessons, exercises, projects, interview preparation, and troubleshooting guides for modern web development. Free from superficial tutorials, artificial paywalls, and outdated practices.
          </p>

          <div class="hero-actions">
            <a routerLink="/learn" class="btn btn-primary btn-lg">
              <span class="material-symbols-outlined icon">school</span>
              Start Learning
            </a>
            <a routerLink="/tutorials" class="btn btn-outline btn-lg">
              <span class="material-symbols-outlined icon">menu_book</span>
              Explore Tutorials
            </a>
          </div>

          <!-- Feature Metric Highlights (Fact-based, no fake numbers) -->
          <div class="philosophy-pills">
            <div class="pill-item">
              <span class="material-symbols-outlined pill-icon">code</span>
              <span>100% Original Code Examples</span>
            </div>
            <div class="pill-item">
              <span class="material-symbols-outlined pill-icon">devices</span>
              <span>Latest Angular & TypeScript Standards</span>
            </div>
            <div class="pill-item">
              <span class="material-symbols-outlined pill-icon">security</span>
              <span>Local Browser-Only Progress Tracking</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Paths Grid -->
      <section class="section paths-section" aria-labelledby="paths-heading">
        <div class="container">
          <div class="section-header">
            <div class="header-left">
              <span class="section-badge">Curriculum</span>
              <h2 id="paths-heading" class="section-title">Structured Learning Paths</h2>
              <p class="section-subtitle">Comprehensive paths guiding you from core fundamentals to production-ready engineering.</p>
            </div>
            <a routerLink="/learn" class="link-arrow">
              View All Paths
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (path of contentService.learningPaths(); track path.id) {
              <div class="card path-card">
                <div class="path-card-header">
                  <div class="path-icon-box">
                    <span class="material-symbols-outlined">{{ path.icon }}</span>
                  </div>
                  <span class="badge" [class.badge-beginner]="path.difficulty === 'Beginner'" [class.badge-intermediate]="path.difficulty === 'Intermediate'" [class.badge-advanced]="path.difficulty === 'Advanced'">
                    {{ path.difficulty }}
                  </span>
                </div>

                <h3 class="path-title">{{ path.title }}</h3>
                <p class="path-desc">{{ path.description }}</p>

                <div class="path-meta">
                  <span class="meta-item">
                    <span class="material-symbols-outlined icon">schedule</span>
                    ~{{ path.estimatedHours }} hrs
                  </span>
                  <span class="meta-item">
                    <span class="material-symbols-outlined icon">menu_book</span>
                    {{ path.beginnerLessonIds.length + path.intermediateLessonIds.length + path.advancedLessonIds.length }} Lessons
                  </span>
                </div>

                <a [routerLink]="['/learn', path.slug]" class="btn btn-outline btn-block mt-4">
                  Start Path
                  <span class="material-symbols-outlined icon-end">arrow_forward</span>
                </a>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Ethical Ad Slot -->
      <div class="container my-8">
        <app-ad-slot slotName="Homepage Middle Banner"></app-ad-slot>
      </div>

      <!-- Latest Tutorials -->
      <section class="section tutorials-section" aria-labelledby="tutorials-heading">
        <div class="container">
          <div class="section-header">
            <div class="header-left">
              <span class="section-badge">Tutorials & How-To Guides</span>
              <h2 id="tutorials-heading" class="section-title">In-Depth Technical Tutorials</h2>
              <p class="section-subtitle">Real-world problems solved with complete code, common pitfalls, and architectural insights.</p>
            </div>
            <a routerLink="/tutorials" class="link-arrow">
              Explore All Tutorials
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (tut of contentService.tutorials().slice(0, 4); track tut.id) {
              <article class="card tutorial-card">
                <div class="card-meta-row">
                  <span class="badge badge-category">{{ tut.category }}</span>
                  <span class="read-time">
                    <span class="material-symbols-outlined icon">schedule</span>
                    {{ tut.readingTimeMinutes }} min read
                  </span>
                </div>

                <h3 class="card-title">
                  <a [routerLink]="['/tutorials', tut.slug]">{{ tut.title }}</a>
                </h3>

                <p class="card-desc">{{ tut.shortIntroduction }}</p>

                <div class="card-footer">
                  <span class="date-text">Updated {{ tut.updatedDate }}</span>
                  <a [routerLink]="['/tutorials', tut.slug]" class="read-link">
                    Read Guide
                    <span class="material-symbols-outlined icon">arrow_forward</span>
                  </a>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Coding Exercises & Challenges Preview -->
      <section class="section exercises-section" aria-labelledby="practice-heading">
        <div class="container">
          <div class="section-header">
            <div class="header-left">
              <span class="section-badge">Hands-On Practice</span>
              <h2 id="practice-heading" class="section-title">Interactive Coding Exercises</h2>
              <p class="section-subtitle">Strengthen muscle memory with algorithmic questions, test cases, hints, and verified solutions.</p>
            </div>
            <a routerLink="/exercises" class="link-arrow">
              View All 30 Exercises
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (ex of contentService.exercises().slice(0, 6); track ex.id) {
              <div class="card exercise-card">
                <div class="card-meta-row">
                  <span class="topic-tag">{{ ex.topic }}</span>
                  <span class="badge" [class.badge-beginner]="ex.difficulty === 'Beginner'" [class.badge-intermediate]="ex.difficulty === 'Intermediate'">
                    {{ ex.difficulty }}
                  </span>
                </div>
                <h4 class="exercise-title">{{ ex.title }}</h4>
                <p class="exercise-desc">{{ ex.description }}</p>
                <a [routerLink]="['/exercises', ex.slug]" class="btn btn-outline btn-sm mt-3">
                  Solve Exercise
                </a>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Real-World Troubleshooting Hub Preview -->
      <section class="section troubleshooting-preview" aria-labelledby="tb-heading">
        <div class="container">
          <div class="section-header">
            <div class="header-left">
              <span class="section-badge">Debugging Hub</span>
              <h2 id="tb-heading" class="section-title">Troubleshoot Real Development Errors</h2>
              <p class="section-subtitle">Tired of incomprehensible compiler warnings and CORS blocks? Find step-by-step diagnostic solutions.</p>
            </div>
            <a routerLink="/troubleshooting" class="link-arrow">
              Troubleshooting Directory
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (tb of contentService.troubleshooting().slice(0, 4); track tb.id) {
              <div class="card tb-card">
                <div class="tb-category-tag">
                  <span class="material-symbols-outlined icon">bug_report</span>
                  {{ tb.category }}
                </div>
                <h3 class="tb-title">
                  <a [routerLink]="['/troubleshooting', tb.slug]">{{ tb.title }}</a>
                </h3>
                <div class="terminal-preview">
                  <code>{{ tb.errorSignature }}</code>
                </div>
                <p class="tb-desc">{{ tb.summary }}</p>
                <a [routerLink]="['/troubleshooting', tb.slug]" class="read-link mt-2">
                  View Root Cause & Fix
                  <span class="material-symbols-outlined icon">arrow_forward</span>
                </a>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Production Project Blueprints Showcase -->
      <section class="section projects-preview" aria-labelledby="proj-heading">
        <div class="container">
          <div class="section-header">
            <div class="header-left">
              <span class="section-badge">Portfolio Blueprints</span>
              <h2 id="proj-heading" class="section-title">Production-Grade Project Blueprints</h2>
              <p class="section-subtitle">Build comprehensive portfolio projects with structured folder architectures and step-by-step implementation plans.</p>
            </div>
            <a routerLink="/projects" class="link-arrow">
              View All Blueprints
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (proj of contentService.projects().slice(0, 3); track proj.id) {
              <div class="card project-card">
                <div class="card-meta-row">
                  <span class="badge" [class.badge-beginner]="proj.difficulty === 'Beginner'" [class.badge-intermediate]="proj.difficulty === 'Intermediate'" [class.badge-advanced]="proj.difficulty === 'Advanced'">
                    {{ proj.difficulty }}
                  </span>
                  <span class="time-est">~{{ proj.estimatedHours }}h build</span>
                </div>
                <h3 class="project-title">{{ proj.title }}</h3>
                <p class="project-desc">{{ proj.description }}</p>
                <div class="skills-chips">
                  @for (skill of proj.skillsRequired.slice(0, 3); track skill) {
                    <span class="chip">{{ skill }}</span>
                  }
                </div>
                <a [routerLink]="['/projects', proj.slug]" class="btn btn-primary btn-sm btn-block mt-4">
                  View Implementation Plan
                </a>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Why Learn Here (Educational Philosophy) -->
      <section class="section philosophy-section" aria-labelledby="phil-heading">
        <div class="container">
          <div class="card philosophy-card">
            <span class="section-badge">Our Educational Philosophy</span>
            <h2 id="phil-heading" class="philosophy-title">Why CodeLearn Academy Exists</h2>
            <div class="philosophy-grid">
              <div class="phil-item">
                <span class="material-symbols-outlined icon">verified</span>
                <h3>Original Human Content</h3>
                <p>We strictly reject scraped, rehashed, and automated content farms. Every tutorial and exercise is crafted by experienced developers for human engineers.</p>
              </div>
              <div class="phil-item">
                <span class="material-symbols-outlined icon">terminal</span>
                <h3>Production-Ready Standards</h3>
                <p>We teach modern standards: Angular standalone components, Signals, TypeScript strict mode, CSS Grid, and the HTML5 Living Standard.</p>
              </div>
              <div class="phil-item">
                <span class="material-symbols-outlined icon">privacy_tip</span>
                <h3>Privacy by Default</h3>
                <p>No paywalls, mandatory account creation, or tracking trackers. Your learning progress and saved bookmarks stay strictly inside your browser's local storage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      padding-bottom: 3rem;
    }

    /* Hero */
    .hero-section {
      padding: 3.5rem 0 2.5rem;
      text-align: center;
      background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(56, 189, 248, 0.18), transparent);
      border-bottom: 1px solid var(--border-color);
      position: relative;

      @media (min-width: 640px) {
        padding: 5.5rem 0 4.5rem;
      }
    }
    .hero-container {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.85rem;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 500;
      color: #cbd5e1;
      margin-bottom: 1.25rem;

      @media (min-width: 640px) {
        padding: 0.4rem 1rem;
        font-size: 0.825rem;
        margin-bottom: 1.75rem;
      }

      .pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #10b981;
        box-shadow: 0 0 10px #10b981;
      }
    }
    .hero-headline {
      font-size: clamp(1.85rem, 6.5vw, 3.75rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin: 0 0 1rem;
      word-break: break-word;

      @media (min-width: 640px) {
        margin-bottom: 1.25rem;
      }
    }
    .gradient-text {
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-description {
      font-size: clamp(0.95rem, 3vw, 1.15rem);
      line-height: 1.6;
      color: var(--text-muted);
      max-width: 720px;
      margin: 0 0 1.75rem;

      @media (min-width: 640px) {
        line-height: 1.65;
        margin-bottom: 2.25rem;
      }
    }
    .hero-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
      max-width: 380px;
      margin-bottom: 2rem;

      @media (min-width: 480px) {
        flex-direction: row;
        justify-content: center;
        max-width: none;
        width: auto;
        gap: 1rem;
        margin-bottom: 2.75rem;

        .btn {
          min-width: 170px;
        }
      }

      .btn {
        width: 100%;
        @media (min-width: 480px) {
          width: auto;
        }
      }
    }
    .philosophy-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;

      @media (min-width: 640px) {
        gap: 0.75rem;
      }

      .pill-item {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.75rem;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid var(--border-color);
        border-radius: 9999px;
        font-size: 0.775rem;
        color: #94a3b8;

        @media (min-width: 640px) {
          gap: 0.5rem;
          padding: 0.4rem 0.85rem;
          font-size: 0.825rem;
        }

        .pill-icon {
          font-size: 1rem;
          color: var(--primary);

          @media (min-width: 640px) {
            font-size: 1.1rem;
          }
        }
      }
    }

    /* Section Headers */
    .section {
      padding: 2.5rem 0;

      @media (min-width: 640px) {
        padding: 4rem 0;
      }
    }
    .section-header {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.75rem;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        gap: 1rem;
        margin-bottom: 2.5rem;
      }
    }
    .section-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--primary);
      margin-bottom: 0.35rem;
    }
    .section-title {
      font-size: clamp(1.4rem, 4.5vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0 0 0.5rem;
      word-break: break-word;
    }
    .section-subtitle {
      font-size: clamp(0.875rem, 2.5vw, 1rem);
      color: var(--text-muted);
      margin: 0;
      max-width: 620px;
      line-height: 1.55;
    }
    .link-arrow {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      flex-shrink: 0;

      &:hover {
        text-decoration: underline;
      }

      .material-symbols-outlined {
        font-size: 1.15rem;
      }
    }

    /* Path Cards */
    .path-card {
      display: flex;
      flex-direction: column;

      .path-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.25rem;
      }
      .path-icon-box {
        width: 2.75rem;
        height: 2.75rem;
        background: rgba(56, 189, 248, 0.1);
        border: 1px solid rgba(56, 189, 248, 0.2);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);

        .material-symbols-outlined {
          font-size: 1.5rem;
        }
      }
      .path-title {
        font-size: 1.25rem;
        margin: 0 0 0.5rem;
      }
      .path-desc {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.25rem;
        flex-grow: 1;
      }
      .path-meta {
        display: flex;
        gap: 1rem;
        border-top: 1px solid var(--border-color);
        padding-top: 0.85rem;
        font-size: 0.8rem;
        color: #94a3b8;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;

          .icon {
            font-size: 0.95rem;
          }
        }
      }
    }

    /* Tutorial Cards */
    .tutorial-card {
      display: flex;
      flex-direction: column;

      .card-meta-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
      }
      .read-time {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8rem;
        color: var(--text-muted);

        .icon {
          font-size: 0.95rem;
        }
      }
      .card-title {
        font-size: 1.15rem;
        margin: 0 0 0.5rem;

        a {
          color: var(--text-main);
          text-decoration: none;

          &:hover {
            color: var(--primary);
          }
        }
      }
      .card-desc {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0 0 1.25rem;
        flex-grow: 1;
      }
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--border-color);
        padding-top: 0.85rem;

        .date-text {
          font-size: 0.8rem;
          color: #64748b;
        }
        .read-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    /* Exercise Cards */
    .exercise-card {
      display: flex;
      flex-direction: column;

      .card-meta-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
      }
      .topic-tag {
        font-size: 0.75rem;
        font-weight: 600;
        color: #94a3b8;
        font-family: var(--font-mono);
      }
      .exercise-title {
        font-size: 1.05rem;
        margin: 0 0 0.5rem;
      }
      .exercise-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0 0 0.75rem;
        flex-grow: 1;
      }
    }

    /* Troubleshooting Cards */
    .tb-card {
      display: flex;
      flex-direction: column;

      .tb-category-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #f87171;
        margin-bottom: 0.5rem;

        .icon {
          font-size: 1rem;
        }
      }
      .tb-title {
        font-size: 1.1rem;
        margin: 0 0 0.75rem;

        a {
          color: var(--text-main);
          text-decoration: none;

          &:hover {
            color: var(--primary);
          }
        }
      }
      .terminal-preview {
        background: #090d16;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.75rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: #fca5a5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tb-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0 0 0.75rem;
        flex-grow: 1;
      }
      .read-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--primary);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    /* Project Cards */
    .project-card {
      display: flex;
      flex-direction: column;

      .card-meta-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
      }
      .time-est {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
      .project-title {
        font-size: 1.15rem;
        margin: 0 0 0.5rem;
      }
      .project-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0 0 1rem;
        flex-grow: 1;
      }
      .skills-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-bottom: 0.5rem;

        .chip {
          font-size: 0.7rem;
          padding: 0.15rem 0.45rem;
          background: var(--surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: #cbd5e1;
        }
      }
    }

    /* Philosophy Card */
    .philosophy-card {
      padding: 3rem 2rem;
      background: linear-gradient(180deg, #131d31, #0f172a);

      .philosophy-title {
        font-size: 1.85rem;
        font-weight: 700;
        margin: 0 0 2rem;
      }
      .philosophy-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;

        @media (min-width: 768px) {
          grid-template-columns: repeat(3, 1fr);
        }

        .phil-item {
          .icon {
            font-size: 2rem;
            color: var(--primary);
            margin-bottom: 0.75rem;
          }
          h3 {
            font-size: 1.15rem;
            margin: 0 0 0.5rem;
          }
          p {
            font-size: 0.9rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin: 0;
          }
        }
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  contentService = inject(ContentService);
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'CodeLearn Academy - Learn Programming by Building Real Projects',
      description: 'Practical programming lessons, exercises, projects, interview preparation, and troubleshooting guides for modern web development.',
      urlPath: '/',
      type: 'website'
    });
  }
}

