class CartesianSegment extends CanvasDraw {
    static name = 'canvas-cartesian-segment'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})
        this.text = new TextDraw(this)

        const AB = new Segment(
            new Point(2, 3, {name: 'A', color: Color.pointA}),
            new Point(-2, 1, {name: 'B', color: Color.pointB})
        )

        c.points.push(...AB.points)
        c.segments.push(AB)
    }

    draw() {
        this.cartesian.axis().draw()
    }
}

CanvasDraw.define(CartesianSegment)
