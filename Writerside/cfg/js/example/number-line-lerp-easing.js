class CanvasNumberLineLerpEasing extends CanvasDraw {
    static name = 'canvas-number-line-lerp-easing'

    #cubic = [
        null,
        new Cubic(0.36, 0, 0.66, -0.56, {name: 'easeInBack'}),
        new Cubic(0.7, 0, 0.84, 0, {name: 'easeInExpo'}),
        new Cubic(0.64, 0, 0.78, 0, {name: 'easeInQuint'}),
        new Cubic(0.5, 0, 0.75, 0, {name: 'easeInQuart'}),
        new Cubic(0.32, 0, 0.67, 0, {name: 'easeInCubic'}),
        new Cubic(0.55, 0, 1, 0.45, {name: 'easeInCirc'}),
        new Cubic(0.11, 0, 0.5, 0, {name: 'easeInQuad'}),
        new Cubic(0.12, 0, 0.39, 0, {name: 'easeInSine'}),

        new Cubic(0.68, -0.6, 0.32, 1.6, {name: 'easeInOutBack'}),
        new Cubic(0.85, 0, 0.15, 1, {name: 'easeInOutCirc'}),
        new Cubic(0.87, 0, 0.13, 1, {name: 'easeInOutExpo'}),
        new Cubic(0.83, 0, 0.17, 1, {name: 'easeInOutQuint'}),
        new Cubic(0.76, 0, 0.24, 1, {name: 'easeInOutQuart'}),
        new Cubic(0.65, 0, 0.35, 1, {name: 'easeInOutCubic'}),
        new Cubic(0.45, 0, 0.55, 1, {name: 'easeInOutQuad'}),
        new Cubic(0.37, 0, 0.63, 1, {name: 'easeInOutSine'}),

        new Cubic(0.61, 1, 0.88, 1, {name: 'easeOutSine'}),
        new Cubic(0.5, 1, 0.89, 1, {name: 'easeOutQuad'}),
        new Cubic(0, 0.55, 0.45, 1, {name: 'easeOutCirc'}),
        new Cubic(0.33, 1, 0.68, 1, {name: 'easeOutCubic'}),
        new Cubic(0.25, 1, 0.5, 1, {name: 'easeOutQuart'}),
        new Cubic(0.22, 1, 0.36, 1, {name: 'easeOutQuint'}),
        new Cubic(0.16, 1, 0.3, 1, {name: 'easeOutExpo'}),
        new Cubic(0.34, 1.56, 0.64, 1, {name: 'easeOutBack'}),
    ]

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), Math.ceil(this.#cubic.length / 2), {round: false})

        for (let i = 0; i < this.#cubic.length; i++) {
            const cubic = this.#cubic[i]
            const dash = i > 0 ? [2, 2] : []
            const A = new Point(-5, i, {color: Color.pointA, dash: dash, drag: i === 0, dragY: false})
            const B = new Point(5, i, {color: Color.pointB, dash: dash, drag: i === 0, dragY: false})
            const C = new Point(0, i, {color: Color.pointC, dash: [2, 2], drag: false})
            c.points.push(A, B, C)
            c.segments.push(
                new Segment(A, C, {dash: [2, 2]}),
                new Segment(B, C, {dash: [2, 2]}),
                new Segment(A, B, {name: cubic?.name ?? '', line: -1})
            )
        }
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        /** @type {Point} */ let A0, B0

        for (let j = 0; j < this.#cubic.length; j++) {
            const i = j * 3
            const A = c.points[i]
            const B = c.points[i + 1]
            const C = c.points[i + 2]

            const k = i === 0 ? this.lerpK : this.#cubic[j].solve(this.lerpK)

            if (i === 0) {
                A0 = A
                B0 = B
            } else {
                if (A0) A.x = A0.x
                if (B0) B.x = B0.x
            }
            C.x = A.x * (1 - k) + B.x * k
            if (i === 0) continue

            const s = c.segments[i + 2]
            let r = A
            if (B.x > r.x) r = B
            if (C.x > r.x) r = C
            s.B = r
        }

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLineLerpEasing)
