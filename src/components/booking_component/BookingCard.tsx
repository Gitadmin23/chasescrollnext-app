import usePaystackStore from '@/global-state/usePaystack'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { IBooking } from '@/models/Booking'
import { IBuisness } from '@/models/Business'
import { IService } from '@/models/Service'
import { IMAGE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { VStack, HStack, Box, Text, Image, Flex, useToast, Button } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'

export interface ICategory {
    id: string;
    category: string;
}

const ServiceCard = ({ serviceID }: { serviceID: string }) => {
    const [category, setCategory] = React.useState<ICategory | null>(null);

    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme();

    const { isLoading } = useQuery([`get-service-${serviceID}`, serviceID], () => httpService.get("/service-category/search", {
        params: {
            id: serviceID,
        }
    }), {
        onSuccess: (data: any) => {
            const item: ICategory = data?.data[0];
            setCategory(item);
        },
        onError: (error: any) => { },
    })
    return (
        <VStack w='auto' h='25px' px='10px' borderRadius={'full'} borderWidth={'1px'} borderColor={borderColor} justifyContent={'center'} alignItems={'center'} flexShrink={0}>
            <Text fontWeight={300} fontSize='12px'>{category?.category}</Text>
        </VStack>
    )
}

function BookingCard({ business, booking, isVendor = false }: { business: IBuisness, booking: IBooking, isVendor?: boolean }) {
    const toast = useToast()
    const router = useRouter();
    const { userId } = useDetails((state) => state);

    const [loading, setLoading] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)

    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme();

    // mutations
    const vendorAcceptOrDecline = useMutation({
        mutationFn: (data: boolean) => httpService.put('/booking/accept-or-decline', {
            bookingID: booking?.id,
            accepted: data,
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
            setLoading(false)
            setLoadingReject(false)
        }
    });

    const vendorMarkAsDone = useMutation({
        mutationFn: () => httpService.put('/booking/vendor-mark-as-done', {
            bookingID: booking?.id,
            vendorID: booking?.vendor?.id,
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
        }
    });

    const userMarkAsDone = useMutation({
        mutationFn: (data: boolean) => httpService.put('/booking/vendor-mark-as-done', {
            bookingID: booking?.id,
            completedWithIssues: data,
            userID: userId,
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
        }
    });

    const clickHandle = (item: boolean) => {
        if (item) {
            setLoading(true)
        } else {
            setLoadingReject(true)
        }
        vendorAcceptOrDecline.mutate(item)
    }
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;


    const { setPaystackConfig, setBooking } = usePaystackStore((state) => state);

    const payForTicket = useMutation({
        mutationFn: (data: {
            seller: string,
            price: number,
            currency: string,
            orderType: "BOOKING",
            typeID: string
        }) => httpService.post(`/payments/createCustomOrder`, data),
        onSuccess: (data: any) => {
            setPaystackConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
            setBooking(true) 
        },
        onError: (error) => {
            // console.log(error);
            toast({
                title: 'Error',
                description: "Error occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });
    
    const handlePayment = () => { 
        payForTicket.mutate({
            seller: booking?.businessOwner?.userId,
            price: Number(booking?.price),
            currency: "NGN",
            orderType: "BOOKING",
            typeID: booking?.id + ""
        })
    }

    console.log(booking);
    

    return (
        <VStack style={{boxShadow: "0px 4px 4px 0px #0000000D"}} w='full' h='auto' borderWidth={'0.5px'} borderColor={borderColor} borderRadius={'15px'} p='10px' alignItems={'flex-start'} overflowX={'hidden'} spacing={3}>
            <HStack w='full'>
                <Box w='30px' h='30px' borderBottomLeftRadius={'50px'} borderTopLeftRadius={'50px'} borderBottomRightRadius={'50px'} overflow={'hidden'} bg={secondaryBackgroundColor}></Box>
                <VStack spacing={-5} alignItems={'flex-start'}>
                    <Text fontWeight={600} fontSize={'14px'} color={primaryColor}>{booking?.user?.firstName} {booking?.user?.lastName}</Text>
                    <Text fontSize={'12px'} color={bodyTextColor}>{moment(business?.createdDate as number).fromNow()}</Text>
                </VStack>
            </HStack>

            <Box w='full' h='100px' borderRadius={'10px'} overflow={'hidden'}>
                <Image src={business?.bannerImage.startsWith('https://') ? business?.bannerImage : (IMAGE_URL as string) + business?.bannerImage} alt="banner image" w='full' h='full' objectFit={'cover'} />
            </Box>

            <VStack spacing={-3} alignItems={'flex-start'}>
                <Text fontWeight={400} fontSize={'12px'}>Business Name</Text>
                <Text fontWeight={600} fontSize={'14px'}>{business?.businessName}</Text>

            </VStack>

            <VStack alignItems='flex-start' spacing={2} w='full' borderBottomWidth='0.5px' borderBottomColor={borderColor}>
                <Text fontSize={'14px'} fontWeight={600}>User Details</Text>
                <HStack w='full' justifyContent={'space-between'}>
                    <Text fontSize={'14px'}>Name</Text>
                    <Text fontSize={'12px'}>{booking?.user?.firstName} {booking?.user?.lastName}</Text>
                </HStack>

                <HStack w='full' justifyContent={'space-between'}>
                    <Text fontSize={'14px'}>Email</Text>
                    <Text fontSize={'12px'}>{booking?.user?.email}</Text>
                </HStack>

                <HStack w='full' justifyContent={'space-between'}>
                    <Text fontSize={'14px'}>Phone</Text>
                    <Text fontSize={'12px'}>{booking?.user?.data?.mobilePhone?.value ?? 'None'}</Text>
                </HStack>
            </VStack>

            <Box pb='5px' borderBottomWidth={'0.5px'} borderBottomColor={borderColor} w='full'>
                <Text fontWeight={400} fontSize={'12px'}>Service(s) Offered</Text>
                <Flex w='full' h='auto' overflowX={'auto'} gap={3} mt='10px' css={{
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none',
                    '-ms-overflow-style': 'none',
                    whiteSpace: 'nowrap'
                }}>
                    {booking?.services?.length > 0 && booking?.services?.map((item, index) => (
                        <ServiceCard key={index.toString()} serviceID={item['serviceID'] as any} />
                    ))}
                </Flex>

                <HStack justifyContent={'space-between'} mt='10px' w='full'>
                    <Text fontSize={'14px'}  >Total Price</Text>
                    <Text fontSize={'14px'}>{booking?.price}</Text>
                </HStack>
            </Box>



            <Box h='10px' />
            {!isVendor && (
                <>
                    {booking.bookingStatus === 'PENDING' && (
                        <Button disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={secondaryBackgroundColor}>
                            <Text fontSize={'14px'} color={primaryColor}>Awaiting Vendor Approval</Text>
                        </Button>
                    )}
                    {booking.bookingStatus === 'REJECTED' && (
                        <Button disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={'red'}>
                            <Text fontSize={'14px'} color={primaryColor}>Rejected</Text>
                        </Button>
                    )}
                    {booking.bookingStatus === 'APPROVED' && !booking?.hasPaid && (
                        <Button isLoading={payForTicket?.isLoading} isDisabled={payForTicket?.isLoading} onClick={() => handlePayment()} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                            <Text fontSize={'14px'} color={'white'}>Make Payment</Text>
                        </Button>
                    )}
                    {booking.bookingStatus === 'IN_PROGRESS' && (
                        <Button disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                            <Text fontSize={'14px'} color={'white'}>{booking?.bookingStatus?.replaceAll('_', ' ')}</Text>
                        </Button>
                    )}
                    {booking.bookingStatus === 'AWAITING_CONFIRMATION' && booking.isCompleted && (
                        <>
                            <Button isLoading={userMarkAsDone.isLoading} onClick={() => userMarkAsDone.mutate(false)} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                                <Text fontSize={'14px'} color={'white'}>Mark As Done</Text>
                            </Button>

                            <Button isLoading={userMarkAsDone.isLoading} onClick={() => userMarkAsDone.mutate(true)} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={'red'} bg={mainBackgroundColor}>
                                <Text fontSize={'14px'} color={'red'}>Done with Issues</Text>
                            </Button>
                        </>
                    )}
                </>
            )}

            {isVendor && (
                <>
                    {booking.bookingStatus === 'PENDING' && (
                        <>
                            <Button isLoading={vendorAcceptOrDecline.isLoading || loading} onClick={() => clickHandle(true)} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={"#F7FBFE"} _hover={{ backgroundColor: "#F7FBFE" }}>
                                <Text fontSize={'14px'} color={primaryColor}>Approve</Text>
                            </Button>

                            <Button isLoading={vendorAcceptOrDecline.isLoading || loadingReject} onClick={() => clickHandle(false)} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={'red'} bg={mainBackgroundColor} _hover={{ backgroundColor: mainBackgroundColor }} >
                                <Text fontSize={'14px'} color={'red'}>Reject</Text>
                            </Button>
                        </>
                    )}
                    {booking.bookingStatus === 'IN_PROGRESS' && booking.hasPaid && (
                        <Button isLoading={vendorMarkAsDone.isLoading} onClick={() => vendorMarkAsDone.mutate()} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                            <Text fontSize={'14px'} color={'white'}>Mark As Done</Text>
                        </Button>
                    )}
                </>
            )}

        </VStack>
    )
}

export default BookingCard
