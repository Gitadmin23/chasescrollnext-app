import useCustomTheme from '@/hooks/useTheme'
import { IService } from '@/models/Service'
import { IMAGE_URL, RESOURCE_BASE_URL } from '@/services/urls'
import { VStack, HStack, Box, Text, Image, Flex, useToast, Button } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import BlurredImage from '../sharedComponent/blurred_image'
import { FiMapPin } from 'react-icons/fi'
import { ArrowLeft2, Star1 } from "iconsax-react";
import { numberFormat } from '@/utils/formatNumberWithK'
import { formatNumber } from '@/utils/numberFormat'
import UserImage from '../sharedComponent/userimage'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import ProductImageScroller from '../sharedComponent/productImageScroller'
import { LocationStroke } from '../svg'

function BusinessCard({ business }: { business: IService }) {
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    const [services, setServices] = React.useState<IService[]>([]);

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
        router.push(`/dashboard/kisok/service/${business?.id}`)
    }


    return (
        <Flex as={"button"} alignItems="start" onClick={() => clickHandler()} p={["2", "2", "4"]} borderWidth={["1px", "1px", "1px"]} borderColor={borderColor} w={"full"} h={"full"} flexDir={"column"} bgColor={mainBackgroundColor} rounded={["16px"]} gap={["2", "2", "4"]} >
             
            <ProductImageScroller images={business?.images} createdDate={moment(business?.createdDate)?.fromNow()} userData={business?.vendor} />

            <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={["0px", "0px", 2]} px={["0px", "0px", "2"]} >
                {/* START */}
                <Flex w={"full"} flexDir={"column"} gap={"2"} >
                    <Flex width={"full"} alignItems={"center"} justifyContent={"space-between"}>
                        <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(business?.name), 20)}</Text>
                        <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(business?.name), 16)}</Text>
                    </Flex>
                    <Flex display={["none", "none", "flex"]} justifyContent={"end"} gap={"3"} >
                        <Flex alignItems={'center'}>
                            {business.totalBooking > 0 && <Text fontWeight={400} fontSize={'14px'} >{business?.totalBooking === 0 ? 0 : business?.totalBooking} clients served</Text>}
                            {business.totalBooking === 0 && <Text fontWeight={400} color={primaryColor} fontSize={'14px'} >Ready to serve</Text>}
                        </Flex>
                        <Star1 size={25} color='gold' variant="Bold" />
                        <Text fontSize={'16px'} fontWeight={600}>{business?.rating}</Text>
                    </Flex>
                </Flex>

                <Flex display={["none", "none", "flex"]} gap={"4"} h={"80px"} alignItems={'center'} width='100%'>
                    <Flex width='full' flexDir={"column"} borderRightWidth={'1px'} borderRightColor={borderColor} alignItems={'flex-start'} paddingRight={'10px'}>
                        <Text fontWeight={400} fontSize={'14px'}>Service offering</Text>
                        <Text fontWeight={600} textAlign={"left"} fontSize={'14px'}>{business?.category}</Text>
                    </Flex>

                    <Flex justifyContent={'center'} paddingLeft={'10px'} height='full' width='full' alignItems={'center'}>
                        <Text fontWeight={600} fontSize={'16px'} >{formatNumber(business?.price)}</Text>
                    </Flex>
                </Flex>

                <Text display={["block", "block", "none"]} fontSize={["14px", "14px", "16px"]} textAlign={"left"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(business?.price)}</Text>

                <Flex w={"full"} gap={"2"} mt={["1", "1", "0px"]} alignItems={"center"} >
                    <LocationStroke />
                    <Text fontSize={["12px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(business?.location?.locationDetails, 40)}</Text>
                    <Text fontSize={["12px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(business?.location?.locationDetails, 40)}</Text>
                </Flex>
            </Flex>
            <Button display={["none", "none", "flex"]} onClick={() => clickHandler()} w='full' mt={"auto"} h='54px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={mainBackgroundColor} _hover={{ backgroundColor: mainBackgroundColor }}>
                <Text fontSize={'16px'} fontWeight={600} color={primaryColor}>View Service</Text>
            </Button>
        </Flex>
    )
}

export default BusinessCard
