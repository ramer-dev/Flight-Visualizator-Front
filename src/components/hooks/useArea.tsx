import { useQuery } from '@tanstack/react-query'
import { getEntireArea } from 'common/service/areaService';
import { Area } from 'common/type/AreaType';

export function useGetArea() {
    const fallback: Area[] = []
    const { data = fallback, ...args } = useQuery<Area[]>(['area'], async () => getEntireArea())
    return { data, ...args }
}
