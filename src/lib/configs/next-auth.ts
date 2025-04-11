import NextAuth from "next-auth";
import providers from "@/lib/configs/providers";
import axiosAuth from "@/lib/configs/axiosAuth";

const logInWithGoogle = async (credentials: object) => {
	try {
		const { data } = await axiosAuth.post("/auth/google", credentials);
		return data;
	} catch (error) {
		return null;
	}
};

export const { handlers } = NextAuth({
	callbacks: {
		async jwt({ token, user }) {
			// 2. passing data from user to token
			if (user) {
				token.accessToken = user.accessToken;
				token.email = user.email;
				token.uid = user.uid;
			}
			return token;
		},

		async session({ session, token }) {
			// 3. passing data from token to session.user
			session.user.accessToken = token.accessToken as string;
			session.user.email = token.email as string;
			session.user.uid = token.uid as string;
			delete session.user.image;
			delete session.user.name;
			return session;
		},
		async signIn({ account, profile, user }) {
			// 1. if logged in with google, then storing data to user
			if (account?.provider === "google") {
				const data = await logInWithGoogle({
					email: profile?.email,
					image: profile?.picture,
					name: profile?.name,
				});

				if (data) {
					user.accessToken = data.accessToken;
					user.email = data.email;
					user.uid = data.uid;
				}
			}

			return true;
		},
	},
	debug: false,
	logger: { debug: () => {}, error: () => {}, warn: () => {} },
	...providers,
	session: { strategy: "jwt" },
});
