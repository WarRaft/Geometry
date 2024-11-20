class CanvasNumberLineSegment extends CanvasDraw {
    static name = 'canvas-number-line-segment'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-3, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        let [A, B] = c.points

        if (A.x > B.x) [A, B] = [B, A]

        c
            .point(A, {name: 'A', color: Color.pointA})
            .point(B, {name: 'B', color: Color.pointB})
            .segment(A, B)
    }
}

CanvasDraw.define(CanvasNumberLineSegment)
