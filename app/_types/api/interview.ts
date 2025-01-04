import { BadgeShadeType, DeveloperType } from '../interview';

export interface GenerateQuestionRequest {
  devType: DeveloperType;
  topic: string[];
  subTopic: string[];
}

export interface GenerateQuestionResponse {
  question: string;
  importance: BadgeShadeType;
  keywords: string[];
}
