import ModalLayout from '@/components/sharedComponent/modal_layout'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { IService } from '@/models/Service'
import { IMAGE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Flex, Text, Box, VStack, HStack, Textarea, Image, Divider, Button, useToast } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
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
        bodyTextColor
    } = useCustomTheme();

    // states
    const [description, setDescription] = React.useState("");

    const { userId } = useDetails((state) => state);

    // utils
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
                title:'Warning',
                description: 'You have to give a short description of what you expect from the vendor',
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
            vendorID: service?.vendor?.id,
            serviceIDS: [service?.id],
            bookingType: "Busy",
            price: service?.price + (service?.price * 0.02),
            date: new Date().toISOString(),
        }

        mutate(obj);
    }, [description, service, userId, toast, mutate]);

 
    return (
        <ModalLayout open={show} close={onClose} closeIcon size={['md', '3xl']}>
            <Flex flexDir={['column', 'row']} pb='20px' px={['20px', '20px']} gap={8}>
                <VStack w='full' h='full' px={'10px'} alignItems={'flex-start'}>
                    <Text fontSize="12px" color={'grey'}>List your order</Text>

                    <VStack w='full' py='10px' alignItems="flex-start" borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                        <Text fontWeight="600" fontSize={'14px'}>Business Name</Text>
                        <Text>{service?.vendor?.businessName}</Text>

                    </VStack>

                

                    <Box w='full' py='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                        <Text fontWeight="600" fontSize={'14px'}>Service Type</Text>
                        <Text color='black'>{service?.service?.category.toUpperCase()}</Text>
                    </Box>

                    <Box w='full' py='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor}>
                        <Text  fontWeight="600" fontSize={'14px'}>Date</Text>
                        <Text color='black'>{moment().format('MMMM Do, YYYY')}</Text>
                    </Box>

                    <HStack justifyContent={'space-between'} w='full' alignItems={'center'}>
                        <Text fontSize={'12px'}>Service Payment</Text>
                        <Text fontSize={'14px'}>NGN {service?.price?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
                    </HStack>

                    <VStack spacing={1} mt='10px' w='full' alignItems={'flex-start`'}>
                        <Text fontSize={'14px'}>List the service requirements</Text>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} w='full' h='80px' placeholder='Enter a description of what you want' />
                    </VStack>

                </VStack>
                <Flex w='full' h='full' p='15px' flexDir='column'>
                    <Box w='full' h='full' borderWidth={'1.5px'} borderColor={borderColor} borderRadius={'10px'} p='20px'>
                        <Flex gap={3} pb='10px' borderBottomWidth={'1px'} borderBottomColor={borderColor} alignItems='center'>
                            <Box w='30%' h='100px' borderRadius={'15px'} overflow={'hidden'} py='5px'>
                                <Image src={service?.vendor?.bannerImage.startsWith('http') ? service?.vendor?.bannerImage : IMAGE_URL + service?.vendor?.bannerImage} alt='banner image' w='100%' h='full' />
                            </Box>
                            <VStack alignItems='flex-start' spacing={-2}>
                                <Text fontWeight={700}>{service?.vendor?.businessName}</Text>
                                <Text fontSize={'12px'} color="grey">{service?.vendor?.address}</Text>
                            </VStack>
                        </Flex>

                        <Flex flexDir='column' mt='30xp'>
                            <Text fontWeight={500} fontSize={'14px'} color={headerTextColor} mt='10px' >Total price for the  order</Text>

                            <HStack justifyContent={'space-between'} h='40px'>
                                <Text color={bodyTextColor} fontSize="12px">{service?.service?.category}</Text>
                                <Text fontSize={'14px'} color={bodyTextColor}>NGN {service?.price?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
                            </HStack>

                            <HStack justifyContent={'space-between'} h='40px'>
                                <Text color={bodyTextColor} fontSize='12px'>Taxes(2%)</Text>
                                <Text color={bodyTextColor} fontSize={'14px'}>NGN {(service?.price * 0.02)?.toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
                            </HStack>

                            <Divider />

                            <HStack justifyContent={'flex-end'} h='40px'>
                                <Text color={bodyTextColor} fontSize='12px'>Taxes</Text>
                                <Text color={bodyTextColor} fontSize={'14px'}>NGN {(service?.price + (service?.price * 0.02)).toLocaleString('en-NG', { maximumFractionDigits: 2 })}</Text>
                            </HStack>
                        </Flex> 
                    </Box>

                    <Button onClick={handleCreation} isLoading={isLoading} w='full' h='42px' backgroundColor={primaryColor}  borderRadius={'full'} mt='20px'>
                        <Text fontWeight={600} fontSize={'14px'} color='white'>Create Booking</Text>
                    </Button>
                </Flex>
            </Flex>
        </ModalLayout>
    )
}

export default CreateBookingModal
