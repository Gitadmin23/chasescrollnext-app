"use client"
import DashboardDonation from '@/components/settings_component/event_dashboard_component/dashboard_donation'
import DashboardRefund from '@/components/settings_component/event_dashboard_component/dashboard_refund'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'

function Page({ params }: { params: { slug: string } }) { 
    
    return (
        <Box width={"full"} py={"8"} > 
            <DashboardDonation index={params?.slug} />
        </Box>
    )
}

export default Page