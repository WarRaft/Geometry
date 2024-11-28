class CartesianLineEquation extends CanvasDraw {
    static name = 'canvas-cartesian-line-equation'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 10, {round: true})
        this.text = new TextDraw(this)

        const AB = new CartesianLineSloper(
            new Point(2, 3, {name: 'A', color: Color.pointA}),
            new Point(-2, -5, {name: 'B', color: Color.pointB}),
        )

        c.points.push(...AB.points)
        c.segments.push(AB)
    }

    draw() {
        const c = this.cartesian.axis()

        const [AB] = /** @type {CartesianLineSloper[]} */ c.segments

        const t = this.text.clear()

        AB.calc(t)

        if (AB.hasK) {
            const a = AB.A
            const b = a.y - AB.k * a.x
            t.spans.push(
                new TextSpan(`y = ${AB.k.toFixed(2)} * x + ${b.toFixed(2)}`)
            )
        }

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLineEquation)
