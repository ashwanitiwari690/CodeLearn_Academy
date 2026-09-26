import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-editorial-guidelines',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent],
  template: `
    <div class="container guidelines-page">
      <app-breadcrumb [items]="[{ label: 'Editorial Guidelines' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Quality Standards</span>
        <h1 class="page-title">Editorial Guidelines & Integrity Standards</h1>
        <p class="lead-text">
          Our standards for technical research, code verification, error correction, and ongoing maintenance across CodeLearn Academy.
        </p>
      </header>

      <div class="prose content-body">
        <section class="card section-card">
          <h2>1. Technical Research & Source Verification</h2>
          <p>
            All educational materials published on CodeLearn Academy originate from primary technical specifications and official documentation:
          </p>
          <ul>
            <li><strong>W3C & WHATWG Standards:</strong> For HTML5 living specifications and DOM API behavior.</li>
            <li><strong>ECMA International (ECMA-262):</strong> For official ECMAScript language semantics.</li>
            <li><strong>Official Angular Documentation (angular.dev):</strong> For standalone architecture, signals, router, and forms.</li>
            <li><strong>TypeScript Official Handbook:</strong> For static type theory, inference, and compiler flags.</li>
            <li><strong>RFC Specifications (IETF):</strong> For HTTP protocols, status codes, and security headers.</li>
          </ul>
          <p>We do not aggregate or scrape third-party blog posts or reword unverified tutorials.</p>
        </section>

        <section class="card section-card">
          <h2>2. How Code Examples Are Tested</h2>
          <p>
            A code snippet with a subtle syntax error or broken import is worse than no code snippet at all. Before any tutorial or exercise is approved for publication:
          </p>
          <ul>
            <li>Every Angular snippet is compiled under strict mode (<code>strict: true</code> and <code>strictTemplates: true</code>).</li>
            <li>Browser code is verified across modern evergreen engines: Chromium, Gecko (Firefox), and WebKit (Safari).</li>
            <li>Expected outputs and error signatures are documented truthfully from real compiler output.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>3. Error Correction Policy</h2>
          <p>
            When technical inaccuracies or typographical errors are identified:
          </p>
          <ul>
            <li><strong>Rapid Triage:</strong> Reported issues are verified within 48 to 72 hours.</li>
            <li><strong>Transparent Update History:</strong> Major technical corrections update the "Last Updated" timestamp on the affected article.</li>
            <li><strong>No Obfuscation:</strong> If a past architectural recommendation is superseded by modern best practices (such as migrating from NgModules to Standalone Components), we explicitly document the rationale for the shift.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>4. Updating Outdated Tutorials</h2>
          <p>
            Frontend engineering moves quickly. We continuously audit our curriculum against new major versions of Angular, TypeScript, and Node.js. Deprecated patterns are promptly flagged and updated to reflect current standards.
          </p>
        </section>

        <section class="card section-card">
          <h2>5. How Readers Can Request Corrections</h2>
          <p>
            Community feedback is essential to maintaining high curriculum quality. Readers who spot an inaccuracy, broken code sample, or accessibility issue are encouraged to:
          </p>
          <ol>
            <li>Submit a direct report via our <a routerLink="/contact">Contact Form</a> selecting "Typo / Code Correction Request".</li>
            <li>Include the specific article URL and code line number.</li>
            <li>Provide the observed compiler or runtime behavior.</li>
          </ol>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .guidelines-page {
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
export class EditorialGuidelinesComponent implements OnInit {
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Editorial Guidelines & Technical Integrity - CodeLearn Academy',
      description: 'Transparent editorial guidelines: how CodeLearn Academy researches technical content, verifies code examples, and processes corrections.',
      urlPath: '/editorial-guidelines',
      breadcrumbs: [{ name: 'Editorial Guidelines', item: '/editorial-guidelines' }]
    });
  }
}
