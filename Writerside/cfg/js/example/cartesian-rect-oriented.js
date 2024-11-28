class CartesianRectOriented extends CanvasDraw {
    static name = 'canvas-cartesian-rect-oriented'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 8, {round: true})

        const AB = new Rect(
            new Point(-3, 5, {name: 'A', color: Color.pointA}),
            new Point(2, -4, {name: 'B', color: Color.pointB}),
        )

        c.points.push(...AB.points)
        c.rects.push(AB)
    }

    draw() {
        this.cartesian.axis().draw()
    }
}

CanvasDraw.define(CartesianRectOriented)
