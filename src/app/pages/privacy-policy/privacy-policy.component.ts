import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent],
  template: `
    <div class="container legal-page">
      <app-breadcrumb [items]="[{ label: 'Privacy Policy' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Legal & Compliance</span>
        <h1 class="page-title">Privacy Policy</h1>
        <p class="last-updated">Last Updated: March 2026</p>
      </header>

      <div class="prose content-body">
        <section class="card section-card">
          <h2>1. Overview & Commitment to Transparency</h2>
          <p>
            CodeLearn Academy ("we", "us", or "our") operates an independent educational technology website located at <code>codelearn.academy</code>. This Privacy Policy informs visitors regarding our policies with the collection, use, and disclosure of personal data and browser storage when utilizing our educational service.
          </p>
          <p>
            Our core educational curriculum (tutorials, lessons, coding exercises, challenges, and troubleshooting guides) is provided freely without requiring mandatory user registration, logins, or paywalls.
          </p>
        </section>

        <section class="card section-card">
          <h2>2. Browser Local Storage (Client-Side Functional Data)</h2>
          <p>
            To provide interactive study functionality (such as recording completed lessons and saving bookmarks) without forcing users to create an account, we use the browser's native <code>localStorage</code> API.
          </p>
          <ul>
            <li><strong>codelearn_completed_items:</strong> Stores unique IDs of lessons, exercises, challenges, and projects you mark as completed on your device.</li>
            <li><strong>codelearn_bookmarks:</strong> Stores an array of resource titles, URLs, and timestamps you explicitly save.</li>
            <li><strong>codelearn_cookie_consent:</strong> Stores your boolean acknowledgment of this privacy and storage policy.</li>
          </ul>
          <p>
            <strong>Storage Location & Privacy:</strong> All local storage records reside exclusively within your client web browser on your personal computer or mobile device. This data is never harvested, transmitted, or stored on remote tracking databases. You may clear your stored progress at any time via the "Reset All Data" button on our <a routerLink="/progress">My Progress</a> page or by clearing your browser site cache.
          </p>
        </section>

        <section class="card section-card">
          <h2>3. Third-Party Vendors & Google AdSense Advertising Policy Disclosure</h2>
          <p>
            To support ongoing development and static hosting costs, CodeLearn Academy partners with third-party advertising services, including Google AdSense. In accordance with Google's Publisher Policies, we disclose the following:
          </p>
          <ul>
            <li>
              <strong>Use of Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites across the Internet.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to CodeLearn Academy and/or other sites on the Internet.
            </li>
            <li>
              <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting Google's official <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> page.
            </li>
            <li>
              <strong>Third-Party Opt-Out Resources:</strong> Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the Digital Advertising Alliance Consumer Choice page at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices/</a> or the Network Advertising Initiative at <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer">www.networkadvertising.org/choices/</a>.
            </li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>4. Web Analytics & Server Access Logs</h2>
          <p>
            Like most website operators, our static hosting providers (such as Vercel, Netlify, or standard web servers) automatically generate standard HTTP access logs containing non-identifying server telemetry. This includes request timestamps, browser user agent strings, HTTP status codes, and referring URLs. We use this information solely to maintain server uptime, mitigate denial-of-service attempts, and ensure network security.
          </p>
        </section>

        <section class="card section-card">
          <h2>5. General Data Protection Regulation (GDPR) Rights</h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you possess statutory data protection rights under the GDPR. Because CodeLearn Academy does not store personal profiles, email directories, or server-side account databases, we do not hold identifiable personal data. You retain the right to:
          </p>
          <ul>
            <li>Request confirmation regarding whether your personal data is processed.</li>
            <li>Erase all client-stored data at any time directly through your browser settings or our on-site progress reset control.</li>
            <li>Withdraw consent to optional non-essential advertising cookies via our cookie consent interface.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>6. California Consumer Privacy Act (CCPA / CPRA)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific privacy rights:
          </p>
          <ul>
            <li><strong>Right to Know & Delete:</strong> You have the right to request deletion of personal information.</li>
            <li><strong>No Sale of Personal Information:</strong> CodeLearn Academy does not sell, rent, or lease any personal information to third parties.</li>
            <li><strong>Non-Discrimination:</strong> We do not discriminate against users who exercise their statutory privacy rights.</li>
          </ul>
        </section>

        <section class="card section-card">
          <h2>7. Children's Online Privacy Protection (COPPA)</h2>
          <p>
            CodeLearn Academy does not knowingly solicit or collect personally identifiable information from children under the age of 13. Our educational programming tutorials and coding resources are designed for general audiences interested in computer science and web development. If a parent or guardian believes personal information has been provided to us, please contact us immediately so we can promptly remove it.
          </p>
        </section>

        <section class="card section-card">
          <h2>8. External Links & Third-Party References</h2>
          <p>
            Our educational curricula contain reference links to external documentation (such as MDN Web Docs, W3C specifications, and official Angular guides). We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </p>
        </section>

        <section class="card section-card">
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy periodically to reflect changes in our practices or regulatory requirements. Any updates will be posted on this page with a revised "Last Updated" date. Continued use of the platform after changes indicates acceptance of the updated policy.
          </p>
        </section>

        <section class="card section-card">
          <h2>10. Contacting Us Regarding Privacy</h2>
          <p>
            If you have questions, inquiries, or suggestions regarding this Privacy Policy or our data handling practices, please contact us:
          </p>
          <ul>
            <li><strong>Website:</strong> <a routerLink="/contact">Contact Page</a></li>
            <li><strong>Email:</strong> <code>privacy&#64;codelearn.academy</code></li>
            <li><strong>Response Window:</strong> We review all technical and privacy inquiries within 2 to 3 business days.</li>
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
        color: var(--text-muted);
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

        ul {
          margin-bottom: 1rem;
        }

        li {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #cbd5e1;
          margin-bottom: 0.5rem;
        }
      }
    }
  `]
})
export class PrivacyPolicyComponent implements OnInit {
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Privacy Policy - CodeLearn Academy',
      description: 'Privacy Policy for CodeLearn Academy detailing browser local storage, Google AdSense compliance, cookie policies, GDPR, and CCPA rights.',
      urlPath: '/privacy-policy',
      breadcrumbs: [{ name: 'Privacy Policy', item: '/privacy-policy' }]
    });
  }
}
