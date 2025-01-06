import { BadgeShadeType, DeveloperType, QuestionState } from '../interview';

export interface GenerateQuestionRequest {
  devType: DeveloperType;
  topics: string[];
  subTopics: string[];
}
export interface GenerateAnotherQuestionRequest extends GenerateQuestionRequest {
  questionState: QuestionState;
}

export interface GenerateQuestionResponse {
  question: string;
  importance: BadgeShadeType;
  keywords: string[];
  titleTopic: string;
}
