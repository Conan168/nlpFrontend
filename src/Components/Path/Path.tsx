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


const Path: React.FC<Props> = ({ path }: Props): JSX.Element => {
    // let data: string[] = []
    console.log("path:", path?.text)

    const pathArray = (input: string): string[] => {
        try {
            let fixedInput = input.slice(1, -1)
            let pathList: string[] = []
            const index = fixedInput.indexOf("{")
            if (index !== -1) {
                fixedInput = fixedInput.slice(index)
            }
            console.log(fixedInput)
            const jsonObject = JSON.parse(fixedInput)
            for (const key in jsonObject) {
                if (jsonObject.hasOwnProperty(key)) {
                    const value = jsonObject[key]
                    const stringPath = JSON.stringify(value)
                    pathList.push(`${key}:${stringPath}`)
                }
            }
            return pathList
        } catch (error) {
            console.error("Invailid input:", error)
            return []
        }
    }
    /*
    const pathArray = (input: string): string[] => {
        let fixedInput = input
        let pathList: string[] = []

        if (input.startsWith('"') && input.endsWith('"')) {
            fixedInput = input.slice(1, -1)
            const index = fixedInput.indexOf("{")
            fixedInput = fixedInput.slice(index)
            console.log(fixedInput)
            const jsonObject = JSON.parse(fixedInput)
            for (const key in jsonObject) {
                if (jsonObject.hasOwnProperty(key)) {
                    const value = jsonObject[key]
                    const stringPath = JSON.stringify(value)
                    pathList.push(`${key}:${stringPath}`)
                }
            }
            console.log("pathList:", pathList)
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
*/
    const data = path?.text ? pathArray(path.text) : []

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