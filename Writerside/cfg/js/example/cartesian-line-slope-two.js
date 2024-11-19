class CartesianLineSlopeTwo extends CanvasDraw {
    static name = 'canvas-cartesian-line-slope-two'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 10, {round: true})

        c.points.push(
            new Point(3, 2),
            new Point(5, -2),
            new Point(1, 3),
            new Point(-5, 0),
        )
    }

    draw() {
        const c = this.cartesian.axis().dragAll()

        const [A, B, C, D] = c.points

        for (const p of c.points) p.round = c.round

        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})
            .point(C, {name: 'C', color: Color.blue})
            .point(D, {name: 'D', color: Color.yellow})


        const errA = A.x === B.x && A.y === B.y
        const errB = C.x === D.x && C.y === D.y

        if (errA) c.text('Прямая AB не определена', {x: 0, y: 8, color: Color.yellow})
        if (errB) c.text('Прямая CD не определена', {x: 0, y: 7, color: Color.yellow})

        if (errA || errB) return

        c
            .segment(A, B, {line: 3})
            .segment(C, D, {line: 3})

        const xA = B.x - A.x
        const yA = B.y - A.y
        const kAB = xA === 0 ? null : yA / xA

        const xB = D.x - C.x
        const yB = D.y - C.y
        const kCD = xB === 0 ? null : yB / xB

        c.text(kAB === null ? 'kAB не определён' : `kAB = ${kAB.toFixed(2)}`, {x: 0, y: 8})
        c.text(kCD === null ? 'kCD не определён' : `kCD = ${kCD.toFixed(2)}`, {x: 0, y: 7})
        if (kAB !== null && kCD !== null) c.text(`kAB * kCD = ${(kAB * kCD).toFixed(2)}`, {x: 0, y: 6})
    }

    redrawOld() {
    }
}

CanvasDraw.define(CartesianLineSlopeTwo)
