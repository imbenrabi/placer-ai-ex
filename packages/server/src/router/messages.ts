import { z } from "zod";
import { publicProcedure, router } from "../utils";

export const messagesRouter = router({
  getMessage: publicProcedure.input(z.object({ text: z.string().nullish() }).nullish()).query(
    (opts) => ({ message: opts?.input?.text ? `Hello ${opts?.input?.text}` : 'Hello from server!' })
  )
});
