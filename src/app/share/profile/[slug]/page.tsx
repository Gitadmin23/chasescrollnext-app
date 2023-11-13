import GetProfile from '@/app/dashboard/profile/get_profile'
import React from 'react'

interface Props {}

function ShareProfile({ params }: { params: { slug: string } }) {
    return <GetProfile profile_index={params.slug} />
}

export default ShareProfile
