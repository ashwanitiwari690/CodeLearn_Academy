import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookmarkItem, ContentType } from '../models/content.models';

const STORAGE_KEYS = {
  COMPLETED: 'codelearn_completed_items',
  BOOKMARKS: 'codelearn_bookmarks',
  CONSENT: 'codelearn_cookie_consent'
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Signals
  readonly completedItems = signal<string[]>(this.loadFromStorage<string[]>(STORAGE_KEYS.COMPLETED, []));
  readonly bookmarks = signal<BookmarkItem[]>(this.loadFromStorage<BookmarkItem[]>(STORAGE_KEYS.BOOKMARKS, []));
  readonly cookieConsent = signal<boolean | null>(this.loadFromStorage<boolean | null>(STORAGE_KEYS.CONSENT, null));

  // Computed metrics
  readonly totalCompleted = computed(() => this.completedItems().length);
  readonly totalCompletedCount = this.totalCompleted;
  readonly totalBookmarks = computed(() => this.bookmarks().length);

  readonly completedLessons = computed(() => this.completedItems().filter(id => id.startsWith('les-')));
  readonly completedExercises = computed(() => this.completedItems().filter(id => id.startsWith('ex-')));
  readonly completedProjects = computed(() => this.completedItems().filter(id => id.startsWith('proj-')));

  private loadFromStorage<T>(key: string, fallback: T): T {
    if (!this.isBrowser) return fallback;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn(`Storage load failed for ${key}:`, e);
      return fallback;
    }
  }

  private saveToStorage<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Storage save failed for ${key}:`, e);
    }
  }

  // --- Completion Tracking ---
  isCompleted(id: string): boolean {
    return this.completedItems().includes(id);
  }

  isLessonCompleted(id: string): boolean {
    return this.isCompleted(id);
  }

  toggleCompleted(id: string): boolean {
    const current = this.completedItems();
    let updated: string[];
    let isNowCompleted = false;

    if (current.includes(id)) {
      updated = current.filter(item => item !== id);
    } else {
      updated = [...current, id];
      isNowCompleted = true;
    }

    this.completedItems.set(updated);
    this.saveToStorage(STORAGE_KEYS.COMPLETED, updated);
    return isNowCompleted;
  }

  toggleLessonCompleted(id: string): boolean {
    return this.toggleCompleted(id);
  }

  markCompleted(id: string): void {
    if (!this.isCompleted(id)) {
      const updated = [...this.completedItems(), id];
      this.completedItems.set(updated);
      this.saveToStorage(STORAGE_KEYS.COMPLETED, updated);
    }
  }

  // --- Bookmarking ---
  isBookmarked(id: string): boolean {
    return this.bookmarks().some(b => b.id === id);
  }

  toggleBookmark(item: { id: string; type: ContentType; title: string; category: string; url: string }): boolean {
    const current = this.bookmarks();
    const existingIndex = current.findIndex(b => b.id === item.id);
    let updated: BookmarkItem[];
    let isNowSaved = false;

    if (existingIndex > -1) {
      updated = current.filter(b => b.id !== item.id);
    } else {
      const newBookmark: BookmarkItem = {
        ...item,
        savedAt: new Date().toISOString()
      };
      updated = [newBookmark, ...current];
      isNowSaved = true;
    }

    this.bookmarks.set(updated);
    this.saveToStorage(STORAGE_KEYS.BOOKMARKS, updated);
    return isNowSaved;
  }

  removeBookmark(id: string): void {
    const updated = this.bookmarks().filter(b => b.id !== id);
    this.bookmarks.set(updated);
    this.saveToStorage(STORAGE_KEYS.BOOKMARKS, updated);
  }

  // --- Cookie Consent ---
  setConsent(accepted: boolean): void {
    this.cookieConsent.set(accepted);
    this.saveToStorage(STORAGE_KEYS.CONSENT, accepted);
  }

  // --- Clear Data ---
  clearAllProgress(): void {
    this.resetAllData();
  }

  resetAllData(): void {
    this.completedItems.set([]);
    this.bookmarks.set([]);
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    }
  }
}

