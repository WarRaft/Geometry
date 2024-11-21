class CartesianRectOriented extends CanvasDraw {
    static name = 'canvas-cartesian-rect-oriented'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 8, {round: true})

        c.points.push(
            new Point(-3, 5, {name: 'A', color: Color.pointA}),
            new Point(2, -4, {name: 'B', color: Color.pointB}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        let [A, B] = c.points

        A.parent(B.draw(c), c).draw(c)

        new Rect(A, B).draw(c)

        c.draw()
    }
}

CanvasDraw.define(CartesianRectOriented)
