'use client'
import CreateServices from '@/components/new_booking_component/createServices'
import React from 'react'
import { useParams } from 'next/navigation'


export default function Page() {
    const param = useParams();
    const id = param?.id;

    console.log(JSON.stringify(id as string));
    return (
        <CreateServices id={id as string} />
    )
}