import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getAllCategory, getInitailData } from './actions';
import Category from './containers/Category';
import Products from './containers/Products';
import Orders from './containers/Orders';
import NewPage from './containers/NewPage';

function App() {
  const auth = useSelector(state => state.state.auth);
  const dispatch = useDispatch();

  useEffect(function() {

    // console.log('appauth',auth);
    if(!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate) {
      dispatch(getInitailData());
    }
      
  },[auth.authenticate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<PrivateRoute element={Home}></PrivateRoute>} />
        <Route path="/page" exact element={<PrivateRoute element={NewPage}></PrivateRoute>} />
        <Route path="/category" element={<PrivateRoute element={Category}></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute element={Products}></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute element={Orders}></PrivateRoute>} />

        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
