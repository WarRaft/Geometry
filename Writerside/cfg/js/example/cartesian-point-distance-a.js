class CartesianPointDistanceA extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-a'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})

        c.points.push(
            new Point(4, 3),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A] = c.points

        const O = new Point(0, 0)


        const d = Math.sqrt(A.x * A.x + A.y * A.y)

        c
            .point(A, {name: 'A', color: Color.pointA})
            .point(O, {color: Color.pointA1, dash: [2, 2]})
            .segment(A, O, {dash: [2, 2]})
            .text(`Расстояние ${d.toFixed(2)}`, {x: 0, y: 4})
    }
}

CanvasDraw.define(CartesianPointDistanceA)
