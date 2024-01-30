"use client"
import CreateEventHeader from '@/components/create_event_component/create_event_header'
import EventInformation from '@/components/create_event_component/event_information'
import EventTheme from '@/components/create_event_component/event_theme'
import EventTicket from '@/components/create_event_component/event_ticket'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useEventStore from '@/global-state/useCreateEventState'
import httpService from '@/utils/httpService'
import { Box, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { focusManager, useQuery } from 'react-query'

interface Props { }

function EditEvent({ params }: { params: { slug: string } }) {

    focusManager.setFocused(false)
    const { tab, updateEvent, changeTab } = useEventStore((state) => state);
    const toast = useToast()
    const { isLoading, isRefetching, data } = useQuery(['all-events-details' + params?.slug], () => httpService.get("/events/drafts" + "?id=" + params?.slug), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            // setData(data?.data?.content[0]); 
            console.log(data);

            updateEvent({
                id: data?.data?.content[0]?.id,
                picUrls: data?.data?.content[0]?.picUrls,
                eventType: data?.data?.content[0]?.eventType,
                eventName: data?.data?.content[0]?.eventName,
                eventDescription: data?.data?.content[0]?.eventDescription,
                joinSetting: data?.data?.content[0]?.joinSetting,
                locationType: data?.data?.content[0]?.locationType,
                currency: data?.data?.content[0]?.currency,
                currentPicUrl: data?.data?.content[0]?.currentPicUrl,
                eventFunnelGroupID: data?.data?.content[0]?.eventFunnelGroupID,
                mediaType: data?.data?.content[0]?.mediaType,
                currentVideoUrl: data?.data?.content[0]?.currentVideoUrl,
                isPublic: data?.data?.content[0]?.isPublic,
                isExclusive: data?.data?.content[0]?.isExclusive,
                mask: data?.data?.content[0]?.mask,
                attendeesVisibility: data?.data?.content[0]?.attendeesVisibility,
                minPrice: data?.data?.content[0]?.minPrice,
                maxPrice: data?.data?.content[0]?.maxPrice,
                startTime: data?.data?.content[0]?.startTime,
                endTime: data?.data?.content[0]?.endTime,
                startDate: data?.data?.content[0]?.startDate,
                endDate: data?.data?.content[0]?.endDate,
                // expirationDate: "",
                location: data?.data?.content[0]?.location,
                productTypeData: data?.data?.content[0]?.productTypeData,
            })

        }
    })

    React.useEffect(()=> {
        changeTab(0)
    }, [])

    return (
        <LoadingAnimation loading={isLoading}>
            <Box width={"full"} >
                <CreateEventHeader />
                {tab === 0 && (
                    <EventTheme />
                )}
                {tab === 1 && (
                    <EventInformation />
                )}
                {tab === 2 && (
                    <EventTicket promotion={(data?.data?.content[0]?.productTypeData[0]?.ticketType === "Promotion" || data?.data?.content[0]?.productTypeData[0]?.rerouteURL)  ? true : false} />
                )}
            </Box>
        </LoadingAnimation>
    )
}

export default EditEvent
