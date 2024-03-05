import CustomButton from '@/components/general/Button';
import CustomText from '@/components/general/Text'
import { HStack, Select, Switch, VStack } from '@chakra-ui/react'
import React from 'react'

const DayPicker = ({ day }: {day: string}) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <HStack w='100%' height={'50px'} justifyContent={'flex-start'}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} color={'grey'} width={'100px'}>{day}</CustomText>
            <Switch checked={checked} size='lg' onChange={() => setChecked((prev) => !prev)} />
            <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} color={'grey'} width='100px' marginLeft={'40px'}>{checked ? 'Open':'Closed'}</CustomText>
        </HStack>
    )
}

function StepFive({ next }: {
    next: (step: number) => void
}) {
  return (
    <VStack w='full' alignItems={'flex-start'}>
        <CustomText fontFamily={'DM-Bold'} fontSize={'20px'} color='black'>Add Business Hours</CustomText>
        <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Let your customers know when your are available for bookings</CustomText>

        <HStack w='70%' height='600px' borderWidth={'1px'} borderColor={'grey'} borderRadius={'20px'} overflow='hidden'>
            <VStack flex='0.4' height={'100%'}  paddingX={'60px'} paddingY={'50px'} >
                <DayPicker day='Sunday'/>
                <DayPicker day='Monday'/>
                <DayPicker day='Tuesday'/>
                <DayPicker day='Wednesday'/>
                <DayPicker day='Thursday'/>
                <DayPicker day='Friday'/>
                <DayPicker day='Saturday'/>
            </VStack>
            <VStack flex='0.4'  height={'100%'} width='70%' alignItems={'flex-start'}paddingTop={'40px'}>
                <CustomText fontFamily="DM-Medium" fontSize={'20px'}>How far in the futeure can you be booked</CustomText>
                <CustomText fontFamily='DM-Regular' fontSize={'16px'} color='grey'>This location will show up on your Chasescroll ‘My Booking’ profile for customers to see when looking for your business</CustomText>

                <Select width={'100%'} height={'50px'} borderRadius={'10px'} borderWidth={'1px'} borderColor={'grey'}>
                    <option>2 weeks</option>
                </Select>

                <CustomButton text='Continue' />
            </VStack>
        </HStack>
    </VStack>
  )
}

export default StepFive