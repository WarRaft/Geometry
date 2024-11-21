class CartesianCoordinateSystem extends CanvasDraw {
    static name = 'canvas-cartesian-coordinate-system'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})

        c.points.push(
            new Point(4, 4, {name: 'A', color: Color.pointA}),
            new Point(-4, 4, {name: 'B', color: Color.pointB}),
            new Point(-4, -4, {name: 'C', color: Color.pointC}),
            new Point(4, -4, {name: 'D', color: Color.pointD}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, C, D] = c.points

        A.draw(c)
        B.draw(c)
        C.draw(c)
        D.draw(c)

        c.draw()
    }
}

CanvasDraw.define(CartesianCoordinateSystem)
