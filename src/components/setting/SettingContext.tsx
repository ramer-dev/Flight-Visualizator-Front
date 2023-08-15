import React from "react";
import { SettingStateType } from "./SettingStateType";

export const SettingContext = React.createContext<SettingStateType>({current:null});