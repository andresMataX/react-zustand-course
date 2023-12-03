import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { userWeddingBoundStore } from '..'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeApi: StateCreator<
  PersonState & Actions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value) => set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value) => set({ lastName: value }, false, 'setLastName'),
})

export const usePersonStore = create<PersonState & Actions>()(
  // devtools(
  persist(storeApi, {
    name: 'person-storage',
  })
  // )
)

usePersonStore.subscribe((nextState, prevState) => {
  console.log(prevState)

  const { firstName, lastName } = nextState

  userWeddingBoundStore.getState().setFirstName(firstName)
  userWeddingBoundStore.getState().setLastName(lastName)
})
