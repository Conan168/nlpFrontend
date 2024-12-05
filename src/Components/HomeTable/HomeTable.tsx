import React from 'react'
import { dataSource, columns } from "./testData"
import { Table, Typography, Divider } from 'antd';
import { Mission } from '../../api/ajax'


interface Props {
    Missions: Mission[];
}

//const data = dataSource;
const { Title } = Typography

const HomeTable: React.FC<Props> = ({ Missions }: Props): JSX.Element => {
    return (
        <div>
            <Title>Mission List</Title>
            <Divider style={{ borderColor: '#1677ff', borderWidth: '3px' }} />
            <div>
                <Table<Mission> columns={columns} dataSource={Missions} rowKey={(record) => record.Mid} size="large" />
            </div>
        </div>
    )
}

export default HomeTable