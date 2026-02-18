import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

export const Globe = ({ className, lat = 47.6062, lng = -122.3328 }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // phi = spin (longitude). theta = tilt (latitude).
        let phi = 0
        let theta = 0

        // Based on Cobe documentation and source analysis:
        // phi: Rotation around the Y-axis (Spin / Longitude control).
        // theta: Rotation around the X-axis (Tilt / Latitude control).

        // To center a specific [lat, lng]:
        // 1. Convert to radians.
        // 2. Adjust phi to rotate the longitude to the front.
        //    - Cobe's texture mapping usually puts 0 longitude at a specific angle.
        //    - Empirically and mathematically: phi = -(lng * PI / 180) - PI/2.
        // 3. Adjust theta to tilt the latitude to the center.
        //    - theta = lat * PI / 180.

        // This centers the given [lat, lng] on the view.



        phi = -(lng * Math.PI) / 180 - Math.PI / 2
        theta = (lat * Math.PI) / 180

        // Adjust starting spin if necessary (sometimes needs offset)
        // Experimentally, cobe examples often start phi at 0.
        // We might need an offset of -PI/2 or PI depending on where 0 is.
        // Let's try direct mapping first, but phi usually accumulates.

        let currentPhi = phi
        let currentTheta = theta
        let dragging = false
        let lastX = 0
        let velocity = 0

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1200,
            height: 1200,

            phi: currentPhi,
            theta: currentTheta,

            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],

            markers: [{ location: [lat, lng], size: 0.1 }],

            onRender: (state) => {
                // inertia when not dragging
                if (!dragging) {
                    velocity *= 0.95
                    currentPhi += velocity
                }

                state.phi = currentPhi + 0 // Apply offset if needed
                state.theta = currentTheta
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
            currentPhi += deltaTheta // Drag rotates longitude (spin)
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
    }, [lat, lng])

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
