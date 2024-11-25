class CartesianRectOrientedIntersect extends CanvasDraw {
    static name = 'canvas-cartesian-rect-oriented-intersect'

    xalign = 0
    yalign = 0

    height() {
        return 15
    }

    ABCD() {
        return [
            -10, 7,
            4, -3,
            -4, 3,
            8, -9,
        ]
    }

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, this.height(), {round: true})
        this.text = new TextDraw(this)

        const p = this.ABCD()

        const AB = new Rect(
            new Point(p[0], p[1], {name: 'A', color: Color.pointA}),
            new Point(p[2], p[3], {name: 'B', color: Color.pointB}),
        )
        const CD = new Rect(
            new Point(p[4], p[5], {name: 'C', color: Color.pointC}),
            new Point(p[6], p[7], {name: 'D', color: Color.pointD}),
        )

        const X = this.X = new NumberLineSegmentX(
            new Point(0, 0, {name: 'Ax', color: Color.pointA1, drag: false}),
            new Point(0, 0, {name: 'Bx', color: Color.pointB1, drag: false}),
            new Point(0, 0, {name: 'Cx', color: Color.pointC1, drag: false}),
            new Point(0, 0, {name: 'Dx', color: Color.pointD1, drag: false}),
            new Segment(null, null),
            new Segment(null, null),
            new Segment(null, null),
        )

        const Y = this.Y = new NumberLineSegmentX(
            new Point(0, 0, {name: 'By', color: Color.pointB1, drag: false}),
            new Point(0, 0, {name: 'Ay', color: Color.pointA1, drag: false}),
            new Point(0, 0, {name: 'Dy', color: Color.pointD1, drag: false}),
            new Point(0, 0, {name: 'Cy', color: Color.pointC1, drag: false}),
            new Segment(null, null),
            new Segment(null, null),
            new Segment(null, null),
        )

        const poly = new Polygon([], {hidden: true})
        for (let i = 0; i < 4; i++) poly.points.push(new Point(0, 0, {hidden: true}))

        c.polygons.push(poly)

        c.points.push(...AB.points, ...CD.points, ...X.points, ...Y.points, ...poly.points)
        const dash = [5, 5]

        c.segments.push(
            new Segment(AB.A, X.A, {dash: dash}),
            new Segment(AB.A, Y.B, {dash: dash}),
            new Segment(AB.B, X.B, {dash: dash}),
            new Segment(AB.B, Y.A, {dash: dash}),
            new Segment(CD.A, X.C, {dash: dash}),
            new Segment(CD.A, Y.D, {dash: dash}),
            new Segment(CD.B, X.D, {dash: dash}),
            new Segment(CD.B, Y.C, {dash: dash}),
            ...X.segments,
            ...Y.segments,
        )

        c.rects.push(AB, CD)
    }


    draw() {
        const c = this.cartesian.axis({xalign: this.xalign, yalign: this.yalign})

        const [A, B, C, D] = c.points

        A.parent(B, c)
        C.parent(D, c)

        const t = this.text.clear()

        const X = this.X
        X.A.x = A.x
        X.B.x = B.x
        X.C.x = C.x
        X.D.x = D.x
        X.calcX()

        const Y = this.Y
        Y.A.y = B.y
        Y.B.y = A.y
        Y.C.y = D.y
        Y.D.y = C.y
        Y.calcY()

        const [poly] = c.polygons
        if (X.value && Y.value) {
            poly.hidden = false
            poly.points[0].position(X.MIN.x, Y.MAX.y)
            poly.points[1].position(X.MAX.x, Y.MAX.y)
            poly.points[2].position(X.MAX.x, Y.MIN.y)
            poly.points[3].position(X.MIN.x, Y.MIN.y)

            t.spans.push(
                new TextSpan('Пересечение по оси X = ['),
                new TextSpan(X.MIN.name, {color: X.MIN.color}),
                new TextSpan(', '),
                new TextSpan(X.MAX.name, {color: X.MAX.color}),
                new TextSpan(']'),

                new TextSpan('\n'),

                new TextSpan('Пересечение по оси Y = ['),
                new TextSpan(Y.MIN.name, {color: Y.MIN.color}),
                new TextSpan(', '),
                new TextSpan(Y.MAX.name, {color: Y.MAX.color}),
                new TextSpan(']'),
            )
        } else {
            t.spans.push(new TextSpan('Прямоугольники не пересекаются'))
            poly.hidden = true
        }

        c.draw()
        t.draw({xalign: this.xalign < 0 ? 1 : 0})
    }
}

CanvasDraw.define(CartesianRectOrientedIntersect)
