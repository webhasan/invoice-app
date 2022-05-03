import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";

const apiEndPoint = `${process.env.apiEndPoint}/login`;

export default NextAuth({
    secret: '21bb9299bca52610191959695cc7c787',

    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, //session expired in 2 hours
    },

    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            (session as any).user = token.user
            return session
        }
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email Address" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch(apiEndPoint, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                if (res.ok) {
                    const user = await res.json();
                    if(user) {
                        return user // username email
                    }
                }else {
                    throw new Error(await res.text());
                }

                return null;
            }
        })
    ],
});