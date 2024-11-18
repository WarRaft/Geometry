class CanvasNumberLineAbs extends CanvasDraw {
    static name = 'canvas-number-line-abs'

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(new Point(-5, 0, {dragY: false}))
    }

    drawOld() {
        this
            .grid({axisY: false})
            .dragRelease()

        const [A] = this.points
        const A1 = new Point(Math.abs(A.x), 0, {dragX: false, dragY: false})

        A.round = A1.round = this.round

        this
            .pointOld(A, {trackX: true, name: 'A'})
            .pointOld(A1, {trackX: true, name: '|A|', padding: 20, dash: [2, 2]})

    }
}

CanvasDraw.define(CanvasNumberLineAbs)
