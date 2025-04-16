import useCustomTheme from '@/hooks/useTheme'
import { IService } from '@/models/Service'
import { IMAGE_URL, RESOURCE_BASE_URL } from '@/services/urls'
import { VStack, HStack, Box, Text, Image, Flex, useToast, Button } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter, usePathname, useParams } from 'next/navigation'
import React from 'react'
import BlurredImage from '../sharedComponent/blurred_image'
import { FiMapPin } from 'react-icons/fi'
import { ArrowLeft2, Star1 } from "iconsax-react";
import { TiTick } from "react-icons/ti";
import { formatNumber } from '@/utils/numberFormat'
import UserImage from '../sharedComponent/userimage'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import ProductImageScroller from '../sharedComponent/productImageScroller'
import { LocationStroke } from '../svg'
import DeleteEvent from '../sharedComponent/delete_event'
import { IoMdCheckmark } from 'react-icons/io'

function BusinessCard({ business, mybusiness, isSelect, selected, setSelected }: { business: IService, mybusiness?: boolean, isSelect?: boolean, selected?: any, setSelected?: any }) {
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    const [services, setServices] = React.useState<IService[]>([]);
    const userId = localStorage.getItem('user_id'); 
    const param = useParams();
    const id = param?.slug;

    const toast = useToast()
    const router = useRouter();
    const path = usePathname();

    React.useEffect(() => {
        if (business?.images?.length > 1) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => {
                    if (prev === business?.images.length - 1) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [])

    // query
    console.log(business);


    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme()

    const clickHandler = () => {
        if (isSelect) {
            let clone = [...selected]

            if (selected?.includes(business?.id)) {
                clone = clone?.filter((item: string) => item !== business?.id)
                setSelected(clone)
            } else {
                clone = [...clone, business?.id]
                setSelected(clone)
            }
        } else {
            if (mybusiness) {
                router.push(`/dashboard/kisok/service/${business?.id}/edit`)
            } else {
                router.push(`/dashboard/kisok/service/${business?.id}`)
            }
        }
    }


    return (
        <Flex as={"button"} flexDir={"column"} pos={"relative"} onClick={() => clickHandler()} borderWidth={"1px"} bgColor={mainBackgroundColor} rounded={"10px"} w={"full"} >
            {(!isSelect && (id === userId)) && (
                <DeleteEvent id={business?.id} isServices={true} name={business?.name + " Services"} isOrganizer={mybusiness ? true : false} />
            )}
            {isSelect && (
                <Flex pos={"absolute"} zIndex={"30"} top={"3"} right={"3"} w={"5"} h={"5"} justifyContent={"center"} alignItems={"center"} bgColor={selected?.includes(business?.id) ? primaryColor : "white"} rounded={"6px"} >
                    <IoMdCheckmark size={"15px"} color='white' />
                </Flex>
            )}
            <ProductImageScroller images={business?.images} createdDate={isSelect ? "" : moment(business?.createdDate)?.fromNow()} userData={business?.vendor} />
            <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", isSelect ? "2" : "0px"]}  >
                <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(business?.name), 20)}</Text>
                <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(business?.name), 16)}</Text>
                <Flex gap={"1"} w={"full"} flexDir={["column", "column", "row"]} justifyContent={"space-between"} alignItems={["start", "start", "center"]} >
                    <Flex flexDir={"column"} alignItems={'flex-start'}>
                        <Text fontWeight={400} fontSize={'12px'}>Service offering</Text>
                        <Text fontWeight={600} textAlign={"left"} fontSize={'12px'}>{textLimit(business?.category?.replaceAll("_", " "), 15)}</Text>
                    </Flex>
                    {!isSelect && (
                        <Flex gap={"2"} display={["none", "none", "flex"]} >
                            <Flex alignItems={'center'} px={"2"} h={"27px"} w={"fit-content"} rounded={"13px"} borderWidth={"0.86px"} >
                                {business.totalBooking > 0 && <Text fontWeight={400} fontSize={'8px'} >{business?.totalBooking === 0 ? 0 : business?.totalBooking} clients served</Text>}
                                {business.totalBooking === 0 && <Text fontWeight={400} color={primaryColor} fontSize={'8px'} >Ready to serve</Text>}
                            </Flex>
                            <Flex rounded={"13px"} px={"1"} h={"23px"} gap={"1"} alignItems={"center"} borderWidth={"0.86px"} >
                                <Star1 size={20} color='gold' variant="Bold" />
                                <Text fontSize={'16px'} fontWeight={600}>{business?.rating}</Text>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                {!isSelect && (

                    <Flex w={"full"} gap={["2px", "2px", "1"]} mt={["1", "1", "0px"]} alignItems={"center"} >
                        <LocationStroke />
                        <Text fontSize={["12px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(business?.location?.locationDetails, 40)}</Text>
                        <Text fontSize={["10px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(business?.location?.locationDetails, 15)}</Text>
                    </Flex>
                )}
                <Flex w={"full"} justifyContent={"end"} >
                    <Text fontSize={"14px"} fontWeight={"600"} >{formatNumber(business?.price)}</Text>
                </Flex>
            </Flex>
            {(mybusiness && !isSelect) && (
                <Flex as={"button"} onClick={() => clickHandler()} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                    Edit Service
                </Flex>
            )}
            {(!mybusiness && !isSelect) && (
                <Flex as={"button"} onClick={() => clickHandler()} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                    View Service
                </Flex>
            )}
        </Flex>
    )
}

export default BusinessCard
