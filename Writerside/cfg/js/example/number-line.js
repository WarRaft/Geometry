class CanvasNumberLine extends CanvasGrid {
    static name = 'canvas-number-line'

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(
            new Point(-5, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
            new Point(0, 0, {dragY: false})
        )
    }

    draw() {
        this
            .grid({axisY: false})
            .dragRelease()

        const [A, B, X] = this.points

        for (const p of this.points) p.round = this.round

        this
            .point(A, {trackX: true, name: 'A'})
            .point(B, {trackX: true, name: 'B'})
            .point(X, {trackX: true, name: 'X'})
    }
}

CanvasGrid.define(CanvasNumberLine)
