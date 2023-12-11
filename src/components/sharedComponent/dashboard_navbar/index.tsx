import SearchBar from '@/components/explore_component/searchbar'
import CustomText from '@/components/general/Text'
import NotificationBar from '@/components/navbar/notification'
import { THEME } from '@/theme'
import { Box, Flex, HStack, Image, Link } from '@chakra-ui/react'
import { Message, LogoutCurve } from 'iconsax-react'
import router from 'next/router'
import React from 'react'

interface Props { 
    pathname: string | null,
    userId?: string | number | null,
    openmodal?: any
}

function DashboardNavbar(props: Props) {
    const { 
        pathname,
        userId,
        openmodal
    } = props

    return (
        <Box width="full" position={"absolute"} zIndex={"30"} top={"0px"} >
            {/* NAVBAR SECTION */}
            {(!pathname?.includes("create_event") || !pathname?.includes("edit_draft") || !pathname?.includes("edit_event")) && (
                <HStack position={"absolute"} zIndex={"30"} top={"0px"} width='100%' height='80px' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} backgroundColor={'white'} alignItems='center' justifyContent={'space-between'} paddingX={['20px', '40px']}>

                    <Flex alignItems={"center"} gap={"12"} >
                        <HStack role="button" onClick={() => router.push("/dashboard/home")} justifyContent={'center'}>
                            <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                            <CustomText fontFamily={'Satoshi-Regular'} fontSize='lg' display={['none', 'inline']} color='#12299C'>Chasescroll</CustomText>
                        </HStack>
                        {userId && (
                            <Box display={["none", "none", "block"]} >
                                <SearchBar />
                            </Box>
                        )}
                    </Flex>
                    {/* LARGE SCREEN ICONS */}

                    {userId && (
                        <HStack display={['none', 'flex']}>
                            {/* <CustomText fontWeight={"bold"} >{username}</CustomText> */}
                            <NotificationBar />

                        </HStack>
                    )}

                    {/* SMALL SCREEN ICONS */}
                    <HStack display={['flex', 'none']}>
                        <Link href='/dashboard/chats'>
                            <Message color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' />
                        </Link>
                        <NotificationBar />
                        <LogoutCurve onClick={() => openmodal(true)} color='red' size={'30px'} variant='Outline' />
                    </HStack>

                </HStack>
            )}
        </Box>
    )
}

export default DashboardNavbar
