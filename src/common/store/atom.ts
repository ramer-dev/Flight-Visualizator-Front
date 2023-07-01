import { ContentType, ContentViewType, NavBarType } from "common/type/NavBarType";
import { atom } from "recoil";

export const page = atom<NavBarType>({
    key: 'page',
    default: null
})

export const contentFormat = atom<ContentType>({
    key: 'content',
    default:null,
})

export const contentViewFormat = atom<ContentViewType>({
    key:'contentView',
    default:'NONE'
})

export const globalMap = atom<L.Map>({
    key:'map',
})