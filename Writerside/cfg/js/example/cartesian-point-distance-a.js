class CartesianPointDistanceA extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-a'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})
        this.text = new TextDraw(this)

        const AO = new Segment(
            new Point(4, 3, {name: 'A', color: Color.pointA}),
            new Point(0, 0, {color: Color.pointA1, dash: [2, 2]}),
            {dash: [2, 2]}
        )

        c.points.push(...AO.points)
        c.segments.push(AO)
    }

    draw() {
        const c = this.cartesian.axis()

        const [A] = c.points

        c.draw()

        const d = Math.sqrt(A.x * A.x + A.y * A.y)

        this.text.clear().push(
            new TextSpan(`Расстояние = ${d.toFixed(2)}`),
        ).draw()
    }
}

CanvasDraw.define(CartesianPointDistanceA)
