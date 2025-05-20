import React, { useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import { getPath } from '../../api/api';
import './Chatbot.css'

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

interface Props {
    messages: Message[];
    onNewMessage: (message: Message) => void;
}

const Chatbot: React.FC<Props> = ({ messages, onNewMessage }): JSX.Element => {

    const [input, setInput] = useState<string>('');
    const [_serverError, setServerError] = useState<string>('')

    // 發送訊息
    const sendMessage = async (): Promise<void> => {
        if (input.trim() === '') return;

        const newMessage: Message = { sender: 'user', text: input };
        onNewMessage(newMessage);
        setInput('');
        // var inputString = `{\"prompt\":\"${input}\"}`
        // var inputJson = JSON.parse(inputString)
        // console.log(inputString)
        // console.log(inputJson)
        try {
            const result = await getPath(input)
            console.log(result)
            if (typeof result === "string") {
                // const index = result.indexOf("{")
                // const resultMessage = result.slice(0, index)
                const botReply: Message = { sender: 'bot', text: `"${result}"` }
                onNewMessage(botReply)
                setServerError('')
            } else {
                setServerError(result);
            }
        } catch (error) {
            setServerError('NLP server is failed')
        }
        // setTimeout(() => {
        //     const botReply: Message = { sender: 'bot', text: `"${input}"` };
        //     onNewMessage(botReply);
        // }, 5000);
    };

    return (
        <div>
            <div className='chat'>
                <List
                    dataSource={messages}
                    renderItem={(message, index) => (
                        <List.Item key={index}>
                            <List.Item.Meta
                                avatar={
                                    message.sender === 'bot' ? (
                                        <Avatar icon={<RobotOutlined />} />
                                    ) : (
                                        <Avatar icon={<UserOutlined />} />
                                    )
                                }
                                title={message.sender === 'bot' ? 'Bot' : 'You'}
                                description={message.text}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className='send'>
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onPressEnter={sendMessage}
                />
                <Button type="primary" onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Chatbot