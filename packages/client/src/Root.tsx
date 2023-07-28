import React from 'react'
import { useTrpcServer } from './hooks';

export const Root = () => {
  const { trpc } = useTrpcServer();
  const messageQuery = trpc.messages.getMessage.useQuery({ text: 'imbenrabi' });

  return (
    <div>
      <section>Server Data</section>
      {messageQuery.data?.message}
    </div>
  )
}
