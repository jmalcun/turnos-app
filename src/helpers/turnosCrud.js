import Swal from "sweetalert2"

const url = 'http://localhost:4000/turnos'

export const getTurnosDia = async(fecha) => {

    const resp = await fetch(`http://localhost:4000/turnos?fecha=${fecha}`)
    const data = await resp.json()
    return data;
}





export const postTurno = async(turno) => {
    
    try {
       await fetch(url, {
            method: 'POST',
            body: JSON.stringify(turno),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        Swal.fire('turno agendado correctamente', '','success' )
    } catch (error) {
        console.log(error)
    }
}

export const deleteTurno = async(id) => {

    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE'  
        })
        Swal.fire('turno eliminado correctamente', '','success')
    } catch (error) {
        console.log(error)
    }
}