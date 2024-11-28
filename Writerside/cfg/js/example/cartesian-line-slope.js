class CartesianLineSlope extends CanvasDraw {
    static name = 'canvas-cartesian-line-slope'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 8, {round: true})
        this.text = new TextDraw(this)

        const AB = new CartesianLineSloper(
            new Point(3, 2, {name: 'A', color: Color.pointA}),
            new Point(5, -2, {name: 'B', color: Color.pointB}),
        )

        const AB1 = new Segment(
            new Point(0, 0, {name: 'A′', color: Color.pointA1, drag: false, dash: [2, 2]}),
            new Point(0, 0, {name: 'B′', color: Color.pointB1, drag: false, dash: [2, 2]})
        )

        c.points.push(...AB.points, ...AB1.points)
        c.segments.push(AB, AB1)
    }

    draw() {
        const c = this.cartesian.axis()

        const [AB, AB1] = /** @type {CartesianLineSloper[]} */ c.segments

        const [, , , B1] = c.points

        B1.position(AB.dx, AB.dy)

        this.text.clear()

        AB.calc(this.text).lineOld = AB.hasL ? 3 : 0
        AB1.line = AB.hasL ? 3 : 0

        c.draw()
        this.text.draw()
    }
}
CanvasDraw.define(CartesianLineSlope)

class CartesianLineSloper extends Segment {

    hasL = false
    hasK = false
    dx = 0
    dy = 0
    k = 0

    /**
     * @param {TextDraw} t
     */
    calc(t) {
        const A = this.A, B = this.B

        const dx = this.dx = B.x - A.x
        const dy = this.dy = B.y - A.y

        this.hasL = false
        this.hasK = false

        if (A.x === B.x && A.y === B.y) {
            t.noline(A, B)
            return this
        }

        this.hasL = true
        this.lineOld = 3

        t.spans.push(
            ...this.textName,
        )

        if (dx === 0) {
            t.spans.push(new TextSpan(' не определён'))

        } else {
            this.hasK = true
            this.k = dy / dx
            t.spans.push(new TextSpan(` = ${this.k.toFixed(2)}`))
        }
        t.spans.push(new TextSpan('\n'))

        return this
    }

    /** @return {TextSpan[]} */ get textName() {
        return [
            new TextSpan('k'),
            new TextSpan(this.A.name, {color: this.A.color}),
            new TextSpan(this.B.name, {color: this.B.color})
        ]
    }
}
