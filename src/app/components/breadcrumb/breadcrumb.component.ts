import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbCrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="breadcrumb-nav" aria-label="Breadcrumbs">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <a routerLink="/" class="breadcrumb-link">Home</a>
          <span class="separator" aria-hidden="true">/</span>
        </li>
        @for (item of items(); track item.label; let last = $last) {
          <li class="breadcrumb-item" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
            @if (!last && item.url) {
              <a [routerLink]="item.url" class="breadcrumb-link">{{ item.label }}</a>
              <span class="separator" aria-hidden="true">/</span>
            } @else {
              <span class="current-label">{{ item.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
    }
    .breadcrumb-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
      gap: 0.4rem;
    }
    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      color: var(--text-muted);

      &.active {
        color: var(--text-main);
        font-weight: 500;
      }
    }
    .breadcrumb-link {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s ease;

      &:hover {
        color: var(--primary);
        text-decoration: underline;
      }
    }
    .separator {
      margin-left: 0.4rem;
      color: var(--border-color);
      user-select: none;
    }
    .current-label {
      color: var(--text-main);
      max-width: 320px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `]
})
export class BreadcrumbComponent {
  items = input<{ label: string; url?: string }[]>([]);
}

