import { create } from 'zustand';

import { DeveloperType } from '@/app/_types/interview';

interface InterviewStore {
  devType: DeveloperType | null;
  select: {
    topics: string[];
    subTopics: string[];
  };
  updateDevType: (newDevType: DeveloperType) => void;
  updateSelect: (newSelect: { topics: string[]; subTopics: string[] }) => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  // init state
  devType: null,
  select: {
    topics: [],
    subTopics: [],
  },

  // actions
  updateDevType: (newDevType) => set({ devType: newDevType }),
  updateSelect: ({ topics, subTopics }) => set({ select: { topics, subTopics } }),
}));
