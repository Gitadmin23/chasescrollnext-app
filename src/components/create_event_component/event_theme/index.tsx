import useEventStore from '@/global-state/useCreateEventState';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Input, Radio, Select, Switch, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import SelectImage from './select_image'; 
import SubmitTheme from '../submit_event';

function EventTheme() {

    const [types, setTypes] = useState([] as any)
    const { eventdata, updateEvent } = useEventStore((state) => state);
    const { } = useQuery(['getEventType'], () => httpService.get(URLS.GET_EVENTS_TYPES), {
        onError: (error: any) => {
            // toast.error(error.response?.data);
        },
        onSuccess: (data: any) => {
            setTypes(data?.data)
        }
    });

    const handleChangeLimit = (e: any, limit: any) => {
        if ((e.target.value).length <= limit) {
            handleChange(e)
        }
    } 

    const handleChange = ({ target: { name, value, type } }: any) => {
        if (name === "isPublic") {
            updateEvent({
                ...eventdata,
                [name]: value === "true" ? true : false
            });
        } else if (name === "attendeesVisibility") {
            updateEvent({
                ...eventdata,
                [name]: eventdata?.attendeesVisibility ? eventdata?.attendeesVisibility : !eventdata?.attendeesVisibility
            });
        } else {
            updateEvent({
                ...eventdata,
                [name]: value
            });
        }
    };

    return (
        <Box px={"4"} pt={"10"} >
            <Flex flexDirection={"column"} alignItems={"center"} >
                <Box maxW={["full", "full", "1000px"]} width={"full"} >
                    <Text fontWeight={"bold"} fontSize={["md", "xl"]} >
                        Event Cover Image
                    </Text>
                    <Text fontWeight={"bold"} fontSize={["xs", "md"]} opacity={"0.5"} >
                        Add photos/posters that describes details of your events.
                    </Text>
                </Box>
                <Flex maxW={["full", "full", "1000px"]} py={"6"} width={"full"} gap={"12"} flexDirection={["column", "column", "row"]} alignItems={"center"} justifyContent={"center"}          >
                    <Flex flexDirection={"column"} width={"full"} gap={"4"} >
                        <SelectImage />
                        <Box>
                            <Text fontSize={["md", "lg"]} fontWeight={"bold"} >
                                Basic Event Details
                            </Text>
                            <Text fontStyle={["xs", "sm"]} color={"brand.chasescrollTextGray"} >
                                This section highlights details that should attract attendees to your event
                            </Text>
                        </Box>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Title <span style={{ color: "#F04F4F" }} > *</span></Text>
                            <Input
                                name="eventName"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                onChange={(e) => handleChangeLimit(e, 150)}
                                value={eventdata?.eventName} />
                            <Text fontSize={"sm"} >{eventdata?.eventName?.length + "/" + 150}</Text>
                        </Flex>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} >Attendee Visibility</Text>
                            <label htmlFor="showAttendees" style={{ display: "flex", height: "42px", alignItems: "center", justifyContent: "space-between", borderRadius: "4px", width: "100%", paddingLeft: "16px", paddingRight: "16px", padding: "8px", backgroundColor: "#DCDEE4" }} >
                                <h3>Show</h3>
                                <Switch
                                    onChange={(e) => updateEvent({
                                        ...eventdata,
                                        attendeesVisibility: e.target.checked
                                    })}
                                    name="attendeesVisibility"
                                    isChecked={eventdata?.attendeesVisibility}
                                />
                            </label>
                        </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} mt={["4", "4", "0px"]} width={"full"} gap={"4"} >
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Type<span style={{ color: "#F04F4F" }} > *</span></Text>
                            <Select
                                name="eventType"
                                id="eventType"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                onChange={handleChange}
                                value={eventdata?.eventType}
                                placeholder='Select Event Type' >
                                {types?.sort((a: string, b: string) => {
                                    if (a > b) {
                                        return 1
                                    } else {
                                        return -1;
                                    }
                                    return 0;
                                })?.map((type: any, index: number) => (
                                    <option key={index} value={type}>
                                        {type.split("_").join(" ")}
                                    </option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Description<span style={{ color: "#F04F4F" }} > *</span></Text>
                            <Textarea
                                id="eventDescription"
                                name="eventDescription"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                value={eventdata?.eventDescription}
                                onChange={(e) => handleChangeLimit(e, 1500)}
                                className="outline-none w-full h-20 text-sm"
                            />
                            <Text fontSize={"sm"} >{eventdata?.eventDescription?.length ? eventdata?.eventDescription?.length : "0" } {"/ 1500"}</Text>
                        </Flex>
                        <Flex flexDirection={"column"} gap={"2"} >
                            <Text fontWeight={"bold"} fontSize={"sm"}>Event Visibility</Text>
                            <label htmlFor="publicVisibility" style={{ display: "flex", justifyContent: "space-between", borderBottomWidth: "1px", fontSize: "14px", padding: "8px" }} role='button' >
                                <Text>
                                    Public
                                </Text>
                                <Radio
                                    type="radio"
                                    id="publicVisibility"
                                    name="isPublic"
                                    value={"true"}
                                    onChange={handleChange}
                                    isChecked={eventdata?.isPublic}
                                />
                            </label>
                            <label htmlFor="privateVisibility" style={{ display: "flex", justifyContent: "space-between", borderBottomWidth: "1px", fontSize: "14px", padding: "8px" }} role='button' >
                                <Text>
                                    Private
                                </Text>
                                <Radio
                                    type="radio"
                                    id="privateVisibility"
                                    name="isPublic"
                                    value={"false"}
                                    onChange={handleChange}
                                    isChecked={!eventdata?.isPublic}
                                />
                            </label>
                        </Flex>
                        <SubmitTheme type={""} />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default EventTheme
