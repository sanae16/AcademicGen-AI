export type AcademicLevel = 'Undergraduate' | 'Postgraduate';
export type ContentType = 'Lesson Plan' | 'Study Guide' | 'Practice Tools' | 'Course Outline';
export type ToneStyle = 'Formal' | 'Simplified';
export type OutputLength = 'Summary' | 'Standard' | 'Detailed';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type QuestionType = 'Multiple Choice' | 'True/False' | 'Short Answer' | 'Mixed Format' | 'Case Study';

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[]; // For MCQ/True-False
  correctAnswer: string;
  explanation: string;
  points?: number;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface ScoreFeedbackRange {
  min: number;
  max: number;
  feedback: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
  instructions: string;
  flashcards?: Flashcard[];
  scoreTracking?: {
    feedbackRanges: ScoreFeedbackRange[];
  };
}

export interface GenerationParams {
  academicLevel: AcademicLevel;
  topic: string;
  contentType: ContentType;
  toneStyle: ToneStyle;
  outputLength: OutputLength;
  difficultyLevel?: DifficultyLevel; // For Study Guide
  questionType?: QuestionType; // For Practice Tools
}
