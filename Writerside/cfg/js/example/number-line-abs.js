class CanvasNumberLineAbs extends CanvasGrid {
    static name = 'canvas-number-line-abs'

    constructor() {
        super()

        this.A = new Point(-5, 0, {dragY: false})
        this.points.push(this.A, this.B, this.X)
    }

    draw() {
        this
            .grid({axisY: false})
            .dragRelease()

        const A = this.A
        const A1 = new Point(Math.abs(A.x), 0, {dragX: false, dragY: false})

        this
            .point(A, {trackX: true, name: 'A'})
            .point(A1, {trackX: true, name: '|A|', padding: 20, dash: [2, 2]})

    }
}

CanvasGrid.define(CanvasNumberLineAbs)
