import { THEME } from '@/theme';
import { Button, Flex, HStack, VStack } from '@chakra-ui/react';
import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import CustomText from '../general/Text';
import { useRouter } from 'next/navigation'

interface IProps {
    activeTab: number;
    setActiveTab: (num: number) => void;
    showModal: () => void;
}

const TAB_TITLES = [
    'My communities',
    'Requests'
]

const Tab = ({ title, isActive, onChange, index }: {
    title: string,
    isActive: boolean,
    onChange: (num: number) => void,
    index: number;
}) => {
    return (
        <Button onClick={() => onChange(index)} _hover={{}} fontSize={"14px"} width={"150px"} height={"43px"} bgColor={isActive ? "white" : "#EFEFF0"} color={isActive ? "brand.chasescrollBlue" : "gray.400"} >
            {title}
        </Button> 
    )
}

function CommunityTab({ activeTab, setActiveTab, showModal }: IProps) {
    const router = useRouter();
    return (
        <HStack width='100%' height='60px' alignItems={'center'} paddingY={'10px'} paddingX={'5px'} borderBottomWidth='0.8px' borderBottomColor={'lightgrey'}>
            <Flex bg={"#EFEFF0"} p={"1"} rounded={"md"} >
                {TAB_TITLES.map((item, index) => (
                    <Tab index={index + 1} title={item} key={index.toString()} isActive={activeTab === index + 1} onChange={setActiveTab} />
                ))}
            </Flex> 
        </HStack>
    )
}

export default CommunityTab