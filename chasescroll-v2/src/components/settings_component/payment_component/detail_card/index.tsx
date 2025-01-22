"use client"
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserWalletAmount from './user_wallet_amount'
import TabController from './tab_controller'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io' 
import useSettingsStore from '@/global-state/useSettingsState'
import CardTabs from '../card_tabs'
import useCustomTheme from '@/hooks/useTheme'

interface Props { 

}

function DetailCard(props: Props) {
    const { } = props

    const [showEscrow, setShowEscrow] = useState(false)    
    const [tab, setTab] = React.useState(3)
    // const [currency, setCurrency] = useState("NGN")

    const { currency } = useSettingsStore((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const clickHandler =()=> {
        setTab(3)
        setShowEscrow((prev) => !prev)
    }

    return (
        <Box> 
            <Box width={"full"} padding={"2px"} rounded={"6px"} bgColor={colorMode === 'light' ? "#12299C":secondaryBackgroundColor} >
                <Flex justifyContent={"space-between"} >
                    <Flex as={"button"} color={colorMode === 'light' ? "#12299C":bodyTextColor} bg={showEscrow ? "brand.chasescrollYellow" : mainBackgroundColor} roundedTopLeft={"6px"} roundedBottomRight={"12px"} fontWeight={"bold"} px={"10px"} py={"3px"} >
                        Balance
                    </Flex>
                    <Flex onClick={() => clickHandler()} as={"button"} roundedTopRight={"6px"} roundedBottomLeft={"12px"} color={showEscrow ? "brand.chasescrollYellow" : colorMode === 'light' ?"#12299C":bodyTextColor} bg={showEscrow ? "" : mainBackgroundColor} alignItems={"center"} fontWeight={"bold"} gap={"2px"} px={"10px"} py={"3px"} >
                        {!showEscrow && (
                            <IoIosArrowBack size="16px" />
                        )}
                        {showEscrow ? "Escrow" : "Wallet"}
                        {showEscrow && (
                            <IoIosArrowForward size="16px" />
                        )}
                    </Flex>
                </Flex>
                <UserWalletAmount showEscrow={showEscrow} currency={currency} />
                <TabController tab={tab} type={showEscrow} setTab={setTab} />
            </Box> 
            <CardTabs tab={tab} currency={currency} />
        </Box>
    )
}

export default DetailCard
