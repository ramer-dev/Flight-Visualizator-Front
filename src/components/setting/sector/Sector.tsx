import styled from "@emotion/styled"
import { MenuItem, Select } from "@mui/material"

const Container = styled.div`
    display:flex;
    
`

export default function Sector() {
    return (
        <Container>
            <h1>섹터</h1>
            <Select label="섹터" fullWidth>
                <MenuItem>a</MenuItem>
                <MenuItem>c</MenuItem>
                <MenuItem>b</MenuItem>
            </Select>
        </Container>
    )
}  