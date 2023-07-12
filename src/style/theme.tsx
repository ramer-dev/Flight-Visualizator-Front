import {createTheme} from "@mui/material/styles"
import { fontWeight } from "@mui/system"

export const theme = createTheme({
    palette: {
        primary:{
            main: "#5096FF"
        },
        info: {
            main: "#FFF"
        }
    },
    typography:{
        fontFamily:"Pretendard",
        fontWeightBold:700,
        fontWeightLight:200,
        fontWeightMedium:400,
        fontWeightRegular:600,
    }
})