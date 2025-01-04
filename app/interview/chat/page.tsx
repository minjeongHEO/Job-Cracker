import InterviewChat from '@/app/_components/pages/InterviewChat';
import SelectLayout from '@/app/_components/templates/SelectLayout';
import { getVaildSubTopics } from '@/app/_helpers/interviewHelpers';
import { isDeveloperType, isValidSubTopicParam, isValidTopicParam } from '@/app/_helpers/typeGuards';

import styles from './page.module.scss';
interface ChatPageType {
  searchParams: Promise<{ devType: string; topics: string; subTopics: string }>;
}
export default async function ChatPage({ searchParams }: ChatPageType) {
  const { devType, topics, subTopics: rawSubTopics } = await searchParams;

  if (!devType || !isDeveloperType(devType)) {
    return (
      <SelectLayout title={'개발자 타입 오류'}>
        <div>잘못된 개발자 타입입니다.</div>
      </SelectLayout>
    );
  }

  if (!topics || !isValidTopicParam(devType, topics)) {
    return (
      <SelectLayout title={'주제 오류'}>
        <div>잘못된 주제 입니다.</div>
      </SelectLayout>
    );
  }
  if (!rawSubTopics || !isValidSubTopicParam(devType, topics, rawSubTopics)) {
    return (
      <SelectLayout title={'세부 주제 오류'}>
        <div>잘못된 세부 주제 입니다.</div>
      </SelectLayout>
    );
  }

  const topicArray = topics.split(',');
  const subTopicArray =
    rawSubTopics === 'all' ? topicArray.flatMap((topic) => getVaildSubTopics(devType, topic)) : rawSubTopics.split(',');

  return (
    <div className={styles.chat_page}>
      <InterviewChat devType={devType} topics={topicArray} subTopics={subTopicArray} />
    </div>
  );
}
