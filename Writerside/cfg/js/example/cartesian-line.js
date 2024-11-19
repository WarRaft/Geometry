class CartesianLine extends CanvasDraw {
    static name = 'canvas-cartesian-line'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})

        c.points.push(
            new Point(2, 3),
            new Point(-2, 1),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points


        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})

        if (A.x === B.x && A.y === B.y) {
            c.text('Прямая не определена', {x: 0, y: 4, color: Color.yellow})
            return
        }

        c.segment(A, B, {line: 3})
    }
}

CanvasDraw.define(CartesianLine)
