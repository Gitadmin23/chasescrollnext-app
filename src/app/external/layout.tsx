"use client"

import { Flex, Grid, Image } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react"


function Layout({ children }: {
    children: ReactNode
}) {

    const query = useSearchParams();
    const textColor = query?.get('textColor');
    const bgColor = query?.get('bgColor');

    console.log(bgColor);

    return (
        <Flex w={"full"} color={textColor ? textColor : "black"} >
            {/* <Flex pos={"fixed"} zIndex={"10"} inset={"0px"} bgColor={bgColor ?? "white"} />  */}
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} zIndex={"10"} bgColor={bgColor ? bgColor?.replace("hex", "#") : "white"} pos={"fixed"} inset={"0px"} w={"full"} h={"full"} overflow={"hidden"} >
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
                <Image src='/images/bg.png' alt='bg' w={"full"} h={"full"} objectFit={"contain"} opacity={"40%"} />
            </Grid>
            <Flex pos={"relative"} zIndex={"50"} w={"full"} >
                {children}
            </Flex>
        </Flex>
    )
}

export default Layout