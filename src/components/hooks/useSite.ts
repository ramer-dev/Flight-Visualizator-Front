import { useQuery } from '@tanstack/react-query'
import { SiteType } from 'common/type/SiteType';
import {getSite} from 'common/service/siteService';

export function useGetSite() {
  const fallback: SiteType[] = [{ siteName: '임시', siteCoordinate: { lat: 36, lng: 128 }, siteType: "VORTAC", siteId: -1 }]
  const { data = fallback, ...args } = useQuery<SiteType[]>(['site'], async () => getSite(), { staleTime: 1000 * 60 * 60 })
  return { data, ...args }
}
