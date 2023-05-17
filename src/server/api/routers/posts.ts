import { User, clerkClient } from "@clerk/nextjs/dist/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 10,
    });

    const postsAuthors = posts.map((post) => post.authorId);

    const users = await clerkClient.users.getUserList({
      userId: postsAuthors,
      limit: 10,
    });

    const filterUser = (user: User) => {
      return {
        id: user.id,
        email: user.emailAddresses,
        profileImageUrl: user.profileImageUrl,
      };
    };

    const usersFiltered = users.map(filterUser);

    const arrayWithPostsAndAuthorInfo = posts.map((post) => {
      const author = usersFiltered.find((user) => user.id === post.authorId);

      if (!author) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No author found",
        });
      }

      return {
        post,
        author,
      };
    });

    return arrayWithPostsAndAuthorInfo;
  }),
});
