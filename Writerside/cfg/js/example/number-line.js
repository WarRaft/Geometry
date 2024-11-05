class CanvasNumberLine extends CanvasGrid {
    static name = 'canvas-number-line'

    constructor() {
        super()

        this.A = new Point(-5, 0, {dragY: false})
        this.B = new Point(5, 0, {dragY: false})
        this.X = new Point(0, 0, {dragY: false})

        this.points.push(this.A, this.B, this.X)
    }

    draw() {
        this
            .grid({axisY: false})
            .dragRelease()

        const
            A = this.A,
            B = this.B,
            X = this.X

        this
            .point(A, {trackX: true, name: 'A'})
            .point(B, {trackX: true, name: 'B'})
            .point(X, {trackX: true, name: 'X'})
    }
}

CanvasGrid.define(CanvasNumberLine)
