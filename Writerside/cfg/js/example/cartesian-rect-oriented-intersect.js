class CartesianRectOrientedIntersect extends CanvasDraw {
    static name = 'canvas-cartesian-rect-oriented-intersect'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 15, {round: false})

        c.points.push(
            new Point(-10, 7, {name: 'A', color: Color.pointA}),
            new Point(4, -3, {name: 'B', color: Color.pointB}),
            new Point(-4, 3, {name: 'C', color: Color.pointC}),
            new Point(8, -9, {name: 'D', color: Color.pointD}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, C, D] = c.points

        A.parent(B.draw(c), c).draw(c)
        C.parent(D.draw(c), c).draw(c)


        const Ax = new Point(A.x, 0, {name: 'Ax', color: Color.pointA1, round: c.round}).draw(c)
        const Ay = new Point(0, A.y, {name: 'Ay', color: Color.pointA1, round: c.round}).draw(c)

        const Bx = new Point(B.x, 0, {name: 'Bx', color: Color.pointB1, round: c.round}).draw(c)
        const By = new Point(0, B.y, {name: 'By', color: Color.pointB1, round: c.round}).draw(c)

        const Cx = new Point(C.x, 0, {name: 'Cx', color: Color.pointC1, round: c.round}).draw(c)
        const Cy = new Point(0, C.y, {name: 'Cy', color: Color.pointC1, round: c.round}).draw(c)

        const Dx = new Point(D.x, 0, {name: 'Dx', color: Color.pointD1, round: c.round}).draw(c)
        const Dy = new Point(0, D.y, {name: 'Dy', color: Color.pointD1, round: c.round}).draw(c)

        new Rect(A, B).draw(c)
        new Rect(C, D).draw(c)

        const ix = new NumberLineSegmentIntersection(Ax, Bx, Cx, Dx, c, {x: true})
        const iy = new NumberLineSegmentIntersection(By, Ay, Dy, Cy, c, {y: true})

        if (ix.X && iy.Y) {
            const lt = new Point(ix.XA.x, iy.YB.y, {hidden: true}).draw(c)
            const rb = new Point(ix.XB.x, iy.YA.y, {hidden: true}).draw(c)
            const rt = new Point(rb.x, lt.y, {hidden: true}).draw(c)
            const lb = new Point(lt.x, rb.y, {hidden: true}).draw(c)

            new Polygon([
                lt, rt, rb, lb
            ]).draw(c)

            c
                .text(`Пересечение по оси X: ${ix.XA.name}, ${ix.XB.name}`, {x: 0, y: 12})
                .text(`Пересечение по оси Y: ${iy.YA.name}, ${iy.YB.name}`, {x: 0, y: 11})
        }

        c.draw()
    }
}

CanvasDraw.define(CartesianRectOrientedIntersect)
