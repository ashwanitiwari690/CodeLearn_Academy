import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `
    <div class="container legal-page">
      <app-breadcrumb [items]="[{ label: 'Terms of Use' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Legal & Compliance</span>
        <h1 class="page-title">Terms of Use</h1>
        <p class="last-updated">Last Updated: March 2026</p>
      </header>

      <div class="prose content-body">
        <section class="card section-card">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using CodeLearn Academy (the "Site"), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use the platform.
          </p>
        </section>

        <section class="card section-card">
          <h2>2. Educational Use of Content & Code</h2>
          <p>
            The educational articles, tutorials, diagrams, and written curriculum on this site are protected by copyright law. However, all source code samples provided within tutorials and exercises are licensed under the MIT License and may be freely copied, modified, and used in your personal, educational, or commercial software projects.
          </p>
        </section>

        <section class="card section-card">
          <h2>3. User Responsibilities & Conduct</h2>
          <p>
            Users agree not to:
          </p>
          <ul>
            <li>Engage in automated scraping, denial of service attacks, or activities that impair site availability.</li>
            <li>Submit malicious, abusive, or unlawful content through our contact forms.</li>
            <li>Misrepresent affiliation with CodeLearn Academy.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>4. External Links</h2>
          <p>
            The site contains links to third-party websites (such as official language documentation, MDN, and GitHub). We do not control or endorse the content or privacy policies of third-party platforms.
          </p>
        </section>

        <section class="card section-card">
          <h2>5. Changes to Terms</h2>
          <p>
            We may update these terms periodically to reflect new features or regulatory requirements. Continued use of the website following published updates constitutes acceptance of the modified terms.
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
export class TermsComponent implements OnInit {
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Terms of Use - CodeLearn Academy',
      description: 'Terms of Use governing educational resource access, open-source code usage, and platform responsibilities.',
      urlPath: '/terms',
      breadcrumbs: [{ name: 'Terms of Use', item: '/terms' }]
    });
  }
}
