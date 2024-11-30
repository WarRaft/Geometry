class CartesianPointDistanceB extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-b'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 9, {round: true})
        this.text = new TextDraw(this)

        const AB = new Segment(
            new Point(5, -2, {name: 'A', color: Color.pointA}),
            new Point(8, -6, {name: 'B', color: Color.pointB})
        )

        const AB1 = new Segment(
            new Point(0, 0, {name: 'A′', color: Color.pointA1, dash: [2, 2], drag: false}),
            new Point(0, 0, {name: 'B′', color: Color.pointB1, dash: [2, 2], drag: false})
            , {dash: [2, 2]}
        )

        c.points.push(...AB.points, ...AB1.points)
        c.segments.push(AB, AB1)
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, , B1] = c.points

        const dx = B.x - A.x
        const dy = B.y - A.y

        const d = Math.sqrt(dx * dx + dy * dy)

        B1.position(dx, dy)

        c.draw()

        this.text.clear().push(
            new TextSpan(`Расстояние = ${d.toFixed(2)}`),
        ).draw()
    }
}

CanvasDraw.define(CartesianPointDistanceB)
