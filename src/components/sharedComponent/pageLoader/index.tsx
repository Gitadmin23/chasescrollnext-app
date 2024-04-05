import { Flex } from '@chakra-ui/react'
import React from 'react'
import { ThreeDots } from "react-loader-spinner"

type IProps = {
    show: boolean
}

export default function PageLoader({ show }: IProps) {
    return (
        <>
            {show && ( 
                <Flex position={"fixed"} zIndex={"500"} inset={"0px"} w={"full"} bgColor={"white"} justifyContent={"center"} alignItems={"center"} height={"full"} >
                    <ThreeDots
                        height="50"
                        width="200"
                        radius="100"
                        color="#5D70F9"
                        ariaLabel="three-dots-loading"
                        visible={true}
                    />
                </Flex>
            )}
        </>
    )
}
