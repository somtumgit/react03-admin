import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

export default function ModalUI(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}

        </Modal.Body>
        <Modal.Footer>
          {
            props.buttons ?
            <div>
              {
                props.buttons.map((btn,index) => 
                (<Button className='ms-1' key={index} variant={btn.color} onClick={btn.onClick}>
                  {btn.label}
                </Button>)
                )
              }
              
            </div>
            :
            <div>
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>&nbsp;
              <Button variant="primary" onClick={props.handleSubmit} style={{display: props.displaySubmit}}>
                Save Changes
              </Button>
            </div>
          }
          
        </Modal.Footer>
    </Modal>
  )
}
