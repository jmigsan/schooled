import { User } from "@clerk/nextjs/dist/server";

export const filterUser = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
