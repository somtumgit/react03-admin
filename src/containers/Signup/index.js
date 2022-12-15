import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Form,Button,Container,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { register } from '../../actions';

export default function Signup() {
  const [firstname,setFirstname] = useState('test');
  const [lastname,setLastname] = useState('test');
  const [email,setEmail] = useState('test@gmail.com');
  const [password,setPassword] = useState('123456');
  const [role,setRole] = useState('user');
  const [error,setError] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const userRegister = function(e) {
    e.preventDefault();
    const registerData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }
    // console.log(register_data);
    dispatch(register(registerData));
  }

  if(auth.authenticate) {
    return <Navigate to={'/'}/>;
  }

  if(user.loading) {
    return <p>Loading...</p>
  }

  return (
    <Layout>
      <Container>
        {user.message}
        {user.error}
        <Row style={{marginTop:'50px'}}>
          <Col md={{span:6,offset:3}}>
            <h1 className='mb-4'>Signup</h1>
            <Form onSubmit={userRegister}>
              <Row>
                <Col md="6">
                  <Input type="text" label="First Name" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                </Col>
                <Col md="6">
                  <Input type="text" label="Last Name" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                </Col>
              </Row>

              <Input type="email" label="Email address" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>

              <Input type="password" label="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              
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
