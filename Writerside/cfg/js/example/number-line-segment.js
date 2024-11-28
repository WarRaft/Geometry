class CanvasNumberLineSegment extends CanvasDraw {
    static name = 'canvas-number-line-segment'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 2, {round: true})

        const AB = new Segment(
            new Point(-3, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(5, 0, {name: 'B', color: Color.pointB, dragY: false}),
            {minmax: true}
        )

        c.points.push(...AB.points)
        c.segments.push(AB)
    }

    draw() {
        this.cartesian.axis({y: false, yalign: -1}).draw()
    }
}

CanvasDraw.define(CanvasNumberLineSegment)
