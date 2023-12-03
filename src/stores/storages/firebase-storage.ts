import { createJSONStorage, type StateStorage } from 'zustand/middleware'

const firebaseUrl =
  'https://zustand-storage-am-default-rtdb.firebaseio.com/zustand'

const firebaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      )

      return JSON.stringify(data)
    } catch (error) {
      console.error('getItem error', error)
      return null
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value,
    }).then((res) => res.json())
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name)
  },
}

export const firebaseStorage = createJSONStorage(() => firebaseApi)
