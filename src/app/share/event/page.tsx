"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import GetEventData from '@/app/dashboard/event/details/getdata'

function ShareEvent() { 
  const query = useSearchParams();
  const type = query?.get('type');
  const typeID = query?.get('typeID');
  return (
    <GetEventData event_index={typeID} />
  )
}

export default ShareEvent