class CartesianCoordinateSystem extends CanvasDraw {
    static name = 'canvas-cartesian-coordinate-system'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})

        c.points.push(
            new Point(4, 4),
            new Point(-4, 4),
            new Point(-4, -4),
            new Point(4, -4),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, C, D] = c.points

        c
            .point(A, {name: 'A', color: Color.pointA})
            .point(B, {name: 'B', color: Color.pointB})
            .point(C, {name: 'C', color: Color.pointC})
            .point(D, {name: 'D', color: Color.pointD})

    }
}

CanvasDraw.define(CartesianCoordinateSystem)
