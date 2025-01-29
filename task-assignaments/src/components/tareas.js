import { useContext, useState } from 'react'
import { EstadosContext } from '../context/estados'

const Tareas = ({ task }) => {
  const { editTask, deleteTask } = useContext(EstadosContext)
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(task.text)
  const [newDescription, setNewDescription] = useState(task.description)
  const [newDate, setNewDate] = useState(task.date)

  const handleEdit = () => {
    editTask(task.id, {
      ...task,
      text: newText,
      description: newDescription,
      date: newDate,
    })
    setIsEditing(false)
  }

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button onClick={handleEdit}>Guardar</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <p>{task.description}</p>
          <p>Fecha: {task.date}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </>
      )}
    </div>
  )
}

export default Tareas
