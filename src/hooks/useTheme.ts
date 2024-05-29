import {useColorModeValue} from "@chakra-ui/react";

export default function useCustomTheme() {
    const mainBackgroundColor = useColorModeValue( 'white', '#18191A');
    const secondaryBackgroundColor = useColorModeValue('whitesmoke', '#242526');
    const primaryColor = useColorModeValue('#5D70F9', '#5D70F9');
    const bodyTextColor = useColorModeValue('grey', 'whitesmoke');
    const headerTextColor = useColorModeValue('black', 'white');
    const inputBorderColor = useColorModeValue('lightgrey', '#D0D4EB');
    const borderColor = useColorModeValue('#D0D4EB', '#EFF1FE')

    return {
        mainBackgroundColor,
        secondaryBackgroundColor,
        primaryColor,
        bodyTextColor,
        headerTextColor,
        inputBorderColor,
        borderColor,
    }
}