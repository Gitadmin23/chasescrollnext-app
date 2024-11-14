"use client"
import DonationBtn from '@/components/donation/donationBtn'
import DonationGraph from '@/components/donation/donationGraph'
import CustomButton from '@/components/general/Button'
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack'
import CircularProgressBar from '@/components/sharedComponent/circleGraph'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import UserImage from '@/components/sharedComponent/userimage'
import usePaystackStore from '@/global-state/usePaystack'
import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import useGetDonationList from '@/hooks/useGetDonationList'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import { IMAGE_URL } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat } from '@/utils/dateFormat' 
import { textLimit } from '@/utils/textlimit'
import { Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react' 
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoClose, IoInformationCircleOutline } from 'react-icons/io5'

export default function Donation() {

    const {
        primaryColor,
        bodyTextColor,
        secondaryBackgroundColor,
        borderColor,
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const { data, isLoading } = useGetDonationList()
    const router = useRouter()
    const [selected, setSelected] = useState({} as IDonationList)
    const { configPaystack, setPaystackConfig, donation, dataID } = usePaystackStore((state) => state);

    const { data: groupData } = useGetDonationGroup()
    const [open, setOpen] = useState(false)

    const clickHander = (item: IDonationList, index: string) => {
        if (item?.fundRasingGroupId?.id) {
            setSelected(item)
            setOpen(true)
        } else {
            router?.push("/dashboard/donation/" + index)
        }
    }

    return (
        <Flex w={"full"} px={"6"} py={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Text fontSize={"24px"} fontWeight={"700"} ><span style={{ color: primaryColor }} >Chasescroll</span> Fund Raising</Text>
            </Flex>
            <Flex py={"4"} gap={["4", "4", "6", "6"]} flexDir={["column", "column", "row", "row"]} alignItems={["start", "start", "center", "center"]} >
                <Text  >Fund Raising Campaign  ongoing </Text>
                <CustomButton mt={"2"} text={"New fund raising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"fit-content"} />
                <CustomButton text={"My fund raising"} px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={secondaryBackgroundColor} borderRadius={"32px"} fontWeight={"600"} color={headerTextColor} width={"fit-content"} />
            </Flex> 
            <LoadingAnimation loading={isLoading} >
                <Grid w={"full"} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6} >
                    {data?.map((item, index) => {
                        return (
                            <GridItem key={index} >
                                <Flex w={"full"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >

                                    <Flex as={"button"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.createdBy?.userId}`)} gap={"3"} >
                                        <UserImage size={"45px"} font={"20px"} data={item?.createdBy} image={item?.createdBy?.data?.imgMain?.value} border={"1px"} />
                                        <Flex display={["none", "none", "block"]} flexDir={"column"} textAlign={"left"}  >
                                            <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName), 15)}</Text>
                                            <Text fontSize={"12px"} color={bodyTextColor} >{dateFormat(item?.createdDate)}</Text>
                                        </Flex>
                                    </Flex>
                                    <Flex w={'full'} h={"150px"} rounded={"8px"} >
                                        <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} />
                                    </Flex>
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={"14px"} color={bodyTextColor} >Fund Raising Title</Text>
                                        <Text fontWeight={"700"} >{item?.name}</Text>
                                    </Flex>
                                    <Flex w={"full"} borderWidth={"1px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                        {item?.fundRasingGroupId?.id && (
                                            <Flex gap={"1"} alignItems={"center"} >
                                                <IoInformationCircleOutline />
                                                <Text fontSize={"12px"} >More fundraising available  </Text>
                                            </Flex>
                                        )}
                                        <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                    </Flex>
                                    <DonationGraph item={item} />
                                    <DonationBtn {...item} />
                                    {/* <CustomButton text={"Donate now"} height={"50px"} backgroundColor={"#F6F7FA"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} /> */}
                                </Flex>
                            </GridItem>
                        )
                    })}
                </Grid>
            </LoadingAnimation>
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
                                            <Flex role="button" onClick={()=> router?.push("/dashboard/donation/" + items?.id)} key={indexs} w={"full"} rounded={"16px"} gap={"4"} borderWidth={"1px"} borderColor={borderColor} p={"4"} >
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
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} donation={donation} />
        </Flex>
    )
}