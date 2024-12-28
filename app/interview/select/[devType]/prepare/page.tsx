import TopicSelector from '@/app/_components/TopicSelector';
import { DeveloperType } from '@/app/_types/interview';
import { isDeveloperType } from '@/app/_utils/typeGuards';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';
import SelectLayout from '@/app/interview/select/layout';

interface PreparePageType {
  params: { devType: string };
  searchParams: { topics?: string };
}

export default function PreparePage({ params: { devType }, searchParams: { topics } }: PreparePageType) {
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

function isValidTopicParam(devType: DeveloperType, param: string) {
  const validTopics = Object.keys(DEVELOPER_OPTIONS[devType].topics);

  if (param === 'all') {
    return true;
  }

  return param.split(',').every((topic) => validTopics.includes(topic));
}

function getSelectedTopics(devType: DeveloperType, param: string) {
  const validTopics = Object.keys(DEVELOPER_OPTIONS[devType].topics);

  if (param === 'all') {
    return validTopics;
  }

  return param.split(',');
}
