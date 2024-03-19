import { generateToken } from "@/utils/generateToken";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import typia from "typia";
import { TRPCContext, publicProcedure, router } from "./trpc";

const users = [
  { username: "user1", password: "User.1" },
  { username: "user2", password: "User.2" },
];

export const authRouter = router({
  authenticate: publicProcedure
    .input(typia.createAssertEquals<{ username: string; password: string }>())
    .mutation(async ({ input }) => {
      const user = users.find(({ username, password }) => {
        return username == input.username && password == input.password;
      });

      if (!user)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User name or password is wrong!",
        });

      const token = generateToken({ username: user.username });

      cookies().set("JWT", token, { path: "/", sameSite: "strict" });

      return { token };
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    if (!ctx.userData) throw new TRPCError({ code: "UNAUTHORIZED" });
    cookies().delete("JWT");
  }),
});

export function authorize(ctx: TRPCContext) {
  const user = ctx.userData;

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
  }
}
