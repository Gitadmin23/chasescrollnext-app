import { Flex, Button, Image } from "@chakra-ui/react";

type IProps = {
    width?: string,
    height?: string
}

function MobileAppLink(props: IProps) {

    const {
        width,
        height
    } = props

    return (
        <Flex gap={"2"} w={"fit-content"} >
            <Button h={height ?? ["36px", "36px", "56px"]} w={width ?? ["113.14px", "113.14px", "176px"]} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/apple.png" alt="apple" rounded={"8px"} />
            </Button>
            <Button h={height ?? ["36px", "36px", "56px"]} w={width ?? ["113.14px", "113.14px", "176px"]} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/google.png" alt="apple" rounded={"8px"} />
            </Button>
        </Flex>
    )
}

export default MobileAppLink