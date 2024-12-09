import React, { useEffect, useState } from 'react'
import EditTable from '../EditTable/EditTable'
import Chatbot from '../Chatbot/Chatbot'
import Path from '../Path/Path';
import { Divider, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Dispatch.css'
import { Mission } from '../../api/ajax'
import { createMission, getHistoryMe } from '../../api/api'
// import { Message } from 'yup';

const { Title } = Typography;

interface Props {
    sender: 'user' | 'bot';
    text: string;
}

const Dispatch: React.FC<Props> = (props: Props): JSX.Element => {
    const [mission, setMission] = useState<Mission[]>([]);
    const [serverError, setServerError] = useState<string>("")

    const handleUpdateMission = (updateMission: Mission[]) => {
        setMission(updateMission)
    }

    const handleUpdateCreateMission = (newMissions: Mission[]) => {
        setMission((prevMissions) => [...prevMissions, ...newMissions]);
    };

    const [messages, setMessages] = useState<Props[]>([
        { sender: 'bot', text: 'Hello! How can I help you today?' },
    ]);
    const [path, setPath] = useState<Props | null>(null)

    const updateMessage = (newMessage: Props) => {
        setMessages((prev) => [...prev, newMessage])
        if (newMessage.sender === 'bot') {
            // const botReply = JSON.parse(newMessage.text)
            setPath(newMessage)
        }
        console.log('reply', path?.text)
    }


    useEffect(() => {
        const getHistoryMeInit = async () => {
            const result = await getHistoryMe({
                skip: 0,
                limit: 10,
            })

            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result)) {
                setMission(result)
                setServerError('')
            }
        }
        getHistoryMeInit()
    }, []);

    const handleCreate = async (pathRequest: string[]) => {
        if (!pathRequest) {
            setServerError('path is not exist')
            return
        }

        try {
            // console.log('request', pathRequest)
            const result = await createMission(pathRequest)

            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result)) {
                handleUpdateCreateMission(result)
                setServerError('')
            }
        } catch (error) {
            setServerError('Failed to fetch data. Please try again later')
        }
    }

    const convertPath = (input: string): string[] => {
        let fixedInput = input

        if (input.startsWith('"') && input.endsWith('"')) {
            fixedInput = input.slice(1, -1)
        }

        try {
            if (!fixedInput.startsWith('[')) {
                throw new Error("No path")
            }
            return JSON.parse(fixedInput)
        } catch (error) {
            console.error("Invailid input:", error)
            return []
        }
    }

    return (
        <div className='dispatch'>
            <div className='left'>
                <Title level={4}>Mission List</Title>
                <Divider style={{ borderColor: '#1677ff', borderWidth: '3px' }} />
                {mission.length > 0 ? (
                    // searchResult.map((result) => {
                    //     return <RecordTable searchResults={result} />
                    // })
                    <EditTable Missions={mission} onUpdateMission={handleUpdateMission} />
                ) : (
                    <Title>No Result</Title>
                )}
                {/* <EditTable key={1} name='Conan' age={18} address='1234' description='path1/path2' /> */}
            </div>
            <div className='right'>
                <div className='rightTop'>
                    <Title level={4}>Chatbot</Title>
                    <Divider style={{ borderColor: '#1677ff', borderWidth: '3px' }} />
                    <Chatbot messages={messages} onNewMessage={updateMessage} />
                    {/* <Chatbot sender='bot' text='123' /> */}
                </div>
                <div className='rightBottom'>
                    <Title level={4}>Dispatch</Title>
                    <Divider style={{ borderColor: '#1677ff', borderWidth: '3px' }} />
                    <div className='createPath'>
                        <div className='path'>
                            <Path path={path} onNewPath={updateMessage} />
                        </div>
                        {/* <Button onClick={() => handleCreate(convertPath(path?.text))} type="primary" variant='filled' shape='round' style={{ width: '100px', height: '100px' }} icon={<PlusOutlined style={{ color: 'ff7a45', fontSize: '80px' }} />} /> */}
                        <Button
                            onClick={() => {
                                if (path?.text) {
                                    const convertedPath = convertPath(path.text);
                                    console.log("request:", convertedPath)
                                    if (convertedPath) {
                                        handleCreate(convertedPath);
                                    } else {
                                        setServerError('Invalid path format');
                                    }
                                } else {
                                    setServerError('Path is not defined');
                                }
                            }}
                            type="primary"
                            variant="filled"
                            shape="round"
                            style={{ width: '100px', height: '100px' }}
                            icon={<PlusOutlined style={{ color: '#ff7a45', fontSize: '80px' }} />}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dispatch