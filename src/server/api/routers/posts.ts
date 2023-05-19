import { User, clerkClient } from "@clerk/nextjs/dist/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { filterUser } from "../helpers/filterUser";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 10,
      orderBy: [{ createdAt: "desc" }],
    });

    const postsAuthors = posts.map((post) => post.authorId);

    const users = await clerkClient.users.getUserList({
      userId: postsAuthors,
      limit: 10,
    });

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

  createPost: privateProcedure
    .input(
      z.object({
        content: z.string().min(1, "Please enter post content."),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });

      return post;
    }),
});
