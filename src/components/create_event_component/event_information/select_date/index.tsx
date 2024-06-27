import { CalendarIcon } from '@/components/svg'
import useEventStore from '@/global-state/useCreateEventState';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import { Flex, Text, useToast } from '@chakra-ui/react'
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
    const toast = useToast()

    const handleDateSelect = (date: any) => {
        if (name === "Start") {
            updateEvent({
                ...eventdata,
                startDate: Date.parse(new Date(date).toJSON()),
                startTime: Date.parse(new Date(date).toJSON())
            })
        } else {
            if (!eventdata.startDate) {
                toast({
                    title: 'Error',
                    description: "Please enter your starting date",
                    status: 'error',
                    isClosable: true,
                    duration: 2000,
                    position: 'top-right',
                });
            } else if (date <= new Date(eventdata?.startDate)) {
                toast({
                    title: 'Error',
                    description: "Please valid end date",
                    status: 'error',
                    isClosable: true,
                    duration: 2000,
                    position: 'top-right',
                });

                console.log();
                console.log(date);

            } else {
                updateEvent({
                    ...eventdata,
                    endDate: Date.parse(new Date(date).toJSON()),
                    endTime: Date.parse(new Date(date).toJSON())
                })
            }
        }
    }

    const CustomInput = ({ value, onClick }: any) => {
        return (
            <Flex onClick={onClick} as={"button"} w={"full"} alignItems={"center"} px={"3"} gap={"2"} border={"1px solid #E2E8F0"} rounded={"4px"} fontSize={"sm"} h={"50px"}  >
                <CalendarIcon />
                {data ? dateFormat(data) : "Select Date And Time"}
                {" "}
                {data ? timeFormat(data) : ""}
            </Flex>
        )
    }

    // const clickHandler = () => {
    //     if (name === "End" && !eventdata.startDate ) {
    //         toast({
    //             title: 'Error',
    //             description: "Please enter your starting date",
    //             status: 'error',
    //             isClosable: true,
    //             duration: 5002,
    //             position: 'top-right',
    //         });
    //     }
    // }

    return (
        <Flex width={"full"} flexDirection={"column"} gap={"2"} py={"2"} >
            <Text fontSize={"sm"} >
                {name} <span style={{ color: "#F04F4F" }}>*</span>
            </Text>
            <DatePicker
                id={name}
                // value={}
                // disabled={name === "End" && !eventdata.startDate}
                selected={name === "End" ? eventdata.startDate ? new Date(data ?? eventdata.startDate) : new Date() : data ? new Date(data) : new Date()}
                dateFormat="MMM d, yyyy h:mm aa"
                showTimeSelect
                minDate={(name === "End") ? (eventdata.startDate ? new Date(eventdata.startDate): new Date()): new Date()}
                onChange={handleDateSelect}
                customInput={<CustomInput />}
            />
        </Flex>
    )
}

export default SelectDate