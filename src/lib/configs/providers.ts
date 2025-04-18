import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
			clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
		}),
	],
} satisfies NextAuthConfig;
