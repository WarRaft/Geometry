// noinspection JSSuspiciousNameCombination

class CartesianPointRotate90 extends CanvasDraw {
    static name = 'canvas-cartesian-point-rotate90'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 9, {round: true})

        const A = new Point(5, -2, {name: 'A', color: Color.pointA})
        const B = new Point(8, 1, {name: 'B', color: Color.pointB})


        const A1 = new Point(0, 0, {name: 'A′', color: Color.pointA1, dash: [2, 2], drag: false})
        const B1 = new Point(0, 0, {name: 'B′', color: Color.pointB1, dash: [2, 2], drag: false})


        const L = new Point(0, 0, {name: 'L', color: Color.pointC, dash: [2, 2], drag: false})
        const L1 = new Point(0, 0, {name: 'L′', color: Color.pointC1, dash: [2, 2], drag: false})

        const R = new Point(0, 0, {name: 'R', color: Color.pointD, dash: [2, 2], drag: false})
        const R1 = new Point(0, 0, {name: 'R′', color: Color.pointD1, dash: [2, 2], drag: false})

        c.points.push(A, B, A1, B1, L, L1, R, R1)
        c.segments.push(
            new Segment(A, B),
            new Segment(A, L, {dash: [2, 2]}),
            new Segment(A, R, {dash: [2, 2]}),
            new Segment(A1, B1, {dash: [2, 2]}),
            new Segment(A1, L1, {dash: [2, 2]}),
            new Segment(A1, R1, {dash: [2, 2]})
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, , B1, L, L1, R, R1] = c.points

        B1.position(B.x - A.x, B.y - A.y)

        L1.position(A.y - B.y, B.x - A.x)
        R1.position(B.y - A.y, A.x - B.x)

        L.position(A.x - B.y + A.y, A.y + B.x - A.x)
        R.position(A.x + B.y - A.y, A.y - B.x + A.x)

        c.draw()
    }
}

CanvasDraw.define(CartesianPointRotate90)
