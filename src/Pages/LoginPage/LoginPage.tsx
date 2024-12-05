import React from 'react'
import Login from '../../Components/Login/Login'
import './LoginPage.css'

interface Props { }

const LoginPage = (props: Props) => {
    return (
        <div className='loginPage'>
            <Login />
        </div>
    )
}

export default LoginPage