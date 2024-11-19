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
            .point(A, {name: 'A', color: Color.red})
            .point(Ax, {name: 'Ax', color: Color.redA})
            .point(Ay, {name: 'Ay', color: Color.redA})

            .point(B, {name: 'B', color: Color.green})
            .point(Bx, {name: 'Bx', color: Color.greenA})
            .point(By, {name: 'By', color: Color.greenA})

            .point(C, {name: 'C', color: Color.blue})
            .point(Cx, {name: 'Cx', color: Color.blueA})
            .point(Cy, {name: 'Cy', color: Color.blueA})

            .point(D, {name: 'D', color: Color.yellow})
            .point(Dx, {name: 'Dx', color: Color.yellowA})
            .point(Dy, {name: 'Dy', color: Color.yellowA})

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
