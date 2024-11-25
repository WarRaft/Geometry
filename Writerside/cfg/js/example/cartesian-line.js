class CartesianLine extends CanvasDraw {
    static name = 'canvas-cartesian-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})
        this.text = new TextDraw(this)

        const AB = new Segment(
            new Point(2, 3, {name: 'A', color: Color.pointA}),
            new Point(-2, 1, {name: 'B', color: Color.pointB}),
        )

        c.points.push(...AB.points)
        c.segments.push(AB)
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points
        const [AB] = c.segments

        const noline = A.x === B.x && A.y === B.y
        AB.line = noline ? -1 : 3

        this.text.clear()
        if (noline) this.text.noline(A, B).draw()

        c.draw()
    }
}

CanvasDraw.define(CartesianLine)
