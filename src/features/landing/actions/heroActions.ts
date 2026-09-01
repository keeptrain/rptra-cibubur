"use server";

import { unstable_cache } from "next/cache";
import { getHeroActivitiesData } from "./service";

export async function getHeroActivities() {
  return unstable_cache(
    async () => getHeroActivitiesData(),
    ["heroActivities"],
    { revalidate: 60 },
  )();
}
