import TopicSelector from '@/app/_components/TopicSelector';
import { DeveloperType } from '@/app/_types/interview';
import { isDeveloperType } from '@/app/_utils/typeGuards';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';
import SelectLayout from '@/app/interview/select/layout';

export default async function DevTypePage({ params: { devType } }: { params: { devType: DeveloperType } }) {
  if (!devType || !isDeveloperType(devType)) {
    return (
      <SelectLayout title={'개발자 타입 오류'}>
        <div>잘못된 개발자 타입입니다.</div>
      </SelectLayout>
    );
  }

  const selectedDevOptions = Object.keys(DEVELOPER_OPTIONS[devType].topics);

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
