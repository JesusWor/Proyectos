import { createContext, useState, useEffect } from 'react'

// Crear el contexto
export const EstadosContext = createContext()

// Proveedor del contexto
export const Estados = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    // Cargar tareas desde localStorage al iniciar
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Guardar tareas en localStorage cada vez que cambian
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    if (!task.text.trim()) {
      setError('Favor de ingresar una tarea')
      return
    }
    setTasks([...tasks, task])
    setNotification('Tarea agregada con éxito')
    setError('')
    setTimeout(() => setNotification(''), 3000)
  }

  const editTask = (id, updatedData) => {
    if (!updatedData.text.trim()) {
      setError('El campo está vacío')
      return
    }

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedData } : task))
    )
    setError('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <EstadosContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, notification }}
    >
      {children}
    </EstadosContext.Provider>
  )
}
