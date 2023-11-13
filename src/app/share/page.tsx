'use client';
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Box, useToast } from '@chakra-ui/react';
import ShareCommunity from './community/page';
import ShareEvent from './event/page';
import SharePost from './post/page';
import ShareProfile from './profile/page';

type queryTypes = {
  typeID: string;
}
type itemType = 'PROFILE'|'POST'|'COMMUNITY'|'EVENT';


function Share() {

  const query = useSearchParams();
  const type = query?.get('type');
  const typeID = query?.get('typeID');

  const toast = useToast();

  if (type === null || typeID === null) {
    toast({
      title: 'Warning',
      description: 'Not recoord found',
      status: 'warning',

    })
  }

  const handleType = React.useCallback(() => {
    switch(type as itemType) {
      case 'COMMUNITY': {
        return <ShareCommunity typeID={typeID as string} />
      }
      case 'EVENT': {
        return <ShareEvent typeID={typeID as string} />
      }
      case 'POST': {
        return <SharePost typeID={typeID as string} />
      }
      case 'PROFILE': {
        return <ShareProfile typeID={typeID as string} />
      }
      default: {
        return <Box width='100%' height='100%'></Box>
      }
    }
  }, [type])

  return (
    <Box width={'100%'} height={'100%'}>
      {handleType()}
    </Box>
  )
}

export default Share