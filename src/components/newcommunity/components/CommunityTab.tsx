import {Button, Flex, HStack } from '@chakra-ui/react';
import React from 'react'  
import useCustomTheme from "@/hooks/useTheme";

interface IProps {
    activeTab: number;
    setActiveTab: (num: number) => void; 
}

const TAB_TITLES = [
    'Find communities',
    'Requests'
]

const Tab = ({ title, isActive, onChange, index }: {
    title: string,
    isActive: boolean,
    onChange: (num: number) => void,
    index: number;
}) => {
    const {
        bodyTextColor, 
        secondaryBackgroundColor,
        mainBackgroundColor, 
    } = useCustomTheme();
    return (
        <Button onClick={() => onChange(index)} _hover={{}} fontSize={"14px"} width={"150px"} height={"43px"} bgColor={isActive ?  secondaryBackgroundColor : mainBackgroundColor } color={isActive ? "brand.chasescrollBlue" : bodyTextColor} >
            {title}
        </Button> 
    )
}

function CommunityTab({ activeTab, setActiveTab }: IProps) { 

    const { 
        mainBackgroundColor, 
    } = useCustomTheme(); 

    return (
        <HStack width='100%' bg={mainBackgroundColor} alignItems={'center'}  >
            <Flex bg={mainBackgroundColor} gap={"4"} rounded={"md"} >
                {TAB_TITLES.map((item, index) => (
                    <Tab index={index + 1} title={item} key={index.toString()} isActive={activeTab === index + 1} onChange={setActiveTab} />
                ))}
            </Flex> 
        </HStack>
    )
}

export default CommunityTab