class CartesianLineEquation extends CanvasDraw {
    static name = 'canvas-cartesian-line-equation'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 10, {round: true})

        c.points.push(
            new Point(2, 3, {name: 'A', color: Color.pointA}),
            new Point(-2, -5, {name: 'B', color: Color.pointB}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points

        const t = new TextDraw(this)

        const kAB = new CartesianLineSloper(c, t, A, B)

        if (kAB.hasK) {
            const b = A.y - kAB.k * A.x
            t.spans.push(
                new TextSpan(`y = ${kAB.k.toFixed(2)} * x + ${b.toFixed(2)}`)
            )
        }

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLineEquation)
