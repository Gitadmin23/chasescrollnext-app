'use client';
import EventMap from "@/components/event_details_component/event_map_info";
import CustomButton from "@/components/general/Button";
import GetCreatorData from "@/components/kisok/getCreatorData";
import ProductRating from "@/components/kisok/productRating";
import RentalCheckout from "@/components/kisok/rentalCheckout";
import CreateBookingModal from "@/components/modals/booking/CreateBookingModal";
import DescriptionPage from "@/components/sharedComponent/descriptionPage";
import LoadingAnimation from "@/components/sharedComponent/loading_animation";
import { CalendarIcon } from "@/components/svg";
import { useDetails } from "@/global-state/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";
import { IReview } from "@/models/product";
import { IService } from "@/models/Service";
import { IUser } from "@/models/User";
import { IMAGE_URL, URLS } from "@/services/urls";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { dateFormat, timeFormat } from "@/utils/dateFormat";
import httpService from "@/utils/httpService";
import { Box, Flex, Text, Button, HStack, VStack, useToast, Spinner, Image, Grid } from "@chakra-ui/react";
import { ArrowLeft2, Star1 } from "iconsax-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useMutation, useQuery } from "react-query";

export default function ServiceDetailsPage() {

    const [service, setService] = React.useState<IService | null>(null);
    const [show, setShow] = React.useState(false);
    const { userId } = useDetails((state) => state);
    const [vendor, setVendor] = React.useState<IUser | null>(null);

    const param = useParams();
    const { back, push } = useRouter();
    const toast = useToast();
    const id = param?.id;

    const {
        primaryColor,
        borderColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor
    } = useCustomTheme();

    const { mutate, isLoading: friendRequestLoading } = useMutation({
        mutationFn: (data: { toUserID: string }) => httpService.post(`${URLS.SEND_FRIEND_REQUEST}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Message',
                description: data?.data?.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',

            });
        },
        onError: (error: any) => {
            toast({
                title: 'An error occured',
                description: error?.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
        }
    })


    const [reviewData, setData] = useState<Array<IReview>>([])

    // query
    const getUserProfile = useQuery(['get-public-profile', service?.vendor?.userId], () => httpService.get(`/user/publicprofile/${service?.vendor?.userId}`), {
        onSuccess: (data) => {

            setVendor(data?.data as IUser);
        }
    })
    const { isLoading } = useQuery([`get-service-by-id-${id}`, id], () => httpService.get(`/business-service/search`, {
        params: {
            id
        }
    }), {
        refetchOnMount: true,
        onSuccess: (data) => {
            if (data?.data?.content?.length < 1) {
                toast({
                    title: 'No service found',
                    description: 'Service not found',
                    status: 'warning',
                    position: 'top-right',
                    isClosable: true,
                });

                // router.back();
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
            // router.back();
        }
    }); 

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} flexDir={"column"} gap={"6"} pos={"relative"} overflowY={"auto"} h={"full"} px={["4", "4", "6"]} pb={["6"]} py={"6"}  >

                <Flex gap={"1"} alignItems={"center"} pb={"3"} >
                    <Text role='button' onClick={() => back()} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >Service details</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >{service?.name}</Text>
                </Flex>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} h={["340px", "340px", "620px"]} bgColor={secondaryBackgroundColor} pos={"relative"} rounded={"8px"} borderWidth={"1px"} p={"1"} justifyContent={"center"} alignItems={"center"} borderColor={borderColor}  >
                        <Image src={IMAGE_URL + service?.images[0]} alt='logo' rounded={"8px"} height={"full"} objectFit={"cover"} />
                        <Grid templateColumns={["repeat(3, 1fr)"]} pos={"absolute"} gap={"3"} insetX={"4"} bottom={"4"} >
                            {service?.images?.map((subitem: string, index: number) => {
                                if (index !== 0 && index <= 3) {
                                    return (
                                        <Flex key={index} w={"full"} h={["100px", "150px"]} bgColor={secondaryBackgroundColor} rounded={"8px"} shadow={"md"} >
                                            <Image src={IMAGE_URL + subitem} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                        </Flex>
                                    )
                                }
                            })}
                        </Grid>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Text fontWeight={"700"} fontSize={"24px"} >{capitalizeFLetter(service?.name)}</Text>
                        {/* <DescriptionPage limit={100} label='Service Details' description={service?.description + ""} />

                        <GetCreatorData reviewdata={reviewData} userData={service?.vendor} /> */}
                        <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                            <DescriptionPage limit={200} label='Rental Details' description={service?.description + ""} />
                            <Flex w={"full"} gap={"2"}>
                                <Flex w={["fit-content", "fit-content", "full"]} >
                                    <GetCreatorData reviewdata={reviewData} userData={service?.vendor} item={service?.rating} />
                                </Flex>
                                <Flex bgColor={mainBackgroundColor} display={["flex", "flex", "none"]} w={"full"}  >
                                    <Flex w={"full"} >
                                        <Flex w={"full"} flexDir={'column'} p={["3", "3", '30px']} justifyContent={'center'} borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                                            <Flex flexDir={"column"} >
                                                <Text fontWeight={600} fontSize={"14px"} color={bodyTextColor}>Starting price</Text>
                                                <Text fontSize={'24px'} fontWeight={600} color={headerTextColor}>NGN {(service?.discount) && service?.discount > 0 ? service?.discount.toLocaleString() : service?.price?.toLocaleString()}</Text>
                                            </Flex>

                                            {userId !== service?.vendor?.userId && (
                                                <Button onClick={() => setShow(true)} w='full' h='54px' borderRadius={'full'} bgColor={primaryColor} mt='40px'>
                                                    <Text fontWeight={500} color='white'>Get Qoute</Text>
                                                </Button>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex gap={"2"} alignItems={"center"}>
                            <Text fontWeight={"600"} fontSize={"14px"} w={"60px"} >Joined</Text>
                            <CalendarIcon color={primaryColor} />
                            <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(service?.createdDate)} {timeFormat(service?.createdDate)}</Text>
                        </Flex>
                        <Flex w={"full"} justifyContent={"end"} >
                            <Flex bgColor={mainBackgroundColor} maxW={"413px"} display={["none", "none", "flex"]}  >
                                <Flex flexDir={'column'} p='30px' justifyContent={'center'} borderRadius={'10px'} borderWidth={'1px'} borderColor={borderColor}>
                                    <HStack justifyContent={'flex-start'}>
                                        <Text fontWeight={600} fontSize={"14px"} color={bodyTextColor}>Starting price</Text>
                                        <Text fontSize={'24px'} fontWeight={600} color={headerTextColor}>NGN {(service?.discount) && service?.discount > 0 ? service?.discount.toLocaleString() : service?.price?.toLocaleString()}</Text>
                                    </HStack>

                                    {userId !== service?.vendor?.userId && (
                                        <Button onClick={() => setShow(true)} w='full' h='54px' borderRadius={'full'} bgColor={primaryColor} mt='40px'>
                                            <Text fontWeight={500} color='white'>Get Qoute</Text>
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={"3"} flexDir={["column", "column", "row"]} justifyContent={"start"} alignItems={"start"} >
                    <Flex w={"full"}  >
                        <EventMap latlng={service?.location?.latlng + ""} />
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} >
                        <ProductRating setData={setData} data={reviewData} item={service} reviewType="SERVICE" />
                        <Flex display={["flex", "flex", "none"]} w={"full"} h={"200px"} />
                    </Flex>
                </Flex>
                <CreateBookingModal show={show} onClose={() => setShow(false)} service={service as IService} />
            </Flex>
        </LoadingAnimation>
    )

} 