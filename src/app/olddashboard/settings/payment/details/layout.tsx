"use client"
import CustomButton from '@/components/general/Button';
import UserImage from '@/components/sharedComponent/userimage';
import useSettingsStore from '@/global-state/useSettingsState';
import { useDetails } from '@/global-state/useUserDetails';
import useCustomTheme from '@/hooks/useTheme';
import { Box, Flex, Switch, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { IoIosArrowBack } from 'react-icons/io'


function Layout({ children }: { children: ReactNode }) {

    const { firstName, lastName, user, userId } = useDetails((state) => state);
    const router = useRouter()

    const { setCurrency } = useSettingsStore((state) => state);
    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    // const toggleCurrency = (item: any) => {
    //     if (item) {
    //         setCurrency("USD")
    //     } else {
    //         setCurrency("NGN")
    //     }
    // }
    
    return (
        <Flex flexDirection={"column"} height={"full"} width={"full"} overflowY={"auto"} bg={mainBackgroundColor} >
            <Flex justifyContent={"space-between"} py={"36px"} px={["6", "59px"]} width={"full"} alignItems={"center"} >
                <Flex gap={"3"} width={"fit-content"} alignItems={"center"}  >
                    <IoIosArrowBack role="button" onClick={() => router.back()} size="24px" />
                    <Flex as={"button"} onClick={() => router.push(`/dashboard/profile/${userId}`)} gap={"2"} justifyContent={"start"} alignItems={"center"} >
                        <Box width={"fit-content"} >
                            <UserImage data={user} size={"46px"} font={"18px"} image={user?.data?.imgMain?.value} />
                        </Box>
                        <Box>
                            <Text fontSize={"14px"} textAlign={"start"} color={bodyTextColor} >Hello</Text>
                            <Text fontSize={"17px"} fontWeight={"semibold"} mt={"-3px"} color={bodyTextColor} >{firstName + " " + lastName}</Text>
                        </Box>
                    </Flex>
                </Flex>

                <Flex gap={"2"} > 
                    <CustomButton fontSize={"sm"} height={"35px"} borderWidth={"1px"} color={"#5465E0"} mt={"3"} backgroundColor={"#EFF1FE"} fontWeight={"bold"} px={"4"} rounded={"8px"} width={"fit-content"} text={'🇳🇬'} />
                </Flex>
            </Flex>
            <Box width={["full", "400px"]} mx={"auto"} px={["6", "0px"]} py={"6"} >
                {children}
            </Box>
        </Flex>
    )
}

export default Layout
