class CartesianBezier3 extends CanvasDraw {
    static name = 'canvas-cartesian-bezier3'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 10, {round: false})
        this.text = new TextDraw(this)

        const P0 = new Point(2, 3, {name: 'P', subname: '0', color: Color.pointA})
        const P1 = new Point(7, 13, {name: 'P', subname: '1', color: Color.pointA})
        const P2 = new Point(12, 4, {name: 'P', subname: '2', color: Color.pointA})

        const Q0 = new Point(0, 0, {name: 'Q', subname: '0', color: Color.pointB, drag: false, roundIgnore: true})
        const Q1 = new Point(0, 0, {name: 'Q', subname: '1', color: Color.pointB, drag: false, roundIgnore: true})

        const R = new Point(0, 0, {name: 'R', subname: null, color: Color.pointC, drag: false, roundIgnore: true})

        c.points.push(P0, P1, P2, Q0, Q1, R)
        c.segments.push(
            new Segment(P0, Q0, {dash: [2, 2]}),
            new Segment(P1, Q0, {dash: [2, 2]}),
            new Segment(P1, Q1, {dash: [2, 2]}),
            new Segment(P2, Q1, {dash: [2, 2]}),
            new Segment(R, Q0, {dash: [2, 2]}),
            new Segment(R, Q1, {dash: [2, 2]}),
        )
        c.beziers3.push(
            new Bezier3(P0, P1, P2, R)
        )
    }

    draw() {
        const c = this.cartesian.axis({xalign: -1, yalign: -1})

        const [P0, P1, P2, Q0, Q1, R] = c.points
        const k = this.lerpK

        Q0.x = P0.x * (1 - k) + P1.x * k
        Q0.y = P0.y * (1 - k) + P1.y * k

        Q1.x = P1.x * (1 - k) + P2.x * k
        Q1.y = P1.y * (1 - k) + P2.y * k

        R.x = Q0.x * (1 - k) + Q1.x * k
        R.y = Q0.y * (1 - k) + Q1.y * k

        const k0 = (1 - k) ** 2
        const k2 = k * k
        const k1 = k - k2

        R.x = k0 * P0.x + 2 * k1 * P1.x + k2 * P2.x
        R.y = k0 * P0.y + 2 * k1 * P1.y + k2 * P2.y

        c.draw()
    }
}

CanvasDraw.define(CartesianBezier3)
