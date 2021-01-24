import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { getTurnosDia, postTurno } from '../helpers/turnosCrud';

export const DatosPaciente = ({turnos,setTurnos}) => {

    const [paciente, setPaciente] = useState({
        id: Date.now(),
        nombre:'',
        dni:'',
        telefono:'',
        fecha:'',
        hora:''
    })

    const [dis1, setDisabled1] = useState({
        disabled1:false
    })
    const [dis2, setDisabled2] = useState({
        disabled2:false
    })
    const [dis3, setDisabled3] = useState({
        disabled3:false
    })
    const [dis4, setDisabled4] = useState({
        disabled4:false
    })

    let {disabled1} = dis1
    let {disabled2} = dis2
    let {disabled3} = dis3
    let {disabled4} = dis4

    const {id,nombre,dni,telefono,fecha,hora} = paciente;

    const handleInputChange = ({target}) => {
        setPaciente({
            ...paciente,
            [ target.name ]: target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(validaciones()){
            postTurno(paciente)
        }else {
            Swal.fire('todos los campos son obligatorios', '', 'error')
        }
        
        setPaciente({
            id: Date.now(),
            nombre:'',
            dni:'',
            telefono:'',
            fecha:'',
            hora:''
        })
    }

    const validaciones = () => {
        if(nombre === '' || dni === '' || telefono === '' || fecha === '' || hora === ''){
            return false
        }else return true;
    }

    
    useEffect(() => {
        const validarTurnoDia = async(fecha) => {
            let turnosDia= await getTurnosDia(fecha)
            console.log(turnosDia)
            if(turnosDia.length !== 0){
                turnosDia.forEach( t => {
                    if(t.hora === '18:00'){
                        setDisabled1({
                            disabled1:true
                        })
                    }
                    if(t.hora === '18:30'){
                        setDisabled2({
                            disabled2:true
                        })
                    }
                    if(t.hora === '19:00'){
                        setDisabled3({
                            disabled3:true
                        })
                    }
                    if(t.hora === '19:30'){
                        setDisabled4({
                            disabled4:true
                        })
                    }
                })       
            }
            
        }
    
        validarTurnoDia(fecha)
        return () => {
            setDisabled1({
                disabled1:false,
            })
            setDisabled2({
                disabled2:false
            })
            setDisabled3({
                disabled3:false
            })
            setDisabled4({
                disabled4:false
            })
        
        }
    }, [fecha])
    
    
    
    
    return (
        <>
           <form onSubmit={handleSubmitForm}>  
                <label>Nombre y Apellido</label>
                <input 
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handleInputChange}
                ></input>
                <label>DNI</label> 
                <input 
                    type="number"
                    name="dni"
                    value={dni}
                    onChange={handleInputChange} 
                ></input>
                <label>Telefono</label>
                <input 
                    type="number"
                    name="telefono"
                    value={telefono}
                    onChange={handleInputChange} 
                ></input>
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    value={fecha}
                    onChange={handleInputChange} 
                ></input>
                <label>Hora</label>
                <select name="hora" value={hora} onChange={handleInputChange}  >
                    <option value="">...</option>
                    <option value="18:00" disabled={(disabled1) ?true :false}>18:00</option>
                    <option value="18:30" disabled={(disabled2) ?true :false}>18:30</option>
                    <option value="19:00"disabled={(disabled3) ?true :false}>19:00</option>
                    <option value="19:30" disabled={(disabled4) ?true :false}>19:30</option>
                </select>
                <button type="submit">AGENDAR TURNO</button>
           </form> 

        </>
    )
}
