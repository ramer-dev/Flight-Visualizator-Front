import { FlightList } from "common/type/FlightType";

export function EmptyData(pageSize: number) : FlightList{
    return {
        id: 0,
        testName: "",
        testDate: "",
        testType: "",
        userId: "",
        data: {
            pageSize: pageSize,
            totalCount: 0,
            totalPage: 0,
            items: []
        }
    }
}