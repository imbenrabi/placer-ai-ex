import { useState, useEffect, ChangeEvent } from "react";
import { useTrpcServer } from "./useTrpcServer";
import { useDebounce } from "./useDebounce";
import { ClientMeteor } from "../../../server/src/types";
import { fetchMeteors, isNumber } from "../utils";
import { FormElement } from "@nextui-org/react";
import { useBoolean } from "./useBoolean";

const INITIAL_YEAR = 1986 as const;

export const useMeteors = () => {
  const { trpcClient } = useTrpcServer();

  const { value: isLoading, setValueToFalse: setIsLoadingToFalse, setValueToTrue: setIsLoadingToTrue } = useBoolean();
  const { value: showYearChangeNotification, setValueToFalse: setShowYearNotificationToFalse, setValueToTrue: setShowYearNotificationToTrue } = useBoolean();

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
    setIsLoadingToTrue();
    (async () => {
      const meteorsData = await fetchMeteors({ trpcClient, massThresholdFilter: debouncedMassThreshold, year });
      meteorsData?.meteors && setMeteors(meteorsData.meteors)
      meteorsData?.metadata.year && setYear(meteorsData.metadata.year)
      if (meteorsData?.metadata.year) {
        setShowYearNotificationToTrue();
        setYear(meteorsData.metadata.year);
      }
    })()
    setIsLoadingToFalse();
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
    setShowYearNotificationToFalse
  }
}
