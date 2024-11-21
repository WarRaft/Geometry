class CanvasNumberLineAbs extends CanvasDraw {
    static name = 'canvas-number-line-abs'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false})
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        const [A] = c.points

        A.draw(c)
        new Point(Math.abs(A.x), 0, {name: '|A|', color: Color.pointA1, dash: [2, 2], round: c.round}).draw(c)

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLineAbs)
