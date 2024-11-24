import useCustomTheme from '@/hooks/useTheme'
import { IBuisness } from '@/models/Business'
import { IService } from '@/models/Service'
import { IMAGE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { VStack, HStack, Box, Text, Image, Flex, useToast, Button } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'

function BusinessCard({ business }: { business: IBuisness }) {

    const [services, setServices] = React.useState<IService[]>([]);

    const toast = useToast()
    const router = useRouter();

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
                toast({
                    title: 'No service found',
                    description: 'Service not found',
                    status: 'warning',
                    position: 'top-right',
                    isClosable: true,
                });

                router.back();
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
            router.back();
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
        <VStack w='full' h='auto' borderWidth={'0.5px'} borderColor={borderColor} borderRadius={'15px'} p='10px' alignItems={'flex-start'} overflowX={'hidden'}>
            <HStack w='full'>
                <Box w='30px' h='30px' borderBottomLeftRadius={'50px'} borderTopLeftRadius={'50px'} borderBottomRightRadius={'50px'} overflow={'hidden'} bg={secondaryBackgroundColor}></Box>
                <VStack spacing={-5} alignItems={'flex-start'}>
                    <Text fontWeight={600} fontSize={'14px'} color={primaryColor}>{business?.createdBy?.firstName} {business?.createdBy?.lastName}</Text>
                    <Text fontSize={'12px'} color={bodyTextColor}>{moment(business?.createdDate as number).fromNow()}</Text>
                </VStack>
            </HStack>

            <Box w='full' h='150px' borderRadius={'10px'} overflow={'hidden'}>
                <Image src={business?.bannerImage.startsWith('https://') ? business?.bannerImage : (IMAGE_URL as string) + business?.bannerImage} alt="banner image" w='full' h='full' objectFit={'cover'} />
            </Box>

            <VStack spacing={-3} alignItems={'flex-start'}>
                <Text fontWeight={400} fontSize={'12px'}>Business Name</Text>
                <Text fontWeight={600} fontSize={'14px'}>{business?.businessName}</Text>

            </VStack>

            <Box pb='5px' borderBottomWidth={'0.5px'} borderBottomColor={borderColor} w='full'>
                <Text fontWeight={400} fontSize={'12px'}>{business?.description}</Text>
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
            <Button onClick={() => router.push(`/dashboard/newbooking/details/${business?.id}`)} w='full' h='34px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={secondaryBackgroundColor}>
                <Text fontSize={'14px'} color={primaryColor}>View Business</Text>
            </Button>
        </VStack>
    )
}

export default BusinessCard
