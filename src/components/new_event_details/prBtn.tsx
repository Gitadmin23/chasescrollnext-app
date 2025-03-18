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
import useProduct from '@/hooks/useProduct'
import ListDonation from './listDonation'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import ListService from './listService'
import ListRental from './listRental'

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

    const [selectProduct, setSelectProduct] = useState<Array<string>>([])
    const [selectService, setSelectService] = useState<Array<string>>([])
    const [selectRental, setSelectRental] = useState<Array<string>>([])
    const [selectDonation, setSelectDonation] = useState("")


    const { data: datarental } = useQuery(
        ["getcategoryRental"],
        () => httpService.get(`/rental/categories`), {
    }
    );

    const { createPr } = usePr()

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
            pinProduct?.mutate({
                pinnedItemType: "EVENT",
                productId: selectProduct[0],
                typeId: data?.id + ""
            })
        }
    }

    return (
        <>
            <Flex pos={["relative"]} w={"fit-content"} flexDir={"column"} rounded={"16px"} gap={"3"} >
                <CustomButton onClick={() => setOpen(true)} text={"My support Center"} backgroundColor={["#EEEEFF", "#EEEEFF", primaryColor]} color={[primaryColor, primaryColor, "white"]} borderRadius={"999px"} fontSize={["xs", "xs", "sm"]} width={["120px", "120px", "160px"]} />
                <ModalLayout open={open} size={"md"} close={setOpen} closeIcon={true} >
                    <Flex flexDir={"column"} gap={"4"} w={"full"} px={"4"} mb={"4"} >
                        <Text fontWeight={"500"}  >My support center</Text>
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
                                        <Flex w={"full"} onClick={() => setTab(true)} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={"14px"}  >Add fundraising </Text>
                                        </Flex>
                                        <Flex w={"full"} onClick={() => setTab(true)} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={"14px"}  >Add kiosk</Text>
                                        </Flex>
                                        <Flex w={"full"} onClick={() => setTab(true)} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={"14px"}  >Request Service - Photographer, makeup Artist...</Text>
                                        </Flex>
                                        <Flex w={"full"} onClick={() => setTab(true)} as={"button"} justifyContent={"space-between"} h={"50px"} px={"3"} alignItems={"center"} >
                                            <Text fontSize={"14px"}  >Rent an item(s)</Text>
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
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 3 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(3)} >
                                        Rental
                                    </Flex>
                                    <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 4 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(4)} >
                                        Services
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} py={"4"} gap={"4"} bgColor={(index === 1 || index === 2) ? "transparent" : "transparent"} rounded={"16px"} flexDir={"column"} >
                                     
                                    {index === 1 && (
                                        <ListDonation selectDonation={selectDonation} setSelectDonation={setSelectDonation} />
                                    )}
                                    {index === 2 && (
                                        <ListProduct setOpen={setOpen} selectProduct={selectProduct} setSelectProduct={setSelectProduct} />
                                    )}
                                    {index === 3 && ( 
                                        <ListRental rental={selectRental} updateRental={setSelectRental} />
                                    )}
                                    {index === 4 && (
                                        <ListService service={selectService} selectService={setSelectService} />
                                    )}
                                    <Flex w={"full"} py={"1"} bgColor={(index === 1 || index === 2) ? "white" : "white"} position={"sticky"} bottom={"-4px"} >
                                        <CustomButton onClick={submitHandler} isLoading={pinProduct?.isLoading} text={index === 2 ? "Add to product" : "Add"} width={"150px"} height={"40px"} fontSize={"14px"} borderRadius={"999px"} />
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
