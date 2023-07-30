import { useState, useEffect, ChangeEvent } from "react";
import { useTrpcServer } from "./useTrpcServer";
import { useDebounce } from "./useDebounce";
import { ClientMeteor } from "../../../server/src/types";

const INITIAL_YEAR = 1986 as const;

export const useMeteors = () => {
  const { trpcClient } = useTrpcServer();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [massThreshold, setMassThreshold] = useState<string | undefined>('0');
  const [meteors, setMeteors] = useState<ClientMeteor[] | undefined>([]);
  const [year, setYear] = useState<number | undefined>(INITIAL_YEAR);

  const debouncedMassThreshold = useDebounce(massThreshold, 500);

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value));
  }
  const handleMassThresholdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMassThreshold(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const meteorsQuery = await trpcClient.meteors.getMeteorsByYearAndMass.query({
        year,
        massThresholdFilter: debouncedMassThreshold,
      })
      if (meteorsQuery.metadata.resultsCount === 0) {
        const earliestMeteorsQuery = await trpcClient.meteors.getEarliestMeteorsByMassThreshold.query({
          massThresholdFilter: debouncedMassThreshold,
        });
        if (earliestMeteorsQuery.metadata.resultsCount) {
          setMeteors(earliestMeteorsQuery.meteors);
        }
      } else {
        setMeteors(meteorsQuery.meteors);
      }

    })()
    setIsLoading(false);
  }, [debouncedMassThreshold, year])

  return {
    isLoading,
    handleYearChange,
    handleMassThresholdChange,
    meteors,
    year,
    massThreshold,
  }
}
