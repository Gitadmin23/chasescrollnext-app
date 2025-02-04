"use client"
import CustomButton from '@/components/general/Button'
import ProductImagePicker from '@/components/kisok/productImagePicker'
import ProductMap from '@/components/kisok/productMap'
import { GallaryIcon, PhotoIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
import useProduct from '@/hooks/useProduct'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Input, Select, Switch, Text, Textarea } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosAdd, IoIosArrowForward, IoIosRemove } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'

export default function RentalCreate() {

    const { primaryColor, borderColor } = useCustomTheme()
    const { push, back } = useRouter()
    const query = useSearchParams();
    const type = query?.get('type');
    const { rentaldata, updateRental, image } = useProductStore((state) => state);
    const [qty, setQty] = useState(1)

    const { handleSubmitRental, createProduct, loading } = useProduct(rentaldata)

    const { secondaryBackgroundColor } = useCustomTheme()

    return (
        <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                <Flex w={"50%"} bgColor={primaryColor} rounded={"6px"} />
            </Flex>
            <Flex onClick={() => back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} position={"absolute"} top={"4"} zIndex={"30"} left={"4"}  >
                <IoArrowBack size={"20px"} />
            </Flex>

            <form style={{ maxWidth: "550px" ,width: "100%", display: "flex" }} onSubmit={handleSubmitRental}>
                <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={"24px"} fontWeight={"600"} >List your Property</Text>
                    <ProductImagePicker />
                    <Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Name of the item</Text>
                            <Input h={"60px"} onChange={(e) => updateRental({ ...rentaldata, name: e.target.value })} />
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Description (optional)</Text>
                            <Textarea onChange={(e) => updateRental({ ...rentaldata, description: e.target.value })} />
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Category (optional)</Text>
                            <Select onChange={(e) => updateRental({ ...rentaldata, category: e.target.value })} h={"60px"} placeholder='Building | Accommodation' >
                                <option>test</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <CustomButton type='button' _disabled={{ opacity: "0.5", cursor: "not-allowed" }} disable={(!rentaldata?.name || !rentaldata?.description || !rentaldata?.category || image?.length === 0) ? true : false} onClick={() => push("/dashboard/kisok/create-rental?type=true")} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Next"} />
                </Flex>

                <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={"24px"} fontWeight={"600"} >List your Property</Text>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Item Type</Text>
                            <Textarea onChange={(e) => updateRental({ ...rentaldata, name: e.target.value })} />
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Location</Text>
                            <ProductMap />
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Number of Days available for Rent</Text>
                            <Flex rounded={"39px"} alignItems={"center"} justifyContent={"center"} padding={"12px"} gap={"3"} >
                                    <Flex type='button' as={"button"} onClick={()=> setQty((prev)=> prev === 1 ? 1 : prev - 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosRemove />
                                    </Flex>
                                    <Text fontSize={"18px"} >{qty}</Text>
                                    <Flex type='button' as={"button"} onClick={()=> setQty((prev)=> prev + 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosAdd />
                                    </Flex>
                                </Flex>
                        </Flex>
                        <Flex gap={"2"} w={"full"} flexDir={"column"} >
                            <Text fontWeight={"500"} >Price</Text>
                            <Input h={"60px"} onChange={(e) => updateRental({ ...rentaldata, price: e.target.value })} />
                        </Flex>
                    </Flex>
                    <CustomButton isLoading={createProduct?.isLoading || loading} disable={createProduct?.isLoading || loading} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                </Flex>
            </form>
        </Flex>
    )
}
