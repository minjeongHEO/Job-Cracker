import TopicSelector from '@/app/_components/molecules/TopicSelector';
import SelectLayout from '@/app/_components/templates/SelectLayout';
import { getSelectedTopics, getValidSubTopics } from '@/app/_helpers/interviewHelpers';
import { isDeveloperType, isValidTopicParam } from '@/app/_helpers/typeGuards';

interface PreparePageType {
  params: Promise<{ devType: string }>;
  searchParams: Promise<{ topics?: string }>;
}

export default async function PreparePage({ params, searchParams }: PreparePageType) {
  const [{ devType }, { topics }] = await Promise.all([params, searchParams]);

  if (!devType || !isDeveloperType(devType)) throw new Error('개발자 타입 오류');

  if (!topics || !isValidTopicParam(devType, topics)) throw new Error('주제 오류');

  const selectedTopics = getSelectedTopics(devType, topics);
  const subTopics = selectedTopics.flatMap((topic) => getValidSubTopics(devType, topic) || []);

  return (
    <SelectLayout title={'세부 내용을 선택하시면 관련 면접 질문을 준비해드릴게요!'}>
      <TopicSelector variant={'subTopic'} devType={devType} topics={subTopics}></TopicSelector>
    </SelectLayout>
  );
}
