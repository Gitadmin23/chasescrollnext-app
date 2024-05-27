'use client'

import { theme, darkTheme } from '@/theme';
import { CacheProvider } from '@chakra-ui/next-js'
import {ChakraProvider, ColorModeScript, useColorMode} from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth';
import {useUtilState} from "@/global-state/useUtilState";

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
    const { isDarkMode } = useUtilState((state) => state);
    const { colorMode, toggleColorMode } = useColorMode();

    return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}