import { useQuery } from '@tanstack/react-query'
import { getNotice } from 'common/service/noticeService'
import { NoticeContentType } from "common/type/NoticeType";

export function useGetNotice() {
  const fallback : NoticeContentType[] = []
  return useQuery(['notice'], async () => getNotice(), /*{ suspense: true }*/)
}
