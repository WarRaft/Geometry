class CanvasNumberLine extends CanvasDraw {
    static name = 'canvas-number-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 5, {round: true})

        c.points.push(
            new Point(-5, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
            new Point(0, 0, {dragY: false})
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false}).drag()

        const [A, B, X] = c.points

        for (const p of c.points) p.round = c.round

        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})
            .point(X, {name: 'X', color: Color.blue})
    }

    redrawOld() {

    }
}

CanvasDraw.define(CanvasNumberLine)
