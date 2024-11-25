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

        const [A] = c.points
        const [AB] = /** @type {CartesianLineSloper[]} */ c.segments

        const t = this.text.clear()

        AB.calc(this.text).line = AB.hasL ? 3 : 0

        if (AB.hasK) {
            const b = A.y - AB.k * A.x
            t.spans.push(
                new TextSpan(`y = ${AB.k.toFixed(2)} * x + ${b.toFixed(2)}`)
            )
        }

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLineEquation)
