import React from 'react';
import { Form } from 'react-bootstrap';

export default function Input(props) {
  // console.log(props);
  let input = null;
  switch(props.type) {
    case 'select':
      input = <Form.Group className="mb-3" >
                  {props.label && <Form.Label>{props.label}</Form.Label>}
                  <select 
                    className='form-control'
                    value={props.value}
                    onChange={props.onChange}
                  >
                    <option value="">{props.placeholder}</option>
                    {
                      props.options.length > 0 ?
                      props.options.map((option,index) => 
                        <option key={index} value={option.value}>{option.name }</option>  
                        
                      ):
                      null
                    }
                  </select>
              </Form.Group>
      break;
    case 'text':
    default:
      input = <Form.Group className="mb-3" >
                  {props.label && <Form.Label>{props.label}</Form.Label>}
                  <Form.Control className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} autoComplete="current-password" {...props}/>
                  <Form.Text className="text-muted">
                      {props.errorMessage}
                  </Form.Text>
              </Form.Group>
  }

  return input;
}
