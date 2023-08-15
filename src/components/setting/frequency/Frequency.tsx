import styled from "@emotion/styled"
import { MenuItem, Select } from "@mui/material"

const Container = styled.div`
    display:flex;
    
`

export default function Frequency() {
    return (
        <Container>
            <h1>주파수</h1>
            <Select label="주파수" fullWidth>
                <MenuItem>a</MenuItem>
                <MenuItem>c</MenuItem>
                <MenuItem>b</MenuItem>
            </Select>
        </Container>
    )
}  