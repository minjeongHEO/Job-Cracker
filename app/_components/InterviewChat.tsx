'use client';
interface InterviewChatProps {
  devType: string;
  topics: string[];
  subTopics: string[];
}
export default function InterviewChat({ devType, topics, subTopics }: InterviewChatProps) {
  return (
    <div>
      <div>{devType}</div>
      <div>{topics.join(',')}</div>
      <div>{subTopics.join(',')}</div>
    </div>
  );
}
