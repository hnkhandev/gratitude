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
    checks: ["none"],
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
