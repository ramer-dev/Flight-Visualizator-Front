import styled from "@emotion/styled"
import { MenuItem, Select } from "@mui/material"

const Container = styled.div`
    display:flex;
    
`

export default function Site() {
    return (
        <Container>
            <h1>표지소</h1>
            <Select label="표지소" fullWidth>
                <MenuItem>a</MenuItem>
                <MenuItem>c</MenuItem>
                <MenuItem>b</MenuItem>
            </Select>
        </Container>
    )
}  