import * as trpc from '@trpc/server';
import { Context } from '../context';

const t = trpc.initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
