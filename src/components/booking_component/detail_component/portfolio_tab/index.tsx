import { MoreIcon } from '@/components/svg'
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function PortfolioTab(props: Props) {
    const { } = props

    return (
        <Box w={"full"} >
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                <Button width={"161px"} h={"12"} bgColor={"#5D70F9"} color={"white"} fontSize={"lg"} fontWeight={"medium"} >
                    Add
                </Button>
                <Box transform={"rotate(90deg)"} >
                    <MoreIcon />
                </Box>
            </Flex>
            <Grid w={"full"} templateColumns='repeat(3, 1fr)' mt={"4"} gap={6}>
                <GridItem w='100%' h='240px' rounded={"8px"} bg='blue.500' />
                <GridItem w='100%' h='240px' rounded={"8px"} bg='blue.500' />
                <GridItem w='100%' h='240px' rounded={"8px"} bg='blue.500' />
                <GridItem w='100%' h='240px' rounded={"8px"} bg='blue.500' />
                <GridItem w='100%' h='240px' rounded={"8px"} bg='blue.500' />
                <GridItem w='100%' h='240px' rounded={"8px"} bg='blue.500' />
                <GridItem w='100%' h='240px' rounded={"8px"} bg='blue.500' />
            </Grid>
        </Box>
    )
}

export default PortfolioTab
