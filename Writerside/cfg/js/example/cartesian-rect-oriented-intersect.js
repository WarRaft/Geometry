class CartesianRectOrientedIntersect extends CanvasDraw {
    static name = 'canvas-cartesian-rect-oriented-intersect'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 15, {round: true})

        c.points.push(
            new Point(-10, 7),
            new Point(4, -3),
            new Point(-4, 3),
            new Point(8, -9),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        let [A, B, C, D] = c.points

        A.cartesianRectSwap(c, B)
        C.cartesianRectSwap(c, D)

        const Ax = new Point(A.x, 0)
        const Ay = new Point(0, A.y)
        Ax.round = Ay.round = c.round

        const Bx = new Point(B.x, 0)
        const By = new Point(0, B.y)
        Bx.round = By.round = c.round

        const Cx = new Point(C.x, 0)
        const Cy = new Point(0, C.y)
        Cx.round = Cy.round = c.round

        const Dx = new Point(D.x, 0)
        const Dy = new Point(0, D.y)
        Dx.round = Dy.round = c.round

        c
            .point(A, {name: 'A', color: Color.pointA})
            .point(Ax, {name: 'Ax', color: Color.pointA1})
            .point(Ay, {name: 'Ay', color: Color.pointA1})

            .point(B, {name: 'B', color: Color.pointB})
            .point(Bx, {name: 'Bx', color: Color.pointB1})
            .point(By, {name: 'By', color: Color.pointB1})

            .point(C, {name: 'C', color: Color.pointC})
            .point(Cx, {name: 'Cx', color: Color.pointC1})
            .point(Cy, {name: 'Cy', color: Color.pointC1})

            .point(D, {name: 'D', color: Color.pointD})
            .point(Dx, {name: 'Dx', color: Color.pointD1})
            .point(Dy, {name: 'Dy', color: Color.pointD1})

            .rect(A, B)
            .rect(C, D)

        const ix = new NumberLineSegmentIntersection(Ax, Bx, Cx, Dx, c, {x: true})
        const iy = new NumberLineSegmentIntersection(By, Ay, Dy, Cy, c, {y: true})

        if (ix.X && iy.Y) {
            const lt = new Point(ix.XA.x, iy.YB.y)
            const rb = new Point(ix.XB.x, iy.YA.y)
            const rt = new Point(rb.x, lt.y)
            const lb = new Point(lt.x, rb.y)

            c
                .text(`Пересечение по оси X: ${ix.XA.name}, ${ix.XB.name}`, {x: 0, y: 12})
                .text(`Пересечение по оси Y: ${iy.YA.name}, ${iy.YB.name}`, {x: 0, y: 11})
                .polygon([lt, rt, rb, lb])

        }


    }
}

CanvasDraw.define(CartesianRectOrientedIntersect)