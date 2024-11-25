class CanvasNumberLineDistance extends CanvasDraw {
    static name = 'canvas-number-line-distance'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 2, {round: true})
        this.text = new TextDraw(this)

        c.points.push(
            new Point(-6, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(0, 0, {name: 'A′', color: Color.pointA1, drag: false, dash: [2, 2]}),

            new Point(-3, 0, {name: 'B', color: Color.pointB, dragY: false}),
            new Point(0, 0, {name: 'B′', color: Color.pointB1, drag: false, dash: [2, 2]})
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, A1, B, B1] = c.points

        A1.x = A.x - A.x
        B1.x = B.x - A.x

        c.draw()

        this.text.clear().push(
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
        ).draw()
    }
}

CanvasDraw.define(CanvasNumberLineDistance)
