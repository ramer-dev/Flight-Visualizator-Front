export type SettingState = "frequency" | "route" | "fixPoint" | "site" | "sector" | "area" | null

export interface SettingStateType {
    current: SettingState;
    data : any;
}   