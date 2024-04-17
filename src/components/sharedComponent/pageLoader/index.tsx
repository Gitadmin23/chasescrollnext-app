import { Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
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

                    <motion.div
                        className=' w-14 h-14 rounded-full bg-slate-800 '
                        animate={{
                            scale: [1, 1.5, 1], // Scale from 1 to 1.5 to 1
                        }}
                        transition={{
                            duration: 2, // Duration of each cycle
                            ease: "easeInOut",
                            loop: Infinity, // Loop indefinitely
                            repeatDelay: 1 // Delay of 1 second before repeating
                        }}
                    />
                </Flex>
            )}
        </>
    )
}
