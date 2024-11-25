class CanvasNumberLineLerp extends CanvasDraw {
    static name = 'canvas-number-line-lerp'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 2, {round: false})

        const A = new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false})
        const B = new Point(5, 0, {name: 'B', color: Color.pointB, dragY: false})
        const C = new Point(0, -0.0000001, {name: 'C', color: Color.pointC, drag: false, roundIgnore: true, dash: [2, 2]})

        c.points.push(A, B, C)
        c.segments.push(
            new Segment(A, C, {dash: [2, 2]}),
            new Segment(B, C, {dash: [2, 2]})
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, B, C] = c.points

        C.x = A.x + (B.x - A.x) * this.lerpK

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLineLerp)
