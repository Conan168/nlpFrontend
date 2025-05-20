// import React from 'react'
import Logo from '/Logo.png'
import { Button, Typography, Flex } from 'antd'
import { MessageFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'

interface Props { }
const { Title } = Typography

const Start = (_props: Props) => {
    return (
        <Flex vertical gap='large' justify='center' align='center'>
            <div>
                <img src={Logo} alt="NYCU HomePage logo" />
            </div>
            <div>
                <Title> Generative Conversation Dispatching System of Mobile Service Robot</Title>
            </div>
            <div>
                <Button type="primary" variant='filled' shape='round' style={{ width: '250px', height: '100px', fontSize: '36px' }} icon={<MessageFilled style={{ color: 'ff7a45' }} />}>
                    <Link to='/login'>Start</Link>
                </Button>
            </div>
        </Flex>

    )
}

export default Start