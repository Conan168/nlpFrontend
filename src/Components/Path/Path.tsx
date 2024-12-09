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
    // let data: string[] = []
    console.log("path:", path?.text)
    const pathArray = (input: string): string[] => {
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

    const data = pathArray(path?.text ?? "[]")

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