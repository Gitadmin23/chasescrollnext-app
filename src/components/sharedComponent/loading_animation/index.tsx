import useCustomTheme from '@/hooks/useTheme';
import { Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    loading: any,
    refeching?: any,
    children: React.ReactNode,
    length?: any,
    fix_height?: boolean,
    color?: string,
    customLoader?: React.ReactNode, 
}

function LoadingAnimation(props: Props) {

    let {
        children,
        loading,
        length,
        refeching,
        fix_height,
        color,
        customLoader, 
    } = props

    const { 
        secondaryBackgroundColor, 
    } = useCustomTheme();

    return (
        <>
            {!loading && (
                <>
                    {children}
                    {(!loading && refeching) && (
                        <Flex w={"full"} bg={secondaryBackgroundColor} height={"auto"} >
                            {/* {!customLoader && ( */}
                                <Flex width={"full"} justifyContent={"center"} height={fix_height ? "full" : "auto"} fontSize={"20px"} py={fix_height ? "" : "8"}  >
                                    <Spinner size={["md", "sm"]} color={color ? color : 'black'} />
                                </Flex>
                            {/* // )} */}
                            {/* {customLoader} */}
                        </Flex>
                    )}
                </>
            )}

            {(!loading && !refeching) && (
                <>
                    {length === 0 && (
                        <Flex width={"full"}  bg={secondaryBackgroundColor} justifyContent={"center"} fontSize={"20px"} py={"4"}  >
                            <Text>No Records Found</Text>
                        </Flex>
                    )}
                </>
            )}
            {loading && (
                <Flex w={"full"} height={"auto"} >
                    {!customLoader && (
                        <Flex width={"full"}  bg={secondaryBackgroundColor} justifyContent={"center"} height={fix_height ? "full" : "auto"} fontSize={"20px"} py={fix_height ? "" : "8"}  >
                            <Spinner size={["md", "sm"]} color={color ? color : 'black'} />
                        </Flex>
                    )}
                    {customLoader}
                </Flex>
            )}
        </>
    )
}

export default LoadingAnimation
