import useEventStore from '@/global-state/useCreateEventState';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Input, Radio, Spinner, Switch, Text, Textarea, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import SelectImage from './select_image';
import SubmitTheme from '../submit_event';
import useCustomTheme from "@/hooks/useTheme";
import CustomButton from '@/components/general/Button'; 
import FunnelBtn from '@/components/create_event_component/event_ticket/funnel';
import CollaboratorBtn from '@/components/create_event_component/event_ticket/collaborators';
import GetCommunity from '@/components/create_event_component/event_ticket/funnel/get_community';

function DonationTheme() {

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const [types, setTypes] = useState(Array<any>)
    const [promotion, setPromotion] = useState(false)
    const { eventdata, updateEvent } = useEventStore((state) => state);
    const { isLoading } = useQuery(['getEventType'], () => httpService.get(URLS.GET_EVENTS_TYPES), {
        onError: (error: any) => {
            // toast.error(error.response?.data);
        },
        onSuccess: (data: any) => {


            const flavorOptions = data?.data.map((flavor: string) => ({
                value: flavor,
                label: (flavor.charAt(0).toUpperCase() + flavor.slice(1).split("_").join(" "))
            }));

            setTypes(flavorOptions)

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
            if (value === "") {

                updateEvent({
                    ...eventdata,
                    [name]: ""
                });
            } else {

                updateEvent({
                    ...eventdata,
                    [name]: value[0]?.toUpperCase() + value.slice(1)
                });
            }
        }
    };

    const handleTypeChange = (selectedOption: any) => {

        console.log(selectedOption);

        updateEvent({
            ...eventdata,
            eventType: selectedOption?.value
        });
    };


    return (
        <Box px={"4"} pt={"10"} >
            <Flex flexDirection={"column"} alignItems={"center"} >
                <Box maxW={["full", "full", "full", "1000px"]} width={"full"} >
                    <Text fontWeight={"bold"} fontSize={["md", "xl"]} >
                        Fundraising   Cover Photo
                    </Text>
                    <Text fontWeight={"medium"} fontSize={["xs", "md"]} opacity={"0.5"} >
                        Add  photos / posters that describes details of your Fund raising
                    </Text>
                </Box>
                <Flex maxW={["full", "full", "full", "1000px"]} py={"6"} width={"full"} h={"full"} gap={"8"} flexDirection={["column", "column", "column"]} alignItems={"center"} justifyContent={"center"}          >
                    <Flex flexDirection={"column"} width={"full"} gap={"4"} >
                        <SelectImage />
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} fontWeight={"600"} >Fund raising Title<span style={{ color: "#F04F4F" }} > *</span></Text>
                            <Input
                                name="eventName"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                rounded={"full"}
                                onChange={(e) => handleChangeLimit(e, 150)}
                                value={eventdata?.eventName} />
                            <Text fontSize={"sm"} >{eventdata?.eventName?.length ? eventdata?.eventName?.length : "0"} {"/ 150"}</Text>
                        </Flex>
                        <Flex width={"full"} flexDir={["column", "column", "row"]} pb={"3"} gap={"3"} >
                            <Box width={"full"}>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Donations Target
                                </label>
                                <Flex >
                                    <Input
                                        h={"45px"}
                                        type="number"
                                        border={"1px solid #E2E8F0"}
                                        focusBorderColor={"#E2E8F0"}
                                        placeholder='₦0.00'
                                        onChange={(e) => updateEvent({
                                            ...eventdata,
                                            donationTargetAmount: e.target.value
                                        })}
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                        rounded={"full"}
                                        name="ticketType"
                                    />
                                </Flex>
                            </Box>
                            <Box width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Purpose for Donation
                                </label>
                                <Flex gap={"2"} >
                                    <Input
                                        h={"45px"}
                                        rounded={"full"}
                                        type="text"
                                        width={"full"}
                                        onChange={(e) => updateEvent({
                                            ...eventdata,
                                            donationName: e.target.value
                                        })}
                                        border={"1px solid #E2E8F0"}
                                        focusBorderColor={"#E2E8F0"}
                                        placeholder="e.g Wedding, building project etc"
                                    />
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex width={"full"} gap={"1"} flexDirection={"column"} >
                            <Text color={"brand.chasescrollTextGrey"} > Donation Description<span style={{ color: "#F04F4F" }} > *</span></Text>
                            <Textarea
                                id="eventDescription"
                                name="eventDescription"
                                border={"1px solid #E2E8F0"}
                                focusBorderColor={"#E2E8F0"}
                                rounded={"24px"}
                                value={eventdata?.eventDescription}
                                onChange={(e) => handleChangeLimit(e, 1500)}
                                className="outline-none w-full h-20 text-sm"
                            />
                            <Text fontSize={"sm"} >{eventdata?.eventDescription?.length ? eventdata?.eventDescription?.length : "0"} {"/ 1500"}</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} h={"full"} width={"full"} gap={"6"} >
                        <CustomButton borderRadius={"full"} text='+ Add another fund Raising' color={"#5465E0"} mt={"3"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"6"} rounded={"8px"} width={"fit-content"} />
                        <Flex flexDirection={"column"} gap={"2"} >
                            <Text fontWeight={"600"} >Event Visibility</Text>
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
                        <Flex flexDir={["column", "column", "row"]} justifyContent={"space-between"} mt={"5"} gap={["4", "4", "0px"]} >
                            {!promotion && (
                                <FunnelBtn />
                            )}
                            <>
                                {!promotion && (
                                    <CollaboratorBtn addCollaborator={true} />
                                )}
                            </>
                        </Flex>
                        <GetCommunity />
                        <Flex w={"full"} gap={"4"} my={"4"} >
                            <SubmitTheme type={""} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default DonationTheme
