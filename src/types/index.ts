export type ProjectStage = 'Idea' | 'Planning' | 'Pilot' | 'Operating' | 'Scaling';
export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';
export type QuestionType = 'single' | 'multiple';
export type ImpactDirection = 'positive' | 'negative';
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unassessed';

export interface SDGTarget {
  id: string;
  code: string; // e.g. "6.4", "2.4"
  sdgNumber: number;
  title: string;
  description: string;
}

export interface SDGMetadata {
  number: number;
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  color: string;
  description: string;
  targets: SDGTarget[];
}

export interface ImpactEffect {
  sdgNumber: number;
  targetCode: string;
  direction: ImpactDirection;
  score: number; // e.g. +1, +2, +3, -1, -2, -3
  impactArea: string;
  explanation: string;
  attentionRequired?: boolean;
  suggestedAction?: string;
}

export interface AnswerOption {
  id: string;
  label: string;
  description?: string;
  effects: ImpactEffect[];
  isNotEnoughInfo?: boolean;
  isNotApplicable?: boolean;
}

export interface Question {
  id: string;
  code: string; // e.g. "W1", "S1", "E2"
  themeId: string;
  title: string;
  description: string;
  type: QuestionType;
  required: boolean;
  options: AnswerOption[];
  confidenceApplicable?: boolean;
}

export interface Theme {
  id: string;
  number: number;
  name: string;
  description: string;
  icon: string;
  questionIds: string[];
}

export interface Project {
  id: string;
  name: string;
  location: {
    country: string;
    state: string;
    city: string;
    display: string;
  };
  focus: string;
  description: string;
  area: number;
  areaUnit: 'hectares' | 'acres';
  farmingModel: string;
  stage: ProjectStage;
  objectives: string[];
  practices: string[];
  status: ProjectStatus;
  lastUpdated: string;
  createdAt: string;
  isDemo?: boolean;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedOptionIds: string[];
  notes?: string;
  confidenceLevel?: ConfidenceLevel;
}

export interface ImpactSignalItem {
  id: string;
  questionCode: string;
  questionTitle: string;
  selectedOptionLabel: string;
  impactArea: string;
  sdgNumber: number;
  targetCode: string;
  targetTitle: string;
  direction: ImpactDirection;
  score: number;
  signalStrength: 'Emerging' | 'Moderate' | 'Strong';
  explanation: string;
  evidenceNote?: string;
  confidence?: ConfidenceLevel;
  attentionRequired?: boolean;
  suggestedAction?: string;
}

export interface SDGImpactSummary {
  sdgNumber: number;
  sdg: SDGMetadata;
  positiveScore: number;
  negativeScore: number;
  contributingResponsesCount: number;
  positiveSignals: ImpactSignalItem[];
  negativeSignals: ImpactSignalItem[];
  evidenceFlags: {
    needsEvidenceCount: number;
    notesCount: number;
    confidence: ConfidenceLevel;
  };
}

export interface AssessmentResult {
  projectId: string;
  project: Project;
  themesAssessedCount: number;
  totalThemesCount: number;
  totalQuestionsCount: number;
  answeredQuestionsCount: number;
  totalPositiveScore: number;
  totalNegativeScore: number;
  positiveSignalsCount: number;
  negativeSignalsCount: number;
  evidenceGapsCount: number;
  overallConfidence: 'High' | 'Moderate' | 'Low' | 'Preliminary';
  sdgSummaries: SDGImpactSummary[];
  topPositiveSignals: ImpactSignalItem[];
  topNegativeSignals: ImpactSignalItem[];
  assessedAt: string;
}
