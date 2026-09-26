import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <div class="container legal-page">
      <app-breadcrumb [items]="[{ label: 'Disclaimer' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Legal & Compliance</span>
        <h1 class="page-title">Educational & Technical Disclaimer</h1>
        <p class="last-updated">Last Updated: March 2026</p>
      </header>

      <div class="prose content-body">
        <section class="card section-card">
          <h2>1. Educational Purpose Only</h2>
          <p>
            The content, tutorials, exercises, solutions, architecture blueprints, and code examples provided on CodeLearn Academy are created exclusively for <strong>educational and informational purposes</strong>.
          </p>
          <p>
            While our engineering team verifies and tests every code snippet prior to publication, programming patterns, runtime security constraints, and library dependencies vary significantly across enterprise production environments.
          </p>
        </section>

        <section class="card section-card">
          <h2>2. Production Testing Responsibility</h2>
          <p>
            You are solely responsible for testing, validating, benchmarking, and auditing any code, configuration, or architectural pattern before deploying it to production infrastructure. CodeLearn Academy cannot be held liable for:
          </p>
          <ul>
            <li>Production downtime or operational disruptions resulting from modified code.</li>
            <li>Security vulnerabilities arising from unpatched third-party npm packages.</li>
            <li>Data loss or configuration bugs in developer environments.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>3. Advertising, Monetization & Sponsorships</h2>
          <p>
            To keep all educational materials 100% free and accessible to students worldwide, CodeLearn Academy may display contextual advertisements through third-party ad networks such as Google AdSense.
          </p>
          <p>
            Our editorial integrity is strictly separated from advertising:
          </p>
          <ul>
            <li>Advertisers do not influence curriculum selection, exercise solutions, or technical recommendations.</li>
            <li>Ad units are always clearly delineated and labeled as "Advertisement" in compliance with Google publisher guidelines.</li>
            <li>We do not accept paid reviews or sponsored ranking placements.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>4. No Guarantee of Third-Party Approval</h2>
          <p>
            Any discussion of third-party standards (such as Google AdSense, WCAG accessibility compliance, or app store guidelines) is provided as educational analysis of publicly documented specifications. Third-party approval or certification is determined solely by the respective third-party provider and cannot be guaranteed by CodeLearn Academy.
          </p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .legal-page {
      padding: 2.5rem 1.25rem 4rem;
      max-width: 860px;
    }

    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 0.5rem;
      }

      .last-updated {
        font-size: 0.85rem;
        color: var(--text-dim);
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
export class DisclaimerComponent implements OnInit {
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Educational Disclaimer - CodeLearn Academy',
      description: 'Educational disclaimer regarding code testing, production readiness, and third-party policies on CodeLearn Academy.',
      urlPath: '/disclaimer',
      breadcrumbs: [{ name: 'Disclaimer', item: '/disclaimer' }]
    });
  }
}
