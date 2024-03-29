import L from 'leaflet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ReactComponent as MarkerBlack } from 'atom/icon/marker_black.svg';
import { ReactComponent as MarkerRed } from 'atom/icon/marker_red.svg';
import { ReactComponent as MarkerOrange } from 'atom/icon/marker_orange.svg';
import { ReactComponent as MarkerYellow } from 'atom/icon/marker_yellow.svg';
import { ReactComponent as MarkerGreen } from 'atom/icon/marker_green.svg';
import { ReactComponent as MarkerBlue } from 'atom/icon/marker_blue.svg';

interface Props {
    index?: number,
    level: number
}

interface TemplateProps {
    Temp: React.FC,
    index?: number,
}

const MarkerTemplate = ({ Temp, index }: TemplateProps) => {
    return (
        <div style={{ position: 'relative' }}>
            {index && index > 100 ?
                <h5 style={{ zIndex: 1000, position: 'relative', textAlign: 'center', paddingTop: '3px', lineHeight: '25px' }}>
                    {index}
                </h5>
                :
                <h3 style={{ zIndex: 1000, position: 'relative', textAlign: 'center', paddingTop: '3px', lineHeight: '25px' }}>
                    {index}
                </h3>
            }
            <div style={{ position: 'absolute', top: 0 }}>
                <Temp />
            </div>

        </div>
    )
}

export const divicon = (level: number, index?: number) => {
    return L.divIcon({
        iconSize: [41, 41],
        iconAnchor: [20, 38],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -18], className: `custom-marker-${level}`, html: renderToString(<NumberIcon level={level} index={typeof index === 'number' ? index : undefined} />)
    })
}


function NumberIcon({ level, index }: Props) {

    switch (level) {
        case 5:
            return <MarkerTemplate Temp={MarkerBlue} index={index} />
        case 4:
            return <MarkerTemplate Temp={MarkerGreen} index={index} />
        case 3:
            return <MarkerTemplate Temp={MarkerYellow} index={index} />
        case 2:
            return <MarkerTemplate Temp={MarkerOrange} index={index} />
        case 1:
            return <MarkerTemplate Temp={MarkerRed} index={index} />
        default:
            return <MarkerTemplate Temp={MarkerBlack} index={index} />
    }
}

export default divicon