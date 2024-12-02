'use client';
import CreateBookingModal from "@/components/modals/booking/CreateBookingModal";
import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import { IBuisness } from "@/models/Business";
import { IService } from "@/models/Service";
import { IMAGE_URL } from "@/services/urls";
import httpService from "@/utils/httpService";
import { Box, Flex, Text, Divider, Button, HStack, VStack, useToast, Spinner, Image } from "@chakra-ui/react";
import { ArrowLeft2, Star1 } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

export default function ServiceDetailsPage() {
    const [service, setService] = React.useState<IService|null>(null);
    const [services, setServices] = React.useState<IService[]>([]);
    const [show, setShow] = React.useState(false);
    const { userId } = useDetails((state) => state);


    const param = useParams();
    const router = useRouter();
    const id = param?.id;
    const toast = useToast();

    const {
        primaryColor,
        borderColor,
        mainBackgroundColor,
        headerTextColor,
        bodyTextColor
    } = useCustomTheme();


    // query
    const { isLoading, data } = useQuery([`get-service-by-id-${id}`, id], () => httpService.get(`/business-service/search`, {
        params: {
            id,
        }
    }), {
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
            setService(content.filter((item) => item.id === id)[0]);
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

    const getOtherService = useQuery([`get-vendorService-${id}`, service], () => httpService.get(`/business-service/search`, {
        params: {
            vendorID: service?.vendor?.id,
        }
    }), {
        enabled: !isLoading && service !== null,
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
            setServices(content.filter((item) => item.id !== id));
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

    if (isLoading) {
        return (
            <VStack w='full' h='120px' justifyContent={'center'}>
                <Spinner />
                <Text>Loading Services Details</Text>
            </VStack>
        )
    } else {
        return (
            <Box w='full' h='full' p={['10px', '20px']} overflowY={'auto'}>
                <CreateBookingModal show={show} onClose={() => setShow(false)} service={service as IService} />
                <Flex w='full' h='30px' justifyContent={'flex-start'} alignItems={'center'} mb='20px'>
                    <ArrowLeft2 size={30} onClick={() => router.back()} />
                    <Text fontSize='16px' fontWeight={500}>{service?.service?.category.toUpperCase()}</Text>
                </Flex>

                {/* IMAGES */}
                {/* SMALL SCREENS */}
                <Flex display={['flex', 'none']} bg={mainBackgroundColor} w={"full"} h={"240px"} bgColor={"white"} rounded={"8px"} overflowX='auto' gap={3}>
                        {service?.images.map((item, index) => (
                            <Box flexShrink={0} w='300px' h='full' borderRadius={'10px'} overflow='hidden' key={index.toString()}>
                                <Image src={item.startsWith('https://') ? item : (IMAGE_URL as string) + item} alt='banner image' w='full' h='full' objectFit={'cover'} />
                            </Box>
                        ))}
                </Flex>
                {service?.images?.length === 1 && (
                    <Flex display={['none', 'flex']} w={"full"} h={"240px"} bgColor={"white"} rounded={"8px"} overflow='hidden' >
                     <Image src={service?.images[0].startsWith('https://') ? service?.images[0] : (IMAGE_URL as string) + service?.images[0]} alt='banner image' w='full' h='full' objectFit={'cover'} />
                 </Flex>
                )}

                {service?.images?.length === 2 && (
                    <HStack display={['none', 'flex']} bg={mainBackgroundColor} w={"full"} h={"240px"} bgColor={"white"} rounded={"8px"} overflow='hidden' spacing={3} >
                        {service?.images.map((item, index) => (
                            <Box w='full' h='full' borderRadius={'10px'} overflow='hidden' key={index.toString()}>
                                <Image src={item.startsWith('https://') ? item : (IMAGE_URL as string) + item} alt='banner image' w='full' h='full' objectFit={'cover'} />
                            </Box>
                        ))}
                    </HStack>
                )}

                {service?.images?.length === 3 && (
                    <HStack display={['none', 'flex']} bg={mainBackgroundColor} w={"full"} h={"240px"} bgColor={"white"} rounded={"8px"} overflow='hidden' spacing={3} >
                        <Box w='60%' h='full'  borderRadius={'10px'} overflow='hidden'>
                            <Image src={service?.images[0].startsWith('https://') ? service?.images[0] : (IMAGE_URL as string) + service?.images[0]} alt='banner image' w='full' h='full' objectFit={'cover'} />
                        </Box>
                        <VStack w='40%' h='full' spacing={3}>
                            {service?.images.slice(1).map((item, index) => (
                                <Box w='full' h='50%' borderRadius={'10px'} overflow='hidden' key={index.toString()}>
                                    <Image src={item.startsWith('https://') ? item : (IMAGE_URL as string) + item} alt='banner image' w='full' h='full' objectFit={'cover'} />
                                </Box>
                            ))}
                        </VStack>
                    </HStack>
                )}  

                {service?.images?.length === 4 && (
                    <HStack display={['none', 'flex']} bg={mainBackgroundColor} w={"full"} h={"240px"} bgColor={"white"} rounded={"8px"} overflow='hidden' spacing={3} >
                        <Box w='30%' h='full'  borderRadius={'10px'} overflow='hidden'>
                            <Image src={service?.images[0].startsWith('https://') ? service?.images[0] : (IMAGE_URL as string) + service?.images[0]} alt='banner image' w='full' h='full' objectFit={'cover'} />
                        </Box>
                        <Box w='30%' h='full'  borderRadius={'10px'} overflow='hidden'>
                            <Image src={service?.images[1].startsWith('https://') ? service?.images[0] : (IMAGE_URL as string) + service?.images[0]} alt='banner image' w='full' h='full' objectFit={'cover'} />
                        </Box>
                        <VStack w='40%' h='full' spacing={3}>
                            {service?.images.slice(2).map((item, index) => (
                                <Box w='full' h='50%' borderRadius={'10px'} overflow='hidden' key={index.toString()}>
                                    <Image src={item.startsWith('https://') ? item : (IMAGE_URL as string) + item} alt='banner image' w='full' h='full' objectFit={'cover'} />
                                </Box>
                            ))}
                        </VStack>
                    </HStack>
                )}  

                <Flex w='full' h='auto' flexDir={['column', 'row']} mt='20px'>
                    <VStack w={['full', '60%']} spacing={1} alignItems='flex-start'>
                        <Text fontWeight={600} color={headerTextColor} fontSize={'16px'}>Details</Text>
                        <Text fontWeight={400} fontSize={'14px'}>{service?.description}</Text>
                    </VStack>
                    <Flex w={['full', '40%']} mt={['30px', '0px']} flexDir={'column'} p='30px' borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                        <HStack justifyContent={'space-between'}>
                            <Text fontWeight={600} color={headerTextColor}>Price</Text>
                            <Text fontSize={'16px'} color={bodyTextColor}>{service?.price}</Text>
                        </HStack>

                        <VStack w='full' h='50px' borderRadius={'15px'} borderWidth={'1px'} borderColor={primaryColor} bgColor={mainBackgroundColor} justifyContent={'center'} alignItems={'flex-start'} px='10px' marginTop={'20px'}>
                            <Text>{(service?.discount as number) > 0 ? `Discount Price - ${service?.discount}`: 'No Discount'}</Text>
                        </VStack>

                       {userId !== service?.vendor?.userID && (
                         <Button onClick={() => setShow(true)} w='full' h='42px' borderRadius={'full'} bgColor={primaryColor} mt='40px'>
                            <Text fontWeight={500} color='white'>Place Order</Text>
                        </Button>
                       )}
                    </Flex>
                </Flex>

                <Flex w='full' flexDir={['column', 'row']} mt='20px'>

                    <VStack w={['full', '60%']} alignItems='flex-start' spacing={4} >
                        <Text fontWeight={600} color={headerTextColor} fontSize={'16px'} textDecoration={'underline'}>More Details</Text>
                        <HStack>
                            <Box w='60px' h='60px' borderRadius={'full'} overflow={'hidden'} bgColor='lightgrey'>
                                <Image w='full' h='full' alt="user image" objectFit={'cover'} src={service?.vendor?.createdBy?.data?.imgMain?.value ? (service?.vendor?.createdBy?.data?.imgMain?.value.startsWith('http') ? service?.vendor?.createdBy?.data?.imgMain?.value : IMAGE_URL + service?.vendor?.createdBy?.data?.imgMain?.value) : `https://ui-avatars.com/api/?name=${service?.vendor?.createdBy?.firstName}${service?.vendor?.createdBy?.lastName}&background=random`} />
                            </Box>
                            <VStack alignItems='flex-start' spacing={-2}>
                                <Text fontWeight={600} fontSize={'16px'}>Service from {service?.vendor?.businessName}</Text>
                                <Text color={bodyTextColor} fontSize={'14px'} fontWeight={400}>Joined {new Date(service?.vendor?.createdDate as number).toDateString()}</Text>
                            </VStack>
                        </HStack>
                    </VStack>

                    {/* CATEGORIES SECTION */}

                    <Flex w={['full', '40%']} mt={['30px', '0px']} flexDir={'column'} py='5px' borderRadius={'10px'}>
                    <Text fontWeight={600} color={headerTextColor}>Service Categories</Text>


                        <Flex w='full' h='auto' overflowX={'auto'} gap={3} mt='10px'>
                            {services?.length > 0 && services?.map((item, index) => (
                                <VStack key={index} w='auto' h='34px' px='10px' borderRadius={'full'} borderWidth={'1px'} borderColor={borderColor} justifyContent={'center'} alignItems={'center'}>
                                    <Text fontWeight={300} fontSize='14px'>{item?.service?.category?.toUpperCase()}</Text>
                                </VStack>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>

                <Flex flexDir="column" mt='20px'>
                    <HStack spacing={4}>
                        <Star1 size={25} color='gold' variant="Bold" />
                        <Text>{service?.rating ?? 0}</Text>
                        <Box w='5px' h='5px' bgColor='lightgrey' borderRadius={'full'} />
                        <Text>No Reviews Yet!</Text>
                    </HStack>
                </Flex>

            </Box>
        )
    }
   
}