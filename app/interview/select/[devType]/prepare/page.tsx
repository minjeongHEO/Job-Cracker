import TopicSelector from '@/app/_components/TopicSelector';
import { DeveloperType } from '@/app/_types/interview';
import { isDeveloperType } from '@/app/_utils/typeGuards';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';
import SelectLayout from '@/app/interview/select/layout';

interface PreparePageType {
  params: { devType: string };
  searchParams: { topics?: string };
}

export default function PreparePage({ params, searchParams }: PreparePageType) {
  const isTopicByDevType = (devType: DeveloperType, topicsParam: string) => {
    if (topicsParam === 'all') return true;
    const validTopics = Object.keys(DEVELOPER_OPTIONS[devType].topics);
    return topicsParam.split(',').every((topic) => validTopics.includes(topic));
  };

  const devType = params.devType;
  if (!devType || !isDeveloperType(devType)) {
    return (
      <SelectLayout title={'개발자 타입 오류'}>
        <div>잘못된 개발자 타입입니다.</div>
      </SelectLayout>
    );
  }

  const topicsParam = searchParams.topics;
  if (!topicsParam || !isTopicByDevType(devType, topicsParam)) {
    return (
      <SelectLayout title={'주제 오류'}>
        <div>잘못된 주제 입니다.</div>
      </SelectLayout>
    );
  }

  const selectedTopics =
    topicsParam === 'all' ? Object.keys(DEVELOPER_OPTIONS[devType].topics) : topicsParam.split(',');

  const subTopics = selectedTopics.flatMap((topic) => DEVELOPER_OPTIONS[devType].topics[topic] || []);

  return (
    <SelectLayout title={'세부 내용을 선택하시면 관련 면접 질문을 준비해드릴게요!'}>
      <TopicSelector variant={'subTopic'} devType={devType} topics={subTopics}></TopicSelector>
    </SelectLayout>
  );
}
