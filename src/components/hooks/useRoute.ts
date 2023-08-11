import { useQuery } from '@tanstack/react-query'
import { getRoute } from 'common/service/routeService';
import { RouteType } from 'common/type/RouteType';

export function useGetRoute() {
    const fallback: RouteType[] = []
    const { data = fallback, ...args } = useQuery<RouteType[]>(['route'], async () => getRoute(), /*{ suspense: true }*/)
    return { data, ...args }
}
