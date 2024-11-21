class CanvasNumberLine extends CanvasDraw {
    static name = 'canvas-number-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(5, 0, {name: 'B', color: Color.pointB, dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        const [A, B] = c.points

        A.draw(c)
        B.draw(c)

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLine)
