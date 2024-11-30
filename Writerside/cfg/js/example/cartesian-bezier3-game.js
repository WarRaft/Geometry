class CartesianBezier3Game extends CanvasDraw {
    static name = 'canvas-cartesian-bezier3-game'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 14, {round: false})
        this.text = new TextDraw(this)

        const C = new Point(10, 9, {name: 'C', subname: null, color: Color.pointA})

        const T = new Point(15, 16, {name: 'T', subname: null, color: Color.pointB})

        const A0 = new Point(0, 0, {name: 'A', subname: '0', color: Color.pointC, drag: false, roundIgnore: true})
        const A0B = new Point(0, 0, {name: 'A', subname: null, color: Color.pointC, drag: false, roundIgnore: true})
        const A1 = new Point(0, 0, {name: 'A', subname: '1', color: Color.pointC, drag: false, roundIgnore: true})
        const A1B = new Point(0, 0, {name: 'A', subname: null, color: Color.pointC, drag: false, roundIgnore: true})

        const B0 = new Point(0, 0, {name: 'B', subname: '0', color: Color.pointD, drag: false, roundIgnore: true})
        const B0B = new Point(0, 0, {name: 'B', subname: null, color: Color.pointD, drag: false, roundIgnore: true})
        const B1 = new Point(0, 0, {name: 'B', subname: '1', color: Color.pointD, drag: false, roundIgnore: true})
        const B1B = new Point(0, 0, {name: 'B', subname: null, color: Color.pointD, drag: false, roundIgnore: true})


        c.points.push(C, T, A0, A0B, A1, A1B, B0, B0B, B1, B1B)
        c.segments.push()
        c.beziers3.push(
            new Bezier3(C, A0, T, A0B),
            new Bezier3(C, A1, T, A1B),
            new Bezier3(C, B0, T, B0B),
            new Bezier3(C, B1, T, B1B)
        )
    }

    draw() {
        const c = this.cartesian.axis({xalign: -1, yalign: -1})

        const k = this.lerpK

        const [C, T, A0, A0B, A1, A1B, B0, B0B, B1, B1B] = c.points


        /**
         * @param {Point} a
         * @param {Point} b
         * @param {Point} c
         */
        const r90 = (a, b, c) => {
            c.position(a.x + b.y - a.y, a.y - b.x + a.x)
        }

        /**
         * @param {Point} a
         * @param {Point} b
         * @param {Point} c
         */
        const l90 = (a, b, c) => {
            c.position(a.x - b.y + a.y, a.y + b.x - a.x)
        }


        r90(C, T, A0)
        l90(C, T, A1)
        const k0 = k * k
        A0B.bezier3(C, A0, T, k0)
        A1B.bezier3(C, A1, T, k0)

        r90(T, C, B0)
        l90(T, C, B1)
        const k1 = k * k * k
        B0B.bezier3(C, B0, T, k1)
        B1B.bezier3(C, B1, T, k1)

        c.draw()
    }
}

CanvasDraw.define(CartesianBezier3Game)
