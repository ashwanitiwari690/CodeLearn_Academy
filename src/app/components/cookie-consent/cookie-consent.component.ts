import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (storage.cookieConsent() === null) {
      <aside class="cookie-banner" role="region" aria-label="Privacy and Cookie Preferences">
        <div class="container banner-inner">
          <div class="banner-text">
            <span class="material-symbols-outlined banner-icon" aria-hidden="true">cookie</span>
            <div>
              <p class="banner-title">Privacy & Local Storage Transparency</p>
              <p class="banner-desc">
                We use browser local storage exclusively to save your learning progress, completed exercises, and bookmarks on your device. We do not sell personal data. Read our 
                <a routerLink="/privacy-policy" class="banner-link">Privacy Policy</a> and 
                <a routerLink="/cookie-policy" class="banner-link">Cookie Policy</a> to learn more.
              </p>
            </div>
          </div>
          <div class="banner-actions">
            <button type="button" class="btn btn-outline btn-sm" (click)="decline()">Essential Only</button>
            <button type="button" class="btn btn-primary btn-sm" (click)="accept()">Accept All</button>
          </div>
        </div>
      </aside>
    }
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(12px);
      border-top: 1px solid var(--border-color);
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
      padding: 1.25rem 0;
      animation: slideUp 0.3s ease-out;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .banner-inner {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .banner-text {
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      .banner-icon {
        font-size: 1.75rem;
        color: var(--primary);
        margin-top: 0.15rem;
        flex-shrink: 0;
      }
    }
    .banner-title {
      font-size: 0.95rem;
      font-weight: 600;
      margin: 0 0 0.25rem;
      color: var(--text-main);
    }
    .banner-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.5;
    }
    .banner-link {
      color: var(--primary);
      text-decoration: underline;

      &:hover {
        color: #7dd3fc;
      }
    }
    .banner-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }
  `]
})
export class CookieConsentComponent {
  storage = inject(StorageService);

  accept(): void {
    this.storage.setConsent(true);
  }

  decline(): void {
    this.storage.setConsent(false);
  }
}

