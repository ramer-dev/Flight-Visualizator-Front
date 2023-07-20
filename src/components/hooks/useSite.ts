import { useQuery } from '@tanstack/react-query'
import { SiteType } from 'common/type/SiteType';
import SiteService from 'common/service/siteService';

export function useGetSite() {
  const fallback : SiteType[] = []
  return useQuery<SiteType[]>(['site'], async () => SiteService.getSite(), /*{ suspense: true }*/)
}
