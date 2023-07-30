import { useState, useEffect, ChangeEvent } from "react";
import { useTrpcServer } from "./useTrpcServer";
import { useDebounce } from "./useDebounce";
import { ClientMeteor } from "../../../server/src/types";
import { fetchMeteors } from "../utils";

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
      const meteorsData = await fetchMeteors({ trpcClient, massThresholdFilter: debouncedMassThreshold, year });
      meteorsData?.meteors && setMeteors(meteorsData.meteors)
      meteorsData?.metadata.year && setYear(meteorsData.metadata.year)
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
