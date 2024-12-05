import React from 'react'
import { Checkbox } from 'antd';
// import type { CheckboxProps } from 'antd';

interface Props {
    value: boolean;
    onChange: (hide: boolean) => void
}

// const onChange: CheckboxProps['onChange'] = (e) => {
//     console.log(`checked = ${e.target.checked}`);
// };

const Hidebox: React.FC<Props> = ({ value, onChange }: Props): JSX.Element => {
    return (
        <Checkbox value={value} onChange={(e) => onChange(e.target.checked)}>Hide finished</Checkbox>
    )
}

export default Hidebox