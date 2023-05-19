import { User } from "@clerk/nextjs/dist/server";

export const filterUser = (user: User) => {
  if (!user.username) {
    throw new Error("No username");
  }

  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
