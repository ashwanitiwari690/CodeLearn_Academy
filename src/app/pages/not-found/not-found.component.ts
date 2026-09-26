import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container not-found-page">
      <div class="error-card card">
        <span class="status-code">404</span>
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-desc">
          We couldn't locate the resource you requested. It may have been moved, renamed, or temporarily relocated.
        </p>

        <div class="action-buttons">
          <a routerLink="/" class="btn btn-primary">
            <span class="material-symbols-outlined">home</span>
            Home
          </a>
          <a routerLink="/learn" class="btn btn-secondary">
            <span class="material-symbols-outlined">school</span>
            Learn Programming
          </a>
          <a routerLink="/search" class="btn btn-outline">
            <span class="material-symbols-outlined">search</span>
            Search Curriculum
          </a>
        </div>

        <div class="suggested-links">
          <h3>Popular Educational Paths:</h3>
          <div class="links-row">
            <a routerLink="/learn/angular">Angular Learning Path</a>
            <a routerLink="/learn/javascript">JavaScript Path</a>
            <a routerLink="/tutorials">Developer Tutorials</a>
            <a routerLink="/exercises">Coding Exercises</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      padding: 4rem 1.25rem 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .error-card {
      max-width: 680px;
      width: 100%;
      text-align: center;
      padding: 3.5rem 2rem;

      .status-code {
        display: block;
        font-size: clamp(4rem, 10vw, 6rem);
        font-weight: 900;
        font-family: var(--font-mono);
        color: #3b82f6;
        letter-spacing: -0.05em;
        line-height: 1;
        margin-bottom: 0.75rem;
      }

      .error-title {
        font-size: 2rem;
        margin-bottom: 0.75rem;
      }

      .error-desc {
        font-size: 1.05rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .action-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
        margin-bottom: 2.5rem;
      }

      .suggested-links {
        border-top: 1px solid var(--border-subtle);
        padding-top: 1.5rem;

        h3 {
          font-size: 0.95rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.85rem;
        }

        .links-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;

          a {
            font-size: 0.88rem;
            color: #60a5fa;

            &:hover { text-decoration: underline; }
          }
        }
      }
    }
  `]
})
export class NotFoundComponent implements OnInit {
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Page Not Found (404) - CodeLearn Academy',
      description: 'The requested page could not be located. Explore our programming paths, exercises, and tutorials.',
      urlPath: '/404'
    });
  }
}
