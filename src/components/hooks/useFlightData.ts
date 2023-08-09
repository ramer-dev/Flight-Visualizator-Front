import { useQuery } from "@tanstack/react-query";
import { getEntireFlightData, getFlightData } from "common/service/flightService";

export function useFlightData(id: number, all?: boolean, skip?: number, take?: number) {
    return useQuery(['flightData'], async () => getFlightData(id), /*{ suspense: true }*/)

}

export function useEntireFlightData(skip: number, take: number) {
    return useQuery(['flightData'], async () => getEntireFlightData(take, skip))
}