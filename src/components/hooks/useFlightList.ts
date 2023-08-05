import { useQuery } from "@tanstack/react-query";
import { getEntireFlightList, getFlightList } from "common/service/flightService";

export function useEntireFlightList(){
    return useQuery(['flightList'], async () => getEntireFlightList(), /*{ suspense: true }*/)
}

export function useFlightList(id: number){
    return useQuery(['flightList'], async () => getFlightList(id), /*{ suspense: true }*/)
}