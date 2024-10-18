"use client"
import { BookingPrice, DayAvaliable, InfoTab, ListServices } from '@/components/new_booking_component/createBookTabs'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function CreateBooking() {

    const [ tab, setTab ] = useState(0)

    return (
        <Flex w={"full"} h={"full"} overflow={"hidden"} >
            {tab === 0 && (
                <InfoTab setTab={setTab} />
            )}
            {tab === 1 && (
                <ListServices setTab={setTab} />
            )}
            {tab === 2 && (
                <DayAvaliable setTab={setTab} />
            )}
            {tab === 3 && (
                <BookingPrice setTab={setTab} />
            )}
        </Flex>
    )
}
