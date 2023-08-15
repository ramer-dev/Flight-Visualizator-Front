import styled from "@emotion/styled"
import { MenuItem, Select } from "@mui/material"

const Container = styled.div`
    display:flex;
    
`

export default function Area() {
    return (
        <Container>
            <h1>구역</h1>
            <Select label="구역" fullWidth>
                <MenuItem>a</MenuItem>
                <MenuItem>c</MenuItem>
                <MenuItem>b</MenuItem>
            </Select>
        </Container>
    )
}  