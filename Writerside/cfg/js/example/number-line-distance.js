class CanvasNumberLineDistance extends CanvasGrid {
    static name = 'canvas-number-line-distance'

    constructor() {
        super()

        this.intvalCreate(true)

        this.points.push(
            new Point(-6, 0, {dragY: false}),
            new Point(-3, 0, {dragY: false}),
        )
    }

    draw() {
        this
            .grid({axisY: false})
            .dragRelease()

        const [A, B] = this.points

        const A1 = new Point(0, 0)
        const B1 = new Point(B.x - A.x, 0)

        A.round = A1.round = B.round = B1.round = this.intval

        this
            .point(A, {trackX: true, intval: this.intval, name: 'A'})
            .point(B, {trackX: true, intval: this.intval, name: 'B'})

            .point(A1, {trackX: true, intval: this.intval, name: 'A′', padding: 20, dash: [2, 2]})
            .point(B1, {trackX: true, intval: this.intval, name: 'B′', padding: 20, dash: [2, 2]})
    }
}

CanvasGrid.define(CanvasNumberLineDistance)
