import React, {useEffect} from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Home() {

  return (
    <Layout sidebar={true}>
      <h1>Home</h1>
    </Layout>
    
  )
}

