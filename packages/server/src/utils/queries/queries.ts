import { MeteorsDataCollection } from "../../database";
import { ClientMeteor } from "../../types";
import { extractYearFromISOString, mapNasaMeteorToClientMeteor } from "../dataBridge";

type QueyMeteorsByYearAndMassParams = {
  year: number | null | undefined,
  massThreshold: string | null | undefined, 
}

type FilterMeteorsByMassThresholdAtEarliestYearParams = {
  massThreshold?: string | null,
}

export function queryMeteorsByYearAndMass({ year, massThreshold }: QueyMeteorsByYearAndMassParams): Array<ClientMeteor> {
  const filteredMeteors = !year && !massThreshold ? MeteorsDataCollection : MeteorsDataCollection.filter(
    (meteor) => {
      const meteorYear = extractYearFromISOString(meteor.year);
      if (meteorYear === year) {
        if (!massThreshold) {
          return true;
        } else if (meteor.mass && !isNaN(parseInt(meteor.mass))) {
          return parseInt(meteor.mass) > parseInt(massThreshold);
        }
      }
      return false;
    }
  )
  return filteredMeteors.map(mapNasaMeteorToClientMeteor);
}

export function filterMeteorsByMassThresholdAtEarliestYear(
  { massThreshold }: FilterMeteorsByMassThresholdAtEarliestYearParams
): Array<ClientMeteor> {
  if (!massThreshold) {
    return [];
  }
  const filteredMeteors =  filterMeteorsByMass(MeteorsDataCollection, massThreshold);
  const earliestYear = findEarliestYear(filteredMeteors);

  if (earliestYear) {
    return filteredMeteors.filter((entity) => extractYearFromISOString(entity.year) === earliestYear).map(mapNasaMeteorToClientMeteor);
  } else {
    return [];
  }
}

function filterMeteorsByMass(meteors: typeof MeteorsDataCollection, massThreshold: string) {
  return meteors.filter((meteor) => meteor.mass && !isNaN(parseInt(meteor.mass)) && !isNaN(parseInt(massThreshold)) && parseInt(meteor.mass) > parseInt(massThreshold)) 
}

function findEarliestYear(meteors: typeof MeteorsDataCollection): number | undefined {
  let earliestYear: number | undefined;
  for (const meteor of meteors) {
    const meteorYear = extractYearFromISOString(meteor.year);
    if (meteorYear) {
      if (earliestYear === undefined || meteorYear < earliestYear) {
        earliestYear = meteorYear;
      }
    }
  }
  return earliestYear;
}
