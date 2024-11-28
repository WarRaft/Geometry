class CartesianSegmentLerp extends CanvasDraw {
    static name = 'canvas-cartesian-segment-lerp'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 8, {round: true})
        this.text = new TextDraw(this)

        const A = new Point(-4, -2, {name: 'A', color: Color.pointA})
        const B = new Point(3, 2, {name: 'B', color: Color.pointB})
        const C = new Point(0, 0, {name: 'C', color: Color.pointC, roundIgnore: true})

        c.points.push(A, B, C,)
        c.segments.push(
            new Segment(A, C),
            new Segment(B, C),
        )
    }

    draw() {
        const c = this.cartesian.axis()
        const k = this.lerpK

        const [A, B, C] = c.points

        C.position(
            A.x + (B.x - A.x) * k,
            A.y + (B.y - A.y) * k,
        )


        c.draw()
    }
}

CanvasDraw.define(CartesianSegmentLerp)
