export type DeveloperType = 'frontEnd' | 'backEnd' | 'iOS';

export type TopicDetails = string[];

export type TechTopics = {
  [key: string]: TopicDetails;
};

export type TopicsType = {
  [K in DeveloperType]: TechTopics;
};
