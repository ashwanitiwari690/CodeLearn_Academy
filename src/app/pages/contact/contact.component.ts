import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, BreadcrumbComponent],
  template: `
    <div class="container contact-page">
      <app-breadcrumb [items]="[{ label: 'Contact Us' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Get In Touch</span>
        <h1 class="page-title">Contact CodeLearn Academy</h1>
        <p class="lead-text">
          Have an inquiry, editorial correction, or curriculum suggestion? Reach out to our technical team.
        </p>
      </header>

      <div class="contact-grid">
        <!-- Form Column -->
        <div class="form-col card">
          <h2>Send a Message</h2>
          <p class="form-desc">Fill out the form below. Client-side input validation is enforced.</p>

          @if (submitted()) {
            <div class="notice-card card submitted-notice" role="status">
              <span class="material-symbols-outlined check-icon">info</span>
              <div>
                <h3>Frontend Notice & Submission Log</h3>
                <p>
                  Thank you, <strong>{{ lastSubmission()?.name }}</strong>. Because CodeLearn Academy is currently running as a static frontend-first application without an active backend mail transport server, your message was verified on the client but <strong>not sent across a remote SMTP server</strong>.
                </p>
                <p>
                  For urgent communications or editorial inquiries, please send directly to our direct email address listed in the sidebar.
                </p>
                <button type="button" class="btn btn-secondary btn-sm" (click)="resetForm()">Send Another Inquiry</button>
              </div>
            </div>
          } @else {
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
              <!-- Name -->
              <div class="form-group">
                <label for="contact-name">Your Full Name <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="contact-name" 
                  formControlName="name"
                  placeholder="e.g. Alex Morgan"
                  [class.is-invalid]="nameControl.invalid && nameControl.touched" />
                @if (nameControl.invalid && nameControl.touched) {
                  <span class="error-msg">Please enter your name (minimum 2 characters).</span>
                }
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="contact-email">Email Address <span class="required">*</span></label>
                <input 
                  type="email" 
                  id="contact-email" 
                  formControlName="email"
                  placeholder="e.g. alex@example.com"
                  [class.is-invalid]="emailControl.invalid && emailControl.touched" />
                @if (emailControl.invalid && emailControl.touched) {
                  <span class="error-msg">Please provide a valid email address.</span>
                }
              </div>

              <!-- Subject -->
              <div class="form-group">
                <label for="contact-subject">Subject <span class="required">*</span></label>
                <select id="contact-subject" formControlName="subject" class="select-input">
                  <option value="curriculum">Curriculum Question / Feedback</option>
                  <option value="correction">Typo / Code Correction Request</option>
                  <option value="general">General Inquiry</option>
                  <option value="legal">Privacy / Legal Question</option>
                </select>
              </div>

              <!-- Message -->
              <div class="form-group">
                <label for="contact-message">Message <span class="required">*</span></label>
                <textarea 
                  id="contact-message" 
                  formControlName="message" 
                  rows="5"
                  placeholder="Please describe your question or suggested correction in detail..."
                  [class.is-invalid]="messageControl.invalid && messageControl.touched"></textarea>
                @if (messageControl.invalid && messageControl.touched) {
                  <span class="error-msg">Message must be at least 15 characters long.</span>
                }
              </div>

              <button 
                type="submit" 
                class="btn btn-primary submit-btn" 
                [disabled]="contactForm.invalid">
                <span class="material-symbols-outlined icon">send</span>
                Submit Message
              </button>
            </form>
          }
        </div>

        <!-- Sidebar / Direct Contacts -->
        <aside class="sidebar-col">
          <div class="card contact-info-card">
            <h3><span class="material-symbols-outlined icon">alternate_email</span> Direct Contact</h3>
            <p>You can also reach our team directly at:</p>
            <div class="contact-method">
              <span class="method-label">Editorial & Inquiries:</span>
              <a href="mailto:contact@codelearn.academy" class="method-val">contact&#64;codelearn.academy</a>
            </div>
            <div class="contact-method">
              <span class="method-label">Source Code & Issues:</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="method-val">GitHub Repository</a>
            </div>
          </div>

          <div class="card hours-card">
            <h3><span class="material-symbols-outlined icon">schedule</span> Response Times</h3>
            <p>We review technical corrections and editorial reports within 2-3 business days. Thank you for helping keep our curriculum accurate!</p>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      padding: 2.5rem 1.25rem 4rem;
      max-width: 960px;
    }

    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 1rem;
      }

      .lead-text {
        font-size: 1.15rem;
        color: var(--text-muted);
        line-height: 1.6;
      }
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;

      @media (min-width: 860px) {
        grid-template-columns: 1fr 340px;
      }
    }

    .form-col {
      padding: 2rem;

      h2 {
        font-size: 1.45rem;
        margin-bottom: 0.35rem;
      }

      .form-desc {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-bottom: 1.75rem;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: 1.5rem;

      label {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--text-main);

        .required { color: #f87171; }
      }

      input, textarea, select {
        background: #060911;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-sm);
        padding: 0.65rem 0.85rem;
        color: var(--text-main);
        font-family: var(--font-sans);
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.15s ease;

        &:focus {
          border-color: var(--primary);
        }

        &.is-invalid {
          border-color: #ef4444;
        }
      }

      .error-msg {
        font-size: 0.78rem;
        color: #f87171;
      }
    }

    .submit-btn {
      width: 100%;
    }

    .submitted-notice {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: rgba(59, 130, 246, 0.08);
      border-color: rgba(59, 130, 246, 0.3);

      .check-icon {
        font-size: 28px;
        color: #38bdf8;
        flex-shrink: 0;
      }

      h3 { font-size: 1.15rem; margin-bottom: 0.5rem; }
      p { font-size: 0.88rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1rem; }
    }

    .sidebar-col {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .contact-info-card, .hours-card {
        padding: 1.75rem;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: var(--text-main);

          .icon { font-size: 20px; color: #38bdf8; }
        }

        p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .contact-method {
          margin-bottom: 0.85rem;

          .method-label {
            display: block;
            font-size: 0.75rem;
            color: var(--text-dim);
            text-transform: uppercase;
          }

          .method-val {
            color: #60a5fa;
            font-size: 0.95rem;
            font-weight: 500;
          }
        }
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  seo = inject(SeoService);

  submitted = signal(false);
  lastSubmission = signal<{ name: string; email: string } | null>(null);

  contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    subject: new FormControl('curriculum', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(15)] })
  });

  get nameControl() { return this.contactForm.controls.name; }
  get emailControl() { return this.contactForm.controls.email; }
  get messageControl() { return this.contactForm.controls.message; }

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Contact Us - CodeLearn Academy',
      description: 'Contact CodeLearn Academy for curriculum suggestions, technical corrections, and inquiries.',
      urlPath: '/contact',
      breadcrumbs: [{ name: 'Contact', item: '/contact' }]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.lastSubmission.set({
        name: this.nameControl.value,
        email: this.emailControl.value
      });
      this.submitted.set(true);
    }
  }

  resetForm(): void {
    this.contactForm.reset({
      name: '',
      email: '',
      subject: 'curriculum',
      message: ''
    });
    this.submitted.set(false);
  }
}
