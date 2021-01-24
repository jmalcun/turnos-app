import React from 'react'
import Swal from 'sweetalert2'
import { deleteTurno, getTurnosDia } from '../helpers/turnosCrud'



export const TurnoCard = ({id,nombre,dni,telefono,fecha,hora, setTurnos}) => {

    
    
    
    const handleDelete = (idu) => {
        deleteTurno(idu)
        getTurnosDia(fecha)
            .then(turno =>  setTurnos([turno]) )
    }
    
    const handleClick = (name,doc,tel) =>{
        Swal.fire(`${name}`, `DNI: ${doc} - Telefono: ${tel}`, `info`)
    }

    return (
        <>
            <div className="card">
                <div className="datos-turno">
                    
                        <p>{hora}hs</p>
                        <p>{nombre}</p>
                        <button onClick={e => handleClick(nombre,dni,telefono)}>ver datos</button>
                        <button className="borrar-turno-btn" onClick={ e => handleDelete(id)}><i className="fas fa-trash-alt"></i>borrar</button>  
                     
                </div>
            
            </div>  
        </>
    )
}
