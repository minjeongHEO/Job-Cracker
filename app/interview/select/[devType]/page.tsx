import TopicSelector from '@/app/_components/TopicSelector';
import { DeveloperType } from '@/app/_types/interview';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';

import SelectLayout from '../layout';

export default async function DevTypePage({ params: { devType } }: { params: { devType: DeveloperType } }) {
  const selectedDevOptions = Object.keys(DEVELOPER_OPTIONS[devType].topics);

  if (!selectedDevOptions) {
    return <div>Invalid developer type</div>;
  }

  return (
    <SelectLayout title={`어떤 주제로 ${devType} 면접을 준비하시겠어요?`}>
      <TopicSelector devType={devType} topics={selectedDevOptions}></TopicSelector>
    </SelectLayout>
  );
}
