import React, { useEffect, useState } from 'react'
import { getTurnosDia } from '../helpers/turnosCrud'
import { DatosPaciente } from './DatosPaciente'
import { TurnoCard } from './TurnoCard'
import moment from 'moment'
import 'moment/locale/es';

export const HomeScreen = () => {

    const [fech, setFech] = useState({
        fecha:'',
    })

    const [mostrarr, setMostrar] = useState({
        mostrar:false,
        noTurno:false
    })

    const [turnos, setTurnos] = useState([])

    const{fecha} = fech
    const {mostrar,noTurno} = mostrarr
    console.log(turnos)

    const handleFechaChange = ({target}) => {
        setFech({
            [ target.name ]: target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        getTurnosDia(fecha)
            .then(turno => {
                if(turno.length !== 0){
                    setTurnos([turno])
                    setMostrar({
                        mostrar:true,
                        noTurno:false,
                    }) 
                }else setMostrar({
                    mostrar:true,
                    noTurno:true
                })})      
    }

    const handleReset = () => {
        setFech({
            fecha:''
        })
        setMostrar({
            mostrar:false,
            noTurno:false
        })
        setTurnos([])
    }

    const fechaAct = moment(fecha).format('LL')


    return (
        <>
          <h1 className="titulo"> ADMINISTRADOR DE TURNOS </h1>
          <div className="container">
              <div className="datos">
                  <h2 className="subtitulo">Datos del paciente</h2>
                  <DatosPaciente turnos={turnos}  setTurnos={setTurnos} />   
              </div>
              <div className="turnos">
                    <h2 className="subtitulo">Turnos</h2>
                    <h4 className="buscar">Buscar Turnos</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label>Fecha:</label>
                            <input type="date" name="fecha" value={fecha} onChange={handleFechaChange} />
                            <div className="div-buttons">
                                <button type="submit">Buscar</button>
                                <button type="reset" className="color-blue-btn" onClick={handleReset}>Reset</button>
                            </div>
                            
                        </div> 
                    </form>
                    {
                        (mostrar)
                            &&<p className="fecha-turnos">{fechaAct}</p>
                            
                    }
                    {
                        (noTurno)
                            &&<div className="red-alert">
                                <p>No hay turnos para esta fecha</p>
                            </div>
                    }
                    
                    
                    {
                      (turnos.length !== 0)
                            && turnos[0].map( t => (
                                <TurnoCard key={t.id} {...t} setTurnos={setTurnos} />   
                            ))
                            
                    }                
                  
              </div>
          </div>
        </>
    )
}

