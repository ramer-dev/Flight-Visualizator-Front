import styled from "@emotion/styled"
import { MenuItem, Select } from "@mui/material"

const Container = styled.div`
    display:flex;
    
`

export default function Route() {
    return (
        <Container>
            <h1>항로</h1>
            <Select label="항로" fullWidth>
                <MenuItem>a</MenuItem>
                <MenuItem>c</MenuItem>
                <MenuItem>b</MenuItem>
            </Select>
        </Container>
    )
}  