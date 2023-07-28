import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Root } from './Root';
import { useTrpcServer } from './hooks';

export const App = () => {
  const { trpcClient, queryClient, trpc } = useTrpcServer();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
