import React, { useState } from 'react'
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
// import { data } from "./EditData"
import { Mission } from '../../api/ajax';
import { deleteMission } from '../../api/api'

interface Props {
    Missions: Mission[];
    onUpdateMission: (updateMission: Mission[]) => void
}


const EditTable: React.FC<Props> = ({ Missions, onUpdateMission }: Props): JSX.Element => {
    //useEffect
    //websocket
    // const [missionDelete, setMissionDelete] = useState<Mission[]>([])
    const [serverError, setServerError] = useState<string>("")

    const handleDelete = async (id: string) => {
        // console.log(`Delete mission with ID: ${id}`)
        if (!id) {
            setServerError('mission id is not exist')
            return
        }

        try {
            const result = await deleteMission(id)

            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result)) {
                const updateMission = Missions.filter((mission) => mission.Mid !== id)
                onUpdateMission(updateMission)
                setServerError('')
            }
        } catch (error) {
            setServerError('Failed to fetch data. Please try again later')
        }
    }

    const columns: TableColumnsType<Mission> = [
        { title: 'Mission Id', dataIndex: 'Mid', key: 'Mid' },
        { title: 'Time of Dispatch', dataIndex: 'Start_time', key: 'Start_time' },
        {
            title: 'Delet',
            dataIndex: '',
            key: 'action',
            render: (_, record) => (<a onClick={() => handleDelete(record.Mid)}>Delete</a>)
        },
    ];

    return (
        <>
            {serverError && <p style={{ color: 'red', textAlign: 'center' }}>{serverError}</p>}
            <Table<Mission>
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>Path:{record.Path.join('->')}</p>,
                    rowExpandable: (record) => record.Mid !== 'Not Expandable',
                }}
                dataSource={Missions}
                rowKey={(record) => record.Mid}
                pagination={{ pageSize: 6 }}
                scroll={{ y: 400 }}
            />
        </>

    )
}

export default EditTable