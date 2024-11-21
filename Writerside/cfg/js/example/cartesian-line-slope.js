class CartesianLineSlope extends CanvasDraw {
    static name = 'canvas-cartesian-line-slope'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 8, {round: true})

        c.points.push(
            new Point(3, 2),
            new Point(5, -2),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points


        c
            .pointOld(A, {name: 'A', color: Color.pointA})
            .pointOld(B, {name: 'B', color: Color.pointB})

        if (A.x === B.x && A.y === B.y) {
            c.text('Прямая не определена', {x: 0, y: 4, color: Color.pointA})
            return
        }

        const A1 = new Point(0, 0)

        const dx = B.x - A.x
        const dy = B.y - A.y

        const B1 = new Point(dx, dy)

        c
            .pointOld(A1, {name: 'A′', color: Color.pointA1, dash: [2, 2]})
            .pointOld(B1, {name: 'B′', color: Color.pointB1, dash: [2, 2]})
            .segment(A, B, {line: 3})
            .segment(A1, B1, {line: 3, dash: [2, 2]})


        if (dx === 0) {
            c.text('Коэффициент не определён', {x: 0, y: 6})
        } else {
            c.text(`Коэффициент равен ${(dy / dx).toFixed(2)} `, {x: 0, y: 6})
        }
    }
}

CanvasDraw.define(CartesianLineSlope)
