import { useQuery } from "@tanstack/react-query";
import { getFlightData } from "common/service/flightService";

export function useFlightData(id: number){
    return useQuery(['flightData'], async () => getFlightData(id), /*{ suspense: true }*/)
}