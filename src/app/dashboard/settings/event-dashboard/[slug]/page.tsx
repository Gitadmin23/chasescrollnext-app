"use client"
import DashboardDetail from "@/components/settings_component/event_dashboard_component/dashboard_detail" 
import useCustomTheme from "@/hooks/useTheme";
import { Box, useColorMode } from "@chakra-ui/react"  

export default function EventDetailsPage({ params }: { params: { slug: string } }) { 

  const {
    mainBackgroundColor,
} = useCustomTheme();
const { colorMode, toggleColorMode } = useColorMode();

  return(
    <Box width={"full"} bg={mainBackgroundColor} >
      <DashboardDetail index={params?.slug} />
    </Box>
  )
}