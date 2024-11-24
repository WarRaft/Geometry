class CanvasNumberLineDistance extends CanvasDraw {
    static name = 'canvas-number-line-distance'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 2, {round: true})

        c.points.push(
            new Point(-6, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(-3, 0, {name: 'B', color: Color.pointB, dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, B] = c.points

        A.push(c)
        new Point(0, 0, {name: 'A′', color: Color.pointA1, dash: [2, 2], round: c.round}).push(c)

        B.push(c)
        const B1 = new Point(B.x - A.x, 0, {name: 'B′', color: Color.pointB1, dash: [2, 2], round: c.round}).push(c)

        c.draw()

        const t = new TextDraw(this)

        t.spans.push(
            new TextSpan('S = |'),
            new TextSpan(B.name, {color: B.color}),
            new TextSpan(' - '),
            new TextSpan(A.name, {color: A.color}),
            new TextSpan('| = |'),
            new TextSpan(B.xs, {color: B.color}),
            new TextSpan(' - '),
            new TextSpan(A.xs, {color: A.color}),
            new TextSpan('| = |'),
            new TextSpan(B1.xs, {color: B1.color}),
            new TextSpan('| = '),
            new TextSpan(B1.xsabs),
        )

        t.draw()
    }
}

CanvasDraw.define(CanvasNumberLineDistance)
