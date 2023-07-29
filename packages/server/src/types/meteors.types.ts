import { MeteorsDataCollection } from "../database";

export type NasaMeteor = typeof MeteorsDataCollection[number];

export interface ClientMeteor {
  name: string;
  id: number;
  mass: number | null;
  year: number | null;
}
