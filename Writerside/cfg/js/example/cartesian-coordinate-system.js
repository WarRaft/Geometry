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
            .pointOld(A, {name: 'A', color: Color.pointA})
            .pointOld(B, {name: 'B', color: Color.pointB})
            .pointOld(C, {name: 'C', color: Color.pointC})
            .pointOld(D, {name: 'D', color: Color.pointD})

    }
}

CanvasDraw.define(CartesianCoordinateSystem)
