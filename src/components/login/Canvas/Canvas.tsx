import styled from '@emotion/styled'

import React from 'react'

const CanvasContainer = styled.canvas`
    background:#ddd;
    position:fixed;
    border-radius:4px;
`

const [centerX, centerY, radiusX, radiusY] = [260, 300, 200, 200]

const randomNumberGenerator = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

let animationHandler = 0;

function Canvas() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {

        if (canvasRef.current) {
            const { width, height } = canvasRef.current

            const context = canvasRef.current.getContext('2d')
            const particles: Particle[] = [];

            class Particle {
                angle: number = 0;
                area: number;

                constructor(areaValue: number, angle: number) {
                    this.area = areaValue;
                    this.angle = angle;
                }

                draw: () => void = () => {
                    this.angle += 0.15 * Math.PI / 180;

                    const x = centerX + Math.cos(this.angle) * radiusX;
                    const y = centerY + Math.sin(this.angle) * radiusY;
                    if (context) {

                        context.beginPath()
                        context.fillStyle = 'rgb(255,255,255)';
                        context.strokeStyle = 'rgba(0,0,0,0)';
                        context.arc(x, y, this.area, 0, 2 * Math.PI);
                        context.fill();
                        context.closePath();
                        context.restore();
                    }
                }
            }

            const createParticles = () => {
                for (let i = 0; i < 360; i += 15) {
                    particles.push(new Particle(randomNumberGenerator(30, 75), i * Math.PI / 180))
                }

            }

            const startAnimate = () => {
                if (context) {
                    context.fillStyle = 'rgb(80,150,255)'
                    context.fillRect(0, 0, width, height)
                    for (const particle of particles) {
                        particle.draw();
                    }

                    context.beginPath()
                    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
                    context.fillStyle = 'rgb(255,255,255)'
                    context.strokeStyle = 'rgba(0,0,0,0)'
                    context.stroke()
                    context.fill()
                    context.closePath()
                }
                animationHandler = requestAnimationFrame(startAnimate)
            }

            if (context) {
                // context.scale(window.devicePixelRatio,window.devicePixelRatio)

                createParticles();
                animationHandler = requestAnimationFrame(startAnimate)

            }
        }
        return () => {
            if (canvasRef.current) {
                console.log('unmount')
                const { width, height } = canvasRef.current

                cancelAnimationFrame(animationHandler)
                const context = canvasRef.current.getContext('2d')
                context?.clearRect(0, 0, width, height)
            }
        }
    }, [])
    return (
        <CanvasContainer ref={canvasRef} width={900} height={600} />
    )
}

export default Canvas