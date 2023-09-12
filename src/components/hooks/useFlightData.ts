import { useQuery } from "@tanstack/react-query";
import { getEntireFlightData, getFlightData } from "common/service/flightService";
import { FlightList } from "common/type/FlightType";

const delayedFetch = async (cb : Promise<FlightList>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return await cb
}

export function useFlightData(take?: number, skip?: number, id?: number,) {
    return useQuery<FlightList>(['flightData' + id], async () => await delayedFetch(await getFlightData(take, skip, id)), {staleTime:1000 * 60 * 10})

}

export function useEntireFlightData(skip: number, take: number) {
    return useQuery(['flightData'], async () => getEntireFlightData(take, skip))
}