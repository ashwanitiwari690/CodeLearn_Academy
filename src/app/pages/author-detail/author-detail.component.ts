import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { Author, Lesson, Tutorial } from '../../models/content.models';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent],
  template: `
    @if (author) {
      <div class="container author-page">
        <app-breadcrumb [items]="[
          { label: 'Authors' },
          { label: author.name }
        ]"></app-breadcrumb>

        <!-- Author Profile Banner -->
        <header class="author-profile-card card">
          <span class="material-symbols-outlined profile-avatar">account_circle</span>
          <div class="profile-details">
            <h1 class="author-name">{{ author.name }}</h1>
            <p class="author-role">{{ author.role }}</p>
            <p class="author-bio">{{ author.bio }}</p>

            <div class="profile-links">
              @if (author.websiteUrl) {
                <a [href]="author.websiteUrl" target="_blank" rel="noopener noreferrer" class="link-chip">
                  <span class="material-symbols-outlined icon">language</span>
                  Website
                </a>
              }
              @if (author.githubUrl) {
                <a [href]="author.githubUrl" target="_blank" rel="noopener noreferrer" class="link-chip">
                  <span class="material-symbols-outlined icon">terminal</span>
                  GitHub
                </a>
              }
            </div>
          </div>
        </header>

        <!-- Published Articles by this Author -->
        <div class="contributions-section">
          <h2>Educational Content Authored by {{ author.name }}</h2>

          <!-- Lessons -->
          @if (authorLessons().length > 0) {
            <div class="content-group">
              <h3>Structured Curriculum Lessons ({{ authorLessons().length }})</h3>
              <div class="articles-grid">
                @for (l of authorLessons(); track l.id) {
                  <div class="article-card card">
                    <span class="badge badge-category">{{ l.category }}</span>
                    <h4><a [routerLink]="['/learn', l.pathSlug, l.slug]">{{ l.title }}</a></h4>
                    <p>{{ l.description }}</p>
                    <a [routerLink]="['/learn', l.pathSlug, l.slug]" class="read-link">Read Lesson &rarr;</a>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Tutorials -->
          @if (authorTutorials().length > 0) {
            <div class="content-group">
              <h3>In-Depth Tutorials ({{ authorTutorials().length }})</h3>
              <div class="articles-grid">
                @for (tut of authorTutorials(); track tut.id) {
                  <div class="article-card card">
                    <span class="badge badge-category">{{ tut.category }}</span>
                    <h4><a [routerLink]="['/tutorials', tut.slug]">{{ tut.title }}</a></h4>
                    <p>{{ tut.shortIntroduction }}</p>
                    <a [routerLink]="['/tutorials', tut.slug]" class="read-link">Read Tutorial &rarr;</a>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    } @else {
      <div class="container not-found-box">
        <h2>Author Profile Not Found</h2>
        <p>The requested author profile does not exist.</p>
        <a routerLink="/" class="btn btn-primary">Return Home</a>
      </div>
    }
  `,
  styles: [`
    .author-page {
      padding: 2.5rem 1.25rem 4rem;
      max-width: 900px;
    }

    .author-profile-card {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2.25rem;
      margin-bottom: 3rem;

      @media (min-width: 640px) {
        flex-direction: row;
        align-items: flex-start;
      }

      .profile-avatar {
        font-size: 72px;
        color: #38bdf8;
        flex-shrink: 0;
      }

      .profile-details {
        flex-grow: 1;

        .author-name {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }

        .author-role {
          font-size: 1rem;
          color: #60a5fa;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .author-bio {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .profile-links {
          display: flex;
          gap: 0.75rem;

          .link-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.35rem 0.75rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-sm);
            color: var(--text-muted);
            font-size: 0.85rem;
            text-decoration: none;

            &:hover {
              color: var(--text-main);
              border-color: var(--border-hover);
            }

            .icon { font-size: 16px; }
          }
        }
      }
    }

    .contributions-section {
      h2 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
      }

      .content-group {
        margin-bottom: 2.5rem;

        h3 {
          font-size: 1.15rem;
          color: #94a3b8;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.5rem;
        }
      }

      .articles-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;

        @media (min-width: 640px) {
          grid-template-columns: 1fr 1fr;
        }

        .article-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;

          h4 {
            font-size: 1.1rem;
            margin: 0.5rem 0;

            a {
              color: var(--text-main);
              &:hover { color: #60a5fa; }
            }
          }

          p {
            font-size: 0.85rem;
            color: var(--text-muted);
            line-height: 1.5;
            flex-grow: 1;
            margin-bottom: 1rem;
          }

          .read-link {
            font-size: 0.85rem;
            font-weight: 600;
            color: #60a5fa;
          }
        }
      }
    }

    .not-found-box {
      text-align: center;
      padding: 5rem 1rem;
    }
  `]
})
export class AuthorDetailComponent implements OnInit {
  slug = input<string>();

  content = inject(ContentService);
  seo = inject(SeoService);

  author: Author | undefined;

  authorLessons = () => {
    if (!this.author) return [];
    return this.content.getLessons().filter((l: Lesson) => l.authorId === this.author!.id);
  };

  authorTutorials = () => {
    if (!this.author) return [];
    return this.content.getTutorials().filter((t: Tutorial) => t.authorId === this.author!.id);
  };

  ngOnInit(): void {
    const s = this.slug();
    if (s) {
      this.author = this.content.getAuthorBySlug(s);
      if (this.author) {
        this.seo.updateSeo({
          title: `${this.author.name} - Author Profile`,
          description: this.author.bio,
          urlPath: `/authors/${this.author.slug}`,
          breadcrumbs: [
            { name: 'Authors', item: '/about' },
            { name: this.author.name, item: `/authors/${this.author.slug}` }
          ]
        });
      }
    }
  }
}
