import SearchComponent from '@/components/search_component'
import useSearchStore from '@/global-state/useSearchData'
import { InputGroup, InputLeftElement, Input, Box } from '@chakra-ui/react'
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

interface Props { }

function SearchBar(props: Props) {
    const { } = props

    const { search, setSearchValue } = useSearchStore((state) => state);
    const [value, setValue] = React.useState("")

    return (
        <Box width={"361px"} position={"relative"} >
            <InputGroup  zIndex={"20"} position={"relative"} >
                <InputLeftElement pointerEvents='none'>
                    <IoSearchOutline size={"25px"} color='#5D70F9' />
                </InputLeftElement>
                <Input value={search} onChange={(e)=> setSearchValue(e.target.value)} type='text' borderColor={"brand.chasescrollBlue"} focusBorderColor={'brand.chasescrollBlue'} bgColor={"white"} placeholder='Search for users, event or...' />
            </InputGroup>
            {search && (
                <Box width={"full"} zIndex={"20"} position={"absolute"} mt={"2"} >
                    <SearchComponent />
                </Box>
            )} 
            {search && (
                <Box onClick={()=> setSearchValue("")} bgColor={"black"} opacity={"0.3"} zIndex={"10"} position={"fixed"} inset={"0px"} />
            )}
        </Box>
    )
}

export default SearchBar
