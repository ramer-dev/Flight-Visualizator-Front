export interface NoticeContentType {
  id?: number,
  title: string,
  context: string,
  type: string,
  date: string,
  user?: string,
  version?: string,
}

export interface NoticeContextType {
  refresh: () => void,
  delete: (id:number) => void,
  openModal: () => void,
  closeModal: () => void,
  id?:React.MutableRefObject<number>,
  changeID:(i:number) => void
}