class CartesianPointDistanceA extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-a'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})

        c.points.push(
            new Point(4, 3, {name: 'A', color: Color.pointA}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A] = c.points

        A.draw(c)
        const O = new Point(0, 0, {color: Color.pointA1, dash: [2, 2], round: c.round}).draw(c)

        new Segment(A, O, {dash: [2, 2]}).draw(c)

        c.draw()

        const d = Math.sqrt(A.x * A.x + A.y * A.y)
        c.text(`Расстояние ${d.toFixed(2)}`, {x: 0, y: 4})
    }
}

CanvasDraw.define(CartesianPointDistanceA)
