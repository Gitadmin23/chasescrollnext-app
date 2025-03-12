import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import Chatcollaborator from './chatcollaborator'
import CollaboratorBtn from '../create_event_component/event_ticket/collaborators'
import { IEventType } from '@/models/Event'
import { usePathname } from 'next/navigation'

export default function VolunteerBtn(props: IEventType) {

    const {
        collaborators,
        admins,
        acceptedAdmins,
        acceptedCollaborators,
        createdBy,
        id
    } = props

    const pathname = usePathname();
    const [open, setOpen] = useState(false)

    return (
        <> 
            {((collaborators || admins) && !pathname?.includes("pastdetails")) && (
                <CollaboratorBtn update={true} collaborate={acceptedCollaborators?.length !== 0 || acceptedAdmins?.length !== 0} btn={true} data={props} />
            )}
            <ModalLayout open={open} close={setOpen} title='Event Organizers' >
                <Chatcollaborator admins={acceptedAdmins} collaborators={acceptedCollaborators} />
            </ModalLayout>
        </>
    )
}
