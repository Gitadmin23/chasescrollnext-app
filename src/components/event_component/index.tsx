'use client'
import EventCarousel from '@/components/event_component/carousel';
import EventCategory from '@/components/event_component/event_category';
import EventListing from '@/components/event_component/event_listing'; 
import useEventStore from '@/global-state/useCreateEventState';
import useSearchStore from '@/global-state/useSearchData';
import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react' 

function EventComponent() { 
  
  const { updateEvent } = useEventStore((state) => state);

  const { event_category } = useSearchStore((state) => state);

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
      currency: "NGN",
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
      collaborators: [],
      admins: []
    });
  }, [])

  return (
    <Box width={"full"}> 
      <EventCategory eventpage={true} />
      {!event_category && (
        <EventCarousel />
      )}
      <EventListing />
    </Box>
  )
}


export default EventComponent