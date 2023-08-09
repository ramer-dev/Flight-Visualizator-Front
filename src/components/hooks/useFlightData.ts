import { useQuery } from "@tanstack/react-query";
import { getEntireFlightData, getFlightData } from "common/service/flightService";
import { FlightList } from "common/type/FlightType";

export function useFlightData(take?: number, skip?: number, id?: number,) {
    return useQuery<FlightList>(['flightData'], async () => getFlightData(take, skip, id), /*{ suspense: true }*/)

}

export function useEntireFlightData(skip: number, take: number) {
    return useQuery(['flightData'], async () => getEntireFlightData(take, skip))
}