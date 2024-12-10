import React, { useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
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

    // 發送訊息
    const sendMessage = (): void => {
        if (input.trim() === '') return;

        const newMessage: Message = { sender: 'user', text: input };
        onNewMessage(newMessage);
        setInput('');

        setTimeout(() => {
            const botReply: Message = { sender: 'bot', text: `"${input}"` };
            onNewMessage(botReply);
        }, 1000);
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