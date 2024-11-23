class CartesianLine extends CanvasDraw {
    static name = 'canvas-cartesian-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})

        c.points.push(
            new Point(2, 3, {name: 'A', color: Color.pointA}),
            new Point(-2, 1, {name: 'B', color: Color.pointB}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points

        A.draw(c)
        B.draw(c)

        const t = new TextDraw(this)

        if (A.x === B.x && A.y === B.y) {
            t.noline(A, B)
        } else {
            new Segment(A, B, {line: 3}).draw(c)
        }

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLine)
