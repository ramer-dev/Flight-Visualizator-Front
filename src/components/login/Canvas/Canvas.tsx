import styled from '@emotion/styled'
import imageSrc from './img_airplane.png';
import React from 'react'

const CanvasContainer = styled.canvas`
    background:#ddd;
    position:fixed;
    border-radius:4px;
    transform: 0.3s ease;
`

const [centerX, centerY, radiusX, radiusY] = [260, 370, 200, 240]
const [imgX, imgY] = [750, 100]
const randomNumberGenerator = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

let animationHandler = 0;

function Canvas() {
    let mouseOutInterval : number = 0;
    let smokeIntervalID : number = 0;
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const cursurCoordinateRef = React.useRef({ clientX: 0, clientY: 0 });
    const cursurVariationRef = React.useRef({ x: 0, y: 0 });
    const mouseMoveHandler = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        cursurCoordinateRef.current = { clientX, clientY };
        getDx();
    }

    const mouseOverHandler = (e: React.MouseEvent) => clearInterval(mouseOutInterval)

    const mouseOutHandler = (e: React.MouseEvent) => {
        mouseOutInterval = window.setInterval(() => {
            
            cursurVariationRef.current.x -= cursurVariationRef.current.x / 15
            cursurVariationRef.current.y -= cursurVariationRef.current.y / 15
            if(Math.abs(cursurVariationRef.current.x) < 0.5 && Math.abs(cursurVariationRef.current.y) < 0.5){
                clearInterval(mouseOutInterval);
            } 
        }, 1000 / 60)
    }

    const getDx = () => {
        const { innerWidth, innerHeight } = window;
        const [midX, midY] = [innerWidth / 2, innerHeight / 2];
        const variation = 40;

        if (cursurCoordinateRef.current) {
            const { clientX, clientY } = cursurCoordinateRef.current

            // X 좌표 처리
            cursurVariationRef.current.x = Math.min(
                Math.max((clientX - midX) / 15, -variation),
                variation
            );

            // Y 좌표 처리
            cursurVariationRef.current.y = Math.min(
                Math.max((clientY - midY) / 15, -variation),
                variation
            );
        }
    }
    React.useEffect(() => {

        const image = new Image();
        image.src = imageSrc;
        if (canvasRef.current) {
            const { width, height } = canvasRef.current

            const context = canvasRef.current.getContext('2d')!

            // const { width, height } = image

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
                x: number = imgX - cursurVariationRef.current.x;
                y: number = imgY - cursurVariationRef.current.y;
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
                        context.shadowBlur = 35;
                        context.shadowOffsetX = 0;
                        context.shadowOffsetY = 0;
                        context.shadowColor = 'rgba(255, 255, 255, 0.75)';
                        context.fillStyle = 'rgb(255, 255, 255)';
                        context.strokeStyle = 'rgba(0,0,0,0)';
                        context.arc(this.x, this.y, this.area * this.animateDuration / 200 + 5, 0, 2 * Math.PI);
                        context.fill();
                        context.closePath();
                    }

                    if (this.y > 700) {
                        this.y = imgY - cursurVariationRef.current.y;
                        this.x = imgX - cursurVariationRef.current.x;;
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
                        context.shadowColor = 'rgba(0,0,0,0)';
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
                smokeIntervalID = window.setInterval(() => {
                    if (interval < 100) {
                        smokes.push(new Smoke(randomNumberGenerator(50, 65), randomNumberGenerator(110, 140), randomNumberGenerator(3, 4)))
                        interval++;
                    } else {
                        clearInterval(smokeIntervalID);
                    }
                }, 75)
            }

            const startAnimate = () => {
                if (context) {
                    // const image = new Image();
                    context.fillStyle = 'rgb(80,150,255)'
                    context.fillRect(0, 0, width, height)
                    // image.src = 'img_airplane.png'
                    // imageRef.current.src = './img_airplane.png';

                    for (const particle of clouds) {
                        particle.draw();
                    }

                    for (const smoke of smokes) {
                        smoke.draw();
                    }

                    context.beginPath()

                    context.shadowColor = 'rgba(0,0,0,0)'
                    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
                    context.drawImage(image,
                        imgX - (image.width / 2) + 30 - cursurVariationRef.current.x,
                        imgY - (image.height / 2) - 30 - cursurVariationRef.current.y,
                        image.width, image.height)
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
                createSmokes();

                createParticles();
                animationHandler = requestAnimationFrame(startAnimate)

            }
        }
        return () => {
            if (canvasRef.current) {
                const { width, height } = canvasRef.current
                clearInterval(smokeIntervalID);
                clearInterval(mouseOutInterval)
                cancelAnimationFrame(animationHandler)
                const context = canvasRef.current.getContext('2d')
                context?.clearRect(0, 0, width, height)
            }
        }
    }, [])
    return (
        <CanvasContainer ref={canvasRef} width={900} height={600} onMouseMove={mouseMoveHandler} onMouseOut={mouseOutHandler} onMouseEnter={mouseOverHandler}/>
    )
}

export default Canvas