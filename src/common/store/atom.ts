// import { FlightResultService } from "common/service/flightService";
import { getFlightData } from "common/service/flightService";
import { FlightList } from "common/type/FlightType";
import { ContentType, ContentViewType, NavBarType } from "common/type/NavBarType";
import { NoticeContentType } from "common/type/NoticeType";
import { SiteType } from "common/type/SiteType";
import { MarkingCardProps } from "components/marking/MarkingCard";
import { atom, selector } from "recoil";

export const page = atom<NavBarType>({
    key: 'page',
    default: null
})

export const contentFormat = atom<ContentType>({
    key: 'content',
    default: null,
})

export const contentViewFormat = atom<ContentViewType>({
    key: 'contentView',
    default: 'NONE'
})

export const globalMap = atom<L.Map>({
    key: 'map',
})

export const flightResultDataID = atom({
    key: 'flightDataID',
    default: 0
})

export const flightResultData = selector<FlightList>({
    key: 'flightData',
    get: async ({ get }) => {
        const id = get(flightResultDataID);
        const response = await getFlightData(id)
        return response;
    }
})

export const siteState = atom<SiteType[]>({
    key: 'siteState',
    default: []

})

export const markingSelectCursor = atom({
    key: 'markingSelectCursor',
    default: { selection: false, coordinate: { lat: 36.0, lng: 128.09 } }
})

export const editingNoticeContent = atom<NoticeContentType>({
    key: 'editingNoticeContent',
    default: { id: -1, type: '', title: '', date: '', context: '' }
})

export const markingCards = atom<MarkingCardProps[]>({
    key: 'markingCards',
    default: []
})