class CanvasNumberLineLerpEasing extends CanvasDraw {
    static name = 'canvas-number-line-lerp-easing'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 26, {round: false})

        c.points.push(
            new Point(-5, 0, {color: Color.pointA, dragY: false}),
            new Point(5, 0, {color: Color.pointB, dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, B] = c.points

        const lerp = (A, B, name, points) => {
            A.draw(c)
            B.draw(c)
            let k = this.lerpK
            if (points) k = (new Cubic(...points)).solve(k)

            const x = A.x * (1 - k) + B.x * k
            const C = new Point(x, A.y - 0.0000001, {
                name: name,
                color: Color.pointC,
                dash: [2, 2]
            }).draw(c)

            new Segment(A, C, {dash: [2, 2]}).draw(c)
            new Segment(B, C, {dash: [2, 2]}).draw(c)
        }

        lerp(A, B, 'linear')

        const list = [
            ['easeInSine', 0.12, 0, 0.39, 0],
            ['easeOutSine', 0.61, 1, 0.88, 1],
            ['easeInOutSine', 0.37, 0, 0.63, 1],
            ['easeInCirc', 0.55, 0, 1, 0.45],
            ['easeOutCirc', 0, 0.55, 0.45, 1],
            ['easeInOutCirc', 0.85, 0, 0.15, 1],
            ['easeInCubic', 0.32, 0, 0.67, 0],
            ['easeOutCubic', 0.33, 1, 0.68, 1],
            ['easeInOutCubic', 0.65, 0, 0.35, 1],
            ['easeInQuad', 0.11, 0, 0.5, 0],
            ['easeOutQuad', 0.5, 1, 0.89, 1],
            ['easeInOutQuad', 0.45, 0, 0.55, 1],
            ['easeInQuart', 0.5, 0, 0.75, 0],
            ['easeOutQuart', 0.25, 1, 0.5, 1],
            ['easeInOutQuart', 0.76, 0, 0.24, 1],
            ['easeInQuint', 0.64, 0, 0.78, 0],
            ['easeOutQuint', 0.22, 1, 0.36, 1],
            ['easeInOutQuint', 0.83, 0, 0.17, 1],
            ['easeInExpo', 0.7, 0, 0.84, 0],
            ['easeOutExpo', 0.16, 1, 0.3, 1],
            ['easeInOutExpo', 0.87, 0, 0.13, 1],
            ['easeInBack', 0.36, 0, 0.66, -0.56],
            ['easeOutBack', 0.34, 1.56, 0.64, 1],
            ['easeInOutBack', 0.68, -0.6, 0.32, 1.6],
        ]

        for (let i = 0; i < list.length; i++) {
            const name = list[i].shift()
            const y = (i + 1) * 2
            lerp(
                new Point(A.x, y, {color: Color.pointA, dash: [2, 2]}),
                new Point(B.x, y, {color: Color.pointB, dash: [2, 2]}),
                name,
                list[i]
            )
        }
        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLineLerpEasing)
