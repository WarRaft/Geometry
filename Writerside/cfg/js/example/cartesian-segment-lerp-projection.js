class CartesianSegmentLerpProjection extends CanvasDraw {
    static name = 'canvas-cartesian-segment-lerp-projection'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 12, {round: true})
        this.text = new TextDraw(this)

        const A = new Point(4, 3, {name: 'A', color: Color.pointA})
        const Ax = new Point(0, 0, {name: 'Ax', color: Color.pointA1, drag: false})
        const Ay = new Point(0, 0, {name: 'Ay', color: Color.pointA1, drag: false})

        const B = new Point(16, 10, {name: 'B', color: Color.pointB})
        const Bx = new Point(0, 0, {name: 'Bx', color: Color.pointB1, drag: false})
        const By = new Point(0, 0, {name: 'By', color: Color.pointB1, drag: false})

        const C = new Point(0, 0, {name: 'C', color: Color.pointC, roundIgnore: true})
        const Cx = new Point(0, 0, {name: 'Cx', color: Color.pointC1, drag: false, roundIgnore: true})
        const Cy = new Point(0, 0, {name: 'Cy', color: Color.pointC1, drag: false, roundIgnore: true})

        c.points.push(
            A, Ax, Ay,
            B, Bx, By,
            C, Cx, Cy
        )
        c.segments.push(
            new Segment(A, C),
            new Segment(B, C),
            new Segment(A, Ax, {dash: [2, 2]}),
            new Segment(A, Ay, {dash: [2, 2]}),
            new Segment(B, Bx, {dash: [2, 2]}),
            new Segment(B, By, {dash: [2, 2]}),
            new Segment(C, Cx, {dash: [2, 2]}),
            new Segment(C, Cy, {dash: [2, 2]}),
            new Segment(Ax, Cx, {dash: [2, 2]}),
            new Segment(Bx, Cx, {dash: [2, 2]}),
            new Segment(Ay, Cy, {dash: [2, 2]}),
            new Segment(By, Cy, {dash: [2, 2]}),
        )
    }

    draw() {
        const c = this.cartesian.axis({xalign: -1, yalign: -1})
        const k = this.lerpK

        const [
            A, Ax, Ay,
            B, Bx, By,
            C, Cx, Cy
        ] = c.points

        Ax.x = A.x
        Ay.y = A.y

        Bx.x = B.x
        By.y = B.y

        C.position(
            A.x + (B.x - A.x) * k,
            A.y + (B.y - A.y) * k,
        )
        Cx.x = C.x
        Cy.y = C.y

        c.draw()
    }
}

CanvasDraw.define(CartesianSegmentLerpProjection)
