import styled from '@emotion/styled'

import React from 'react'

const CanvasContainer = styled.canvas`
    background:#ddd;
    position:fixed;
    border-radius:4px;
`

const [centerX, centerY, radiusX, radiusY] = [260, 370, 200, 240]
const [imgX, imgY] = [750, 100]
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
            const clouds: Cloud[] = [];
            const smokes: Smoke[] = [];
            class Particle {
                area: number;
                angle: number = 0;
                animateDuration: number;
                constructor(areaValue: number, angle: number) {
                    this.area = areaValue
                    this.angle = angle;
                    this.animateDuration = 0;
                }
            }
            class Smoke extends Particle {
                x: number = imgX;
                y: number = imgY;
                speed: number = 5;
                constructor(areaValue: number, angle: number, speed: number) {
                    super(areaValue, angle);
                    this.speed = speed;
                }

                draw: () => void = () => {
                    this.x += Math.cos(this.angle * Math.PI / 180) * this.speed;
                    this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;
                    this.animateDuration++;
                    if (context) {
                        context.beginPath()
                        context.fillStyle = 'rgb(255,255,255)';
                        context.strokeStyle = 'rgba(0,0,0,0)';
                        context.arc(this.x, this.y, this.area * this.animateDuration / 200 + 5, 0, 2 * Math.PI);
                        context.fill();
                        context.closePath();
                    }

                    if (this.y > 700) {
                        this.y = imgY;
                        this.x = imgX;
                        this.animateDuration = 0;
                        this.angle = randomNumberGenerator(110, 140);
                    }
                }

            }

            class Cloud extends Particle {
                initialArea: number;

                constructor(areaValue: number, angle: number) {
                    super(areaValue, angle)
                    this.initialArea = areaValue;
                    this.animateDuration = randomNumberGenerator(0, 359);
                }

                draw: () => void = () => {
                    this.angle += 0.15 * Math.PI / 180;

                    const x = centerX + Math.cos(this.angle) * (radiusX - 20);
                    const y = centerY + Math.sin(this.angle) * (radiusY - 20);

                    if (context) {

                        context.beginPath()
                        context.fillStyle = 'rgb(255,255,255)';
                        context.strokeStyle = 'rgba(0,0,0,0)';
                        context.arc(x, y, this.area, 0, 2 * Math.PI);
                        context.fill();
                        context.closePath();
                        context.restore();
                    }

                    this.area = Math.abs(this.initialArea * (Math.sin(this.animateDuration * Math.PI / 180) + 2) / 2)
                    this.animateDuration++;
                    if (this.animateDuration >= 360) this.animateDuration = 0;

                }
            }

            const createParticles = () => {
                for (let i = 0; i < 360; i += 20) {
                    clouds.push(new Cloud(randomNumberGenerator(50, 65), i * Math.PI / 180))
                }

            }
            const createSmokes = () => {
                // 인터벌 중도 취소 해야함. 메모리 누수 위험 있음.
                let interval = 0;
                let intervalID = setInterval(() => {
                    if (interval < 50) {
                        smokes.push(new Smoke(randomNumberGenerator(50, 65), randomNumberGenerator(110, 140), 3))
                        interval++;
                    } else {
                        clearInterval(intervalID);
                    }
                }, 75)
            }

            const startAnimate = () => {
                if (context) {
                    context.fillStyle = 'rgb(80,150,255)'
                    context.fillRect(0, 0, width, height)
                    for (const particle of clouds) {
                        particle.draw();
                    }

                    for (const smoke of smokes) {
                        smoke.draw();
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
                createSmokes();
                animationHandler = requestAnimationFrame(startAnimate)

            }
        }
        return () => {
            if (canvasRef.current) {
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