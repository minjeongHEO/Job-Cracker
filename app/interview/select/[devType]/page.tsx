import TopicSelector from '@/app/_components/TopicSelector';
import { getVaildTopics } from '@/app/_helpers/interviewHelpers';
import { DeveloperType } from '@/app/_types/interview';
import { isDeveloperType } from '@/app/_utils/typeGuards';
import SelectLayout from '@/app/interview/select/_components/SelectLayout';

export default async function DevTypePage({ params }: { params: Promise<{ devType: DeveloperType }> }) {
  const { devType } = await params;

  if (!devType || !isDeveloperType(devType)) {
    return (
      <SelectLayout title={'개발자 타입 오류'}>
        <div>잘못된 개발자 타입입니다.</div>
      </SelectLayout>
    );
  }

  const selectedDevOptions = getVaildTopics(devType);

  if (!selectedDevOptions?.length) {
    return (
      <SelectLayout title={'주제 로드 오류'}>
        <div>{devType} 개발자 유형에 대한 주제를 찾을 수 없습니다.</div>
      </SelectLayout>
    );
  }

  return (
    <SelectLayout title={`어떤 주제로 ${devType} 면접을 준비하시겠어요?`}>
      <TopicSelector devType={devType} topics={selectedDevOptions}></TopicSelector>
    </SelectLayout>
  );
}
