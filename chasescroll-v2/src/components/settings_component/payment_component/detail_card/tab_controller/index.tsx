import { CashoutIcon, FundWalletIcon, MiniTicketIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    tab: number,
    setTab: any,
    type?: boolean
}

function TabController(props: Props) {
    const {
        tab,
        setTab,
        type
    } = props

    const tab_list = [
        {
            name: "Buy Ticket",
            icon: <MiniTicketIcon  />
        },
        {
            name: "Cash Out",
            icon: <CashoutIcon />
        },
        {
            name: "Fund Wallet",
            icon: <FundWalletIcon />
        },
        {
            name: "History",
            icon: <MiniTicketIcon />
        },
    ]

    const router = useRouter();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const clickHandler = (item: any) => {
        if (item === 0) {
            router.push("/dashboard/event")
        } else {
            setTab(item)
        }
    }

    return (
        <Flex width={"full"} bgColor={colorMode === 'light' ? "white":mainBackgroundColor} roundedBottom={"6px"} padding={"6px"} justifyContent={"space-around"} >
            {tab_list?.map((item: {
                name: string,
                icon: any
            }, index: number) => {
                return (
                    <Flex as={"button"} key={index} cursor={(item?.name === "Cash Out" || item?.name === "Fund Wallet") && type ? "not-allowed" :
                        "pointer"} opacity={(item?.name === "Cash Out" || item?.name === "Fund Wallet") && type ? "40%" :
                            ""} disabled={(item?.name === "Cash Out" || item?.name === "Fund Wallet") && type ? true :
                                false} onClick={() => clickHandler(index)} flexDirection={"column"} alignItems={"center"} fontSize={"12px"} justifyContent={"center"} py={"2"} rounded={"6px"} width={"full"} bgColor={tab === index ? "#12299C" : ""} color={tab === index ? type ? "brand.chasescrollYellow" : "white" : "#12299C"} borderColor={tab === index ? type ? "brand.chasescrollYellow" : "white" : "#12299C"} >
                                    
                        <Flex width={"40px"} height={"40px"} justifyContent={"center"} alignItems={"center"} border={"1px"} rounded={"full"} color={bodyTextColor} >
                            {item?.icon}
                        </Flex>
                        <Text fontWeight={"medium"} mt={"2px"} color={colorMode === 'light'  ? primaryColor:bodyTextColor} >{item?.name}</Text>
                    </Flex>
                )
            })}
        </Flex>
    )
}

export default TabController
