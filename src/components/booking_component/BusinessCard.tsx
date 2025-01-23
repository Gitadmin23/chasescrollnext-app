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

function BusinessCard({ business }: { business: IBuisness }) {

    const [services, setServices] = React.useState<IService[]>([]);

    const toast = useToast()
    const router = useRouter();
    const path = usePathname();

    // query

    const getOtherService = useQuery([`get-vendorService-${business?.id}`, business], () => httpService.get(`/business-service/search`, {
        params: {
            vendorID: business?.id,
        }
    }), {
        enabled: business !== null,
        refetchOnMount: true,
        onSuccess: (data) => {
            console.log(data?.data);
            if (data?.data?.content?.length < 1) {
                // toast({
                //     title: 'No service found',
                //     description: 'Service not found',
                //     status: 'warning',
                //     position: 'top-right',
                //     isClosable: true,
                // });

                // router.back();
                return;
            }
            const content: Array<IService> = data?.data?.content;
            setServices(content);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
            // router.back();
        }
    });


    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme()

    return (
        <VStack style={{boxShadow: "0px 4px 4px 0px #0000000D"}} w='full' h='auto' borderWidth={'0.5px'} borderColor={borderColor} borderRadius={'15px'} p='10px' alignItems={'flex-start'} overflowX={'hidden'}>
            <HStack w='full'>
                <Box w='30px' h='30px' borderBottomLeftRadius={'50px'} borderTopLeftRadius={'50px'} borderBottomRightRadius={'50px'} overflow={'hidden'} bg={secondaryBackgroundColor}>
                <Image onClick={() => router.push(`/dashboard/profile/${business?.createdBy?.userId}`)} src={business?.createdBy?.data?.imgMain?.value ? (business?.createdBy?.data?.imgMain?.value?.startsWith('https://') ? business?.createdBy?.data?.imgMain?.value : `${IMAGE_URL}${business?.createdBy?.data?.imgMain?.value}`) : 'https://ui-avatars.com/api/?background=random'} w='full' h='full' alt='image' />
                </Box>
                <VStack spacing={-5} alignItems={'flex-start'}>
                    <Text onClick={() => router.push(`/dashboard/profile/${business?.createdBy?.userId}`)} cursor='pointer' fontWeight={600} fontSize={'14px'} color={primaryColor}>{business?.createdBy?.firstName} {business?.createdBy?.lastName}</Text>
                    <Text fontSize={'12px'} color={bodyTextColor}>{moment(business?.createdDate as number).fromNow()}</Text>
                </VStack>
            </HStack>

            <Box onClick={() => router.push(`/dashboard/newbooking/details/${business?.id}`)} cursor='pointer'  w='full' h='200px' borderRadius={'10px'} overflow={'hidden'}>
                <BlurredImage forEvent={false} image={business?.bannerImage.startsWith('https://') ? business?.bannerImage : (IMAGE_URL as string) + business?.bannerImage}  height={'100%'}/>
            
                {/* <Image onClick={() => router.push(`/dashboard/newbooking/details/${business?.id}`)} cursor='pointer' src={business?.bannerImage.startsWith('https://') ? business?.bannerImage : (IMAGE_URL as string) + business?.bannerImage} alt="banner image" w='full' h='full' objectFit={'cover'} /> */}
            </Box>

            <VStack spacing={-3} alignItems={'flex-start'}>
                <Text fontWeight={400} fontSize={'12px'}>Business Name</Text>
                <Text fontWeight={600} fontSize={'14px'}>{business?.businessName}</Text>

            </VStack>

            <Box pb='5px' borderBottomWidth={'0.5px'} borderBottomColor={borderColor} w='full'>
                <Text fontWeight={400} fontSize={'12px'}>{business?.description.length > 400 ? business?.description?.substring(0, 400) + '...':business?.description}</Text>
            </Box>

            <VStack spacing={-5} alignItems={'flex-start'} w='full'>
                <Text fontWeight={400} fontSize={'12px'}>Services</Text>
                <Flex w='full' h='auto' overflowX={'auto'} gap={3} mt='10px' css={{
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none',
                    '-ms-overflow-style': 'none',
                    whiteSpace: 'nowrap'
                }}>
                    {services?.length > 0 && services?.map((item, index) => (
                        <VStack key={index} w='auto' h='25px' px='10px' borderRadius={'full'} borderWidth={'1px'} borderColor={borderColor} justifyContent={'center'} alignItems={'center'} flexShrink={0}>
                            <Text fontWeight={300} fontSize='12px'>{item?.service?.category}</Text>
                        </VStack>
                    ))}
                </Flex>
            </VStack>
            <Box h='10px' />
            <Button onClick={() => router.push(`/dashboard/newbooking/details/${business?.id}`)} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={"#F7FBFE"} _hover={{ backgroundColor: "#F7FBFE" }}>
                <Text fontSize={'14px'} color={primaryColor}>View Business</Text>
            </Button>
        </VStack>
    )
}

export default BusinessCard
