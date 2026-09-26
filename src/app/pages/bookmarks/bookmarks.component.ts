import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, SlicePipe],
  template: `
    <div class="container bookmarks-page">
      <app-breadcrumb [items]="[{ label: 'Saved Bookmarks' }]"></app-breadcrumb>

      <div class="page-header">
        <h1 class="page-title">Saved Educational Resources</h1>
        <p class="page-desc">
          Quickly access your bookmarked tutorials, curriculum lessons, and coding exercises. Bookmarks are saved directly on your device.
        </p>
      </div>

      <div class="bookmarks-content">
        @if (storage.bookmarks().length > 0) {
          <div class="bookmarks-list">
            @for (bm of storage.bookmarks(); track bm.id) {
              <div class="bookmark-item card">
                <div class="bm-main">
                  <div class="meta-row">
                    <span class="type-badge">{{ bm.type }}</span>
                    <span class="cat-badge">{{ bm.category }}</span>
                    <span class="date">Saved on {{ bm.savedAt | slice:0:10 }}</span>
                  </div>
                  <h2 class="title">
                    <a [routerLink]="bm.url">{{ bm.title }}</a>
                  </h2>
                </div>

                <div class="bm-actions">
                  <a [routerLink]="bm.url" class="btn btn-secondary btn-sm">
                    Open
                  </a>
                  <button 
                    type="button" 
                    class="btn btn-outline btn-sm btn-delete" 
                    (click)="remove(bm.id)"
                    title="Remove from bookmarks"
                    aria-label="Remove bookmark">
                    <span class="material-symbols-outlined">bookmark_remove</span>
                  </button>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="empty-state card">
            <span class="material-symbols-outlined empty-icon">bookmark_border</span>
            <h2>No saved bookmarks yet</h2>
            <p>While studying any tutorial or lesson, click the "Bookmark" button to save it for quick review.</p>
            <div class="browse-buttons">
              <a routerLink="/tutorials" class="btn btn-primary btn-sm">Browse Tutorials</a>
              <a routerLink="/learn" class="btn btn-secondary btn-sm">Explore Learning Paths</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .bookmarks-page {
      padding: 2.5rem 1.25rem 4rem;
      max-width: 860px;
    }

    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 0.75rem;
      }

      .page-desc {
        font-size: 1.05rem;
        color: var(--text-muted);
        line-height: 1.6;
      }
    }

    .bookmarks-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .bookmark-item {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem;

      @media (min-width: 640px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .meta-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.35rem;

        .type-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .cat-badge {
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .date {
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-left: auto;
        }
      }

      .title {
        font-size: 1.15rem;
        margin: 0;

        a {
          color: var(--text-main);
          &:hover { color: #60a5fa; }
        }
      }

      .bm-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;

        .btn-delete {
          padding: 0.4rem;
          color: var(--text-dim);

          &:hover {
            color: #f87171;
            border-color: rgba(248, 113, 113, 0.4);
          }
          .material-symbols-outlined { font-size: 18px; }
        }
      }
    }

    .empty-state {
      text-align: center;
      padding: 4.5rem 1.5rem;

      .empty-icon { font-size: 54px; color: var(--text-dim); margin-bottom: 1rem; }
      h2 { font-size: 1.4rem; margin-bottom: 0.5rem; }
      p { color: var(--text-muted); margin-bottom: 1.75rem; max-width: 500px; margin-inline: auto; }

      .browse-buttons {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
      }
    }
  `]
})
export class BookmarksComponent implements OnInit {
  storage = inject(StorageService);
  seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Saved Bookmarks - CodeLearn Academy',
      description: 'Your saved programming tutorials, lessons, and exercises stored locally in your browser.',
      urlPath: '/bookmarks',
      breadcrumbs: [{ name: 'Bookmarks', item: '/bookmarks' }]
    });
  }

  remove(id: string): void {
    this.storage.removeBookmark(id);
  }
}
