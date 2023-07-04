import { ControlOptions } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react'
import { useMap } from 'react-leaflet'
import { ReactComponent as ICPlus } from 'atom/icon/icon_plus.svg';
import { ReactComponent as ICMinus } from 'atom/icon/icon_minus.svg';
import styled from '@emotion/styled';
import L from 'leaflet';

const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-right leaflet-bottom',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right'
}

type StyleProp = {
    zoom: number;
}

function CustomZoomControl({ position, zoom }: ControlOptions & StyleProp) {
    const map = useMap();
    const containerRef = useRef<HTMLDivElement>(null);
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    useEffect(() => {
        if (containerRef.current) {
            L.DomEvent.disableClickPropagation(containerRef.current);
            L.DomEvent.disableScrollPropagation(containerRef.current);
        }
    }, [containerRef.current])

    const Container = styled.div`
        margin-bottom:15px;
    `

    const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #FFF;
        z-index:1200;
    `

    const BarWrapper = styled.div`
        height:150px;
        width:20px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    `

    const EnabledBar = styled.div`
        background: #5096ff;
        height:${(props: StyleProp) => ((props.zoom - 4) / 7) * 100 + '%'};
        width:7px;
        cursor:pointer;
    `
    const DisabledBar = styled.div`
        width:7px;
        height:${(props: StyleProp) => ((11 - props.zoom) / 7) * 100 + '%'};
        background: #D9D9D9;
        cursor:pointer;
    `
    const IconWrapper = styled.div`
        padding:5px 10px;
        cursor:pointer;
    `

    const Handler = styled.div`
        width: 20px;
        height: 8px; 
        border-radius: 2px;
        border: 1px solid #3C3C3C;
        background: #FFF;
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
        cursor:pointer;
    `

    const zoomIn = (e:any) => {
        e.stopPropagation();
        map.zoomIn();
    } 

    const zoomOut = (e:any) => {
        e.stopPropagation();
        map.zoomOut();
    } 

    return (
        <Container ref={containerRef} className={positionClass}>
            <Wrapper className="leaflet-control leaflet-bar">
                <IconWrapper onClick={zoomIn}>
                    <ICPlus />
                </IconWrapper>
                <BarWrapper>
                    <DisabledBar zoom={zoom} />
                    <Handler/>
                    <EnabledBar zoom={zoom} />
                </BarWrapper>
                <IconWrapper onClick={zoomOut}>
                    <ICMinus />
                </IconWrapper>
            </Wrapper>
        </Container>
    )
}

export default CustomZoomControl