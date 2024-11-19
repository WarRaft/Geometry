class CanvasNumberLine extends CanvasDraw {
    static name = 'canvas-number-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-5, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
            new Point(0, 0, {dragY: false})
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        const [A, B, X] = c.points

        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})
            .point(X, {name: 'X', color: Color.blue})
    }
}

CanvasDraw.define(CanvasNumberLine)
