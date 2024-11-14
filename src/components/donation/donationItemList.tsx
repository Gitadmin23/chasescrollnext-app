import useGetDonationList from '@/hooks/useGetDonationList'
import { IMAGE_URL } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { Grid, GridItem, Flex, Text, Image } from '@chakra-ui/react'
import moment from 'moment' 
import React, { useState } from 'react'
import { IoClose, IoInformationCircleOutline } from 'react-icons/io5'
import CustomButton from '../general/Button'
import LoadingAnimation from '../sharedComponent/loading_animation'
import UserImage from '../sharedComponent/userimage'
import DonationGraph from './donationGraph'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import ModalLayout from '../sharedComponent/modal_layout'
import { useRouter } from 'next/navigation'

export default function DonationItemList({ details, singleData }: { details?: boolean, singleData?: IDonationList }) {

    const { data, isLoading } = useGetDonationList()
    const {
        bodyTextColor,
        borderColor,
        primaryColor
    } = useCustomTheme()

    const [selected, setSelected] = useState({} as IDonationList)
    const { data: groupData, isLoading: loading } = useGetDonationGroup()
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const clickHander = (item: IDonationList, index: string) => {
        if (item?.fundRasingGroupId?.id) {
            setSelected(item)
            setOpen(true)
        } else {
            router?.push("/dashboard/donation/" + index)
        }
    }

    return (
        <Flex w={"full"} flexDir={"column"} gap={"5"} >
            {!details && (
                <LoadingAnimation loading={isLoading} >
                    <Grid w={"full"} templateColumns='repeat(3, 1fr)' gap={6} >
                        {data?.map((item, index) => {
                            return (
                                <GridItem key={index} >
                                    <Flex w={"full"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >

                                        <Flex as={"button"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                            <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                            <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                                <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
                                                <Text fontSize={"12px"} color={bodyTextColor} >{moment(item?.createdDate).fromNow()}</Text>
                                            </Flex>
                                        </Flex>
                                        <Flex w={'full'} h={"150px"} rounded={"8px"} >
                                            <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} />
                                        </Flex>
                                        <Flex flexDir={"column"} >
                                            <Text fontSize={"14px"} color={bodyTextColor} >Fund Raising Title</Text>
                                            <Text fontWeight={"700"} >{item?.name}</Text>
                                        </Flex>
                                        <Flex w={"full"} borderWidth={item?.fundRasingGroupId?.id ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                            {item?.fundRasingGroupId?.id && (
                                                <Flex gap={"1"} alignItems={"center"} >
                                                    <IoInformationCircleOutline />
                                                    <Text fontSize={"12px"} >More fundraising available  </Text>
                                                </Flex>
                                            )}
                                            <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                        </Flex>
                                        <DonationGraph item={item} />
                                        <CustomButton text={"Donate now"} height={"50px"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </GridItem>
                            )
                        })}
                    </Grid>
                </LoadingAnimation>
            )}
            {details && (
                <Text fontWeight={"700"} >Other fund  Raising Available in {singleData?.name} </Text>
            )}
            {details && (
                <LoadingAnimation loading={loading} >
                    {groupData?.map((groupItem, index) => {
                        if (groupItem?.id === singleData?.fundRasingGroupId?.id) {
                            return (
                                <Flex key={index} w={"full"} gap={6} overflowX={"auto"} pb={"4"} >
                                    {groupItem?.fundRaisers?.map((item, index) => {

                                        console.log(item);


                                        return (
                                            <Flex key={index} minW={"400px"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >

                                                {/* <Flex as={"button"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                                    <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                                    <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                                        <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
                                                        <Text fontSize={"12px"} color={bodyTextColor} >{moment(item?.createdDate).fromNow()}</Text>
                                                    </Flex>
                                                </Flex> */}
                                                <Flex w={'full'} h={"150px"} rounded={"8px"} >
                                                    <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} />
                                                </Flex>
                                                <Flex flexDir={"column"} >
                                                    <Text fontSize={"14px"} color={bodyTextColor} >Fund Raising Title</Text>
                                                    <Text fontWeight={"700"} >{item?.name}</Text>
                                                </Flex>

                                                <Flex w={"full"} borderWidth={item?.fundRasingGroupId?.id ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                                    {item?.fundRasingGroupId?.id && (
                                                        <Flex gap={"1"} alignItems={"center"} >
                                                            <IoInformationCircleOutline />
                                                            <Text fontSize={"12px"} >More fundraising available  </Text>
                                                        </Flex>
                                                    )}
                                                    <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                                </Flex>
                                                <DonationGraph item={item} />
                                                <CustomButton text={"Donate now"} height={"50px"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )
                        }
                    })}
                </LoadingAnimation>
            )}

            <ModalLayout open={open} close={setOpen} size={"xl"} >
                <Flex flexDir={"column"} w={"full"} p={"5"} >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Flex flexDirection={"column"} >
                            <Text fontSize={"14px"} color={bodyTextColor} >Chasescroll Fund Raising</Text>
                            <Text fontWeight={"600"} >Fundraising Available in {selected?.name}</Text>
                        </Flex>
                        <Flex onClick={() => setOpen(false)} >
                            <IoClose size="20px" color={bodyTextColor} />
                        </Flex>
                    </Flex>
                    <Flex mt={"6"} flexDirection={"column"} gap={"4"} >
                        {groupData?.map((item, index) => {
                            if (item?.id === selected?.fundRasingGroupId?.id) {
                                return (
                                    <Flex key={index} w={"full"} flexDir={"column"} gap={"4"} >
                                        {item?.fundRaisers?.map((items, indexs) => (
                                            <Flex role="button" onClick={() => router?.push("/dashboard/donation/" + items?.id)} key={indexs} w={"full"} rounded={"16px"} gap={"4"} borderWidth={"1px"} borderColor={borderColor} p={"4"} >
                                                <Flex w={"fit-content"} >
                                                    <Flex w={"183px"} height={"full"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} >
                                                        <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + items?.bannerImage} />
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
                                        ))}

                                    </Flex>
                                )
                            }
                        })}
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}