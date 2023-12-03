import { JiraTasks } from '../../components'
import { useTaskStore } from '../../stores'

export const JiraPage = () => {
  const pendingTasks = useTaskStore((state) => state.getTaskByStatus('OPEN'))
  const inProgressTasks = useTaskStore((state) =>
    state.getTaskByStatus('IN_PROGRESS')
  )
  const doneTasks = useTaskStore((state) => state.getTaskByStatus('DONE'))

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <JiraTasks title='Pendientes' tasks={pendingTasks} status='OPEN' />

        <JiraTasks
          title='Avanzando'
          tasks={inProgressTasks}
          status='IN_PROGRESS'
        />

        <JiraTasks title='Terminadas' tasks={doneTasks} status='DONE' />
      </div>
    </>
  )
}
