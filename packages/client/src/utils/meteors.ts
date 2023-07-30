import { createTRPCProxyClient } from "@trpc/client";
import { AppRouter } from "../../../server/src/router";

type TrpcClientType = ReturnType<typeof createTRPCProxyClient<AppRouter>>;

interface BaseFetchMeteorsParams {
  trpcClient: TrpcClientType;
  year: number | undefined;
  massThresholdFilter: string | undefined;
}

const fetchMeteorsByYearAndMass = async ({ trpcClient, massThresholdFilter, year }: BaseFetchMeteorsParams) => {
  const meteorsQueryResponse = await trpcClient.meteors.getMeteorsByYearAndMass.query({
    year,
    massThresholdFilter,
  })
  return meteorsQueryResponse;
}

const fetchEarliestMeteorsByMassThreshold = async ({ trpcClient, massThresholdFilter }: Omit<BaseFetchMeteorsParams, 'year'>) => {
  const earliestMeteorQueryResponse = await trpcClient.meteors.getEarliestMeteorsByMassThreshold.query({
    massThresholdFilter,
  });
  return earliestMeteorQueryResponse;
}

export const fetchMeteors = async ({ trpcClient, massThresholdFilter, year }: BaseFetchMeteorsParams) => {
  const meteorsQueryResponse = await fetchMeteorsByYearAndMass({ trpcClient, massThresholdFilter, year });
  if (meteorsQueryResponse.metadata.resultsCount === 0) {
    const earliestMeteorQueryResponse = await fetchEarliestMeteorsByMassThreshold({ trpcClient, massThresholdFilter });
    if (earliestMeteorQueryResponse.metadata.resultsCount) {
      return { meteors: earliestMeteorQueryResponse.meteors, metadata: earliestMeteorQueryResponse.metadata };
    }
  } else {
    return { meteors: meteorsQueryResponse.meteors, metadata: meteorsQueryResponse.metadata };
  }
}
