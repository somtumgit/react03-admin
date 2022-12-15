import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = function({element:Element ,children}) {
    const token = window.localStorage.getItem('token');
    // console.log(Element);
    if(token) {
        // return children;
        return <Element />
    }else {
        return <Navigate to={'/signin'}/>
    }
    
}

export default PrivateRoute;