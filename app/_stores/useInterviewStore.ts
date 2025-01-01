import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DeveloperType } from '@/app/_types/interview';

interface InterviewStore {
  devType: DeveloperType | null;
  select: {
    topics: string[];
    subTopics: string[];
  };
  updateDevType: (newDevType: DeveloperType) => void;
  updateSelect: (newSelect: Partial<{ topics: string[]; subTopics: string[] }>) => void;
}

export const useInterviewStore = create<InterviewStore>()(
  devtools(
    (set) => ({
      devType: null,
      select: {
        topics: [],
        subTopics: [],
      },
      updateDevType: (newDevType) => set({ devType: newDevType }),
      updateSelect: (newSelect) =>
        set((state) => ({
          select: {
            ...state.select,
            ...newSelect,
          },
        })),
    }),
    {
      name: 'Interview Store',
    }
  )
);
