class CartesianLineSlopeTwo extends CanvasDraw {
    static name = 'canvas-cartesian-line-slope-two'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 10, {round: true})

        c.points.push(
            new Point(3, 2, {name: 'A', color: Color.pointA}),
            new Point(5, -2, {name: 'B', color: Color.pointB}),
            new Point(1, 3, {name: 'C', color: Color.pointC}),
            new Point(-5, 0, {name: 'D', color: Color.pointD}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, C, D] = c.points

        const t = new TextDraw(this)

        const kAB = new CartesianLineSloper(c, t, A, B)
        const kCD = new CartesianLineSloper(c, t, C, D)

        if (kAB.hasK && kCD.hasK) {
            t.spans.push(
                ...kAB.name,
                new TextSpan(' * '),
                ...kCD.name,
                new TextSpan(` = ${(kAB.k * kCD.k).toFixed(2)}`),
            )

        }

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLineSlopeTwo)
