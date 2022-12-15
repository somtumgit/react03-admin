import React from 'react';
import Header from '../Header';
import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css';

export default function Layout(props) {
  return (
    <>
        <Header></Header>
        {
          props.sidebar ?
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
                <ul>
                  <li><NavLink to={'/'}>Home</NavLink></li>
                  <li><NavLink to={'/page'}>Page</NavLink></li>
                  <li><NavLink to={'/category'}>Category</NavLink></li>
                  <li><NavLink to={'/products'}>Products</NavLink></li>
                  <li><NavLink to={'/orders'}>Orders</NavLink></li>
                </ul>
              </Col>
              <Col md={10} className="main-content" >{props.children}</Col>
            </Row>
          </Container>
          :
          <Container fluid>
            <Row>
              <Col md={12} className="main-content">{props.children}</Col>
            </Row>
          </Container>
          
        }
        {/* {props.children} */}
        
    </>   
  )
}
