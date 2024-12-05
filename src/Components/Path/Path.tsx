import React from 'react'
import { Timeline } from 'antd';

interface Props { }


const Path: React.FC<Props> = (props: Props): JSX.Element => {

    const data = ['2', '3', '1', '4']

    return (
        <Timeline>
            {data.map((item, index) => (
                <Timeline.Item key={index}>
                    <h4>{item}</h4>
                </Timeline.Item>
            ))}
        </Timeline>
    )
}
export default Path