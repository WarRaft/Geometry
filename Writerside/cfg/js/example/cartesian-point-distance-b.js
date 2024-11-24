class CartesianPointDistanceB extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-b'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 9, {round: true})

        c.points.push(
            new Point(5, -2, {name: 'A', color: Color.pointA}),
            new Point(8, -6, {name: 'B', color: Color.pointB}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points

        const dx = B.x - A.x
        const dy = B.y - A.y

        const d = Math.sqrt(dx * dx + dy * dy)

        A.push(c)
        const A1 = new Point(0, 0, {name: 'A′', color: Color.pointA1, dash: [2, 2], round: c.round}).push(c)

        B.push(c)
        const B1 = new Point(dx, dy, {name: 'B′', color: Color.pointB1, dash: [2, 2], round: c.round}).push(c)

        new Segment(A, B).draw(c)
        new Segment(A1, B1, {dash: [2, 2]}).draw(c)

        c.draw()

        const t = new TextDraw(this)

        t.spans.push(
            new TextSpan(`Расстояние = ${d.toFixed(2)}`),
        )

        t.draw()
    }
}

CanvasDraw.define(CartesianPointDistanceB)
