class CartesianCoordinateSystem extends CanvasGrid {
    static name = 'cartesian-coordinate-system'

    get height() {
        return 12
    }

    constructor() {
        super()

        this
            .roundInit(false)
            .points.push(
            new Point(5, 3),
        )
    }

    draw() {
        this.grid().dragRelease()

        const [A] = this.points

        for (const p of this.points) p.round = this.round

        this.point(A, {trackX: true, trackY: true, name: 'A'})
    }
}

CanvasGrid.define(CartesianCoordinateSystem)
