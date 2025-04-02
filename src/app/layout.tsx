import type { Metadata } from 'next'
import { Providers } from './Provider'
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GoogleAuthProvider } from '@/utils/GoogleProvider';
import { Flex, Grid, Image, useColorMode } from '@chakra-ui/react';
import LandingLayout from '@/components/landingLayout';

const APP_NAME = "Chasescroll";
const APP_DEFAULT_TITLE = "Creating Unforgetable Memories";
const APP_TITLE_TEMPLATE = "%s - Chasescroll App";
const APP_DESCRIPTION = "Creating Unforgetable Memories";


export const metadata: Metadata = {
  title: APP_DEFAULT_TITLE,
  description: 'Creating Unforgetable Memories',
  manifest: '/manifest.json',
  applicationName: 'Chasescroll'
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    // <Providers>
    (<html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <meta name="viewport" content="minimum-scale=1" />
        <meta name="viewport" content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      viewport-fit=cover
                      minimum-scale=1.0, maximum-scale=1.0, 
                      user-scalable=no, target-densitydpi=device-dpi"/>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"></link>
      </head>
      <body style={{ fontFamily: "Raleway" }}>
        <GoogleAuthProvider>
          <Providers session={session}>
            <LandingLayout >
              {children}
            </LandingLayout>
          </Providers>
        </GoogleAuthProvider>
      </body>
    </html>)
  );
}
