import { IBuisness } from '@/models/Business'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

function Bookings() {
    const [businesses, setBusinesses] = React.useState<IBuisness[]>([]);
  return (
    <Box w='full' h='full'>
        <SimpleGrid columns={3}>
            <Text>All Business</Text>
        </SimpleGrid>
    </Box>
  )
}

export default Bookings
