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
        this.cartesian.axis().draw()
    }
}

CanvasDraw.define(CartesianCoordinateSystem)
