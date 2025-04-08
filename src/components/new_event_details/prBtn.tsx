import useCustomTheme from '@/hooks/useTheme'
import { IEventType } from '@/models/Event'
import { Checkbox, Flex, Switch, Text } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import CustomButton from '../general/Button'
import ModalLayout from '../sharedComponent/modal_layout'
import UserImage from '../sharedComponent/userimage'
import { textLimit } from '@/utils/textlimit'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import EventDonation from './eventDonation'
import EventDonationPicker from './eventDonationPicker'
import usePr from '@/hooks/usePr'
import ListProduct from './listProduct'
import useProduct, { IPinned } from '@/hooks/useProduct'
import ListDonation from './listDonation'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import ListService from './listService'
import ListRental from './listRental'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { ITag } from '@/models/product'
 

export default function PrBtn({ data }: { data: IEventType }) {

    const {
        mainBackgroundColor,
        primaryColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    const pathname = usePathname()

    const { pinProduct } = useProduct()

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)
    const [index, setIndex] = useState(1)

    const [selectProduct, setSelectProduct] = useState<Array<IPinned>>([])
    const [selectService, setSelectService] = useState<Array<ITag>>([])
    const [selectRental, setSelectRental] = useState<Array<ITag>>([])
    const [selectDonation, setSelectDonation] = useState("")

    const { createPr, tagServiceAndRental, createFundraising } = usePr()

    const clickHander = () => {
        createPr?.mutate({
            eventID: data?.id,
            affiliateType: data?.affiliates[0]?.affiliateType,
            percent: data?.affiliates[0]?.percent
        })
        setOpen(false)
    }

    const submitHandler = () => {
        if (index === 2) {
            pinProduct?.mutate({ pinnedItems: selectProduct })
        } else if (index === 3) {
            tagServiceAndRental?.mutate({
                serviceCategories: [],
                rentalCategories: selectRental,
                eventID: data?.id,
                state: ""
            })
        } else if (index === 4) {
            tagServiceAndRental?.mutate({
                serviceCategories: selectService,
                rentalCategories: [],
                eventID: data?.id,
                state: ""
            })
        } else if (index === 1) {
            createFundraising?.mutate({
                fundRaiserID: selectDonation,
                eventID: data?.id,
                userID: data?.createdBy?.userId
            })
        }
        setOpen(false)
    }

    return (
        <>
            <Flex pos={["relative"]} w={"full"} bgColor={primaryColor} color={"white"} flexDir={"column"} roundedBottomRight={["0px", "0px", "12px"]} roundedBottomLeft={"12px"} gap={"3"} >
                {data?.isOrganizer && (
                    <Flex onClick={() => setOpen(true)} as={"button"} w={"full"} gap={"2"} h={"55px"} px={"1"} alignItems={"center"} justifyContent={"center"} >
                        <Text fontSize={"14px"} fontWeight={"500"} >My Support Center</Text>
                        {/* <IoIosArrowDown size={"20px"} /> */}
                    </Flex>
                )}
                {!data?.isOrganizer && (
                    <Flex disabled={createPr?.isLoading} onClick={clickHander} as={"button"} w={"full"} gap={"2"} h={"55px"} px={"4"} alignItems={"center"} justifyContent={"center"} >
                        {createPr?.isLoading ?
                            <Text fontSize={"14px"} fontWeight={"500"} >{"Loading..."}</Text> :
                            <Text fontSize={"14px"} fontWeight={"500"} >{data?.prStatus === "PENDING" ? "Pending" : "Apply to be a PR"}</Text>}
                    </Flex>
                    // <CustomButton onClick={clickHander} disable={data?.prStatus === "PENDING" ? true : false} text={data?.prStatus === "PENDING" ? "Pending" : "Apply to be a PR"} backgroundColor={["#EEEEFF", "#EEEEFF", primaryColor]} color={[primaryColor, primaryColor, "white"]} borderRadius={"999px"} fontSize={["xs", "xs", "sm"]} width={["120px", "120px", "160px"]} />
                )}
                <ModalLayout open={open} size={"md"} close={setOpen} closeIcon={true} >
                    <Flex flexDir={"column"} gap={"4"} w={"full"} px={"4"} mb={"4"} >
                        <Flex gap={"2"} alignItems={"center"} >
                            {tab && (
                                <Flex as={"button"} onClick={() => setTab(false)} >
                                    <IoIosArrowBack size={"20px"} />
                                </Flex>
                            )}
                            <Text fontWeight={"500"}  >My support center</Text>
                        </Flex>
                        {!tab && (
                            <Flex bgColor={secondaryBackgroundColor} w={"full"} flexDir={"column"} rounded={"16px"} >
                                <Flex w={"full"} justifyContent={"space-between"} borderBottomWidth={data?.isOrganizer ? "1px" : "0px"} h={"50px"} px={"3"} alignItems={"center"} >
                                    <Text fontSize={"14px"} >Request PR Service</Text>
                                    {data?.isOrganizer && (
                                        <Switch />
                                    )}
                                    {!data?.isOrganizer && (
                                        <CustomButton isLoading={createPr?.isLoading} disable={createPr?.isLoading} onClick={clickHander} width={"80px"} height={"30px"} fontSize={"12px"} text={"Join"} rounded={"full"} />
                                    )}
                                </Flex>
                                {data?.isOrganizer && (
                                    <Flex flexDirection={"column"} >
                                        <Flex w={"full"} onClick={() => { setTab(true), setIndex(1) }} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={["10px", "14px", "14px"]}  >Add fundraising </Text>
                                        </Flex>
                                        <Flex w={"full"} onClick={() => { setTab(true), setIndex(2) }} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={["10px", "14px", "14px"]}  >Add kiosk</Text>
                                        </Flex>
                                        <Flex w={"full"} onClick={() => { setTab(true), setIndex(3) }} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={["10px", "14px", "14px"]}  >Request Service - Photographer, makeup Artist...</Text>
                                        </Flex>
                                        <Flex w={"full"} onClick={() => { setTab(true), setIndex(4) }} as={"button"} justifyContent={"space-between"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={["10px", "14px", "14px"]}  >Rent an item(s)</Text>
                                        </Flex>
                                    </Flex>
                                )}
                            </Flex>
                        )}
                        {tab && (
                            <Flex w={"full"} gap={"4"} pos={"relative"} flexDir={"column"} >
                                <Flex p={"4px"} h={"45px"} rounded={"full"} w={"full"} bgColor={secondaryBackgroundColor} >
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 1 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(1)} >
                                        My Fundraising
                                    </Flex>
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 2 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(2)} >
                                        Add Kiosk
                                    </Flex>
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 4 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(4)} >
                                        Services
                                    </Flex>
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 3 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(3)} >
                                        Rental
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} pb={"4"} gap={"4"} bgColor={(index === 1 || index === 2) ? "transparent" : "transparent"} rounded={"16px"} flexDir={"column"} >

                                    {index === 1 && (
                                        <ListDonation selectDonation={selectDonation} setSelectDonation={setSelectDonation} />
                                    )}
                                    {index === 2 && (
                                        <ListProduct setOpen={setOpen} selectProduct={selectProduct} setSelectProduct={setSelectProduct} data={data} />
                                    )}
                                    {index === 3 && (
                                        <ListRental item={data} rental={selectRental} updateRental={setSelectRental} />
                                    )}
                                    {index === 4 && (
                                        <ListService service={selectService} selectService={setSelectService} />
                                    )}
                                    <Flex w={"full"} py={"1"} bgColor={(index === 1 || index === 2) ? "white" : "white"} position={"sticky"} bottom={"-4px"} >
                                        <CustomButton onClick={submitHandler} isLoading={pinProduct?.isLoading || createFundraising?.isLoading || tagServiceAndRental?.isLoading} text={index === 2 ? "Add to product" : "Add"} width={"150px"} height={"40px"} fontSize={"14px"} borderRadius={"999px"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>

                </ModalLayout>
            </Flex>
        </>
    )
}
