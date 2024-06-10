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
        <Flex w={"full"} p={[ "6", "6", "12"]} flexDir={reverse ? [ "column", "column", "column", "row-reverse" ] : [ "column", "column", "column", "row"]} >
            <Flex width={[ "full", "full", "full"]} justifyContent={"center"} alignItems={"center"} >
                <Image src={imageUrl} alt={imageUrl} height={["auto" , "auto", "auto", "572px"]} />
            </Flex>
            <Flex width={"full"} pt={["8", "8", "0px"]} >
                {children}
            </Flex>
        </Flex>
    )
}