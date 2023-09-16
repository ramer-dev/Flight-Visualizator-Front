import { useQuery } from "@tanstack/react-query"
import { getEntireFrequency } from "common/service/frequencyService"
import { FrequencyType } from "common/type/FrequencyType"

export function useGetFrequency() {
    const fallback : FrequencyType[] = []
    const {data = fallback, ...args} = useQuery<FrequencyType[]>(['frequency'], async () => getEntireFrequency(), {staleTime:1000* 60 * 60})
    return {data, ...args}
  }
  