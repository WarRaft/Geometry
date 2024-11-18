class CartesianLine extends CanvasGrid {
    static name = 'canvas-cartesian-line'

    get height() {
        return 12
    }

    constructor() {
        super()

        this
            .roundInit(true)
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

        if (A.x === B.x && A.y === B.y) {
            this.text('Прямая не определена', {x: 0, y: 4, color: Color.yellow})
        }

        this.segment(A, B, {line: Color.yellow})
    }
}

CanvasGrid.define(CartesianLine)