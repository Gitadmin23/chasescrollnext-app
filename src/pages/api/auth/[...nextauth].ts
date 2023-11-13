import NextAuth, { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getSession } from 'next-auth/react'

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: '126010586447-56kd8nikghvd4348b6uh04lpbhrq5rbt.apps.googleusercontent.com',
            clientSecret: 'I_nY6PbHlj3lflJFq-EtvbAX',
            idToken: true,
        })
    ],
    // pages: {
    //     signIn: '/auth'
    // },
    callbacks: {
    //    async session({ token, user, session }) {
    //     console.log(token);
    //     console.log(session);
    //     return {
    //         ...token,
    //         ...user,
    //     } as any
    //    },
    //     async redirect({url, baseUrl}) {
    //         console.log(`URL - ${url}`);
    //         console.log(`BASE - ${baseUrl}`);
    //         return url.startsWith(baseUrl) ? url:baseUrl
    //     },
    //     async jwt({token, user}) {
    //         if (user) {
    //             console.log(user);
    //           token.idToken = (user as User).id

    //         }
    //         return token;
    //       },
    }
}

export default NextAuth(authOptions);