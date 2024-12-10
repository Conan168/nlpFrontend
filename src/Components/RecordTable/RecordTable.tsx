import React from 'react'
import { columns } from "./recordData"
import { Table } from 'antd';
import { Mission } from '../../api/ajax';

interface Props {
    searchResults: Mission[]
}

// const data = dataSource;

const RecordTable: React.FC<Props> = ({ searchResults }: Props): JSX.Element => {
    return (
        <div>
            <Table<Mission> columns={columns} dataSource={searchResults} rowKey={(record) => record.Mid} size="middle" bordered />
        </div>
    )
}

export default RecordTable