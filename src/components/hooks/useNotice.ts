import { useQuery } from '@tanstack/react-query'
import { getNotice } from 'common/service/noticeService'
import { NoticeContentType } from "common/type/NoticeType";

export function useGetNotice() {
  const fallback : NoticeContentType[] = []
  const {data = fallback, ...args } = useQuery(['notice'], async () => getNotice(), {staleTime:1000 * 60 * 60})
  return {data, ...args}
}
