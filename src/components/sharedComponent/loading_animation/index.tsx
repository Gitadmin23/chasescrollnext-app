import { Flex, Spinner, Text } from '@chakra-ui/react'
import React, {PropsWithChildren} from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    loading: any;
    refeching?: any;
    children: React.ReactNode;
    length?: any;
    fix_height?: boolean;
    color?: string;
    customLoader?: any;
}

function LoadingAnimation(props: PropsWithChildren & Props) {

    let {
        children,
        loading,
        length,
        refeching,
        fix_height,
        color
    } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();

    return (
        <>
            {!loading && (
                <>
                    {children} 
                    {(!loading && refeching)&& (
                        <Flex width={"full"} justifyContent={"center"} height={fix_height ? "full": "auto"} bg={secondaryBackgroundColor}  fontSize={"20px"} py={fix_height ? "" : "8"}  >
                            <Spinner size={["md", "sm"]} color={color? color : 'black'} />
                        </Flex>
                    )}
                </>
            )}

            {(!loading && !refeching ) && (
                <>
                    {length === 0 && (
                        <Flex width={"full"} justifyContent={"center"} fontSize={"20px"} py={"4"} bg={secondaryBackgroundColor}   >
                            <Text>No Records Found</Text>
                        </Flex>
                    )}
                </>
            )}
            {loading && (
                <Flex width={"full"} bg={secondaryBackgroundColor} justifyContent={"center"} mb={"auto"} fontSize={"20px"} py={"8"}  >
                    <Spinner size={["md", "sm"]} color={color? color : bodyTextColor} />
                </Flex>
            )}
        </>
    )
}

export default LoadingAnimation
