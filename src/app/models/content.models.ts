export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ContentType = 'lesson' | 'tutorial' | 'exercise' | 'challenge' | 'project' | 'troubleshooting' | 'interview';

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  githubUrl?: string;
  websiteUrl?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  difficulty: Difficulty;
  estimatedHours: number;
  prerequisites: string[];
  beginnerLessonIds: string[];
  intermediateLessonIds: string[];
  advancedLessonIds: string[];
  exerciseIds: string[];
  projectIds: string[];
  commonMistakes: { mistake: string; correction: string; explanation: string }[];
  interviewTopicIds: string[];
  relatedResources: { title: string; url: string; external?: boolean }[];
}

export interface Lesson {
  id: string;
  slug: string;
  pathSlug: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  tags: string[];
  authorId: string;
  publishedDate: string;
  updatedDate: string;
  readingTimeMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  sections: {
    heading: string;
    content: string;
    codeExample?: {
      language: string;
      code: string;
      explanation: string;
      expectedOutput?: string;
    };
  }[];
  keyTakeaways: string[];
  commonMistakes: { mistake: string; fix: string }[];
  nextLessonSlug?: string;
  prevLessonSlug?: string;
  relatedLessonSlugs: string[];
}

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  shortIntroduction: string;
  category: string;
  difficulty: Difficulty;
  authorId: string;
  publishedDate: string;
  updatedDate: string;
  readingTimeMinutes: number;
  prerequisites: string[];
  tableOfContents: { id: string; title: string }[];
  contentSections: {
    id: string;
    title: string;
    paragraphs: string[];
    codeSnippets?: {
      filename?: string;
      language: string;
      code: string;
      explanation: string;
      expectedResult?: string;
    }[];
  }[];
  commonMistakes: { title: string; explanation: string; solution: string }[];
  troubleshootingTips: { symptom: string; cause: string; resolution: string }[];
  faqs: { question: string; answer: string }[];
  relatedTutorialSlugs: string[];
  nextTutorialSlug?: string;
  prevTutorialSlug?: string;
}

export interface ExerciseTestCase {
  inputDescription: string;
  expectedOutputDescription: string;
}

export interface Exercise {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  category: string;
  problemStatement: string;
  starterCode: string;
  language: string;
  exampleInput: string;
  exampleOutput: string;
  testCases: ExerciseTestCase[];
  hints: string[];
  explanation: string;
  solution: string;
  relatedLessonSlug?: string;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  estimatedMinutes: number;
  concepts: string[];
  problem: string;
  requirements: string[];
  starterCode: string;
  language: string;
  hints: string[];
  solution: string;
  explanation: string;
}

export interface ProjectBlueprint {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  estimatedHours: number;
  description: string;
  skillsRequired: string[];
  prerequisites: string[];
  features: {
    core: string[];
    bonus: string[];
  };
  stepByStepPlan: {
    stepNumber: number;
    title: string;
    objective: string;
    instructions: string[];
    codeGuidance?: string;
  }[];
  folderStructure: string;
  implementationGuidance: string[];
  commonMistakes: { mistake: string; prevention: string }[];
  possibleImprovements: string[];
}

export interface TroubleshootingArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Angular' | 'JavaScript' | 'TypeScript' | 'Node.js' | 'Git' | 'Linux' | 'Web' | 'HTTP' | 'APIs';
  errorSignature: string;
  summary: string;
  publishedDate: string;
  updatedDate: string;
  whatItMeans: string;
  whyItHappens: string[];
  howToDiagnose: string[];
  stepByStepSolution: {
    step: number;
    title: string;
    description: string;
    code?: string;
  }[];
  practicalExample: {
    brokenCode: string;
    fixedCode: string;
    explanation: string;
  };
  preventionTips: string[];
  relatedErrorSlugs: string[];
}

export interface InterviewQuestion {
  id: string;
  category: 'JavaScript' | 'TypeScript' | 'Angular' | 'HTML' | 'CSS' | 'Git' | 'Web Development';
  difficulty: Difficulty;
  question: string;
  shortAnswer: string;
  detailedExplanation: string[];
  codeExample?: {
    language: string;
    code: string;
    explanation: string;
  };
  keyTakeaway: string;
  relatedQuestionIds?: string[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty?: Difficulty;
  type: ContentType;
  url: string;
  tags?: string[];
}

export interface BookmarkItem {
  id: string;
  type: ContentType;
  title: string;
  category: string;
  url: string;
  savedAt: string;
}

