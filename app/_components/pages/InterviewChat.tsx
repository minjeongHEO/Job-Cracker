'use client';

import AnswerSection from './AnswerSection';
import styles from './InterviewChat.module.scss';
import QuestionSection from './QuestionSection';

interface InterviewChatProps {
  devType: string;
  topics: string[];
  subTopics: string[];
}
export default function InterviewChat({ devType, topics, subTopics }: InterviewChatProps) {
  return (
    <div className={styles.main}>
      <div>{devType}</div>
      <div>{topics.join(',')}</div>
      <div>{subTopics.join(',')}</div>
      질문답변 페이지
      <QuestionSection />
      <AnswerSection />
    </div>
  );
}
