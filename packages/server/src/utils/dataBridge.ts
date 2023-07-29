import type { ClientMeteor, NasaMeteor } from "../types";

export function extractYearFromISOString(isoString: string | undefined): number | null {
  if (!isoString) return null;
  return isoString.slice(0, 4) ? parseInt(isoString.slice(0, 4), 10) : null;
}

export function mapNasaMeteorToClientMeteor(meteor: NasaMeteor): ClientMeteor {
  const clientAstroid: ClientMeteor = {
    name: meteor.name,
    id: parseInt(meteor.id, 10),
    mass: meteor.mass ? parseFloat(meteor.mass) : null,
    year: meteor.year ? new Date(meteor.year).getFullYear() : null,
  };
  return clientAstroid;
}
