class CartesianRectOriented extends CanvasDraw {
    static name = 'canvas-cartesian-rect-oriented'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 8, {round: true})

        c.points.push(
            new Point(-3, 5),
            new Point(2, -4),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        let [A, B] = c.points

        A.cartesianRectSwap(c, B)

        c
            .point(A, {name: 'A', color: Color.pointA})
            .point(B, {name: 'B', color: Color.pointB})
            .rect(A, B)
    }
}

CanvasDraw.define(CartesianRectOriented)
