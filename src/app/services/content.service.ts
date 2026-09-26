import { Injectable, computed, signal } from '@angular/core';
import { 
  Author, Category, LearningPath, Lesson, Tutorial, Exercise, 
  Challenge, ProjectBlueprint, TroubleshootingArticle, InterviewQuestion, Difficulty 
} from '../models/content.models';

import { AUTHORS } from '../data/authors.data';
import { CATEGORIES } from '../data/categories.data';
import { LEARNING_PATHS } from '../data/learning-paths.data';
import { LESSONS } from '../data/lessons.data';
import { TUTORIALS } from '../data/tutorials.data';
import { CODING_EXERCISES } from '../data/exercises.data';
import { CODING_CHALLENGES } from '../data/challenges.data';
import { PROJECT_BLUEPRINTS } from '../data/projects.data';
import { TROUBLESHOOTING_ARTICLES } from '../data/troubleshooting.data';
import { INTERVIEW_QUESTIONS } from '../data/interviews.data';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  // Master Signals
  readonly authors = signal<Author[]>(AUTHORS);
  readonly categories = signal<Category[]>(CATEGORIES);
  readonly learningPaths = signal<LearningPath[]>(LEARNING_PATHS);
  readonly lessons = signal<Lesson[]>(LESSONS);
  readonly tutorials = signal<Tutorial[]>(TUTORIALS);
  readonly exercises = signal<Exercise[]>(CODING_EXERCISES);
  readonly challenges = signal<Challenge[]>(CODING_CHALLENGES);
  readonly projects = signal<ProjectBlueprint[]>(PROJECT_BLUEPRINTS);
  readonly troubleshooting = signal<TroubleshootingArticle[]>(TROUBLESHOOTING_ARTICLES);
  readonly interviewQuestions = signal<InterviewQuestion[]>(INTERVIEW_QUESTIONS);

  // Computed summary counts
  readonly stats = computed(() => ({
    pathsCount: this.learningPaths().length,
    lessonsCount: this.lessons().length,
    tutorialsCount: this.tutorials().length,
    exercisesCount: this.exercises().length,
    challengesCount: this.challenges().length,
    projectsCount: this.projects().length,
    troubleshootingCount: this.troubleshooting().length,
    interviewCount: this.interviewQuestions().length
  }));

  // --- Authors ---
  getAuthorById(id: string): Author | undefined {
    return this.authors().find(a => a.id === id);
  }

  getAuthorBySlug(slug: string): Author | undefined {
    return this.authors().find(a => a.slug === slug);
  }

  // --- Categories ---
  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories().find(c => c.slug === slug);
  }

  // --- Learning Paths ---
  getLearningPaths(): LearningPath[] {
    return this.learningPaths();
  }

  getLearningPathBySlug(slug: string): LearningPath | undefined {
    return this.learningPaths().find(p => p.slug === slug);
  }

  // --- Lessons ---
  getLessons(): Lesson[] {
    return this.lessons();
  }

  getLessonBySlug(slug: string): Lesson | undefined {
    return this.lessons().find(l => l.slug === slug);
  }

  getLessonById(id: string): Lesson | undefined {
    return this.lessons().find(l => l.id === id);
  }

  getLessonsByPathSlug(pathSlug: string): Lesson[] {
    return this.lessons().filter(l => l.pathSlug === pathSlug);
  }

  getLessonsByPath(pathSlug: string): Lesson[] {
    return this.getLessonsByPathSlug(pathSlug);
  }

  getLessonsByIds(ids: string[]): Lesson[] {
    return this.lessons().filter(l => ids.includes(l.id));
  }

  // --- Tutorials ---
  getTutorials(): Tutorial[] {
    return this.tutorials();
  }

  getTutorialBySlug(slug: string): Tutorial | undefined {
    return this.tutorials().find(t => t.slug === slug);
  }

  getTutorialsByCategory(category: string): Tutorial[] {
    return this.tutorials().filter(t => t.category.toLowerCase() === category.toLowerCase());
  }

  // --- Exercises ---
  getExercises(): Exercise[] {
    return this.exercises();
  }

  getExerciseBySlug(slug: string): Exercise | undefined {
    return this.exercises().find(e => e.slug === slug);
  }

  getExercisesByCategory(category: string): Exercise[] {
    return this.exercises().filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  getExercisesByDifficulty(difficulty: Difficulty): Exercise[] {
    return this.exercises().filter(e => e.difficulty === difficulty);
  }

  // --- Challenges ---
  getChallenges(): Challenge[] {
    return this.challenges();
  }

  getChallengeBySlug(slug: string): Challenge | undefined {
    return this.challenges().find(c => c.slug === slug);
  }

  getChallengesByDifficulty(difficulty: Difficulty): Challenge[] {
    return this.challenges().filter(c => c.difficulty === difficulty);
  }

  // --- Projects ---
  getProjects(): ProjectBlueprint[] {
    return this.projects();
  }

  getProjectBySlug(slug: string): ProjectBlueprint | undefined {
    return this.projects().find(p => p.slug === slug);
  }

  getProjectsByDifficulty(difficulty: Difficulty): ProjectBlueprint[] {
    return this.projects().filter(p => p.difficulty === difficulty);
  }

  // --- Troubleshooting ---
  getTroubleshooting(): TroubleshootingArticle[] {
    return this.troubleshooting();
  }

  getTroubleshootingBySlug(slug: string): TroubleshootingArticle | undefined {
    return this.troubleshooting().find(t => t.slug === slug);
  }

  getTroubleshootingByCategory(category: string): TroubleshootingArticle[] {
    return this.troubleshooting().filter(t => t.category.toLowerCase() === category.toLowerCase());
  }

  // --- Interviews ---
  getInterviewQuestions(): InterviewQuestion[] {
    return this.interviewQuestions();
  }

  getInterviewsByCategory(category: string): InterviewQuestion[] {
    return this.interviewQuestions().filter(q => q.category.toLowerCase() === category.toLowerCase());
  }
}

