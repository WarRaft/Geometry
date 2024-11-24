class CanvasNumberLineLerpEasing extends CanvasDraw {
    static name = 'canvas-number-line-lerp-easing'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 13, {round: false})

        c.points.push(
            new Point(-5, 0, {color: Color.pointA, dragY: false}),
            new Point(5, 0, {color: Color.pointB, dragY: false}),
            new Point(0, 0, {color: Color.pointC, dash: [2, 2], dragY: false, dragX: false}),
        )

        /** @type {[Point,Point,Point,Cubic,string][]} */ this.data = []

        for (const i of [
            ['easeInBack', 0.36, 0, 0.66, -0.56],
            ['easeInExpo', 0.7, 0, 0.84, 0],
            ['easeInQuint', 0.64, 0, 0.78, 0],
            ['easeInQuart', 0.5, 0, 0.75, 0],
            ['easeInCubic', 0.32, 0, 0.67, 0],
            ['easeInCirc', 0.55, 0, 1, 0.45],
            ['easeInQuad', 0.11, 0, 0.5, 0],
            ['easeInSine', 0.12, 0, 0.39, 0],

            ['easeInOutBack', 0.68, -0.6, 0.32, 1.6],
            ['easeInOutCirc', 0.85, 0, 0.15, 1],
            ['easeInOutExpo', 0.87, 0, 0.13, 1],
            ['easeInOutQuint', 0.83, 0, 0.17, 1],
            ['easeInOutQuart', 0.76, 0, 0.24, 1],
            ['easeInOutCubic', 0.65, 0, 0.35, 1],
            ['easeInOutQuad', 0.45, 0, 0.55, 1],
            ['easeInOutSine', 0.37, 0, 0.63, 1],

            ['easeOutSine', 0.61, 1, 0.88, 1],
            ['easeOutQuad', 0.5, 1, 0.89, 1],
            ['easeOutCirc', 0, 0.55, 0.45, 1],
            ['easeOutCubic', 0.33, 1, 0.68, 1],
            ['easeOutQuart', 0.25, 1, 0.5, 1],
            ['easeOutQuint', 0.22, 1, 0.36, 1],
            ['easeOutExpo', 0.16, 1, 0.3, 1],
            ['easeOutBack', 0.34, 1.56, 0.64, 1],
        ]) {
            const name = i.shift()
            const cubic = new Cubic(...i)
            this.data.push([
                new Point(0, 0, {color: Color.pointA, dash: [2, 2]}),
                new Point(0, 0, {color: Color.pointB, dash: [2, 2]}),
                new Point(0, 0, {color: Color.pointC, dash: [2, 2]}),
                cubic,
                name
            ])
        }
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, B, C] = c.points

        let y = -1
        const lerp = (pa, pb, pc, cubic, name) => {
            y += 1

            pa.position(A.x, y).draw(c)
            pb.position(B.x, y).draw(c)

            let k = this.lerpK
            if (cubic) k = cubic.solve(k)

            pc.position(pa.x * (1 - k) + pb.x * k, y - 0.0000001).draw(c)

            new Segment(pa, pc, {dash: [2, 2]}).draw(c)
            new Segment(pb, pc, {dash: [2, 2]}).draw(c)

            new Segment(pa, pb, {name: name, line: -1}).draw(c)
        }

        lerp(A, B, C, null, '')

        for (const d of this.data) {
            lerp(...d)
        }

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLineLerpEasing)
