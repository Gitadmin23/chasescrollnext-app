import useEventStore from '@/global-state/useCreateEventState';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Input, Radio, Select, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import SelectImage from './select_image';
import { ClosedEyeIcon, OpenEyeIcon } from '@/components/svg';
import CustomButton from '@/components/general/Button';
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
        if (name === "isPublic" || name === "attendeesVisibility") {
            updateEvent({
                ...eventdata,
                [name]: value === "true" ? true : false
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
                    </Flex>
                    <Flex flexDirection={"column"} mt={["4", "4", "0px"]} width={"full"} gap={"4"} >
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Type</Text>
                            <Select
                                name="eventType"
                                id="eventType"
                                border={"1px solid #E2E8F0"} 
                                focusBorderColor={"#E2E8F0"} 
                                onChange={handleChange}
                                value={eventdata?.eventType}
                                placeholder='Select Event Type' >
                                {types?.map((type: any) => (
                                    <option value={type}>
                                        {type.split("_").join(" ")}
                                    </option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Event Description</Text>
                            <Textarea
                                id="eventDescription"
                                name="eventDescription"
                                border={"1px solid #E2E8F0"} 
                                focusBorderColor={"#E2E8F0"} 
                                value={eventdata?.eventDescription}
                                onChange={(e) => handleChangeLimit(e, 1500)}
                                className="outline-none w-full h-20 text-sm"
                            />
                            <Text fontSize={"sm"} >{eventdata?.eventDescription?.length + "/" + 1500}</Text>
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
                    </Flex>
                </Flex>
                <Flex maxW={["full", "full", "1000px"]} flexDirection={"column"} width={"full"} mb={"10"} >
                    <Text fontWeight={"bold"} fontSize={"sm"} px={"2"} mb={"3"} >Attendee Visibility</Text>
                    <Flex justifyContent={"space-between"} className="flex justify-between">
                        <label role='button' htmlFor="showAttendees" style={{ display: "flex", justifyContent: "space-between", borderRadius: "4px", width: "128px", paddingLeft: "16px", paddingRight: "16px", padding: "8px", backgroundColor: eventdata?.attendeesVisibility && "#DCDEE4", border: !eventdata?.attendeesVisibility ? "1px solid black" : "" }} >
                            <Box display={"grid"} >
                                <OpenEyeIcon />
                                <h3>Show</h3>
                            </Box>
                            <Radio
                                type="radio"
                                id="showAttendees"
                                name="attendeesVisibility"
                                value={"true"}
                                onChange={handleChange}
                                isChecked={eventdata?.attendeesVisibility}
                            />
                        </label>
                        <label role='button' htmlFor="hideAttendees" style={{ display: "flex", justifyContent: "space-between", borderRadius: "4px", width: "128px", paddingLeft: "16px", paddingRight: "16px", padding: "8px", backgroundColor: !eventdata?.attendeesVisibility ? "#DCDEE4" : "", border: eventdata?.attendeesVisibility ? "1px solid black" : "" }} >
                            <Box display={"grid"} >
                                <ClosedEyeIcon />
                                <h3>Hide</h3>
                            </Box>
                            <Radio
                                id="hideAttendees"
                                type="radio"
                                name="attendeesVisibility"
                                value={"false"}
                                onChange={handleChange}
                                isChecked={!eventdata?.attendeesVisibility}
                            />
                        </label>
                    </Flex>
                </Flex> 
                <SubmitTheme/>
            </Flex>
        </Box>
    )
}

export default EventTheme
