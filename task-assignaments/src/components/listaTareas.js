import { useContext } from 'react'
import { EstadosContext } from '../context/estados'
import Tarea from './tareas'

const ListaTarea = () => {
  const { tasks } = useContext(EstadosContext)

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => <Tarea key={task.id} task={task} />)
      ) : (
        <p>No hay tareas</p>
      )}
    </div>
  )
}

export default ListaTarea
