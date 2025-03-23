import ModalLayout from '@/components/sharedComponent/modal_layout'
import { CalendarIcon } from '@/components/svg'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { IService } from '@/models/Service'
import { IMAGE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Flex, Text, Box, VStack, HStack, Textarea, Image, Divider, Button, useToast, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { useMutation } from 'react-query'

function CreateBookingModal({
    show,
    onClose,
    service
}: {
    show: boolean,
    onClose: () => void,
    service: IService,
}) {
    const {
        primaryColor,
        borderColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor
    } = useCustomTheme();

    // states
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("0");
    const [date, setDate] = React.useState<string>(new Date().toString())

    const { userId } = useDetails((state) => state);

    // utils
    const router = useRouter();
    const toast = useToast();

    // mutations
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post('/booking/create', data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Booking has been created succesfully, and is waiting for approval from the Vendor',
                status: 'success',
                duration: 5000,
                position: 'top-right',
                isClosable: true,
            });
            console.log(data?.data);
            router.push(`/dashboard/newbooking/booking/${data?.data?.id}`);
            onClose();
        },
        onError: (error: any) => {
            toast({
                title: 'Success',
                description: error?.message ?? 'An error occured while booking this service',
                status: 'error',
                duration: 5000,
                position: 'top-right',
                isClosable: true,
            });
        }
    });


    const handleCreation = React.useCallback(() => {
        if (description === '') {
            toast({
                title: 'Warning',
                description: 'You have to give a short description of what you expect from the vendor',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return;
        }

        if (!service?.hasFixedPrice && price === "0") {
            toast({
                title: 'Warning',
                description: 'You have to enter a valid price',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return;
        }

        const obj = {
            description,
            userID: userId,
            vendorID: service?.vendor?.userId,
            serviceID: service?.id,
            bookingType: "Busy",
            price: service?.hasFixedPrice ? service?.price + (service?.price * 0.02) : parseInt(price),
            date: new Date(date).toISOString(),
        }

        mutate(obj);
    }, [description, service, userId, toast, mutate, price]);

    console.log(service);



    return (
        (<ModalLayout open={show} close={onClose} closeIcon size={['md', '3xl']}>
            <Flex flexDir={["column-reverse", 'row-reverse']} pb='20px' px={['3px', '20px']} gap={["1", "1", "6"]} bg={mainBackgroundColor}>
                <VStack w='full' h='full' px={'10px'} alignItems={'flex-start'}>
                    {/* <Text fontSize="12px" color={'grey'}>List your order</Text> */}

                    {/* <VStack w='full' py='10px' alignItems="flex-start" borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                        <Text fontWeight="600" fontSize={'14px'}>Business Name</Text>
                        <Text>{service?.name}</Text>

                    </VStack> */}


                    <Box w='full' py='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                        <Text fontWeight="600" fontSize={'14px'}>Service Type</Text>
                        <Text color={headerTextColor} fontSize={"14px"} >{service?.category.toUpperCase()}</Text>
                    </Box>

                    {/* <Box w='full' py='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                        <Text fontWeight="600" fontSize={'14px'}>Date</Text>
                        <Text fontSize={16} color={headerTextColor}>{moment().format('MMMM Do, YYYY')}</Text>
                    </Box> */}

                    {/* {service?.hasFixedPrice && (
                        <HStack justifyContent={'space-between'} w='full' alignItems={'center'}>
                            <Text fontSize={'14px'}>Service Price</Text>
                            <Text fontSize={'16px'} fontWeight={600} color={primaryColor}>NGN {service?.price?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
                        </HStack>
                    )} */}

                    <VStack spacing={1} mt='10px' w='full' alignItems={'flex-start`'}>
                        <Text fontWeight="600" fontSize={'14px'}>Service Description</Text>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} w='full' h='80px' fontSize={"14px"} placeholder='Tell us how we can serve you' />
                    </VStack>

                    <Button onClick={handleCreation} isLoading={isLoading} w='full' h='42px' backgroundColor={primaryColor} borderRadius={'full'} mt='20px'>
                        <Text fontWeight={600} fontSize={'14px'} color='white'>{'Create Booking'}</Text>
                    </Button>
                </VStack>
                <Flex w='full' h='full' p={["6px", "6px", '15px']} flexDir='column'>
                    <Box w='full' h='full' borderWidth={'1.5px'} borderColor={borderColor} borderRadius={'10px'} py={["6px", "6px", "20px"]} p={['12px', "12px", '20px']}>
                        <Flex gap={3} pb='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor} alignItems='center'>
                            <Box w='100px' h='100px' borderRadius={'15px'} overflow={'hidden'} py='5px'>
                                <Image src={service?.images[0].startsWith('http') ? service?.images[0] : IMAGE_URL + service?.images[0]} alt='banner image' w='100%' h='full' objectFit={'cover'} />
                            </Box>
                            <VStack alignItems='flex-start' spacing={-2}>
                                <Text fontWeight={700}>{service?.name}</Text>
                                <Text fontSize={'12px'} color="grey">{service?.address}</Text>
                            </VStack>
                        </Flex>

                        {service?.hasFixedPrice && (
                            <Flex flexDir='row' justifyContent={"space-between"} mt='30xp' py={"2"} >
                                <Text fontWeight={500} fontSize={'14px'} color={headerTextColor}  >Starting price:</Text>
                                <Text fontSize={'14px'} fontWeight={"600"} >NGN {service?.price?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>

                                {/* <HStack justifyContent={'space-between'} h='40px'>
                                    <Text color={bodyTextColor} fontSize="12px">{service?.service?.category}</Text>
                                </HStack> */}

                                {/* <HStack justifyContent={'space-between'} h='40px'>
                                    <Text fontSize='12px'>Service Fee:</Text>
                                    <Text fontSize={'14px'}>NGN {(service?.price * 0.02)?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
                                </HStack>


                                <HStack justifyContent={'flex-end'} h='40px'>
                                    <Text fontSize='12px'>Total Price</Text>
                                    <Text fontSize={'14px'}>NGN {(service?.price + (service?.price * 0.02)).toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
                                </HStack> */}
                            </Flex>
                        )}


<Divider />
                        <VStack spacing={1} mt='10px' w='full' alignItems={'flex-start`'}>
                            <Text fontWeight="600" fontSize={'14px'}>Book a date</Text>
                            <InputGroup width='100%'>
                                <InputLeftElement>
                                    <CalendarIcon />
                                </InputLeftElement>
                                <Input
                                    type='date'
                                    value={date}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setDate(e.target.value)
                                    }}
                                    borderWidth={'1px'}
                                    height="45px"
                                    borderRadius={'8px'}
                                    borderBottomColor={borderColor}
                                    placeholder='Pick Date'
                                    fontSize={'14px'}
                                    fontWeight={400}
                                />
                            </InputGroup>
                        </VStack>

                    </Box>

                </Flex>
            </Flex>
        </ModalLayout>)
    );
}

export default CreateBookingModal
