import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  authJakob: publicProcedure
    .input(z.object({ password: z.string() }))
    .query(({ input }) => {
      const output = input.password === "cool";
      return {
        pass: output,
      };
    }),
});
