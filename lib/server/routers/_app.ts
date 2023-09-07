import { computersRouter } from "./computers";
import { router } from "../trpc";
import { appointmentsRouter } from "./appointments";

export const appRouter = router({
  computers: computersRouter,
  appointments: appointmentsRouter,
});

export type AppRouter = typeof appRouter;
