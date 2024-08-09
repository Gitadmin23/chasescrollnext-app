import { Select } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    month: number,
    year: number,
    day: string,
    formatDate: any
}

export default function DayDatePicker({ month, year, formatDate, day } : IProps) {


    function getDaysInMonth(month: any, year: any) {
        return new Date(year, month, 0).getDate();
    }

    function generateDaysArray() {
        const daysInMonth = getDaysInMonth(month, year);
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    } 

    const changeHandler = (item: any) => {
        formatDate(item, "day")
    }

    console.log(month);
    

    return (
        <Select
            fontFamily={'Satoshi-Light'}
            value={day}
            rounded={"32px"}
            onChange={(e)=> changeHandler(e.target?.value)}
            disabled={month > -1 ? false : true}
            height={"45px"} placeholder='select day' >
                {generateDaysArray()?.map((item, index) => (
                    <option key={index} >{item}</option>
                ))}
        </Select>
    )
}
