import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../server/src/router';

const API_SERVER_URL = 'http://localhost:3001/trpc';

export const useTrpcServer = () => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: API_SERVER_URL,
      }),
    ],
  });
  return { trpcClient: client }
}
