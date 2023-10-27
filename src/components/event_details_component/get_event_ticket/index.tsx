import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import PaymentMethod from '../event_modal/payment_method'
import SelectTicketNumber from '../event_modal/select_ticket_number'
import RefundPolicy from '../event_modal/refund_policy'
import CustomButton from '@/components/general/Button'
import PaymentType from '../event_modal/payment_type'

interface Props {
    isBought: any,
    isFree: any,
    data: any,
    selectedTicket: any
}

function GetEventTicket(props: Props) {
    const {
        isBought,
        isFree,
        data,
        selectedTicket
    } = props

    const [modalTab, setModalTab] = useState(1) 
    const [numbOfTicket, setNumberOfTicket] = React.useState(1)
    const [open, setopen] = useState(false)

    const clickHandler = (item: number) => {
        setModalTab(item)
        setopen(true)
    }     

    return (
        <> 
            <CustomButton onClick={()=> clickHandler(1)} disable={(selectedTicket?.ticketType || isBought) ? false : true} text={((isBought) ? "View" : isFree ? "Register" : "Buy")+" Ticket"}  width={["full", "350px"]}  />
            <ModalLayout open={open} close={setopen} >
                {modalTab === 1 && (
                    <SelectTicketNumber close={setopen} numbOfTicket={numbOfTicket} setNumberOfTicket={setNumberOfTicket} next={setModalTab} selectedTicket={selectedTicket} data={data} />
                )}
                {modalTab === 2 && (
                    <RefundPolicy click={setModalTab} data={data} />
                )}
                {modalTab === 3 && (
                    <PaymentMethod click={setModalTab} />
                )}
                {modalTab === 4 && (
                    <PaymentType data={data} ticketCount={numbOfTicket} currency={data?.currency} selectedCategory={selectedTicket?.ticketType}  click={setModalTab} />
                )}
            </ModalLayout>
        </>
    )
}

export default GetEventTicket
