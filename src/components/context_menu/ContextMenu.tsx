import React from 'react'
import styled from '@emotion/styled'
import { LatLng, LatLngExpression } from 'leaflet'
import { Divider } from '@mui/material'

const Container = styled.div`
    width:200px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Menu = styled.div`
    margin:5px;
    width:100%;
    div:first-of-type {
        border-radius:5px 5px 0 0;
    }

    div:last-of-type {
        border-radius:0 0 5px 5px;
    }
`

const MenuItem = styled.div`
    &:hover {
        background-color: #ececec;
    }
    &:first-of-type {
        border-radius: 5px 0 0 5px;
    }
    width:100%;
    text-align:center;
    padding:5px;
`

const CoordinateView = styled.div`
    display:flex;
    color:#444;
    margin:10px;
    
`

type WrapperProps = {
    children: React.ReactNode;
    startPosition: LatLng;
}

function ContextMenu(prop: WrapperProps) {
    return (
        <Container>
            <CoordinateView>
                {prop.startPosition.lat.toFixed(8)} | {prop.startPosition.lng.toFixed(8)}
            </CoordinateView>
            <Divider sx={{ width: '100%' }} />
            <Menu>
                <MenuItem onClick={() => { console.log(prop.startPosition) }}>
                    좌표
                </MenuItem>
                <MenuItem>
                    분석
                </MenuItem>
            </Menu>

        </Container>
    )
}

export default ContextMenu