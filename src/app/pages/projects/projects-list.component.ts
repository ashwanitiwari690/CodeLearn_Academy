import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StorageService } from '../../services/storage.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdSlotComponent } from '../../components/ad-slot/ad-slot.component';
import { Difficulty } from '../../models/content.models';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, AdSlotComponent],
  template: `
    <div class="container projects-page">
      <app-breadcrumb [items]="[{ label: 'Projects' }]"></app-breadcrumb>

      <header class="page-header">
        <span class="badge badge-category">Portfolio Project Blueprints</span>
        <h1 class="page-title">Production-Ready Project Blueprints</h1>
        <p class="lead-text">
          Bridge the gap between isolated code snippets and production engineering. Each project blueprint contains complete folder structures, prerequisites, core and bonus feature specifications, and a step-by-step implementation plan.
        </p>

        <!-- Difficulty Filter -->
        <div class="filter-pills" role="tablist">
          @for (d of difficulties; track d) {
            <button 
              type="button" 
              class="pill-btn" 
              [class.active]="selectedDifficulty() === d"
              (click)="selectedDifficulty.set(d)">
              {{ d }}
            </button>
          }
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (proj of filteredProjects(); track proj.id) {
          <div class="card project-card">
            <div class="card-meta">
              <span class="badge" [class.badge-beginner]="proj.difficulty === 'Beginner'" [class.badge-intermediate]="proj.difficulty === 'Intermediate'" [class.badge-advanced]="proj.difficulty === 'Advanced'">
                {{ proj.difficulty }}
              </span>
              <span class="est-hours">
                <span class="material-symbols-outlined icon">schedule</span>
                ~{{ proj.estimatedHours }} hrs
              </span>
            </div>

            <div class="title-row">
              <h2 class="project-title">
                <a [routerLink]="['/projects', proj.slug]">{{ proj.title }}</a>
              </h2>
              @if (storage.isCompleted(proj.id)) {
                <span class="material-symbols-outlined completed-icon" title="Completed">check_circle</span>
              }
            </div>

            <p class="project-desc">{{ proj.description }}</p>

            <div class="skills-chips">
              @for (skill of proj.skillsRequired.slice(0, 4); track skill) {
                <span class="skill-chip">{{ skill }}</span>
              }
            </div>

            <div class="card-footer">
              <span class="category-name">{{ proj.category }}</span>
              <a [routerLink]="['/projects', proj.slug]" class="btn btn-outline btn-sm">
                View Blueprint
                <span class="material-symbols-outlined icon-end">arrow_forward</span>
              </a>
            </div>
          </div>
        }
      </div>

      <div class="my-8">
        <app-ad-slot slotName="Projects List Bottom"></app-ad-slot>
      </div>
    </div>
  `,
  styles: [`
    .projects-page {
      padding: 2.5rem 1.25rem 4rem;
    }
    .page-header {
      margin-bottom: 2.5rem;

      .page-title {
        font-size: 2.25rem;
        margin: 0.5rem 0 0.75rem;
      }
      .lead-text {
        font-size: 1.1rem;
        color: var(--text-muted);
        line-height: 1.6;
        max-width: 820px;
        margin: 0 0 1.5rem;
      }
    }

    .filter-pills {
      display: flex;
      gap: 0.5rem;

      .pill-btn {
        padding: 0.35rem 0.85rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 9999px;
        color: var(--text-muted);
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
          color: var(--text-main);
          border-color: #475569;
        }

        &.active {
          background: rgba(56, 189, 248, 0.15);
          color: var(--primary);
          border-color: var(--primary);
          font-weight: 600;
        }
      }
    }

    .project-card {
      display: flex;
      flex-direction: column;
      padding: 1.75rem;

      .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;

        .est-hours {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-muted);

          .icon {
            font-size: 0.95rem;
          }
        }
      }

      .title-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.75rem;

        .project-title {
          font-size: 1.25rem;
          margin: 0;
          line-height: 1.35;

          a {
            color: var(--text-main);
            text-decoration: none;

            &:hover {
              color: var(--primary);
            }
          }
        }

        .completed-icon {
          font-size: 1.2rem;
          color: #10b981;
          flex-shrink: 0;
        }
      }

      .project-desc {
        font-size: 0.875rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0 0 1.25rem;
        flex-grow: 1;
      }

      .skills-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-bottom: 1.25rem;

        .skill-chip {
          font-size: 0.725rem;
          padding: 0.15rem 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: #cbd5e1;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--border-color);
        padding-top: 0.85rem;

        .category-name {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }
      }
    }
  `]
})
export class ProjectsListComponent implements OnInit {
  contentService = inject(ContentService);
  storage = inject(StorageService);
  private seo = inject(SeoService);

  readonly difficulties: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  selectedDifficulty = signal<Difficulty | 'All'>('All');

  filteredProjects = computed(() => {
    const diff = this.selectedDifficulty();
    const all = this.contentService.projects();
    if (diff === 'All') return all;
    return all.filter(p => p.difficulty === diff);
  });

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Project Blueprints - Practical Portfolio Projects - CodeLearn Academy',
      description: 'Step-by-step blueprints for building production-grade web applications: portfolios, expense trackers, and Kanban boards with Angular.',
      urlPath: '/projects',
      breadcrumbs: [{ name: 'Projects', item: '/projects' }]
    });
  }
}

