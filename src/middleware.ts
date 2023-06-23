import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
    matcher: ["/((?!.*\\..*|_next|home).*)", "/", "/(api|trpc)(.*)"],
};
