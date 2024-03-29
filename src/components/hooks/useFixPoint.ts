import { useQuery } from "@tanstack/react-query"
import { getFixPoint } from "common/service/pointService"
import { FixPointType } from "common/type/FixPointType"

export function useGetPoint() {
  const fallback: FixPointType[] = []
  const { data = fallback, ...args } = useQuery<FixPointType[]>(['point'], async () => getFixPoint())
  return { data, ...args }
}
