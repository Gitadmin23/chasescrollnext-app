import React from 'react'
import GetProfile from '../get_profile'


export default function ProfilePage({ params }: { params: { slug: string } }) {
  return <GetProfile profile_index={params.slug} />
}