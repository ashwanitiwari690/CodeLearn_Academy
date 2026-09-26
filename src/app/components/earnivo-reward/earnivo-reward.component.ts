import { Component, OnInit, computed, inject } from '@angular/core';
import { EarnivoRewardService } from '../../services/earnivo-reward.service';

/**
 * Floating panel shown only to visitors who arrived from an Earnivo Website
 * Promotion campaign — it renders nothing at all for regular visitors.
 * It counts the required visit down, tracks active tab focus, then provides
 * a claim button that credits the visitor's Earnivo wallet.
 */
@Component({
  selector: 'app-earnivo-reward',
  standalone: true,
  template: `
    @if (reward.visible()) {
      <aside class="earnivo-card" role="status" aria-live="polite">
        @if (reward.canDismiss()) {
          <button type="button" class="earnivo-close" (click)="reward.dismiss()" aria-label="Hide reward panel">&times;</button>
        }

        <div class="earnivo-head">
          <span class="earnivo-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 12v10H4V12" />
              <path d="M2 7h20v5H2z" />
              <path d="M12 22V7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </span>
          <div class="earnivo-title">
            <strong>Earnivo Reward</strong>
            @if (reward.campaignName(); as name) {
              <small>{{ name }}</small>
            }
          </div>
        </div>

        @switch (reward.state()) {
          @case ('loading') {
            <p class="earnivo-body">Checking your reward session…</p>
          }
          @case ('waiting') {
            <p class="earnivo-body">
              Keep exploring for <strong>{{ formattedRemaining() }}</strong> to unlock
              @if (reward.rewardAmount(); as amount) {
                <strong> ₹{{ amount }}</strong>
              } @else {
                <span> your reward</span>
              }.
            </p>
            <div class="earnivo-progress" role="presentation">
              <span [style.width.%]="progressPercent()"></span>
            </div>
            @if (reward.paused()) {
              <p class="earnivo-body earnivo-paused">
                <span class="material-symbols-outlined pause-icon">pause_circle</span>
                Paused — switch back to this tab to keep the timer running.
              </p>
            }
          }
          @case ('ready') {
            <p class="earnivo-body">
              Your visit is verified! Claim
              @if (reward.rewardAmount(); as amount) {
                <strong> ₹{{ amount }}</strong>
              } @else {
                <span> your reward</span>
              }
              straight to your Earnivo wallet.
            </p>
            <button type="button" class="earnivo-claim" (click)="reward.claim()">
              Claim Reward
            </button>
          }
          @case ('claiming') {
            <p class="earnivo-body">Crediting your wallet…</p>
            <button type="button" class="earnivo-claim" disabled>
              Processing…
            </button>
          }
          @case ('claimed') {
            <p class="earnivo-body earnivo-success">
              @if (reward.rewardAmount(); as amount) {
                ₹{{ amount }} credited to your Earnivo wallet!
              } @else {
                Reward credited to your Earnivo wallet!
              }
              You can now head back to the app.
            </p>
          }
          @case ('error') {
            <p class="earnivo-body earnivo-error">{{ reward.errorMessage() }}</p>
          }
        }

        @if (reward.errorMessage() && reward.state() !== 'error') {
          <p class="earnivo-body earnivo-error">{{ reward.errorMessage() }}</p>
        }
      </aside>
    }
  `,
  styles: [`
    .earnivo-card {
      position: fixed;
      left: 16px;
      right: 16px;
      bottom: calc(16px + env(safe-area-inset-bottom, 0px));
      z-index: 999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      border-radius: var(--radius-lg, 16px);
      border: 1px solid rgba(56, 189, 248, 0.25);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15);
      animation: earnivo-rise 0.25s ease-out;
      font-family: var(--font-sans);
    }

    @media (min-width: 640px) {
      .earnivo-card {
        left: auto;
        width: 340px;
        bottom: 24px;
        right: 24px;
      }
    }

    @keyframes earnivo-rise {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .earnivo-card {
        animation: none;
      }
    }

    .earnivo-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 999px;
      background: transparent;
      color: var(--text-muted, #94a3b8);
      font-size: 1.25rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;

      &:hover {
        background: var(--surface, #1e293b);
        color: var(--text-main, #f8fafc);
      }
    }

    .earnivo-head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-right: 32px;
    }

    .earnivo-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 38px;
      height: 38px;
      border-radius: var(--radius-md, 10px);
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.25);
      color: var(--primary, #38bdf8);
    }

    .earnivo-title {
      strong {
        display: block;
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-main, #f8fafc);
      }

      small {
        display: block;
        font-size: 0.8rem;
        color: var(--text-muted, #94a3b8);
      }
    }

    .earnivo-body {
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.45;
      color: var(--text-muted, #cbd5e1);

      strong {
        color: var(--text-main, #f8fafc);
      }
    }

    .earnivo-success {
      color: var(--accent-emerald, #10b981);
      font-weight: 500;
    }

    .earnivo-error {
      color: var(--accent-rose, #f87171);
      font-size: 0.82rem;
    }

    .earnivo-paused {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--accent-amber, #f59e0b);

      .pause-icon {
        font-size: 1rem;
      }
    }

    .earnivo-progress {
      height: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;

      span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #38bdf8, #818cf8);
        transition: width 1s linear;
      }
    }

    .earnivo-claim {
      width: 100%;
      padding: 10px 16px;
      border: none;
      border-radius: var(--radius-md, 10px);
      background: linear-gradient(135deg, #38bdf8, #0ea5e9);
      color: #090d16;
      font-size: 0.92rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 10px rgba(56, 189, 248, 0.3);

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(56, 189, 248, 0.45);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }
    }
  `]
})
export class EarnivoRewardComponent implements OnInit {
  protected readonly reward = inject(EarnivoRewardService);

  protected readonly formattedRemaining = computed(() => {
    const seconds = this.reward.secondsRemaining();
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
  });

  // Measured against the campaign's full required duration, so a visitor who
  // resumes mid-visit sees the bar already part-filled
  protected readonly progressPercent = computed(() => {
    const required = this.reward.requiredSeconds();
    if (required === 0) return 100;
    return Math.round(((required - this.reward.secondsRemaining()) / required) * 100);
  });

  ngOnInit(): void {
    this.reward.init();
  }
}
