import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
