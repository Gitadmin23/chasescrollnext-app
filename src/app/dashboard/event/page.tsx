'use client'
import EventCategory from '@/components/event_component/event_category';
import EventListing from '@/components/event_component/event_listing';
import SelectEventPage from '@/components/event_component/select_event_page';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BiMessageSquareAdd } from "react-icons/bi";

function Events() {


  const { eventdata, image, tab, updateEvent, changeTab } = useEventStore((state) => state);

  useEffect(() => { 
    updateEvent({
      picUrls: [
        ""
      ],
      eventType: "",
      eventName: "",
      eventDescription: "",
      joinSetting: "public",
      locationType: "",
      currency: "USD",
      currentPicUrl: "",
      eventFunnelGroupID: "",
      mediaType: "",
      currentVideoUrl: "",
      isPublic: true,
      isExclusive: false,
      mask: false,
      attendeesVisibility: true,
      minPrice: "",
      maxPrice: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      // expirationDate: "",
      location: {
        link: "",
        address: "",
        locationDetails: "",
        latlng: "",
        placeIds: "",
        toBeAnnounced: false
      },
      productTypeData: [
        // first is always standard
        {
          totalNumberOfTickets: "",
          ticketPrice: "",
          ticketType: "Regular",
          minTicketBuy: "",
          maxTicketBuy: ""
        },
      ],
    })
  }, [])

  return (
    <Box width={"full"}>
      <EventCategory />
      <EventListing />
    </Box>
  )
}

export default Events