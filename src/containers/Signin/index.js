import React, { useEffect, useState, Component } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Form,Button,Container,Row,Col } from 'react-bootstrap';
import { isUserLoggedIn, login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export default function Signin() {
  const [email,setEmail] = useState('admin@gmail.com');
  const [password,setPassword] = useState('123456');
  const [error,setError] = useState('');
  const state = useSelector(state => state.state);
  // console.log(window.store.getState());
  console.log('signin',state); 

  const dispatch = useDispatch();

  const userLogin = async function(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    }
    await dispatch(login(user));
    console.log('signin',state); 
  }

  // console.log('signin',state.auth.authenticate);

  if(state.auth.authenticate) {
    return <Navigate to={'/'}/>;
  }

  return (
    <Layout>
      <Container>
        <Row style={{marginTop:'50px'}}>
          <Col md={{span:6,offset:3}}>
            <h1 className='mb-4'>Signin</h1>
            <Form onSubmit={userLogin}>
              <Input className="email" id="email" type="email" label="Email address" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              
              <Input className="password" id="password" type="password" label="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
    
  )
}
