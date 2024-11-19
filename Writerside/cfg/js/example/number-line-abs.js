class CanvasNumberLineAbs extends CanvasDraw {
    static name = 'canvas-number-line-abs'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-5, 0, {dragY: false})
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false}).drag()

        const [A] = c.points
        const A1 = new Point(Math.abs(A.x), 0)

        A.round = A1.round = c.round

        c
            .point(A, {name: 'A', color: Color.red})
            .point(A1, {name: '|A|', color: Color.redA, dash: [2, 2]})

    }

    redrawOld() {

    }
}

CanvasDraw.define(CanvasNumberLineAbs)
