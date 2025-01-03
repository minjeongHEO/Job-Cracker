'use client';
import QuestionCard from '@/app/_components/QuestionCard';

import styles from './InterviewChat.module.scss';

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
      <QuestionCard isSelected={false} level={'01'} />
      <QuestionCard isSelected={false} level={'02'} />
      <QuestionCard isSelected={false} level={'03'} />
    </div>
  );
}
