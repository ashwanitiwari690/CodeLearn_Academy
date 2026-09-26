import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  standalone: true,
  template: `
    <div class="code-block-wrapper">
      <div class="code-header">
        <div class="code-meta">
          @if (filename()) {
            <span class="file-name">
              <span class="material-symbols-outlined icon" aria-hidden="true">description</span>
              {{ filename() }}
            </span>
          }
          <span class="language-badge">{{ language() }}</span>
        </div>
        <button 
          type="button" 
          class="copy-btn" 
          (click)="copyCode()" 
          [attr.aria-label]="copied() ? 'Code copied to clipboard' : 'Copy code to clipboard'">
          <span class="material-symbols-outlined icon" aria-hidden="true">
            {{ copied() ? 'check' : 'content_copy' }}
          </span>
          <span>{{ copied() ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>

      <pre class="code-container" tabindex="0"><code>{{ code().trim() }}</code></pre>

      @if (expectedOutput()) {
        <div class="expected-output-box">
          <div class="output-label">
            <span class="material-symbols-outlined icon" aria-hidden="true">terminal</span>
            Expected Output:
          </div>
          <pre class="output-code"><code>{{ expectedOutput()?.trim() }}</code></pre>
        </div>
      }

      @if (explanation()) {
        <p class="code-explanation">
          <strong>Note:</strong> {{ explanation() }}
        </p>
      }
    </div>
  `,
  styles: [`
    .code-block-wrapper {
      margin: 1.5rem 0;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
      background: var(--bg-card);
    }
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.6rem 1rem;
      background: var(--bg-card-hover);
      border-bottom: 1px solid var(--border-color);
    }
    .code-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .file-name {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.825rem;
      font-weight: 500;
      color: var(--text-main);
      font-family: var(--font-mono);

      .icon {
        font-size: 1rem;
        color: var(--text-muted);
      }
    }
    .language-badge {
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 0.15rem 0.5rem;
      border-radius: var(--radius-sm);
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
    }
    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.3rem 0.65rem;
      font-size: 0.775rem;
      font-weight: 500;
      color: var(--text-muted);
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;

      .icon {
        font-size: 0.95rem;
      }

      &:hover {
        color: var(--text-main);
        background: var(--surface-hover);
        border-color: #475569;
      }
    }
    .code-container {
      margin: 0;
      padding: 1.15rem 1.25rem;
      background: #090d16;
      color: #e2e8f0;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      line-height: 1.6;
      overflow-x: auto;

      code {
        background: transparent;
        padding: 0;
        border-radius: 0;
        font-family: inherit;
        white-space: pre;
      }

      &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: -2px;
      }
    }
    .expected-output-box {
      background: #05080f;
      border-top: 1px dashed var(--border-color);
      padding: 0.75rem 1.25rem;
    }
    .output-label {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin-bottom: 0.35rem;

      .icon {
        font-size: 0.95rem;
        color: #38bdf8;
      }
    }
    .output-code {
      margin: 0;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: #a7f3d0;
      background: transparent;
      padding: 0;
      white-space: pre-wrap;
    }
    .code-explanation {
      margin: 0;
      padding: 0.75rem 1.25rem;
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--text-muted);
      border-top: 1px solid var(--border-color);
      background: rgba(15, 23, 42, 0.4);

      strong {
        color: var(--text-main);
      }
    }
  `]
})
export class CodeBlockComponent {
  code = input.required<string>();
  language = input<string>('typescript');
  filename = input<string | undefined>(undefined);
  explanation = input<string | undefined>(undefined);
  expectedOutput = input<string | undefined>(undefined);

  copied = signal<boolean>(false);

  copyCode(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.code().trim()).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      }).catch(err => {
        console.warn('Clipboard write error:', err);
      });
    }
  }
}

