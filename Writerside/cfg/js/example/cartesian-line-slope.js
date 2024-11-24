class CartesianLineSlope extends CanvasDraw {
    static name = 'canvas-cartesian-line-slope'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 8, {round: true})

        c.points.push(
            new Point(3, 2, {name: 'A', color: Color.pointA}),
            new Point(5, -2, {name: 'B', color: Color.pointB}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B] = c.points

        const t = new TextDraw(this)
        const kAB = new CartesianLineSloper(c, t, A, B)

        if (kAB.hasL) {
            const A1 = new Point(0, 0, {name: 'A′', color: Color.pointA1, dash: [2, 2]}).push(c)
            const B1 = new Point(kAB.dx, kAB.dy, {name: 'B′', color: Color.pointB1, dash: [2, 2]}).push(c)
            new Segment(A1, B1, {line: 3, dash: [2, 2]}).draw(c)
        }

        c.draw()
        t.draw()
    }
}

CanvasDraw.define(CartesianLineSlope)

class CartesianLineSloper {
    /**
     * @param {Cartesian} c
     * @param {TextDraw} t
     * @param {Point} a
     * @param {Point} b
     */
    constructor(c, t, a, b) {
        this.a = a.push(c)
        this.b = b.push(c)
        this.t = t

        if (a.x === b.x && a.y === b.y) {
            t.noline(a, b)
            return
        }

        this.hasL = true
        new Segment(a, b, {line: 3}).draw(c)

        t.spans.push(
            ...this.name,
        )

        const dx = this.dx = b.x - a.x
        const dy = this.dy = b.y - a.y

        if (dx === 0) {
            t.spans.push(new TextSpan(' не определён'))
        } else {
            this.hasK = true
            this.k = dy / dx
            t.spans.push(new TextSpan(` = ${this.k.toFixed(2)}`))
        }
        t.spans.push(new TextSpan('\n'))
    }

    hasL = false
    hasK = false
    dx = 0
    dy = 0
    k = 0

    /**
     * @return {TextSpan[]}
     */
    get name() {
        return [
            new TextSpan('k'),
            new TextSpan(this.a.name, {color: this.a.color}),
            new TextSpan(this.b.name, {color: this.b.color})
        ]
    }
}
