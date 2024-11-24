class CanvasNumberLine extends CanvasDraw {
    static name = 'canvas-number-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 2, {round: true})

        c.points.push(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(5, 0, {name: 'B', color: Color.pointB, dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, B] = c.points

        A.push(c)
        B.push(c)

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLine)
