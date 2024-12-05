import React, { useEffect, useState } from 'react'
import EditTable from '../EditTable/EditTable'
import Chatbot from '../Chatbot/Chatbot'
import Path from '../Path/Path';
import { Divider, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Dispatch.css'
import { Mission } from '../../api/ajax'
import { getHistoryMe } from '../../api/api'

const { Title } = Typography;

type Props = {}

const Dispatch: React.FC<Props> = (props: Props): JSX.Element => {
    const [mission, setMission] = useState<Mission[]>([]);
    const [serverError, setServerError] = useState<string>("")

    const handleUpdateMission = (updateMission: Mission[]) => {
        setMission(updateMission)
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
                    <Chatbot sender='bot' text='123' />
                </div>
                <div className='rightBottom'>
                    <Title level={4}>Dispatch</Title>
                    <Divider style={{ borderColor: '#1677ff', borderWidth: '3px' }} />
                    <div className='createPath'>
                        <div className='path'>
                            <Path />
                        </div>
                        <Button type="primary" variant='filled' shape='round' style={{ width: '100px', height: '100px' }} icon={<PlusOutlined style={{ color: 'ff7a45', fontSize: '80px' }} />} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dispatch