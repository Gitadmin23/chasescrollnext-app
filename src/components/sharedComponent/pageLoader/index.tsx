import CustomText from '@/components/general/Text'
// import { Image } from '@chakra-ui/next-js'
import { Flex, Image } from '@chakra-ui/react'
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
                // <Flex position={"fixed"} zIndex={"500"} inset={"0px"} w={"full"} bgColor={"white"} justifyContent={"center"} alignItems={"center"} height={"full"} >

                //     <Flex role="button" width={"fit-content"} alignItems={"center"} gap={"1"} justifyContent={'center'}>
                //         <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                //         <CustomText fontFamily={'Satoshi-Regular'} fontSize='lg' color='#12299C'>Chasescroll</CustomText>
                //     </Flex>
                // </Flex>
                <Flex position={"fixed"} zIndex={"500"} inset={"0px"} w={"full"} bgColor={"white"} justifyContent={"center"} alignItems={"center"} height={"full"} >
                    <Flex gap={"6"} w={"fit-content"} >

                        <motion.div

                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: '#5465E0',
                                margin: '40px auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: "999px"
                            }}
                            animate={{
                                scale: [1, 1.5, 1], // Scale from 1 to 1.5 to 1
                            }}
                            transition={{
                                duration: 1, // Duration of each cycle
                                ease: "easeInOut",
                                repeat: Infinity, // Repeat indefinitely
                                repeatType: "loop", // Loop the animation
                                repeatDelay: 0.1 // Delay of 0.1 seconds before repeating
                            }}
                        />
                        <motion.div

                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: '#5465E0',
                                margin: '40px auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: "999px"
                            }}
                            animate={{
                                scale: [1.5, 1, 1.5], // Scale from 1 to 1.5 to 1
                            }}
                            transition={{
                                duration: 1, // Duration of each cycle
                                ease: "easeInOut",
                                repeat: Infinity, // Repeat indefinitely
                                repeatType: "loop", // Loop the animation
                                repeatDelay: 0.1 // Delay of 0.1 seconds before repeating
                            }}
                        />
                        <motion.div

                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: '#5465E0',
                                margin: '40px auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: "999px"
                            }}
                            animate={{
                                scale: [1, 1.5, 1], // Scale from 1 to 1.5 to 1
                            }}
                            transition={{
                                duration: 1, // Duration of each cycle
                                ease: "easeInOut",
                                repeat: Infinity, // Repeat indefinitely
                                repeatType: "loop", // Loop the animation
                                repeatDelay: 0.1 // Delay of 0.1 seconds before repeating
                            }}
                        />
                    </Flex>
                </Flex>
            )}
        </>
    )
}
