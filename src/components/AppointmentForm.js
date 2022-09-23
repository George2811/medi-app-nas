import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AppointmentForm({ createAppointment, updateAppointment, id}) {
    const [show, setShow] = useState(false);

    const [dni, setDni] = useState(0);
    const [doctorName, setDoctorName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
      if(!id){
        createAppointment(dni, doctorName, date, description)
      }
      else{
        updateAppointment(id, dni, doctorName, date, description)
      }
      handleClose()
    }

    return (
      <>
      {
        id?
        <Button variant="warning" onClick={handleShow}>
          Editar
        </Button>
        :
        <Button variant="primary" className='my-5' onClick={handleShow}>
          + Agendar Cita
        </Button>

      }
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            {id?
            <Modal.Title>Editar Cita Médica</Modal.Title>
            :
            <Modal.Title>Nueva Cita Médica</Modal.Title>
            }
          </Modal.Header>
          <Form>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="number" placeholder="DNI del paciente" value={dni} onChange={(e)=> setDni(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Control type="text" placeholder="Nombre del doctor" value={doctorName} onChange={(e)=> setDoctorName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCalendar">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e)=> setDate(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ControlTextarea1">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control  as="textarea" placeholder="Breve descripción" rows={3} value={description} onChange={(e)=> setDescription(e.target.value)} />
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }