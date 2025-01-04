import { BadgeShadeType, DeveloperType } from '../interview';

export interface GenerateQuestionRequest {
  devType: DeveloperType;
  topics: string[];
  subTopics: string[];
}

export interface GenerateQuestionResponse {
  question: string;
  importance: BadgeShadeType;
  keywords: string[];
}
