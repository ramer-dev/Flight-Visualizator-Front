import { NavBarType, SubPageType } from "common/type/NavBarType";
import { atom } from "recoil";

export const page = atom<NavBarType>({
    key: 'page',
    default: null
})

export const fold = atom<boolean>({
    key:'fold',
    default:false
})

export const subPage = atom<SubPageType>({
    key: 'subpage',
}) 