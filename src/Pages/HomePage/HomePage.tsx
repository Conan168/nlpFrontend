import React, { useEffect, useState } from 'react'
import HomeTable from '../../Components/HomeTable/HomeTable'
import { Typography } from 'antd';
import Start from '../../Components/Start/Start'
import './HomePage.css'
import { Mission } from '../../api/ajax'
import { getRobotMission } from '../../api/api'

interface Props { }

const { Title } = Typography;

const HomePage: React.FC<Props> = (props: Props): JSX.Element => {
    const [mission, setMission] = useState<Mission[]>([]);
    const [serverError, setServerError] = useState<string>("")

    useEffect(() => {
        const getHistoryMeInit = async () => {
            const result = await getRobotMission({
                rid: 'R0001',
                skip: 0,
                limit: 20,
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
        <div className='homePage'>
            <div className='map'>
                {mission.length > 0 ? (
                    <HomeTable Missions={mission} />
                ) : (
                    <Title>No login</Title>
                )}
                {/* <HomeTable key={1} name='Conan' age={18} address='1234' /> */}
            </div>
            <div className='start'>
                <Start />
            </div>
        </div>
    )
}

export default HomePage