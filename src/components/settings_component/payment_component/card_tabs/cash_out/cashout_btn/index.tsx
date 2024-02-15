import React from 'react'
import { Box, useToast } from '@chakra-ui/react'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import AddBankInfo from '../modals/add_bank_info'
import BankOtp from '../modals/bank_otp'
import httpService from '@/utils/httpService'
import CustomButton from '@/components/general/Button'
import useSettingsStore from '@/global-state/useSettingsState'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'

interface Props {
    currency: string,
    amount: any,
}

function CashoutBtn(props: Props) {
    const {
        currency,
        amount,
    } = props

    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [loadingWithdrawal, setLoadingWithdrawal] = React.useState(false)
    const [modalType, setModalType] = React.useState(0)
    const [transferCode, settransferCode] = React.useState("")
    const [transferRecipient, setTransferRecipient] = React.useState("") 
    const [accountName, setAccountName] = React.useState("")
    const toast = useToast()
    const navigate = useRouter()

    const { setAmount } = useSettingsStore((state) => state);

    const clickHandler = async () => {
        setLoading(true)
        let response: any
        if (currency === "USD") {
            response = await httpService.get("/payments/account/check")
        } else {
            setOpen(true)
        }
        if (!response?.data) {
            if (currency === "USD") {
                const request: any = await httpService.get(`/payments/account/oauthOnboard`)
                console.log(request);
                if (request?.data?.checkout) {
                    window.open(request?.data?.checkout, '_blank')
                }
            } else {
                setOpen(true)
            }
        } else {
            WithdrawFund()
        }
        setLoading(false)
    }

    const WithdrawFund = async (item?: any)=> {
        setLoadingWithdrawal(true)
        const request: any = await httpService.post(`/payments/account/withdraw?currency=${currency}&amount=${amount}&transferRecipient=${item ? item : transferRecipient}`)
            
        if (request?.data?.status === "SUCCESS") {
            toast({
                title: 'Success',
                description: "Withdraw Success",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setAmount("")
            navigate.refresh()
        } else if (request?.data?.status === "ok") {
            toast({
                title: 'Success',
                description: "Withdraw Success",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            setAmount("")
            navigate.refresh()
        } else if (request?.data?.status === "OTP") {
            settransferCode(request?.transfer_code)
            setModalType(1)
            setOpen(true)
        } else {

            toast({
                title: 'Error',
                description: "Error Occurred",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            }); 
        }
        setLoadingWithdrawal(false)
    }

    return (
        <Box width={"full"} >
            <CustomButton backgroundColor={"#12299C"} onClick={() => clickHandler()} text='Withdraw' isLoading={loading} disable={loading || !amount} marginTop={"8"} />
            <ModalLayout open={open} close={setOpen} title='Recipient' >
                {modalType === 0 && (
                    <AddBankInfo loading={loadingWithdrawal} withdraw={WithdrawFund} setTransferRecipient={setTransferRecipient} transferRecipient={transferRecipient} setAccountName={setAccountName} accountName={accountName} close={setOpen} />
                )}
                {modalType === 1 && (
                    <BankOtp close={setOpen} currency={currency} transferCode={transferCode} />
                )}
            </ModalLayout>
        </Box>
    )
}

export default CashoutBtn
