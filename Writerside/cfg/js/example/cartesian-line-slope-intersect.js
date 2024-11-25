class CartesianLineSlopeIntersect extends CanvasDraw {
    static name = 'canvas-cartesian-line-slope-intersect'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 10, {round: true})
        this.text = new TextDraw(this)

        const AB = new CartesianLineSloper(
            new Point(3, 2, {name: 'A', color: Color.pointA}),
            new Point(5, -2, {name: 'B', color: Color.pointB}),
        )

        const CD = new CartesianLineSloper(
            new Point(1, 3, {name: 'C', color: Color.pointC}),
            new Point(-5, 0, {name: 'D', color: Color.pointD}),
        )

        c.points.push(...AB.points, ...CD.points)
        c.segments.push(AB, CD)
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, C, D] = c.points
        const [AB, CD] = /** @type {CartesianLineSloper[]} */ c.segments

        const t = this.text.clear()

        AB.calc(t).line = AB.hasL ? 3 : 0
        CD.calc(t).line = CD.hasL ? 3 : 0

        if (AB.hasK && CD.hasK) {
            t.spans.push(
                ...AB.textName,
                new TextSpan(' * '),
                ...CD.textName,
                new TextSpan(` = ${(AB.k * CD.k).toFixed(2)}`),
            )
        }

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLineSlopeIntersect)
