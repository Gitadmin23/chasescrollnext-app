import { Select } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    formatDate: any,
    year: any
}

export default function YearDatePicker({ year, formatDate } : IProps) {

    const startYear = 1900;
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const changeHandler =(item: any)=> { 
        formatDate(item, "year")
    }
  
    return (
        <Select 
            value={year}
            rounded={"32px"}
            fontSize={"12px"}
            onChange={(e)=> changeHandler(e.target?.value)}
            height={"45px"} placeholder='select year' >
                {years?.map((item, index) => (
                    <option key={index} >{item}</option>
                ))}
        </Select>
    )
}
