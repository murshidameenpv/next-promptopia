import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import userDb from "@models/userModel";
const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await userDb.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
      async signIn({ profile }) {
        // console.log(profile,"oooooooooooooooooooooooooooooooooo");
      //every next js route is serverless
      //ie this is a lambda function which only opens up when it gets called only
      //ie, every time it is calles makes a connection to database
      // we dont have to run server constantly
      try {
        await connectToDb();
        //check if a user already exists
        const userExists = await userDb.findOne({ email: profile.email });

        //if not ,create a user and save to the database
        if (!userExists) {
          await userDb.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };


// console.log({
//             clientId:process.env.GOOGLE_ID,
//             clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//         })