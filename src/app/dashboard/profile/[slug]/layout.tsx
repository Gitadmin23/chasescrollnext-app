"use client"
import ProfileHeader from '@/components/profile_component/profile_header'
import ProfileImage from '@/components/profile_component/profile_image'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { Box, useColorMode } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

function Layout({ params, children }: { params: { slug: string }, children: ReactNode }) {

    const { userId } = useDetails((state) => state);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box width={"full"} overflowY={"auto"} bg={mainBackgroundColor} >
            <ProfileImage user_index={params.slug} />
            {userId && (
                <ProfileHeader user_index={params.slug} />
            )}
            {userId && (
                <Box width={"full"} py={"6"} >
                    {children}
                </Box>
            )}
        </Box>
    )
}

export default Layout
