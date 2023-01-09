import React from 'react';


const Home = React.lazy(()=> import("../pages/Home"))
const Login = React.lazy(()=> import("../pages/Login"))
const Register = React.lazy(()=> import("../pages/Register"))




export const router = [
    {
        path:"/",
        element: Home
    },
    {
        path:"/login",
        element: Login
    },
    {
        path:"/register",
        element: Register
    }
]