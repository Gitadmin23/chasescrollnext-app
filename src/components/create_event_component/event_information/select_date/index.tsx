import { CalendarIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import { Flex, Text } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    name: "Start" | "End",
    data: any
}

function SelectDate(props: Props) {
    const {
        name,
        data
    } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);

    const handleDateSelect = (date: any) => {
        if (name === "Start") {
            updateEvent({
                ...eventdata,
                startDate: Date.parse(new Date(date).toJSON()),
                startTime: Date.parse(new Date(date).toJSON())
            })
        } else {
            updateEvent({
                ...eventdata,
                endDate: Date.parse(new Date(date).toJSON()),
                endTime: Date.parse(new Date(date).toJSON())
            })
        }
    }
    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => {

        console.log(value);


        return (
            <Flex onClick={onClick} as={"button"} w={"full"} ref={ref} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"4px"} h={"50px"}  >
                <CalendarIcon />
                {dateFormat(name === "Start" ? eventdata?.startDate : eventdata?.endDate)}
                {" "}
                {timeFormat(name === "Start" ? eventdata?.startDate : eventdata?.endDate)}
            </Flex>
        )
    }
    )

    return (
        <Flex width={"full"} flexDirection={"column"} gap={"2"} py={"2"} >
            <Text fontSize={"sm"} >
                {name} <span style={{ color: "#F04F4F" }}>*</span>
            </Text> 
            <DatePicker
                id={name}
                dateFormat="MMM d, yyyy h:mm aa"
                showTimeSelect
                minDate={name === "End" ? new Date(eventdata.startDate) : new Date()}
                onChange={handleDateSelect}
                customInput={<ExampleCustomInput />}
            />
        </Flex>
    )
}

export default SelectDate
