import NextAuth from "next-auth";

declare module "next-auth" {
	interface User {
		accessToken: string;
		email: string;
		uid: string;
	}
}
