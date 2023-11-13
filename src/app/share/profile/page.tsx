"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import GetProfile from '@/app/dashboard/profile/get_profile'

function ShareProfile() {
    const query = useSearchParams();
    const type = query?.get('type');
    const typeID = query?.get('typeID');
  return (
    <GetProfile profile_index={typeID} />
  )
}

export default ShareProfile