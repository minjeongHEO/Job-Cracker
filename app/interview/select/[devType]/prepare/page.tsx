import TopicSelector from '@/app/_components/TopicSelector';
import { getSelectedTopics, isValidTopicParam } from '@/app/_helpers/interviewHelpers';
import { isDeveloperType } from '@/app/_utils/typeGuards';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';
import SelectLayout from '@/app/interview/select/_components/SelectLayout';

interface PreparePageType {
  params: Promise<{ devType: string }>;
  searchParams: Promise<{ topics?: string }>;
}

export default async function PreparePage({ params, searchParams }: PreparePageType) {
  const [{ devType }, { topics }] = await Promise.all([params, searchParams]);

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

  const selectedTopics = getSelectedTopics(devType, topics);

  const subTopics = selectedTopics.flatMap((topic) => DEVELOPER_OPTIONS[devType].topics[topic] || []);

  return (
    <SelectLayout title={'세부 내용을 선택하시면 관련 면접 질문을 준비해드릴게요!'}>
      <TopicSelector variant={'subTopic'} devType={devType} topics={subTopics}></TopicSelector>
    </SelectLayout>
  );
}
