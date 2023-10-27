import { CalendarIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState';
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
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

    return (
        <Flex width={"full"} flexDirection={"column"} gap={"2"} py={"2"} >
            <Text fontSize={"sm"} >
                {name} <span style={{ color: "#F04F4F" }}>*</span>
            </Text>
            <label role='button' htmlFor={name} style={{ gap: "4px", display: "flex", height: "50px", alignItems: "center", borderRadius: "4px", paddingLeft: "12px", paddingRight: "12px", border: "1px solid #E2E8F0" }} >
                <Flex px={"3"} gap={"1"} >
                <CalendarIcon />
                {data ?
                    <DatePicker
                        id={name}
                        minDate={name === "End" ? new Date(eventdata.startDate) : new Date()}
                        selected={new Date(data)}
                        onChange={handleDateSelect}
                        showTimeSelect
                        dateFormat="MMM d, yyyy h:mm aa"
                        placeholderText={"Select "+name+" Date"}
                    /> :
                    <DatePicker
                        id={name}
                        minDate={name === "End" ? new Date(eventdata.startDate) : new Date()}
                        onChange={handleDateSelect}
                        showTimeSelect
                        dateFormat="MMM d, yyyy h:mm aa"
                        placeholderText={"Select "+name+" Date"}
                    />
                }
                </Flex>
            </label>
        </Flex>
    )
}

export default SelectDate
