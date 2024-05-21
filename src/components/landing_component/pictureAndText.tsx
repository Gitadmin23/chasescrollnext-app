import { Flex, Image } from "@chakra-ui/react";
import React from "react";


export default function PictureAndText({
    children,
    reverse,
    imageUrl
}: {
    children: React.ReactNode,
    reverse?: boolean,
    imageUrl: string
}) {

    return (
        <Flex w={"full"} p={"12"} flexDir={reverse ? "row-reverse" : "row"} >
            <Flex width={"full"} justifyContent={"center"} alignItems={"center"} >
                <Image src={imageUrl} alt={imageUrl} height={"572px"} />
            </Flex>
            <Flex width={"full"} >
                {children}
            </Flex>
        </Flex>
    )
}