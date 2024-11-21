class CartesianPointDistanceB extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-b'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 9, {round: true})

        c.points.push(
            new Point(5, -2),
            new Point(8, -6),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points

        const dx = B.x - A.x
        const dy = B.y - A.y

        const d = Math.sqrt(dx * dx + dy * dy)

        const A1 = new Point(0, 0, {round: c.round})
        const B1 = new Point(dx, dy, {round: c.round})

        c
            .pointOld(A, {name: 'A', color: Color.pointA})
            .pointOld(B, {name: 'B', color: Color.pointB})
            .segment(A, B)

            .pointOld(A1, {name: 'A′', color: Color.pointA1, dash: [2, 2]})
            .pointOld(B1, {name: 'B′', color: Color.pointB1, dash: [2, 2]})
            .segment(A1, B1, {dash: [2, 2]})

            .text(`Расстояние ${d.toFixed(2)}`, {x: 0, y: 5})
    }
}

CanvasDraw.define(CartesianPointDistanceB)
