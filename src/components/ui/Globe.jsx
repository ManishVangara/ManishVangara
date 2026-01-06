import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

export const Globe = ({ className }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const lat = 47.6062
        const lon = -122.3328

        const phi = (90 - lat) * (Math.PI / 180)
        const baseTheta = (lon + 180) * (Math.PI / 180)

        let theta = baseTheta
        let dragging = false
        let lastX = 0
        let velocity = 0

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1200,
            height: 1200,

            phi,
            theta,

            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],

            markers: [{ location: [lat, lon], size: 0.1 }],

            onRender: (state) => {
                // inertia when not dragging
                if (!dragging) {
                    velocity *= 0.95
                    theta += velocity
                }

                state.theta = theta
                state.phi = phi
            },
        })

        const sensitivity = 0.005

        const onPointerDown = (e) => {
            dragging = true
            lastX = e.clientX
            velocity = 0
        }

        const onPointerMove = (e) => {
            if (!dragging) return
            const deltaX = e.clientX - lastX
            lastX = e.clientX

            const deltaTheta = deltaX * sensitivity
            theta += deltaTheta
            velocity = deltaTheta
        }

        const onPointerUp = () => {
            dragging = false
        }

        const canvas = canvasRef.current
        canvas.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)

        return () => {
            globe.destroy()
            canvas.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
        }
    }, [])

    return (
        <div className={`relative flex items-center justify-center w-full h-full overflow-hidden ${className}`}>
            <canvas
                ref={canvasRef}
                style={{
                    width: 600,
                    height: 600,
                    aspectRatio: 1,
                    cursor: 'grab',
                }}
            />
        </div>
    )
}
