import useProductStore from '@/global-state/useCreateProduct';
import httpService from '@/utils/httpService';
import { Flex, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query';

export default function SelectCategories() {

    const { rentaldata, productdata, updateRental, updateProduct } = useProductStore((state) => state);

    const { isLoading, isRefetching, refetch, data } = useQuery(
        ["getProduct"],
        () => httpService.get(`/rental/categories`),
    ); 

    console.log(data);
    

    const changeHandler = (item: string) => {
        updateRental({ ...rentaldata, category: item })
        updateProduct({ ...productdata, category: item })
    }

    return (
        <Flex gap={"2"} w={"full"} flexDir={"column"} >
            <Text fontWeight={"500"} >Category (optional)</Text>
            <Select onChange={(e) => changeHandler(e.target.value)} h={"60px"} placeholder='Building | Accommodation' >
                <option>test</option>
            </Select>
        </Flex>
    )
}
