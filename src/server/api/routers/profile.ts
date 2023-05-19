import { clerkClient } from "@clerk/nextjs/dist/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUser } from "../helpers/filterUser";

export const profileRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.id);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found matching that ID",
        });
      }

      const filteredUser = filterUser(user);
      return filteredUser;
    }),
});
