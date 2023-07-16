import { useQuery } from '@tanstack/react-query'
import { getNotice } from 'common/service/noticeService'
import { NoticeContentType } from "common/type/NoticeType";

export function useGetNotice(): NoticeContentType[] {
  const fallback : NoticeContentType[] = []
  const { data = fallback } = useQuery(['notice'], async () => getNotice(), /*{ suspense: true }*/)
  return data
}
