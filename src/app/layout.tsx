import type { Metadata } from 'next'
import { Providers } from './Provider'
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GoogleAuthProvider } from '@/utils/GoogleProvider'; 
import LandingLayout from '@/components/landingLayout';

const APP_NAME = "Chasescroll";
const APP_DEFAULT_TITLE = "We build memories";
const APP_TITLE_TEMPLATE = "%s - Chasescroll App";
const APP_DESCRIPTION = "Creating Unforgetable Memories";


export const metadata: Metadata = {
  title: APP_DEFAULT_TITLE,
  description: 'We build memories',
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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-8113MST9DM`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8113MST9DM');
            `,
          }}
        />
        <meta name="viewport" content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      viewport-fit=cover
                      minimum-scale=1.0, maximum-scale=1.0, 
                      user-scalable=no, target-densitydpi=device-dpi"/>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> 
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
