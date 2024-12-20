import './App.css';
import React, { useState } from 'react';
import Formulario from './components/Formulario.jsx';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [tareaEditada, setTareaEditada] = useState(null); // Tarea en edición

  // Función para alternar la visibilidad del formulario
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (tareaEditada) setTareaEditada(null); // Limpiar tarea editada al cerrar el formulario
  };

  // Función para agregar o actualizar una tarea
  const agregarTarea = (nuevaTarea) => {
    if (tareaEditada) {
      // Actualizar la tarea editada
      setTareas(tareas.map((tarea) => (tarea.id === tareaEditada.id ? { ...tarea, ...nuevaTarea } : tarea)));
      setTareaEditada(null); // Limpiar tarea editada
    } else {
      // Agregar una nueva tarea con ID único
      const nuevaTareaConId = { ...nuevaTarea, id: Date.now() };
      setTareas([...tareas, nuevaTareaConId]);
    }
    setMostrarFormulario(false); // Ocultar el formulario
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  // Función para cargar una tarea en el formulario para edición
  const editarTarea = (tarea) => {
    setTareaEditada(tarea); // Establecer la tarea a editar
    setMostrarFormulario(true); // Mostrar el formulario
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="titulo">Agenda de Tareas</div>
      </header>

      <div className="row">
        <div className="column">
          <div className="agregar-editar-eliminar">
            {/* Botón para mostrar/ocultar el formulario */}
            <button className="btn-agregar" onClick={toggleFormulario}>
              {mostrarFormulario ? 'Cerrar Formulario' : 'Agregar Tarea'}
            </button>
          </div>

          {/* Formulario para agregar/editar tarea */}
          {mostrarFormulario && (
            <div className="formulario-container">
              <Formulario onAgregarTarea={agregarTarea} tareaEditada={tareaEditada} />
            </div>
          )}

          {/* Lista de tareas */}
          <div className="lista-tareas">
            <div className="subtitulo">Tareas</div>
            <ul>
              {tareas.map((tarea) => (
                <li key={tarea.id} className="tarea-item">
                  <div className="tarea-info">
                    <strong>{tarea.materia}:</strong> {tarea.nombreTarea} <br />
                    <strong>Descripción:</strong> {tarea.descripcion} <br />
                    <strong>Fecha:</strong> {tarea.fecha}
                  </div>
                  <div className="tarea-buttons">
                    <button onClick={() => editarTarea(tarea)} className="btn-editar">
                      Editar
                    </button>
                    <button onClick={() => eliminarTarea(tarea.id)} className="btn-eliminar">
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;