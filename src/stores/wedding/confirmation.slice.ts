import { StateCreator } from 'zustand'

export interface ConfirmationSlice {
  isConfirmed: boolean
  setIsConfirmed: (isConfirmed: boolean) => void
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (
  set
) => ({
  isConfirmed: false,
  setIsConfirmed: (isConfirmed) => set({ isConfirmed }),
})
