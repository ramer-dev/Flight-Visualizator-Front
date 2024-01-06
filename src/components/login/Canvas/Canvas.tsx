import styled from '@emotion/styled'

import React from 'react'

const CanvasContainer = styled.canvas`
    background:#ddd;
    position:absolute;
    /* width:100%; */
    height:100%;
`

function Canvas() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')
            if (context) {
                context.beginPath()
                context.ellipse(80, 50, 50, 30, 0, 0, Math.PI * 2);
                context.stroke()
            }
        }
        return (() => {
            if (canvasRef.current) {
                const context = canvasRef.current.getContext('2d')
                const {width, height} = canvasRef.current 
                context?.clearRect(0,0,width,height)
            }
        })
    }, [])
    return (
        <CanvasContainer ref={canvasRef} />
    )
}

export default Canvas