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
        const c = this.cartesian.axis().drag()

        const [A, B, C, D] = c.points

        for (const p of c.points) p.round = c.round

        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})
            .point(C, {name: 'C', color: Color.blue})
            .point(D, {name: 'D', color: Color.yellow})

    }

    redrawOld() {
    }
}

CanvasDraw.define(CartesianCoordinateSystem)
