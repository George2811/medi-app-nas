import { useState, useEffect } from 'react';
import {Button, Table} from 'react-bootstrap';
import AppointmentForm from './AppointmentForm';

export default function TableHome() {
    const [appointments, setAppointments] = useState([]);

    useEffect(()=>{
        getAppointments()
    }, []);

    const getAppointments = () =>{
        fetch("http://localhost:8080/api/")
        .then(res => {
            return res.json();
        })
        .then(res => {
            setAppointments(res.content);
        })
        .catch(err => console.log(err))
    }

    const createAppointment = (dni, doctorName, date, description) =>{
        fetch(`http://localhost:8080/api/`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
            body: JSON.stringify({  
                dni: dni,
                doctorName: doctorName,
                date: date,
                description: description
            })
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            getAppointments();
        })
        .catch(err => console.log(err))
    }

    const updateAppointment = (id, dni, doctorName, date, description) =>{
        fetch(`http://localhost:8080/api/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
            body: JSON.stringify({  
                dni: dni,
                doctorName: doctorName,
                date: date,
                description: description
            })
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            getAppointments();
        })
        .catch(err => console.log(err))
    }

    const deleteAppointment = (id) =>{
        fetch(`http://localhost:8080/api/${id}`, {method: 'DELETE'})
        .then(res => {
            return res;
        })
        .then(res => {
            getAppointments();
        })
        .catch(err => console.log(err))
    }

    function toText(text){
        let dateResult = new Date(text);
        return `${dateResult.getDate()} - ${dateResult.getMonth()+1} - ${dateResult.getFullYear()}`
    }

    return(
        <>
        <AppointmentForm createAppointment={createAppointment} toEdit={false}/>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>DNI</th>
                <th>Doctor</th>
                <th>Horario</th>
                <th>Description</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    appointments && appointments.map((ap, index) => (
                        <tr key={ap.id}>
                            <td>{index+1}</td>
                            <td>{ap.dni}</td>
                            <td>{ap.doctorName}</td>
                            <td>{toText(ap.date)}</td>
                            <td>{ap.description}</td>
                            <td>
                                <AppointmentForm id={ap.id} updateAppointment={updateAppointment}></AppointmentForm>{' '}
                                <Button variant="danger" onClick={() => deleteAppointment(ap.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </>
    );    
}
