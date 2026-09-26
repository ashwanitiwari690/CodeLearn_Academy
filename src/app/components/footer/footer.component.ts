import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-content">
        <!-- Brand & Description -->
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <span class="brand-text">CodeLearn <strong>Academy</strong></span>
          </div>
          <p class="brand-desc">
            A comprehensive, independent educational technology platform dedicated to practical web development, original coding tutorials, architectural patterns, and real developer problem solving.
          </p>
          <p class="hosting-note">
            Built with Angular standalone components, Signals, and modern web standards. Free from artificial paywalls and scraped content.
          </p>
        </div>

        <!-- Curricula Links -->
        <div class="footer-col">
          <h3 class="col-title">Learning Paths</h3>
          <ul class="footer-links">
            <li><a routerLink="/learn/javascript">JavaScript Fundamentals & Deep Dive</a></li>
            <li><a routerLink="/learn/angular">Angular Architecture & Signals</a></li>
            <li><a routerLink="/learn/typescript">TypeScript Types & Generics</a></li>
            <li><a routerLink="/learn/html">HTML5 & Semantic Standards</a></li>
            <li><a routerLink="/learn/css">CSS Grid, Flexbox & Responsive</a></li>
            <li><a routerLink="/learn/git">Git & Team Collaboration</a></li>
          </ul>
        </div>

        <!-- Resources & Practice -->
        <div class="footer-col">
          <h3 class="col-title">Practice & Tools</h3>
          <ul class="footer-links">
            <li><a routerLink="/tutorials">Step-by-Step Tutorials</a></li>
            <li><a routerLink="/exercises">Coding Exercises</a></li>
            <li><a routerLink="/challenges">Algorithmic Challenges</a></li>
            <li><a routerLink="/projects">Production Project Blueprints</a></li>
            <li><a routerLink="/troubleshooting">Error Troubleshooting Hub</a></li>
            <li><a routerLink="/interview">Technical Interview Questions</a></li>
            <li><a routerLink="/progress">My Learning Dashboard</a></li>
          </ul>
        </div>

        <!-- Trust & Policies -->
        <div class="footer-col">
          <h3 class="col-title">Trust & Policies</h3>
          <ul class="footer-links">
            <li><a routerLink="/about">About CodeLearn</a></li>
            <li><a routerLink="/editorial-guidelines">Editorial & Quality Guidelines</a></li>
            <li><a routerLink="/privacy-policy">Privacy Policy</a></li>
            <li><a routerLink="/terms">Terms of Use</a></li>
            <li><a routerLink="/disclaimer">Educational Disclaimer</a></li>
            <li><a routerLink="/cookie-policy">Cookie Policy</a></li>
            <li><a routerLink="/contact">Contact & Feedback</a></li>
            <li><a href="/sitemap.xml" target="_blank" rel="noopener">XML Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container bottom-inner">
          <p class="copyright">
            &copy; {{ currentYear }} CodeLearn Academy. All rights reserved. Educational content is provided under standard educational fair use.
          </p>
          <p class="legal-disclaimer">
            All code snippets, architectural guides, and error resolutions are authored originally for human instruction and verified against modern browser standards.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: #090d16;
      border-top: 1px solid var(--border-color);
      padding: 4rem 0 2rem;
      margin-top: 5rem;
    }
    .footer-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: 1.8fr 1.2fr 1.2fr 1.2fr;
        gap: 3rem;
      }
    }
    .brand-col {
      .footer-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .logo-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--primary);
        }
        .brand-text {
          font-size: 1.25rem;
          color: var(--text-main);
          font-weight: 500;

          strong {
            color: var(--primary);
          }
        }
      }

      .brand-desc {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--text-muted);
        margin: 0 0 1rem;
      }

      .hosting-note {
        font-size: 0.8rem;
        color: #64748b;
        line-height: 1.5;
        margin: 0;
      }
    }

    .col-title {
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-main);
      margin: 0 0 1.25rem;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;

      a {
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.15s ease;

        &:hover {
          color: var(--primary);
          text-decoration: underline;
        }
      }
    }

    .footer-bottom {
      border-top: 1px solid rgba(51, 65, 85, 0.4);
      margin-top: 3.5rem;
      padding-top: 2rem;

      .bottom-inner {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        @media (min-width: 768px) {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }

      .copyright {
        margin: 0;
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      .legal-disclaimer {
        margin: 0;
        font-size: 0.8rem;
        color: #64748b;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}

