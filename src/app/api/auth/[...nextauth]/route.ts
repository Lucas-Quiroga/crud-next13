import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "Write you email"},
                password: {label: "Password", type: "password", placeholder: "*********"}
            },
            async authorize(credentials, req){
                const user = {id: "1", fullname: "J Smith", email: "john@gmail.com"}

                return user
            }
        })
    ]
})

export {handler as GET, handler as POST}