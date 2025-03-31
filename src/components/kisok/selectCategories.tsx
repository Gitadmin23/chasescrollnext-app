import useProductStore from '@/global-state/useCreateProduct';
import httpService from '@/utils/httpService';
import { Flex, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query';
import LoadingAnimation from '../sharedComponent/loading_animation';
import useCustomTheme from '@/hooks/useTheme';

export default function SelectCategories({ rental }: { rental: boolean }) {

    const { rentaldata, productdata, updateRental, updateProduct } = useProductStore((state) => state);

    const { mainBackgroundColor } = useCustomTheme()

    const { data, isLoading } = useQuery(
        ["getcategoryProduct"],
        () => httpService.get(`/products/categories`), {
        enabled: rental ? false : true
    }
    );

    const { data: datarental } = useQuery(
        ["getcategoryRental"],
        () => httpService.get(`/rental/categories`), {
        enabled: rental ? true : false
    }
    );


    const changeHandler = (item: string) => {
        updateRental({ ...rentaldata, category: item })
        updateProduct({ ...productdata, category: item })
    }

    return (
        <Flex gap={"2"} w={"full"} flexDir={"column"} >
            <Text fontWeight={"500"} >Category (optional)</Text>
            {!rental && (
                <LoadingAnimation loading={isLoading} >
                    <Select  bgColor={mainBackgroundColor} onChange={(e) => changeHandler(e.target.value)} value={productdata?.category} h={"45px"} placeholder={productdata?.category ? productdata?.category : 'Select Product Type'} >
                        {data?.data?.map((item: string, index: number) => (
                            <option key={index} >{item}</option>
                        ))}
                    </Select>
                </LoadingAnimation>
            )}

            {rental && (
                <Select bgColor={mainBackgroundColor} onChange={(e) => changeHandler(e.target.value)} value={rentaldata?.category} h={"45px"} placeholder='Select Rental Type' >
                    {datarental?.data?.map((item: string, index: number) => (
                        <option key={index} >{item}</option>
                    ))}
                </Select>
            )}
        </Flex>
    )
}
