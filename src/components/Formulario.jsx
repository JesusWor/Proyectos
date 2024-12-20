import React, { useState, useEffect } from 'react';
import './Formulario.css';

const Formulario = ({ onAgregarTarea, tareaEditada }) => {
  const [materia, setMateria] = useState('');
  const [nombreTarea, setNombreTarea] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (tareaEditada) {
      setMateria(tareaEditada.materia);
      setNombreTarea(tareaEditada.nombreTarea);
      setDescripcion(tareaEditada.descripcion);
      setFecha(tareaEditada.fecha);
    }
  }, [tareaEditada]);

  const validarCampo = (valor, campo) => {
    let esValido = valor.trim().length > 0;
    setErrores((prev) => ({ ...prev, [campo]: !esValido }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'materia':
        setMateria(value);
        validarCampo(value, 'materia');
        break;
      case 'nombreTarea':
        setNombreTarea(value);
        validarCampo(value, 'nombreTarea');
        break;
      case 'descripcion':
        setDescripcion(value);
        validarCampo(value, 'descripcion');
        break;
      case 'fecha':
        setFecha(value);
        validarCampo(value, 'fecha');
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposValidados = {
      materia: !!materia.trim(),
      nombreTarea: !!nombreTarea.trim(),
      descripcion: !!descripcion.trim(),
      fecha: !!fecha.trim(),
    };

    setErrores(camposValidados);

    const hayErrores = Object.values(camposValidados).some((esValido) => !esValido);

    if (!hayErrores) {
      onAgregarTarea({ materia, nombreTarea, descripcion, fecha });
      setMateria('');
      setNombreTarea('');
      setDescripcion('');
      setFecha('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="materia"
        value={materia}
        onChange={handleChange}
        placeholder="Materia"
        className={`formulario__input ${errores.materia ? 'formulario__input-incorrecto' : ''}`}
      />
      <input
        type="text"
        name="nombreTarea"
        value={nombreTarea}
        onChange={handleChange}
        placeholder="Nombre de la Tarea"
        className={`formulario__input ${errores.nombreTarea ? 'formulario__input-incorrecto' : ''}`}
      />
      <input
        type="text"
        name="descripcion"
        value={descripcion}
        onChange={handleChange}
        placeholder="Descripción de la Tarea"
        className={`formulario__input ${errores.descripcion ? 'formulario__input-incorrecto' : ''}`}
      />
      <input
        type="date"
        name="fecha"
        value={fecha}
        onChange={handleChange}
        className={`formulario__input ${errores.fecha ? 'formulario__input-incorrecto' : ''}`}
      />
      <button type="submit" className="btn-enviar">
        {tareaEditada ? 'Actualizar Tarea' : 'Agregar Tarea'}
      </button>
    </form>
  );
};

export default Formulario;
