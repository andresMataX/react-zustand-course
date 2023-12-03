import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  ConfirmationSlice,
  createConfirmationSlice,
} from './confirmation.slice'
import { DateSlice, createDateSlice } from './date.slice'
import { GuestSlice, createGuestSlice } from './guest.slice'
import { PersonSlice, createPersonSlice } from './person.slice'

type SharedState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice

export const userWeddingBoundStore = create<SharedState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
)
