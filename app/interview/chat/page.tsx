import InterviewChat from '@/app/_components/InterviewChat';
import { isDeveloperType, isValidSubTopicParam, isValidTopicParam } from '@/app/_helpers/typeGuards';
import SelectLayout from '@/app/interview/select/_components/SelectLayout';

interface ChatPageType {
  searchParams: Promise<{ devType: string; topics: string; subTopics: string }>;
}
export default async function ChatPage({ searchParams }: ChatPageType) {
  const { devType, topics, subTopics } = await searchParams;

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
  if (!subTopics || !isValidSubTopicParam(devType, topics, subTopics)) {
    return (
      <SelectLayout title={'세부 주제 오류'}>
        <div>잘못된 세부 주제 입니다.</div>
      </SelectLayout>
    );
  }

  return (
    <div>
      <InterviewChat devType={devType} topics={topics.split(',')} subTopics={subTopics.split(',')} />
    </div>
  );
}
