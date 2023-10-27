import { StripeLogo } from '@/components/svg'
import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function StripeBtn(props: Props) {
    const { } = props 

    const [clientSecret, setClientSecret] = React.useState("");
    const [configData, setconfigData] = React.useState(""); 

    return ( 
        <Flex as={"button"} width={"full"} justifyContent={"start"} px={"4"} mt={"6"} borderColor={"#D0D4EB"} borderWidth={"1px"} gap={"3"} py={"8"} bg={"#F4F5FA"} rounded={"lg"} alignItems={"center"} >
            <StripeLogo />
        </Flex>
    )
}

export default StripeBtn
