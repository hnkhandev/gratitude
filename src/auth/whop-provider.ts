type Profile = {
  id: string;
  username: string;
  email: string;
  profile_pic_url: string;
};

export function WhopProvider({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  return {
    id: "whop",
    name: "Whop",
    type: "oauth" as const,
    authorization: "https://whop.com/oauth",
    token: "https://api.whop.com/api/v2/oauth/token",
    userinfo: "https://api.whop.com/api/v2/oauth/user",
    clientId,
    clientSecret,
    allowDangerousEmailAccountLinking: true,
    // Setting 'checks' to 'none' is NOT the recommended security practice for OAuth flows.
    // This is done solely for educational demonstration and due to unique deep linking requirements with Whop's platform.
    // It's important to note that this makes the OAuth flow more susceptible to CSRF attacks.
    // For any real-world application, I would strongly recommend using the traditional OAuth flow with all security checks enabled, rather than this deep linking approach.
    // This is a temporary measure, and I am looking into more secure ways to achieve the same functionality for educational purposes.
    checks: ["none"] as any,
    profile(profile: Profile) {
      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.profile_pic_url,
      };
    },
  };
}
