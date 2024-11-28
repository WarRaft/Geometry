class CartesianLine extends CanvasDraw {
    static name = 'canvas-cartesian-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})
        this.text = new TextDraw(this)

        const AB = new Segment(
            new Point(2, 3, {name: 'A', color: Color.pointA}),
            new Point(-2, 1, {name: 'B', color: Color.pointB}),
            {line: true}
        )

        c.points.push(...AB.points)
        c.segments.push(AB)
    }

    draw() {
        const c = this.cartesian.axis()

        const [AB] = c.segments

        const t = this.text.clear()
        if (!AB.hasLine) AB.noline(t)

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLine)
