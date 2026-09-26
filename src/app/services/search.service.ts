import { Injectable, inject, computed } from '@angular/core';
import { ContentService } from './content.service';
import { SearchResultItem, ContentType, Difficulty } from '../models/content.models';

export interface SearchOptions {
  query: string;
  contentType?: ContentType | 'all';
  category?: string;
  difficulty?: Difficulty | 'all';
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private contentService = inject(ContentService);

  readonly searchIndex = computed<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // 1. Lessons
    for (const l of this.contentService.lessons()) {
      items.push({
        id: l.id,
        title: l.title,
        description: l.description,
        category: l.category,
        difficulty: l.difficulty,
        type: 'lesson',
        url: `/learn/${l.pathSlug}/${l.slug}`,
        tags: l.tags
      });
    }

    // 2. Tutorials
    for (const t of this.contentService.tutorials()) {
      items.push({
        id: t.id,
        title: t.title,
        description: t.shortIntroduction,
        category: t.category,
        difficulty: t.difficulty,
        type: 'tutorial',
        url: `/tutorials/${t.slug}`,
        tags: ['tutorial', t.category.toLowerCase(), t.difficulty.toLowerCase()]
      });
    }

    // 3. Exercises
    for (const e of this.contentService.exercises()) {
      items.push({
        id: e.id,
        title: e.title,
        description: e.description,
        category: e.category,
        difficulty: e.difficulty,
        type: 'exercise',
        url: `/exercises/${e.slug}`,
        tags: ['exercise', e.topic.toLowerCase(), e.category.toLowerCase()]
      });
    }

    // 4. Challenges
    for (const c of this.contentService.challenges()) {
      items.push({
        id: c.id,
        title: c.title,
        description: c.problem.slice(0, 150) + '...',
        category: c.category,
        difficulty: c.difficulty,
        type: 'challenge',
        url: `/challenges/${c.slug}`,
        tags: c.concepts
      });
    }

    // 5. Projects
    for (const p of this.contentService.projects()) {
      items.push({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        difficulty: p.difficulty,
        type: 'project',
        url: `/projects/${p.slug}`,
        tags: p.skillsRequired
      });
    }

    // 6. Troubleshooting
    for (const tb of this.contentService.troubleshooting()) {
      items.push({
        id: tb.id,
        title: tb.title,
        description: tb.summary,
        category: tb.category,
        type: 'troubleshooting',
        url: `/troubleshooting/${tb.slug}`,
        tags: ['troubleshooting', 'error', 'debug', tb.category.toLowerCase()]
      });
    }

    // 7. Interview Questions
    for (const iq of this.contentService.interviewQuestions()) {
      items.push({
        id: iq.id,
        title: iq.question,
        description: iq.shortAnswer,
        category: iq.category,
        difficulty: iq.difficulty,
        type: 'interview',
        url: `/interview`,
        tags: ['interview', iq.category.toLowerCase(), iq.difficulty.toLowerCase()]
      });
    }

    return items;
  });

  search(
    optionsOrQuery: string | SearchOptions,
    filterType?: ContentType | 'all',
    filterCategory?: string,
    filterDifficulty?: Difficulty | 'all'
  ): SearchResultItem[] {
    let query = '';
    let typeFilter = filterType;
    let categoryFilter = filterCategory;
    let difficultyFilter = filterDifficulty;

    if (typeof optionsOrQuery === 'object' && optionsOrQuery !== null) {
      query = optionsOrQuery.query || '';
      typeFilter = optionsOrQuery.contentType;
      categoryFilter = optionsOrQuery.category;
      difficultyFilter = optionsOrQuery.difficulty;
    } else {
      query = optionsOrQuery || '';
    }

    const rawQuery = query.toLowerCase().trim();
    const tokens = rawQuery.split(/\s+/).filter(t => t.length > 0);
    const index = this.searchIndex();

    return index.filter(item => {
      // Type filter
      if (typeFilter && typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter && categoryFilter !== 'all' && item.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter && difficultyFilter !== 'all' && item.difficulty && item.difficulty !== difficultyFilter) {
        return false;
      }

      // Query token matching
      if (tokens.length === 0) return true;

      const searchableText = `${item.title} ${item.description} ${item.category} ${item.type} ${(item.tags || []).join(' ')}`.toLowerCase();

      return tokens.every(token => searchableText.includes(token));
    });
  }
}

