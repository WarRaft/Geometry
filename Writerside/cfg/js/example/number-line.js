class CanvasNumberLine extends CanvasDraw {
    static name = 'canvas-number-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-5, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        const [A, B] = c.points

        c
            .point(A, {name: 'A', color: Color.pointA})
            .point(B, {name: 'B', color: Color.pointB})

    }
}

CanvasDraw.define(CanvasNumberLine)
