import React from 'react'
import { useTrpcServer } from './hooks';

export const Root = () => {
  const { trpc } = useTrpcServer();
  const meterosQuery = trpc.meteors.getMeteorsByYearAndMass.useQuery({});

  return (
    <div>
      <section>Meteors</section>
      {meterosQuery.data?.meteors[0]?.name}
    </div>
  )
}
