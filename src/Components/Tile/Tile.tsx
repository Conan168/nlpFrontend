// import React from 'react'
import { Typography } from 'antd'

type Props = {
    title: string;
}

const { Title } = Typography

const Tile = ({ title }: Props) => {
    return (
        <div>
            <Title level={2}>{title}</Title>
        </div>
    )
}

export default Tile