import { useQuery } from '@tanstack/react-query'
import { getNotice } from 'common/service/noticeService'
import { NoticeContext } from "common/type/NoticeType";

export function useGetNotice(): NoticeContext[] {
  const fallback : NoticeContext[] = []
  const { data = fallback } = useQuery(['notice'], async () => getNotice(), /*{ suspense: true }*/)
  return data
}
