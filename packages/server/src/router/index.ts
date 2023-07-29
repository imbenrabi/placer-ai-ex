import { router } from "../utils";
import { meteorsRouter } from "./routers";

export const appRouter = router({
  meteors: meteorsRouter
})

export type AppRouter = typeof appRouter;
