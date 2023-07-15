export interface NoticeContext {
  id: number,
  title: string,
  context: string,
  type: string,
  date: string,
  user?: string,
  version? : string,
}