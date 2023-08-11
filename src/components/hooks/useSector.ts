import { useQuery } from "@tanstack/react-query"
import { getSector } from "common/service/sectorService"
import { SectorType } from "common/type/SectorType"

export function useGetSector() {
  const fallback: SectorType[] = []
  const { data = fallback, ...args } = useQuery<SectorType[]>(['sector'], async () => getSector(), { staleTime: 1000 * 60 * 60 })
  return { data, ...args }
}
