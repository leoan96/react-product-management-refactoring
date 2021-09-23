import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        if (
          credentials.username !== "lizard" ||
          credentials.password !== "123"
        ) {
          throw new Error("Wrong username or password!");
        }
        return { username: credentials.username, message: "Success" };
      },
    }),
  ],
});
