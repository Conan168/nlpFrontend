import { Typography, Flex } from 'antd'
import LoginLogo from '/LoginLogo.png'
import LoginForm from '../LoginForm/LoginForm'
import React from 'react'
import './Login.css'

interface Props { }

const { Title } = Typography;

const Login: React.FC<Props> = (props: Props): JSX.Element => {
    return (
        <Flex vertical gap='small' justify='center' align='center'>
            <div>
                <img src={LoginLogo} alt="NYCU Login logo" />
            </div>
            <Title>Sign In</Title>
            <div>
                <LoginForm />
            </div>
        </Flex>



    )
}

export default Login

