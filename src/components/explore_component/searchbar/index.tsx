import SearchComponent from '@/components/search_component'
import useSearchStore from '@/global-state/useSearchData'
import { InputGroup, InputLeftElement, Input, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

interface Props { 
    home?: boolean
}

function SearchBar(props: Props) {
    const { 
        home
    } = props

    const { search, setSearchValue } = useSearchStore((state) => state);
    const [value, setValue] = React.useState("")

    return (
        <Flex width={["full", "full","361px"]} position={"relative"} >
            <InputGroup   width={["full", "full","361px"]}  zIndex={"20"} position={"relative"} >
                <InputLeftElement pointerEvents='none'>
                    <IoSearchOutline size={"25px"} color='#B6B6B6' />
                </InputLeftElement>
                <Input  width={["full", "full","361px"]}  value={search} onChange={(e)=> setSearchValue(e.target.value)} type='text' borderColor={"#CCCCCC"} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} bgColor={"white"} placeholder='Search for users, event or...' />
            </InputGroup>
            {search && (
                <Box width={"full"} zIndex={"20"} position={"absolute"} mt={"2"} >
                    <SearchComponent home={home} />
                </Box>
            )} 
            {search && (
                <Box onClick={()=> setSearchValue("")} bgColor={"black"} opacity={"0.3"} zIndex={"10"} position={"fixed"} inset={"0px"} />
            )}
        </Flex>
    )
}

export default SearchBar
