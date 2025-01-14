import InterviewChat from '@/app/_components/pages/InterviewChat';
import { getValidSubTopics } from '@/app/_helpers/interviewHelpers';
import { isDeveloperType, isValidSubTopicParam, isValidTopicParam } from '@/app/_helpers/typeGuards';

import styles from './page.module.scss';
interface ChatPageType {
  searchParams: Promise<{ devType: string; topics: string; subTopics: string }>;
}
export default async function ChatPage({ searchParams }: ChatPageType) {
  const { devType, topics, subTopics: rawSubTopics } = await searchParams;

  if (!devType || !isDeveloperType(devType)) throw new Error('개발자 타입 오류');
  if (!topics || !isValidTopicParam(devType, topics)) throw new Error('주제 오류');
  if (!rawSubTopics || !isValidSubTopicParam(devType, topics, rawSubTopics)) throw new Error('세부 주제 오류');

  const topicArray = topics.split(',');
  const subTopicArray =
    rawSubTopics === 'all' ? topicArray.flatMap((topic) => getValidSubTopics(devType, topic)) : rawSubTopics.split(',');

  return (
    <div className={styles.chat_page}>
      <InterviewChat devType={devType} topics={topicArray} subTopics={subTopicArray} />
    </div>
  );
}
