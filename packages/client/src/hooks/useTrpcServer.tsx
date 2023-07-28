import React from "react";
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from "../utils";

const API_SERVER_URL = 'http://localhost:3001/trpc';

export const useTrpcServer = () => {
    const [queryClient] = React.useState(() => new QueryClient());
    const [trpcClient] = React.useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                url: API_SERVER_URL,
                }),
            ],
        }),
    );

    return { trpcClient, queryClient, trpc };
}
