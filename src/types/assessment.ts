export interface AssessmentQuestion {
  id: string;
  type: 'likert' | 'mcq' | 'ranking' | 'scenario' | 'forced-choice';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string | string[];
}

export interface PsychometricScores {
  interestScale: number;
  personalityCompatibility: number;
  cognitiveStyle: number;
  motivationDrivers: number;
  workingPreferences: number;
  overallFit: number;
}

export interface TechnicalScores {
  logicalReasoning: number;
  numericalAbility: number;
  scienceKnowledge: number;
  domainSpecific: number;
  overallReadiness: number;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
  overall: number;
}

export interface AssessmentResults {
  psychometric: PsychometricScores;
  technical: TechnicalScores;
  wiscar: WISCARScores;
  recommendation: 'yes' | 'maybe' | 'no';
  confidenceScore: number;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  alternativeCareers?: string[];
}

export interface CareerRole {
  title: string;
  description: string;
  requirements: string[];
  salary?: string;
  growth?: string;
}

export interface LearningPath {
  phase: string;
  title: string;
  description: string;
  duration: string;
  modules: string[];
}