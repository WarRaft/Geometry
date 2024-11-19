class CanvasNumberLineDistance extends CanvasDraw {
    static name = 'canvas-number-line-distance'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-6, 0, {dragY: false}),
            new Point(-3, 0, {dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        const [A, B] = c.points

        const A1 = new Point(0, 0, {round: c.round})
        const B1 = new Point(B.x - A.x, 0, {round: c.round})


        c
            .point(A, {name: 'A', color: Color.red})
            .point(A1, {name: 'A′', color: Color.redA, dash: [2, 2]})

            .point(B, {name: 'B', color: Color.green})
            .point(B1, {name: 'B′', color: Color.greenA, dash: [2, 2]})
    }
}

CanvasDraw.define(CanvasNumberLineDistance)
