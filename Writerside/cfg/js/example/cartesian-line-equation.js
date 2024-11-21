class CartesianLineEquation extends CanvasDraw {
    static name = 'canvas-cartesian-line-equation'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 10, {round: true})

        c.points.push(
            new Point(2, 3, {name: 'A', color: Color.pointA}),
            new Point(-2, -5, {name: 'B', color: Color.pointB}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points

        A.draw(c)
        B.draw(c)

        if (A.x === B.x && A.y === B.y) {
            c.draw()
            c.text('Прямая не определена', {x: 0, y: 4, color: Color.pointA})
            return
        }

        new Segment(A, B, {line: 3}).draw(c)

        if (A.x === B.x) {
            c.draw()
            c.text('Уравнение не определено для вертикальной прямой', {x: 0, y: 6, color: Color.pointA})
            return
        }

        const k = (B.y - A.y) / (B.x - A.x)
        const b = A.y - k * A.x

        c.draw()
        c.text(`y = ${k.toFixed(2)} * x + ${b.toFixed(2)}`, {x: 0, y: 6})
    }
}

CanvasDraw.define(CartesianLineEquation)
