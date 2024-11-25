class CanvasNumberLineSegment extends CanvasDraw {
    static name = 'canvas-number-line-segment'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 2, {round: true})

        const A = new Point(-3, 0, {name: 'A', color: Color.pointA, dragY: false})
        const B = new Point(5, 0, {name: 'B', color: Color.pointB, dragY: false})

        c.points.push(A, B)
        c.segments.push(new Segment(A, B))
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1}).draw()

        const [A, B] = c.points

        A.parent(B, c)
    }
}

CanvasDraw.define(CanvasNumberLineSegment)
