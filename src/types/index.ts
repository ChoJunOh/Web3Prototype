export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  vaccinated: boolean;
  imageUrl?: string;
}
export interface User {
  id: string;
  email: string;
  did: string;
  pets: Pet[];
  trustLevel: number;
  points: number;
  tokens: number;
  sbtBadges: SBTBadge[];
}
export interface SBTBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'survey' | 'photo' | 'video' | 'health-record';
  reward: number;
  deadline?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'verified';
}
export interface TaskSubmission {
  id: string;
  taskId: string;
  petId: string;
  responses: Record<string, any>;
  aiAnalysis?: AIAnalysis;
  zkmlVerified: boolean;
  status: 'pending' | 'analyzing' | 'verified' | 'rejected';
  submittedAt: Date;
}
export interface AIAnalysis {
  result: string;
  confidence: number;
  details: string;
  recommendations?: string[];
}
export interface AggregatedResult {
  taskId: string;
  finalResult: string;
  aiConfidence: number;
  communityAverage: number;
  needsValidation: boolean;
  similarCases: number;
}
export interface Reward {
  id: string;
  type: 'task-completion' | 'validation' | 'staking' | 'bonus';
  amount: number;
  description: string;
  receivedAt: Date;
}
export interface HealthRecord {
  id: string;
  petId: string;
  date: Date;
  type: 'behavior' | 'health' | 'vaccination' | 'checkup';
  title: string;
  description: string;
  images?: string[];
  aiAnalysis?: AIAnalysis;
}
export interface ValidationTask {
  id: string;
  submissionId: string;
  petName: string;
  taskType: string;
  submittedData: any;
  aiAnalysis: AIAnalysis;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}