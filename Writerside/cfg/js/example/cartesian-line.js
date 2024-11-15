class CartesianLine extends CanvasGrid {
    static name = 'canvas-cartesian-line'

    get height() {
        return 12
    }

    constructor() {
        super()

        this
            .roundInit(false)
            .points.push(
            new Point(2, 3),
            new Point(-2, 1),
        )
    }

    draw() {
        this.grid().dragRelease()

        const [A, B] = this.points

        for (const p of this.points) p.round = this.round

        this
            .point(A, {trackX: true, trackY: true, name: 'A'})
            .point(B, {trackX: true, trackY: true, name: 'B'})
            .segment(A, B, {line: Color.yellow})
    }
}

CanvasGrid.define(CartesianLine)
