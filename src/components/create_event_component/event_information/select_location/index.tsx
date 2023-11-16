import useEventStore from '@/global-state/useCreateEventState';
import { Box, Checkbox, Flex, Input, Select, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react'

interface Props { }

function SelectLocation(props: Props) {
    const { } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);
    const [selectType, setSelectType] = useState("")



    const handleToBeAnnounced = (event: any) => {
        if (event?.target?.checked) {
            updateEvent({
                ...eventdata,
                location: {
                    ...eventdata.location,
                    toBeAnnounced: event?.target?.checked,
                    link: "",
                    locationDetails: ""
                }
            })
        } else {
            updateEvent({
                ...eventdata,
                location: {
                    ...eventdata.location,
                    toBeAnnounced: event?.target?.checked,
                    link: "",
                    locationDetails: ""
                }
            })
        }
    }

    const changeHandler =(item: any)=> { 
        updateEvent({
            ...eventdata,
            locationType: item
        })
        setSelectType(item)
    }

    React.useEffect(()=> {
     if(eventdata?.location?.link && eventdata?.location?.locationDetails){
        setSelectType("Hybrid Location")
     } else if(eventdata?.location?.locationDetails){
        setSelectType("Physical Location")
     }else if(eventdata?.location?.link){
        setSelectType("Online Location")
     }
    }, [eventdata?.location?.link, eventdata?.location?.locationDetails])

    return (
        <Box width={"full"}>
            <Box width={"full"} >
                {!eventdata?.location?.toBeAnnounced && (
                    <Box width={"full"} >
                        {/* <h1 className="text-base font-bold">Location Type</h1> */}
                        <Box>
                            <Flex justifyContent={"space-between"} alignItems={"center"} py={"4"} borderTop={"1px solid #E2E8F0"} borderBottom={"1px solid #E2E8F0"} >
                                <label style={{ display: "block", color: "#667085", fontWeight: "bold" }} >
                                    Location Type
                                </label>
                                <Select
                                    width={"180px"}
                                    h={"45px"}
                                    color={"brand.chasescrollDarkBlue"}
                                    fontSize={"sm"}
                                    name='locationType'
                                    onChange={(e) => changeHandler(e.target.value)}
                                    value={selectType} >
                                    <option value="">add location</option>
                                    <option>Physical Location</option>
                                    <option>Online Location</option>
                                    <option>Hybrid Location</option>
                                </Select>
                            </Flex>
                            {(selectType === "Physical Location" || selectType === "Hybrid Location" || eventdata?.location?.locationDetails) && (
                                <Box width={"full"} mt={"4"}  >
                                    <Text>Enter Location</Text>
                                    <Input
                                        type="text"
                                        h={"45px"}
                                        placeholder="Enter Event Location"
                                        mt={"sm"}
                                        fontSize={"sm"}
                                        rounded={"md"}
                                        color={"brand.chasescrollTextGrey"}
                                        p={"3"}
                                        width={"full"}
                                        // className="border w-full mt-4 text-sm rounded-md text-chasescrollTextGrey p-3"
                                        name="locationDetails"
                                        onChange={({ target: { value } }) => updateEvent({
                                            ...eventdata,
                                            location: {
                                                ...eventdata.location,
                                                locationDetails: value
                                            }
                                        })}
                                        value={eventdata?.location?.locationDetails}
                                    />
                                </Box>
                            )}
                            {(selectType === "Online Location" || selectType === "Hybrid Location" || eventdata?.location?.link) && (
                                <Box width={"full"} mt={"4"} >
                                    <Text mb={"2"} >Enter Online Url</Text>
                                    <Input
                                        type="text"
                                        h={"45px"}
                                        fontSize={"sm"}
                                        rounded={"md"}
                                        color={"brand.chasescrollTextGrey"}
                                        p={"3"}
                                        width={"full"}
                                        placeholder="Enter Online Link"
                                        name="organizer"
                                        onChange={({ target: { value } }) => updateEvent({
                                            ...eventdata,
                                            location: {
                                                ...eventdata.location,
                                                link: value
                                            }
                                        })}
                                        value={eventdata?.location?.link}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                )}
            </Box> 
            <Flex width={"full"} justifyContent={"space-between"} py={"4"} px={"2"} borderBottom={"1px solid #E2E8F0"} >
                <label style={{ color: "#667085"}} >To be announced</label>
                <Checkbox
                    type="checkbox"
                    name='toBeAnnounced'
                    width={"4"}
                    height={"4"}
                    mt={"2"}
                    mr={"2"}
                    // className="form-checkbox mt-2 mr-2 h-4 w-4 text-blue-600"
                    isChecked={eventdata?.location?.toBeAnnounced}
                    onChange={handleToBeAnnounced}
                />
            </Flex>
            <Box width={"full"} mt={"3"} mb={"2"} >
                <Text fontWeight={"bold"} mb={"2"} >Venue Details</Text>
                <Textarea
                    placeholder="Example: Behind Chervon gas station "
                    width={"full"}
                    px={"4"}
                    py={"2"}
                    // className="border w-full px-4 py-2 outline-none"
                    rows={4}
                    cols={48}
                    value={eventdata?.location?.address}
                    onChange={({ target: { value } }) => updateEvent({
                        ...eventdata,
                        location: {
                            ...eventdata.location,
                            address: value
                        }
                    })}
                />
            </Box>
        </Box>
    )
}

export default SelectLocation
