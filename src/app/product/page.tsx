"use client"
import EventListing from '@/components/event_component/event_listing'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function EventPage() {
    return (  
      <EventListing landing={true} eventdashboard={true} />
    )
}
