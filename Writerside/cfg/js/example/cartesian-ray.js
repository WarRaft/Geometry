class CartesianRay extends CanvasDraw {
    static name = 'canvas-cartesian-ray'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 7, {round: true})

        const A = new Point(2, 3, {name: 'A', color: Color.pointA})
        const B = new Point(-2, 1, {name: 'B', color: Color.pointB})

        c.points.push(A, B)
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points

        A.push(c)
        B.push(c)

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

CanvasDraw.define(CartesianRay)
