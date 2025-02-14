import useProductStore from '@/global-state/useCreateProduct';
import httpService from '@/utils/httpService';
import { Flex, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query';

export default function SelectCategories({ rental }: { rental: boolean }) {

    const { rentaldata, productdata, updateRental, updateProduct } = useProductStore((state) => state);

    const { data } = useQuery(
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

    console.log(datarental);


    const changeHandler = (item: string) => {
        updateRental({ ...rentaldata, category: item })
        updateProduct({ ...productdata, category: item })
    }

    return (
        <Flex gap={"2"} w={"full"} flexDir={"column"} >
            <Text fontWeight={"500"} >Category (optional)</Text>
            {!rental && (
                <Select onChange={(e) => changeHandler(e.target.value)} value={productdata?.category} h={"60px"} placeholder='Select Product Type' >
                    {data?.data?.map((item: string, index: number) => (
                        <option key={index} >{item}</option>
                    ))}
                </Select>
            )}

            {rental && (
                <Select onChange={(e) => changeHandler(e.target.value)} h={"60px"} placeholder='Select Rental Type' >
                    {datarental?.data?.map((item: string, index: number) => (
                        <option key={index} >{item}</option>
                    ))}
                </Select>
            )}
        </Flex>
    )
}
