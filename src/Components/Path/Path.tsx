import React from 'react'
import { Timeline } from 'antd';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

interface Props {
    path: Message | null
    onNewPath: (newMessage: Message) => void
}


const Path: React.FC<Props> = ({ path, onNewPath }: Props): JSX.Element => {
    let data: string[] = []
    // console.log("path:", path?.text)
    // console.log("path1:", path?.text.replace(/\[|\]/g, ''))
    // console.log("path2:", path?.text.replace(/\[|\]/g, '').split(","))
    try {
        data = (path?.text.replace(/\[|\]/g, '').split(",").map(item => item.trim()) ?? [])
        // console.log("info:", data)
    } catch (error) {
        console.error("wrong path")
        // console.log("error:", data)
    }


    return (
        <Timeline>
            {data.map((item: string, index: number) => (
                <Timeline.Item key={index}>
                    <h4>{item}</h4>
                </Timeline.Item>
            ))}
        </Timeline>
    )
}
export default Path