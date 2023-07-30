import { z } from "zod";
import { filterMeteorsByMassThresholdAtEarliestYear, publicProcedure, queryMeteorsByYearAndMass, router } from "../../utils";

const GetMeteorsRequestParams = z.object({ year: z.number().nullish(), massThresholdFilter: z.string().nullish() });
const GetEarliestMeteorsByMassThresholdRequestParams = z.object({ massThresholdFilter: z.string().nullish() });

export const meteorsRouter = router({
  getMeteorsByYearAndMass: publicProcedure.input(GetMeteorsRequestParams).query(
    ({ input }) => {
      const meteors = queryMeteorsByYearAndMass({ year: input?.year, massThreshold: input?.massThresholdFilter })
      return ({ meteors, metadata: { resultsCount: meteors.length } })
    }
  ),
  getEarliestMeteorsByMassThreshold: publicProcedure.input(GetEarliestMeteorsByMassThresholdRequestParams).query(
    ({ input }) => {
      const meteors = filterMeteorsByMassThresholdAtEarliestYear({ massThreshold: input.massThresholdFilter })
      return ({ meteors, metadata: { resultsCount: meteors.length } })
    }
  )
});
