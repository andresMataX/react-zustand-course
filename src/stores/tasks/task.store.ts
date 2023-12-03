import { v4 as uuid } from 'uuid'
import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Task, TaskStatus } from '../../interfaces'

interface TaskState {
  tasks: Record<string, Task> // { [key: string]: Task }
  draggingTaskId?: string
  getTaskByStatus: (status: TaskStatus) => Task[]
  getNumberOfTasks: () => number
  addTask: (title: string, status: TaskStatus) => void
  setDraggingTaskId: (id: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (id: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState, [['zustand/immer', never]]> = (
  set,
  get
) => ({
  draggingTaskId: undefined,

  tasks: {
    'ABC-1': {
      id: 'ABC-1',
      title: 'Task 1',
      status: 'OPEN',
    },
    'ABC-2': {
      id: 'ABC-2',
      title: 'Task 2',
      status: 'IN_PROGRESS',
    },
    'ABC-3': {
      id: 'ABC-3',
      title: 'Task 3',
      status: 'OPEN',
    },
    'ABC-4': {
      id: 'ABC-4',
      title: 'Task 4',
      status: 'OPEN',
    },
  },

  getTaskByStatus: (status) => {
    const tasks = Object.values(get().tasks)
    const filteredTasks = tasks.filter((task) => task.status === status)
    return filteredTasks
  },

  getNumberOfTasks: () => {
    const tasks = Object.values(get().tasks)
    return tasks.length
  },

  addTask: (title, status) => {
    const newTask: Task = {
      id: uuid(),
      title,
      status,
    }

    set((state) => {
      state.tasks[newTask.id] = newTask
    })

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }))

    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask
    //   })
    // )
  },

  setDraggingTaskId: (id) => set({ draggingTaskId: id }),

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (id, status) => {
    // const task = get().tasks[id]
    // task.status = status
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [id]: task,
    //   },
    // }))

    set((state) => {
      state.tasks[id] = {
        ...state.tasks[id],
        status,
      }
    })
  },

  onTaskDrop: (status) => {
    const id = get().draggingTaskId
    if (!id) return

    get().changeTaskStatus(id, status)
    get().removeDraggingTaskId()
  },
})

export const useTaskStore = create<TaskState>()(
  // devtools(
  persist(immer(storeApi), {
    name: 'task-store',
  })
  // )
)
