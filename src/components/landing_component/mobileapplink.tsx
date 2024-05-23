import { Flex, Button, Image } from "@chakra-ui/react";


function MobileAppLink() {
    return (
        <Flex gap={"4"} w={"fit-content"} >
            <Button h={"56px"} w={"176px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/apple.png" alt="apple" rounded={"8px"} />
            </Button>
            <Button h={"56px"} w={"176px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} rounded={"8px"} >
                <Image src="/images/google.png" alt="apple" rounded={"8px"} />
            </Button>
        </Flex>
    )
}

export default MobileAppLink