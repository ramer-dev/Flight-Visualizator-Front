import { useQuery } from '@tanstack/react-query'
import { SiteType } from 'common/type/SiteType';
import SiteService from 'common/service/siteService';

export function useGetSite() {
  const fallback : SiteType[] = [{siteName:'임시', siteCoordinate:{lat:36, lng:128}, siteType:"VORTAC", siteId:-1}]
  const {data = fallback, ...args} = useQuery<SiteType[]>(['site'], async () => SiteService.getSite(), /*{ suspense: true }*/)
  return {data, ...args}
}
