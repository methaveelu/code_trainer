import NextAuth from 'next-auth';
import  GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if(!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error ('missing Google OAUTH credentials')
}

export const {handlers:{GET,POST}, auth, signOut, signIn} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        })
    ],
    callbacks:{
        async session({session, user}:any){
            if(session && user){
                session.user.id = user.id;
            }
            return session;
        }
    }
})
