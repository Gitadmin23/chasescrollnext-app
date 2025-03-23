import { Flex } from '@chakra-ui/react'
import React from 'react'
import EventDonationPicker from './eventDonationPicker'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IDonationList } from '@/models/donation'

export default function ListDonation({ selectDonation, setSelectDonation }: { setSelectDonation: any, selectDonation: string }) {


    const search = ""

    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/fund-raiser/user-fund-raisers${search ? `?name=${search}` : ``}`, limit: 20, filter: "id", name: "donationlist", search: search })

    return (
        <Flex w={"full"} maxH={"300px"} flexDir={"column"} overflowY={"auto"} gap={"3"} >
            {results?.map((item: IDonationList, index: number) => {
                return (
                    <Flex key={index} >
                    <EventDonationPicker items={item} selectDonation={selectDonation} setSelectDonation={setSelectDonation} />
                    </Flex>
                )
            })}
        </Flex>
    )
}
