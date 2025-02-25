import useCustomTheme from '@/hooks/useTheme'
import { IService } from '@/models/Service'
import { IMAGE_URL, RESOURCE_BASE_URL } from '@/services/urls'
import { VStack, HStack, Box, Text, Image, Flex, useToast, Button } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import BlurredImage from '../sharedComponent/blurred_image'
import { FiMapPin } from 'react-icons/fi'

function BusinessCard({ business }: { business: IService }) {

    const [services, setServices] = React.useState<IService[]>([]);

    const toast = useToast()
    const router = useRouter();
    const path = usePathname();

    // query
    console.log(business);


    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme()

    return (
        <VStack style={{ boxShadow: "2px 4px 4px 2px #0000000D" }} w='full' h='auto' borderWidth={'0px'} borderColor={borderColor} borderRadius={'15px'} p='10px' alignItems={'flex-start'} overflowX={'hidden'} minWidth={'366px'} mb={'20px'}>

            <HStack w='full'>
                <Box w='30px' h='30px' borderBottomLeftRadius={'50px'} borderTopLeftRadius={'50px'} borderBottomRightRadius={'50px'} overflow={'hidden'} bg={secondaryBackgroundColor}>
                    <Image onClick={() => router.push(`/dashboard/profile/${business?.vendor?.userId}`)} src={business?.vendor?.data?.imgMain?.value ? (business?.vendor?.data?.imgMain?.value?.startsWith('https://') ? business?.vendor?.data?.imgMain?.value : `${IMAGE_URL}${business?.vendor?.data?.imgMain?.value}`) : 'https://ui-avatars.com/api/?background=random'} w='full' h='full' alt='image' />
                </Box>
                <VStack spacing={-5} alignItems={'flex-start'}>
                    <Text onClick={() => router.push(`/dashboard/profile/${business?.vendor?.userId}`)} cursor='pointer' fontWeight={600} fontSize={'14px'} color={primaryColor}>{business?.vendor?.firstName} {business?.vendor?.lastName}</Text>
                    <Text fontSize={'12px'} color={bodyTextColor}>{moment(new Date()).fromNow()}</Text>
                </VStack>
            </HStack>

            <Box onClick={() => router.push(`/dashboard/newbooking/details/service/${business?.id}`)} cursor='pointer' w='full' h='146px' borderRadius={'10px'} overflow={'hidden'} bg="lightgrey" >
                {/* <BlurredImage forEvent={false} image={business?.images[0].startsWith('https://') ? business?.images[0] : (IMAGE_URL as string) + business?.images[0]} height={'100%'} /> */}

                <Image onClick={() => router.push(`/dashboard/newbooking/details/service/${business?.id}`)} cursor='pointer' src={business?.images[0].startsWith('https://') ? business?.images[0] : (IMAGE_URL as string) + business?.images[0]} alt="banner image" w='full' h='full' objectFit={'contain'} />
            </Box>

            <VStack minHeight={'200px'} maxHeight="250px" width='full' overflow="hidden" alignItems="flex-start" spacing={6}>
                    {/* START */}
                <VStack alignItems={'flex-start'} spacing={-3}>
                    <Text fontWeight={400} fontSize={'14px'}>Business Name</Text>
                    <Text fontSize={'24px'} fontWeight={700}>{business?.name ?? 'This is the business name'}</Text>
                </VStack>

                <HStack spacing={-3} alignItems={'flex-start'} width='100%'>
                    <VStack width='full' flex={1} borderRightWidth={'1px'} borderRightColor={borderColor} alignItems={'flex-start'} paddingRight={'10px'}>
                        <Text fontWeight={400} fontSize={'14px'}>Service offering</Text>
                        <Text color='black' fontWeight={600} fontSize={'14px'}>{business?.category}</Text>
                    </VStack>

                    <VStack justifyContent={'center'} flex={1} paddingLeft={'10px'} height='full' width='full' alignItems={'flex-end'}>
                        <Text fontWeight={400} fontSize={'14px'} >{business?.totalBooking === 0 ? 0 : business?.totalBooking} clients served</Text>
                    </VStack>
                </HStack>

                {/* <Box pb='5px' borderBottomWidth={'0px'} borderBottomColor={borderColor} w='full'>
                    <Text fontWeight={400} fontSize={'12px'}>{business?.description.length > 400 ? business?.description?.substring(0, 400) + '...' : business?.description}</Text>
                </Box> */}

                <HStack alignItems={'center'} mt='10px'>
                    <FiMapPin size={25} color={primaryColor} />
                    <Text fontSize={'14px'} fontWeight={500}>{business?.isOnline ? 'Online' : business?.address}</Text>
                </HStack>
            </VStack>

            <Box h='10px' />
            <Button onClick={() => router.push(`/dashboard/newbooking/details/service/${business?.id}`)} w='full' h='54px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={"white"} _hover={{ backgroundColor: "white" }}>
                <Text fontSize={'16px'} fontWeight={600} color={primaryColor}>View Service</Text>
            </Button>
        </VStack>
    )
}

export default BusinessCard
