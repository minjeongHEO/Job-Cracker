import TopicSelector from '@/app/_components/molecules/TopicSelector';
import SelectLayout from '@/app/_components/templates/SelectLayout';
import { getValidTopics } from '@/app/_helpers/interviewHelpers';
import { isDeveloperType } from '@/app/_helpers/typeGuards';
import { DeveloperType } from '@/app/_types/interview';

export default async function DevTypePage({ params }: { params: Promise<{ devType: DeveloperType }> }) {
  const { devType } = await params;

  if (!devType || !isDeveloperType(devType)) throw new Error('개발자 타입 오류');

  const selectedDevOptions = getValidTopics(devType);
  if (!selectedDevOptions?.length) throw new Error('주제 로드 오류');

  return (
    <SelectLayout title={`어떤 주제로 ${devType} 면접을 준비하시겠어요?`}>
      <TopicSelector devType={devType} topics={selectedDevOptions}></TopicSelector>
    </SelectLayout>
  );
}
