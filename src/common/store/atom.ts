import { FlightResultService } from "common/service/flightService";
import { FlightList } from "common/type/FlightType";
import { ContentType, ContentViewType, NavBarType } from "common/type/NavBarType";
import { Site } from "common/type/SiteType";
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
    key:'flightDataID',
    default: 0
})

export const flightResultData = selector<FlightList>({
    key: 'flightData',
    get: async ({get}) => {
        const id = get(flightResultDataID);
        const response = await FlightResultService.getData(id)
        return response;
    }
})

export const siteState = atom<Site[]>({
    key:'siteState',
    default:[]
    
})


export const markingSelectCursor = atom({
    key:'markingSelectCursor',
    default:{selection : false, coordinate: {lat:36.0, lng:128.09}}
}) 