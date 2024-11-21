class CanvasNumberLineDistance extends CanvasDraw {
    static name = 'canvas-number-line-distance'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-6, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(-3, 0, {name: 'B', color: Color.pointB, dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        const [A, B] = c.points

        A.draw(c)
        new Point(0, 0, {name: 'A′', color: Color.pointA1, dash: [2, 2], round: c.round}).draw(c)

        B.draw(c)
        new Point(B.x - A.x, 0, {name: 'B′', color: Color.pointB1, dash: [2, 2], round: c.round}).draw(c)

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLineDistance)
