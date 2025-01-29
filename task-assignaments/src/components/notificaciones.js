import { useContext } from 'react'
import { EstadosContext } from '../context/estados'

const Notificacion = () => {
  const { notification } = useContext(EstadosContext)

  return notification ? (
    <div className="notificacion">{notification}</div>
  ) : null
}

export default Notificacion
