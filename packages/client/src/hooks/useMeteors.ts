import { useState, useEffect, ChangeEvent } from "react";
import { useTrpcServer } from "./useTrpcServer";
import { useDebounce } from "./useDebounce";
import { ClientMeteor } from "../../../server/src/types";
import { fetchMeteors, isNumber } from "../utils";
import { FormElement } from "@nextui-org/react";

const INITIAL_YEAR = 1986 as const;

export const useMeteors = () => {
  const { trpcClient } = useTrpcServer();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showYearChangeNotification, setShowYearChangeNotification] = useState<boolean>(false);
  const [invalidMassThreshold, setInvalidMassThreshold] = useState<boolean>(false);

  const [massThreshold, setMassThreshold] = useState<string | undefined>('1');
  const [meteors, setMeteors] = useState<ClientMeteor[] | undefined>([]);
  const [year, setYear] = useState<number | undefined>(INITIAL_YEAR);

  const debouncedMassThreshold = useDebounce(massThreshold, 500);

  const handleYearChange = (e: ChangeEvent<FormElement>) => {
    setYear(Number(e.target.value));
  }
  const handleMassThresholdChange = (e: ChangeEvent<FormElement>) => {
    if (!isNumber(e.target.value)) {
      setInvalidMassThreshold(true);
      return;
    }
    if (invalidMassThreshold) {
      setInvalidMassThreshold(false)
    }
    setMassThreshold(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const meteorsData = await fetchMeteors({ trpcClient, massThresholdFilter: debouncedMassThreshold, year });
      meteorsData?.meteors && setMeteors(meteorsData.meteors)
      meteorsData?.metadata.year && setYear(meteorsData.metadata.year)
      if (meteorsData?.metadata.year) {
        setShowYearChangeNotification(true);
        setYear(meteorsData.metadata.year);
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
    invalidMassThreshold,
    showYearChangeNotification,
    setShowYearChangeNotification
  }
}
