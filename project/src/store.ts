import { create } from 'zustand';
import { UserState } from './types';

export const useStore = create<UserState>((set) => ({
  currentStep: 1,
  businessPlan: {
    description: '',
    businessType: '',
    targetMarket: '',
    services: [],
  },
  setStep: (step) => set({ currentStep: step }),
  updateBusinessPlan: (data) =>
    set((state) => ({
      businessPlan: { ...state.businessPlan, ...data },
    })),
}));