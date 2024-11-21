class CartesianLineSlopeTwo extends CanvasDraw {
    static name = 'canvas-cartesian-line-slope-two'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 10, {round: true})

        c.points.push(
            new Point(3, 2, {name: 'A', color: Color.pointA}),
            new Point(5, -2, {name: 'B', color: Color.pointB}),
            new Point(1, 3, {name: 'C', color: Color.pointC}),
            new Point(-5, 0, {name: 'D', color: Color.pointD}),
        )
    }

    draw() {
        const c = this.cartesian.axis()

        const [A, B, C, D] = c.points

        A.draw(c)
        B.draw(c)
        C.draw(c)
        D.draw(c)

        const errA = A.x === B.x && A.y === B.y
        const errB = C.x === D.x && C.y === D.y

        if (errA) c.text('Прямая AB не определена', {x: 0, y: 8, color: Color.pointA})
        if (errB) c.text('Прямая CD не определена', {x: 0, y: 7, color: Color.pointA})

        if (errA || errB) {
            c.draw()
            return
        }

        new Segment(A, B, {line: 3}).draw(c)
        new Segment(C, D, {line: 3}).draw(c)

        const xA = B.x - A.x
        const yA = B.y - A.y
        const kAB = xA === 0 ? null : yA / xA

        const xB = D.x - C.x
        const yB = D.y - C.y
        const kCD = xB === 0 ? null : yB / xB

        c.draw()

        c.text(kAB === null ? 'kAB не определён' : `kAB = ${kAB.toFixed(2)}`, {x: 0, y: 8})
        c.text(kCD === null ? 'kCD не определён' : `kCD = ${kCD.toFixed(2)}`, {x: 0, y: 7})
        if (kAB !== null && kCD !== null) c.text(`kAB * kCD = ${(kAB * kCD).toFixed(2)}`, {x: 0, y: 6})
    }
}

CanvasDraw.define(CartesianLineSlopeTwo)
