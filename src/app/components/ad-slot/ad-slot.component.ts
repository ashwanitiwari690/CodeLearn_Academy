import { Component, input, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

@Component({
  selector: 'app-ad-slot',
  standalone: true,
  template: `
    @if (adsEnabled) {
      <div 
        class="ad-container" 
        [class]="'ad-slot-' + slotPosition()" 
        role="complementary" 
        aria-label="Advertisement">
        <span class="ad-label">Advertisement</span>
        <div class="ad-content-box">
          <!-- Genuine Google AdSense Unit (Only activated when publisher credentials configured) -->
          <ins class="adsbygoogle"
               style="display:block"
               [attr.data-ad-client]="publisherId"
               [attr.data-ad-slot]="adSlotId()"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    } @else {
      <!-- Pre-Approval / Development Mode: Clean educational sponsor notice (prevents blank/broken ad flags during review) -->
      <div class="ad-container ad-dev-placeholder" [class]="'ad-slot-' + slotPosition()">
        <span class="ad-label">Sponsor / Resources</span>
        <div class="ad-dev-box">
          <p class="ad-dev-title">Enjoying CodeLearn Academy?</p>
          <p class="ad-dev-text">All curriculum is 100% free and open-source. Explore our practical project blueprints to build your portfolio.</p>
        </div>
      </div>
    }
  `,
  styles: [`
    .ad-container {
      margin: 2rem 0;
      padding: 0.75rem;
      border: 1px dashed var(--border-subtle);
      border-radius: var(--radius-md);
      background: rgba(15, 23, 42, 0.4);
      text-align: center;
    }

    .ad-label {
      display: block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-dim);
      margin-bottom: 0.5rem;
    }

    .ad-dev-box {
      padding: 1rem;
      background: rgba(30, 41, 59, 0.4);
      border-radius: var(--radius-sm);

      .ad-dev-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-main);
        margin-bottom: 0.35rem;
      }

      .ad-dev-text {
        font-size: 0.82rem;
        color: var(--text-muted);
        margin-bottom: 0;
      }
    }

    .ad-slot-sidebar {
      margin: 1rem 0;
    }

    .ad-slot-in-article {
      margin: 2.5rem 0;
    }
  `]
})
export class AdSlotComponent implements AfterViewInit {
  slotName = input<string>('Standard Ad');
  slotPosition = input<'in-article' | 'sidebar' | 'bottom'>('in-article');
  adSlotId = input<string>('0000000000');

  private platformId = inject(PLATFORM_ID);

  // Set to true once your Google AdSense application is approved and real client ID is pasted
  readonly adsEnabled = false;
  readonly publisherId = 'ca-pub-0000000000000000';

  ngAfterViewInit(): void {
    if (this.adsEnabled && isPlatformBrowser(this.platformId)) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense push error:', e);
      }
    }
  }
}

