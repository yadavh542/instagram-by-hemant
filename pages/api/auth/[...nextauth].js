import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: '2.0',
      }),
    
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    // ...add more providers here
  ],

  // theme:{
  //   logo:'',
  //   brandColor:'#F13207',
  //   colorScheme:'auto',
  // }

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
  callbacks: {
    async session({session, token,user}){
      session.user.username = session.user.name
      .split(" ")
      .join("")
      .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    }
  }
})