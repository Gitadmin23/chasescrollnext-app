import { Select } from '@chakra-ui/react'
import React from 'react'


interface IProps {
    formatDate: any,
    month: any
}

export default function MonthDatePicker({formatDate, month}: IProps) {

    const listofmonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const changeHandler = (item: any) => {
        formatDate(item, "month")
    }

    return (
        <Select
            fontFamily={'Satoshi-Light'}
            value={listofmonth[month - 1]}
            rounded={"32px"}
            onChange={(e)=> changeHandler(e.target?.value)}
            height={"45px"} placeholder='select month' >
            {listofmonth?.map((item, index) => (
                <option key={index} >{item}</option>
            ))}
        </Select>
    )
}