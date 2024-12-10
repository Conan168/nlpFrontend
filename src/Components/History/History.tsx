import React, { useState, SyntheticEvent } from 'react'
import SelectDate from '../SelectDate/SelectDate'
import Hidebox from '../Hidebox/Hidebox'
import RecordTable from '../RecordTable/RecordTable'
import { Button, Space, Typography } from 'antd'
import type { Dayjs } from 'dayjs';
// import type { CheckboxProps } from 'antd';
import './History.css'
import { searchHistory } from '../../api/api'
import { Mission } from '../../api/ajax'

interface Props { }

const { Title } = Typography

const History: React.FC<Props> = (_props: Props): JSX.Element => {
    const [date, setDate] = useState<[Dayjs | null, Dayjs | null] | null>(null)
    const [searchResult, setSearchResult] = useState<Mission[]>([]);
    const [_serverError, setServerError] = useState<string>("")
    const [hideBox, setHideBox] = useState<boolean>(false)

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
        console.log('selected date:', dateStrings);
        setDate(dates);
    }

    const handleHideChange = (hide: boolean) => {
        setHideBox(hide);
    }
    // const handleHideChange: CheckboxProps['onChange'] = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    const handleClick = async (_e: SyntheticEvent) => {
        if (!date || !date[0] || !date[1]) {
            setServerError('Please select a date range')
            return
        }

        const [startDate, endDate] = date;
        try {
            const result = await searchHistory({
                skip: 0,
                limit: 10,
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD'),
                hide: hideBox,
            })

            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result)) {
                setSearchResult(result)
                setServerError('')
            }
        } catch (error) {
            setServerError('Failed to fetch data. Please try again later')
        }

    }
    return (
        <div className='history'>
            <div className='top'>
                <Space size={'large'} align='baseline'>
                    <SelectDate value={date} onChange={handleDateChange} />
                    <Hidebox value={hideBox} onChange={handleHideChange} />
                    <Button type='primary' onClick={(e) => handleClick(e)}>Search</Button>
                </Space>
            </div>
            <div className='bottom'>
                {searchResult.length > 0 ? (
                    // searchResult.map((result) => {
                    //     return <RecordTable searchResults={result} />
                    // })
                    <RecordTable searchResults={searchResult} />
                ) : (
                    <Title>No Result</Title>
                )}
                {/* <RecordTable key={1} name='Conan' age={18} address='1234' state={1} /> */}
            </div>
        </div>
    )
}

export default History