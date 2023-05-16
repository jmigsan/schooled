import { authMiddleware } from "@clerk/nextjs";

// huh. this works.
const myMiddleware = () => {
  // console.log("does this work?");
  return authMiddleware();
};
export default myMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
