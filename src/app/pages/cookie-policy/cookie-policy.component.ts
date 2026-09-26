import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent],
  template: `
    <div class="container legal-page">
      <app-breadcrumb [items]="[{ label: 'Cookie & Storage Policy' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Legal & Compliance</span>
        <h1 class="page-title">Cookie & Local Storage Policy</h1>
        <p class="last-updated">Last Updated: March 2026</p>
      </header>

      <div class="prose content-body">
        <section class="card section-card">
          <h2>1. What Are Cookies & Web Storage?</h2>
          <p>
            Cookies are small text files placed on your device by websites to remember login states or track visits. Modern HTML5 also provides <strong>Web Storage (localStorage and sessionStorage)</strong>, which allows websites to store structured key-value data directly inside the browser sandbox without sending that data in every HTTP header.
          </p>
        </section>

        <section class="card section-card">
          <h2>2. How CodeLearn Academy Uses Local Storage</h2>
          <p>
            CodeLearn Academy does not use session cookies for user tracking. Instead, we use browser <code>localStorage</code> strictly for functional client features:
          </p>
          <ul>
            <li><strong>codelearn_completed_lessons:</strong> Holds an array of lesson identifiers you completed.</li>
            <li><strong>codelearn_completed_exercises:</strong> Stores exercise IDs you have marked solved.</li>
            <li><strong>codelearn_bookmarks:</strong> Stores your saved article titles and paths for quick access.</li>
            <li><strong>codelearn_cookie_consent:</strong> Stores your acknowledgment of our storage notice.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>3. Advertising Cookies & Third Parties (Google AdSense Compliance)</h2>
          <p>
            When advertising integrations such as <strong>Google AdSense</strong> are enabled on CodeLearn Academy:
          </p>
          <ul>
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the internet.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve personalized and non-personalized advertisements to users based on their navigation history across CodeLearn Academy and other websites.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
            <li>Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting the Network Advertising Initiative opt-out page at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info/choices</a>.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>4. Managing and Clearing Stored Data</h2>
          <p>
            You can delete CodeLearn Academy's stored data at any time:
          </p>
          <ul>
            <li>Within the website: Click "Clear Browser Progress" on the <a routerLink="/progress">My Progress</a> page.</li>
            <li>Within your browser settings: Open Browser DevTools (F12) -> Application / Storage -> Local Storage -> Clear All, or clear browser site data.</li>
          </ul>
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
export class CookiePolicyComponent implements OnInit {
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Cookie & Storage Policy - CodeLearn Academy',
      description: 'Understand how CodeLearn Academy uses browser local storage for bookmarks and progress, and how to manage your client data.',
      urlPath: '/cookie-policy',
      breadcrumbs: [{ name: 'Cookie Policy', item: '/cookie-policy' }]
    });
  }
}
