'use client'

import { theme } from '@/theme';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode,
  session: Session | null
}

export function Providers({
  children,
  session
}: {
  children: React.ReactNode,
  session: Session | null
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider theme={theme}>  
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}