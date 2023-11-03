import { Box, Flex, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    icon: any,
    count: string,
    name: string,
    link: string
}

function HeaderLayout(props: Props) {
    const {
        icon,
        count,
        name,
        link
    } = props

    const router = useRouter() 
    const pathname = usePathname();

    return (
        <Flex as={"button"} onClick={()=> router.replace(link)} color={pathname?.includes(name.toLocaleLowerCase()) ? "brand.chasescrollBlue" : "#B1B5C3"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} >
            <Text fontSize={"20px"} fontWeight={"medium"} color={pathname?.includes(name.toLocaleLowerCase()) ? "brand.chasescrollBlue" : "black"} >{count ? count : 0}</Text>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"24px"} height={"24px"} >
                {icon}
            </Box>
            <Text >{name}</Text>
        </Flex>
    )
}

export default HeaderLayout
