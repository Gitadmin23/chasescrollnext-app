import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import { IDonationList } from '@/models/donation'
import React from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { Flex, Image, Text } from '@chakra-ui/react'
import DonationGraph from './donationGraph'
import { useRouter } from 'next/navigation'
import useCustomTheme from '@/hooks/useTheme'
import { IMAGE_URL } from '@/services/urls'

export default function DonationGroupModal({ selectedData }: { selectedData: IDonationList }) {

    const { data, isLoading, isRefetching } = useGetDonationGroup(selectedData?.fundRasingGroupId?.id)

    const router = useRouter()

    const {
        bodyTextColor,
        borderColor
    } = useCustomTheme()

    return (

        <LoadingAnimation loading={isLoading} >
            {data?.map((item, index) => {
                if (index === 0) {
                    return (
                        <Flex key={index} w={"full"} flexDir={"column"} gap={"4"} >
                            {item?.fundRaisers?.map((items, indexs) => {
                                console.log(items?.id);
                                
                                return (
                                    <Flex role="button" flexDir={["column", "column", "row"]} onClick={() => router?.push("/dashboard/donation/" + items?.id)} key={indexs} w={"full"} rounded={"16px"} gap={"4"} borderWidth={"1px"} borderColor={borderColor} p={"4"} alignItems={"center"} >
                                        <Flex w={"fit-content"} >
                                            <Flex w={["full", "full", "183px"]} height={"150px"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} >
                                                <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"150px"} src={IMAGE_URL + items?.bannerImage} />
                                            </Flex>
                                        </Flex>
                                        <Flex w={"full"} flexDir={"column"} gap={2} >
                                            <Flex w={"full"} justifyContent={"space-between"}  >
                                                <Flex flexDir={"column"} >
                                                    <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
                                                    <Text fontWeight={"600"} >{items?.name}</Text>
                                                </Flex>
                                            </Flex>
                                            <DonationGraph item={items} />
                                        </Flex>
                                    </Flex>
                                )
                            })}

                        </Flex>
                    )
                }
            })}
        </LoadingAnimation>
    )
}
