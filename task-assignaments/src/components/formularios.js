import React, { useContext, useState, useEffect } from 'react'
import { EstadosContext } from '../context/estados'

const Form = ({ onClose }) => {
  const { addTask, editTask, editingTask } = useContext(EstadosContext)
  const [taskText, setTaskText] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTaskText(editingTask.text)
      setTaskDescription(editingTask.description)
      setTaskDate(editingTask.date)
    } else {
      setTaskText('')
      setTaskDescription('')
      setTaskDate('')
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskText.trim()) {
      alert('Por favor ingresa una tarea válida.')
      return
    }

    const task = {
      id: editingTask ? editingTask.id : Date.now(),
      text: taskText,
      description: taskDescription,
      date: taskDate,
    }

    if (editingTask) {
      editTask(task.id, task)
    } else {
      addTask(task)
    }

    // Limpiar los campos y cerrar el formulario
    setTaskText('')
    setTaskDescription('')
    setTaskDate('')
    onClose()
  }

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Título de la tarea"
          required
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Descripción de la tarea"
          required
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          required
        />
        <button type="submit">
          {editingTask ? 'Actualizar Tarea' : 'Agregar Tarea'}
        </button>
      </form>
    </div>
  )
}

export default Form
