import React from 'react'
import { useSearchParams } from 'next/navigation'


function ShareCommunity() {
  const query = useSearchParams();
  const type = query?.get('type');
  const typeID = query?.get('typeID');
  return (
    <div>ShareCommunity</div>
  )
}

export default ShareCommunity