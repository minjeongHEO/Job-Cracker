import { DeveloperType, QuestionState } from '../interview';

export interface GenerateQuestionRequest {
  devType: DeveloperType;
  topics: string[];
  subTopics: string[];
}
export interface GenerateAnotherQuestionRequest extends GenerateQuestionRequest {
  questionState: QuestionState;
}

export type GenerateQuestionResponse = Pick<QuestionState, 'question' | 'importance' | 'keywords' | 'titleTopic'>;

export interface GenerateFeedbackAnswerRequest {
  topics: string[];
  question: string;
  userAnswer: string;
}
export interface GenerateFeedbackAnswerResponse {
  score: number;
  feedBack: string;
  improvedAnswer: string;
  followUpQuestion: GenerateQuestionResponse;
}
