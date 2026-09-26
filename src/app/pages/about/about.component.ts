import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent],
  template: `
    <div class="container about-page">
      <app-breadcrumb [items]="[{ label: 'About Us' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">About CodeLearn Academy</span>
        <h1 class="page-title">Practical Developer Education Without Pretense</h1>
        <p class="lead-text">
          CodeLearn Academy is an independent educational technology platform dedicated to teaching practical web development through real project architectures, thorough code reviews, and transparent documentation.
        </p>
      </header>

      <div class="prose content-body">
        <section class="card section-card">
          <h2>Our Educational Mission</h2>
          <p>
            The software industry is filled with superficial "Hello World" tutorials that leave learners stranded the moment they encounter a real-world compiler error, a CORS policy block, or an intricate state management requirement.
          </p>
          <p>
            CodeLearn Academy was created to bridge the gap between basic syntax and genuine production-grade engineering. We teach learners how web standards actually work under the hood, how browsers parse HTML and render CSS, and how modern frameworks like Angular structure scalable client applications.
          </p>
        </section>

        <section class="card section-card">
          <h2>Curriculum Topics Covered</h2>
          <p>Our educational resources focus on core web technologies and modern best practices:</p>
          <ul>
            <li><strong>HTML5 & Semantic Markup:</strong> Accessible landmarks, form validation, and screen reader compatibility.</li>
            <li><strong>Modern CSS:</strong> CSS Grid, Flexbox, responsive fluid typography, and CSS custom properties.</li>
            <li><strong>JavaScript (ES6+):</strong> Scopes, closures, the Event Loop, Promises, and async/await architecture.</li>
            <li><strong>TypeScript:</strong> Type annotations, interfaces, generics, discriminated unions, and compiler safety.</li>
            <li><strong>Angular:</strong> Standalone components, Signals, reactive forms, client routing, and HttpClient.</li>
            <li><strong>Git & GitHub:</strong> Version control, branch management, pull requests, and merge conflict resolution.</li>
            <li><strong>Debugging & Diagnostics:</strong> Systematic error troubleshooting across browser DevTools and Node.js.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>Our Content Methodology</h2>
          <p>
            Every tutorial, lesson, and exercise on CodeLearn Academy is drafted, verified, and tested against current stable compiler and browser releases before publication.
          </p>
          <ul>
            <li><strong>No Plagiarism or Content Scraping:</strong> All content is written originally by human engineers and educators.</li>
            <li><strong>Runnable Code Examples:</strong> Every code block contains verifiable syntax and anticipated output descriptions.</li>
            <li><strong>Comprehensive Error Diagnosis:</strong> We treat errors not as footnotes, but as essential learning milestones.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>Who Creates the Content?</h2>
          <p>
            Content is authored and maintained by experienced frontend and full-stack software engineers who have built enterprise client applications. You can review individual author biographies, credentials, and published guides on our dedicated <a routerLink="/authors/alex-morgan">Author Profiles</a>.
          </p>
        </section>

        <section class="card section-card">
          <h2>How Corrections & Updates Work</h2>
          <p>
            Software development moves fast. When a browser API evolves or Angular releases a new pattern, our curriculum is updated. If you notice a typo, an outdated dependency, or an unclear explanation, please reach out via our <a routerLink="/contact">Contact Page</a>. We review all submissions thoroughly. Read our full <a routerLink="/editorial-guidelines">Editorial Guidelines</a> for more information.
          </p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2.5rem 1.25rem 4rem;
      max-width: 860px;
    }

    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 1rem;
      }

      .lead-text {
        font-size: 1.15rem;
        color: var(--text-muted);
        line-height: 1.6;
      }
    }

    .content-body {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .section-card {
        padding: 2rem;

        h2 {
          font-size: 1.35rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--text-main);
          border-bottom: none;
        }

        p {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #cbd5e1;
        }
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'About Us - CodeLearn Academy Educational Mission',
      description: 'Learn about CodeLearn Academy, our educational philosophy, content methodology, and commitment to free programming resources.',
      urlPath: '/about',
      breadcrumbs: [{ name: 'About', item: '/about' }]
    });
  }
}
