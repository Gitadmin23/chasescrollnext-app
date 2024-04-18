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
                <div>
                    <motion.div
                    
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: 'salmon',
                        margin: '40px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius:"999px"
                    }}
                        animate={{
                            scale: [1, 1.5, 1], // Scale from 1 to 1.5 to 1
                        }}
                        transition={{
                            duration: 2, // Duration of each cycle
                            ease: "easeInOut",
                            loop: Infinity, // Loop indefinitely
                            repeatDelay: 0.5 // Delay of 1 second before repeating
                        }}
                    />
                </div>
            )}
        </>
    )
}
