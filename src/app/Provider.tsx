'use client'

import { theme } from '@/theme';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider theme={theme}>  
          {children}
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}