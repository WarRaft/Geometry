class CanvasNumberLineAbs extends CanvasDraw {
    static name = 'canvas-number-line-abs'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 2, {round: true})

        c.points.push(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false})
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A] = c.points

        A.push(c)
        const A1 = new Point(Math.abs(A.x), 0, {
            name: '|A|',
            color: Color.pointA1,
            dash: [2, 2],
            round: c.round
        }).push(c)

        c.draw()

        const t = new TextDraw(this)

        t.spans.push(
            new TextSpan('|'),
            new TextSpan(A.name, {color: A.color}),
            new TextSpan('| = |'),
            new TextSpan(A.xs, {color: A.color}),
            new TextSpan('| = '),
            new TextSpan(A1.xs, {color: A1.color}),
        )

        t.draw()

    }
}

CanvasDraw.define(CanvasNumberLineAbs)
