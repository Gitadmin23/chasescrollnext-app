import useGetUser from '@/hooks/useGetUser';
import useProduct from '@/hooks/useProduct';
import useCustomTheme from '@/hooks/useTheme';
import { IRental } from '@/models/product';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import httpService from '@/utils/httpService';
import { useToast, Flex, Checkbox, Select, Input, Textarea, Text } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { useQuery } from 'react-query';
import CustomButton from '../general/Button';
import LoadingAnimation from '../sharedComponent/loading_animation';
import ModalLayout from '../sharedComponent/modal_layout';
import { Delete2Icon, Edit2Icon, SuccessIcon } from '../svg';
import ProductMap from './productMap';
import useProductStore from '@/global-state/useCreateProduct';

interface IProps {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": any,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "state": string,
    location: {
        "link": any,
        "address": string,
        "country": any,
        "street": any,
        "city": any,
        "zipcode": any,
        "state": any,
        "locationDetails": string,
        "latlng": string,
        "placeIds": any,
        "toBeAnnounced": any,
    },
    phone: string
    "isDefault": boolean
}


export default function SelectAddress({ id, qty, startDate, endDate, item, newPrice = 0 }: { id: string, qty: number, startDate: any, endDate: any, item: IRental, newPrice?: number }) {

    // const id = params.slug
    const { primaryColor, secondaryBackgroundColor, bodyTextColor } = useCustomTheme();
    const query = useSearchParams();
    // const startDate = query?.get('startDate');
    // const endDate = query?.get('endDate');
    const { push } = useRouter()

    const { location, updateAddress: setNewAddress } = useProductStore((state) => state);

    const { createAddress, setOpen, open, payload, setPayload, userId, editAddress, setAddressId, addressId, openDelete, setOpenDelete, deleteAddress, addressDefault, setAddressDefault, createRentalRecipt, updateAddress, openSucces, setOpenSucces } = useProduct()
    const toast = useToast()
    const [address, setAddress] = useState<Array<IProps>>([])


    const { user } = useGetUser()
    // const [item, setItem] = useState({} as IRental) 

    const { isLoading } = useQuery(
        ["addressuser", userId],
        () => httpService.get(`/addresses/user/${userId}`), {
        onSuccess(data) {
            setAddress(data?.data)
            data?.data?.map((item: IProps) => {
                if (item?.isDefault) {
                    setAddressDefault(item?.id)
                }
            })
        },
    }
    );

    const clickHandler = () => {
        if (!payload?.state) {
            toast({
                title: "Select State",
                description: "",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
            return
        } else if (!payload?.phone) {
            toast({
                title: "Enter Your Phone Number",
                description: "",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
            return
        } else if (!location?.locationDetails || !location?.latlng) {
            toast({
                title: "Please Select a location in your map",
                description: "",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top-right",
            });
        } else {
            if (addressId) {
                editAddress?.mutate({ ...payload, location: location })
            } else {
                createAddress?.mutate({ ...payload, location: location })
            }
        }
    }

    const editHandler = (item: any) => {
        console.log(item);

        setAddressId(item?.id)
        setPayload({
            ...payload, state: item?.state,
            lga: item?.lga,
            phone: item?.phone,
            landmark: item?.landmark,
        })
        setOpen(true)
    }

    const createHandler = () => {
        setAddressId("")
        setOpen(true)
    }

    const deleteHandler = (item: any) => {
        setAddressId(item?.id)
        setOpenDelete(true)
    }

    const changeStatus = (item: IProps) => {
        setAddressId(item?.id)
        updateAddress?.mutate(
            {
                id: item?.id, payload: {
                    state: item?.state,
                    location: location,
                    isDefault: true,
                    userId: userId,
                }
            }
        )
    }

    const statesInNigeria = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara"
    ];


    return (
        <Flex w={"full"} px={["0px", "0px", "6"]} pt={["6", "6", "6", "6"]} pb={"12"} flexDir={"column"} gap={"6"} overflowY={"auto"} overflowX={"hidden"} >
            <Flex alignItems={"center"} gap={"1"} >
                <FaCheckCircle size={"15px"} color='#34C759' />

                <Text fontSize={"24px"} fontWeight={"600"} >Address </Text>
                {/* <Text fontSize={"14px"} >Customer Address </Text> */}
            </Flex>
            <Flex flexDir={"column"} w={"full"} gap={"6"} >
                <LoadingAnimation loading={isLoading} >
                    {address?.map((item, index) => {
                        return (
                            <Flex key={index} w={"full"} pos={"relative"} p={["4", "4", "6"]} gap={"4"} rounded={"8px"} borderWidth={"1px"} flexDir={"column"} >
                                <Flex w={"full"} justifyContent={"space-between"} >
                                    <Text fontSize={"12px"} fontWeight={"500"} >Address</Text>
                                    <Flex gap={"4"} position={"absolute"} right={["4", "4","6"]} top={["4", "4","6"]} flexDirection={'column'} >
                                        <Flex w={"45px"} h={"45px"} bgColor={secondaryBackgroundColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} as={"button"} onClick={() => editHandler(item)} >
                                            <Edit2Icon />
                                        </Flex>
                                        <Flex w={"45px"} h={"45px"} bgColor={secondaryBackgroundColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} as={"button"} onClick={() => deleteHandler(item)} >
                                            <Delete2Icon />
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} alignItems={"start"} flexDir={["column", "column", "row"]} pr={["50px", "50px", "0px"]} gap={"4"} >
                                    <Flex onClick={() => changeStatus(item)} >
                                        <Checkbox isChecked={addressDefault === item?.id ? true : false} />
                                    </Flex>
                                    <Flex flexDir={"column"} gap={"1"} > 
                                        <Text>{item?.state}</Text>
                                        <Text>{item?.location?.locationDetails}</Text>
                                        {addressDefault === item?.id && (
                                            <Flex fontSize={"8px"} fontWeight={"500"} px={"2"} py={"1"} bgColor={"#34C759"} rounded={"32px"} color={"white"} width={"fit-content"} >
                                                DEFAULT ADDRESS
                                            </Flex>
                                        )}
                                        <Text fontWeight={"500"} fontSize={"12px"} mt={"3"} >Phone Number</Text>
                                        <Text fontSize={"14px"} >{item?.phone}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    })}
                </LoadingAnimation>
                <Flex onClick={createHandler} as={"button"} w={"full"} p={["4", "4","6"]} gap={"4"} h={"fit-content"} alignItems={"center"} rounded={"8px"} borderWidth={"1px"} flexDir={"column"} >
                    <Flex gap={"2"} w={"full"} >
                        <IoIosAdd size={"20px"} />
                        <Text fontSize={"14px"} fontWeight={"500"} >Add Address</Text>
                    </Flex>
                </Flex>
                <Text as={"button"} fontSize={"14px"} color={primaryColor} fontWeight={"500"} mr={"auto"} >Go back & Continue buying</Text>
            </Flex>
            <ModalLayout open={open} close={setOpen} title={"Add Address"} >
                <Flex w={"full"} gap={"4"} flexDir={"column"} p={"4"} >
                    <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>Address</Text>
                        <ProductMap height='45px' location={location} />
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>State</Text>
                        <Select value={payload?.state} placeholder='Select State' onChange={(e) => setPayload({ ...payload, state: e.target.value })} >
                            {statesInNigeria?.map((state) => {
                                return (
                                    <option key={state} >{state}</option>
                                )
                            })}
                        </Select>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>Phone Number</Text>
                        <Input value={payload?.phone} type='number' placeholder='Enter Phone Number' onChange={(e) => setPayload({ ...payload, phone: e.target.value })} />
                    </Flex>
                    {/* <Flex flexDir={"column"} w={"full"} gap={"1"} >
                        <Text>Address Detail</Text>
                        <Textarea value={location?.address} placeholder='Select Land Mark' onChange={(e) => setNewAddress({ ...location, address: e.target.value })} />
                    </Flex> */}
                    <CustomButton isLoading={createAddress?.isLoading || editAddress?.isLoading} onClick={clickHandler} text={"Submit"} borderRadius={"999px"} />
                </Flex>
            </ModalLayout>

            <ModalLayout open={openDelete} rounded='2xl' close={setOpenDelete} size={"xs"} >
                <Flex w={"full"} gap={"4"} flexDir={"column"} alignItems={"center"} p={"4"} >
                    <Flex pt={"5"} >
                        <Delete2Icon size='60px' />
                    </Flex>
                    <Text textAlign={"center"} >Are you sure you want to delete this Address?</Text>
                    <Flex gap={"3"} w={"full"} >
                        <CustomButton onClick={() => setOpenDelete(false)} text={"Cancel"} color={primaryColor} borderWidth={"1px"} borderColor={primaryColor} backgroundColor={"white"} fontSize={"sm"} height={"45px"} borderRadius={"999px"} />
                        <CustomButton isLoading={deleteAddress?.isLoading} onClick={() => deleteAddress?.mutate()} text={"Submit"} borderWidth={"1px"} borderColor={"red"} backgroundColor={"red"} fontSize={"sm"} height={"45px"} borderRadius={"999px"} />
                    </Flex>
                </Flex>
            </ModalLayout>
            <ModalLayout open={openSucces} close={setOpenSucces} bg={secondaryBackgroundColor} closeIcon={true} >
                {/* <LoadingAnimation loading={loading} > */}
                <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"6"} >
                    <SuccessIcon />
                    <Text fontSize={["18px", "20px", "24px"]} fontWeight={"600"} mt={"4"} >{"Receipt created Successful"}</Text>
                    <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Your reciept has reach the vendor `}</Text>
                    <CustomButton onClick={() => push("/dashboard/kisok?type=myreciept")} color={"#FFF"} text={'View Receipt'} w={"full"} backgroundColor={"#3EC259"} />
                </Flex>
                {/* </LoadingAnimation> */}
            </ModalLayout>
            <Flex w={"200px"} justifyContent={"end"} >
                <CustomButton disable={addressDefault ? false : true} mt={"4"} isLoading={createRentalRecipt?.isLoading} onClick={() => createRentalRecipt?.mutate(
                    { 
                        userID: userId + "",
                        rentalID: id,
                        startDate: startDate,
                        endDate: endDate,
                        addressedId: addressDefault,
                        price: newPrice > 0 ? Number(newPrice * Number(qty)) : Number(item?.price * Number(qty)), 
                        approvalStatus: 'PENDING',
                        frequency: Number(qty) 
                    }
                )} text={`Request Avaliablity`} borderRadius={"999px"} w={"200px"} height={"55px"} />
            </Flex>
        </Flex>
    )
}
