import GetEventData from '@/app/dashboard/event/details/getdata'
import React from 'react'

interface Props {}

function ShareEvent({ params }: { params: { slug: string } }) {
    return <GetEventData event_index={params.slug} />
}

export default ShareEvent
