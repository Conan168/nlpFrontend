import React from 'react'
import { DatePicker, Space, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

interface Props {
  value: [Dayjs | null, Dayjs | null] | null;
  onChange: (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => void
}

const { RangePicker } = DatePicker;

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

// Disabled 7 days from the selected date
const disabled7DaysDate: DatePickerProps['disabledDate'] = (current, { from, type }) => {
  if (from) {
    const minDate = from.add(-6, 'days');
    const maxDate = from.add(6, 'days');

    switch (type) {
      case 'year':
        return current.year() < minDate.year() || current.year() > maxDate.year();

      case 'month':
        return (
          getYearMonth(current) < getYearMonth(minDate) ||
          getYearMonth(current) > getYearMonth(maxDate)
        );

      default:
        return Math.abs(current.diff(from, 'days')) >= 7;
    }
  }

  return false;
};

const SelectDate: React.FC<Props> = ({ value, onChange }: Props): JSX.Element => {
  // const [date, setDate] = useState<[Dayjs | null, Dayjs | null] | null>(null)
  // const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
  //   console.log('selected date:', dateStrings);
  //   setDate(dates);
  // }
  // const handleClick = () => {
  //   console.log('Datepicker is clicked')
  // }

  return (
    <Space align='baseline'>
      <Typography.Title level={5}>7 days range</Typography.Title>
      <RangePicker disabledDate={disabled7DaysDate} value={value} onChange={onChange} />
    </Space>
  )
}

export default SelectDate