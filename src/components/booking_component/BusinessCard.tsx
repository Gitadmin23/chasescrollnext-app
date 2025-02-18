import useCustomTheme from '@/hooks/useTheme'
import { IBuisness } from '@/models/Business'
import { IService } from '@/models/Service'
import { IMAGE_URL, RESOURCE_BASE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { VStack, HStack, Box, Text, Image, Flex, useToast, Button } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'
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
        <VStack style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} w='full' h='auto' borderWidth={'0.5px'} borderColor={borderColor} borderRadius={'15px'} p='10px' alignItems={'flex-start'} overflowX={'hidden'}>

            <HStack w='full'>
                <Box w='30px' h='30px' borderBottomLeftRadius={'50px'} borderTopLeftRadius={'50px'} borderBottomRightRadius={'50px'} overflow={'hidden'} bg={secondaryBackgroundColor}>
                    <Image onClick={() => router.push(`/dashboard/profile/${business?.vendor?.userId}`)} src={business?.vendor?.data?.imgMain?.value ? (business?.vendor?.data?.imgMain?.value?.startsWith('https://') ? business?.vendor?.data?.imgMain?.value : `${IMAGE_URL}${business?.vendor?.data?.imgMain?.value}`) : 'https://ui-avatars.com/api/?background=random'} w='full' h='full' alt='image' />
                </Box>
                <VStack spacing={-5} alignItems={'flex-start'}>
                    <Text onClick={() => router.push(`/dashboard/profile/${business?.vendor?.userId}`)} cursor='pointer' fontWeight={600} fontSize={'14px'} color={primaryColor}>{business?.vendor?.firstName} {business?.vendor?.lastName}</Text>
                    <Text fontSize={'12px'} color={bodyTextColor}>{moment(new Date()).fromNow()}</Text>
                </VStack>
            </HStack>

            <Box onClick={() => router.push(`/dashboard/newbooking/details/${business?.id}`)} cursor='pointer' w='full' h='200px' borderRadius={'10px'} overflow={'hidden'}>
                <BlurredImage forEvent={false} image={business?.images[0].startsWith('https://') ? business?.images[0] : (IMAGE_URL as string) + business?.images[0]} height={'100%'} />

                {/* <Image onClick={() => router.push(`/dashboard/newbooking/details/${business?.id}`)} cursor='pointer' src={business?.bannerImage.startsWith('https://') ? business?.bannerImage : (IMAGE_URL as string) + business?.bannerImage} alt="banner image" w='full' h='full' objectFit={'cover'} /> */}
            </Box>

            <VStack alignItems={'flex-start'} spacing={-3}>
                <Text fontWeight={400} fontSize={'14px'}>Business Name</Text>
                <Text fontSize={'16px'} fontWeight={700}>{business?.name ?? 'This is the business name'}</Text>
            </VStack>

            <VStack spacing={-3} alignItems={'flex-start'}>
                <Text fontWeight={400} fontSize={'12px'}>Service offering</Text>
                <Text fontWeight={600} fontSize={'14px'}>{business?.category}</Text>
            </VStack>

            {/* <Box pb='5px' borderBottomWidth={'0px'} borderBottomColor={borderColor} w='full'>
                <Text fontWeight={400} fontSize={'12px'}>{business?.description.length > 400 ? business?.description?.substring(0, 400) + '...' : business?.description}</Text>
            </Box> */}

            <HStack alignItems={'center'} mt='10px'>
                <FiMapPin size={25} color={primaryColor} />
                <Text fontSize={'14px'}>{business?.isOnline ? 'Online' : business?.address}</Text>
            </HStack>

            <Box h='10px' />
            <Button onClick={() => router.push(`/dashboard/newbooking/details/service/${business?.id}`)} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={"#F7FBFE"} _hover={{ backgroundColor: "#F7FBFE" }}>
                <Text fontSize={'14px'} color={primaryColor}>View Service</Text>
            </Button>
        </VStack>
    )
}

export default BusinessCard
