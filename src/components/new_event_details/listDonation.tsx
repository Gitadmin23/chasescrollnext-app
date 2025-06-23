import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EventDonationPicker from './eventDonationPicker'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IDonationList } from '@/models/donation'
import { useQuery } from 'react-query'
import { IEventType } from '@/models/Event'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'

export default function ListDonation({ selectDonation, setSelectDonation, item, setSelectInitialDonation, length }: { setSelectDonation: any, setSelectInitialDonation: any, selectDonation: string, initialDonation: string, item: IEventType, length: any }) {


    const search = ""

    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/fund-raiser/user-fund-raisers${search ? `?name=${search}` : ``}`, limit: 20, filter: "id", name: "donationlist", search: search })


    // react query
    const { isLoading } = useQuery(['all-donation', item?.id], () => httpService.get(`/pinned-fundraisers/get-pinned-event-fundraising/${item?.id}`, {
        params: {
            id: item?.id
        }
    }), {
        onError: (error: any) => {
        },
        onSuccess: (data: any) => {
            if (data?.data?.length !== 0) {
                setSelectDonation(data?.data[0]?.fundRaiser?.id + "")
                setSelectInitialDonation(data?.data[0]?.fundRaiser?.id + "")
            }
        }
    })

    useEffect(() => {
        if (results) {
            length(results?.length)
        }
    }, [loadingList])

    return (
        <LoadingAnimation loading={loadingList || isLoading} length={results?.length} >
            <Flex w={"full"} maxH={"60vh"} flexDir={"column"} overflowY={"auto"} gap={"3"} >
                {results?.map((item: IDonationList, index: number) => {
                    return (
                        <Flex key={index} >
                            <EventDonationPicker items={item} selectDonation={selectDonation} setSelectDonation={setSelectDonation} />
                        </Flex>
                    )
                })}
            </Flex>
        </LoadingAnimation>
    )
}
