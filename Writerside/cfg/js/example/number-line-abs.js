class CanvasNumberLineAbs extends CanvasGrid {
    static name = 'canvas-number-line-abs'

    constructor() {
        super()

        this.points.push(new Point(-5, 0, {dragY: false}))
    }

    draw() {
        this
            .grid({axisY: false})
            .dragRelease()

        const [A] = this.points
        const A1 = new Point(Math.abs(A.x), 0, {dragX: false, dragY: false})

        this
            .point(A, {trackX: true, name: 'A'})
            .point(A1, {trackX: true, name: '|A|', padding: 20, dash: [2, 2]})

    }
}

CanvasGrid.define(CanvasNumberLineAbs)
