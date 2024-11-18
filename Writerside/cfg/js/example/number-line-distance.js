class CanvasNumberLineDistance extends CanvasDraw {
    static name = 'canvas-number-line-distance'

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(
            new Point(-6, 0, {dragY: false}),
            new Point(-3, 0, {dragY: false}),
        )
    }

    drawOld() {
        this
            .grid({axisY: false})
            .dragRelease()

        const [A, B] = this.points

        const A1 = new Point(0, 0)
        const B1 = new Point(B.x - A.x, 0)

        A.round = A1.round = B.round = B1.round = this.round

        this
            .pointOld(A, {trackX: true, name: 'A'})
            .pointOld(B, {trackX: true, name: 'B'})

            .pointOld(A1, {trackX: true, name: 'A′', padding: 20, dash: [2, 2]})
            .pointOld(B1, {trackX: true, name: 'B′', padding: 20, dash: [2, 2]})
    }
}

CanvasDraw.define(CanvasNumberLineDistance)
