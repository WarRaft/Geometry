class CanvasNumberLineAbs extends CanvasDraw {
    static name = 'canvas-number-line-abs'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 2, {round: true})
        this.text = new TextDraw(this)

        c.points.push(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(0, 0, {name: '|A|', color: Color.pointA1, drag: false, dash: [2, 2]}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, A1] = c.points

        A1.x = Math.abs(A.x)

        c.draw()

        this.text.clear().push(
            new TextSpan('|'),
            new TextSpan(A.name, {color: A.color}),
            new TextSpan('| = |'),
            new TextSpan(A.xs, {color: A.color}),
            new TextSpan('| = '),
            new TextSpan(A1.xs, {color: A1.color}),
        ).draw()
    }
}

CanvasDraw.define(CanvasNumberLineAbs)
