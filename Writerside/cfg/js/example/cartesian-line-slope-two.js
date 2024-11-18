class CartesianLineSlopeTwo extends CanvasGrid {
    static name = 'canvas-cartesian-line-slope-two'

    get height() {
        return 20
    }

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(
            new Point(3, 2),
            new Point(5, -2),
            new Point(1, 3),
            new Point(-5, 0),
        )
    }

    draw() {
        this.grid().dragRelease()

        const [A, B, C, D] = this.points

        for (const p of this.points) p.round = this.round

        this
            .point(A, {name: 'A'})
            .point(B, {name: 'B'})
            .point(C, {name: 'C'})
            .point(D, {name: 'D'})


        const errA = A.x === B.x && A.y === B.y
        const errB = C.x === D.x && C.y === D.y

        if (errA) this.text('Прямая AB не определена', {x: 0, y: 8, color: Color.yellow})
        if (errB) this.text('Прямая CD не определена', {x: 0, y: 7, color: Color.yellow})

        if (errA || errB) return

        this
            .segment(A, B, {line: Color.yellow})
            .segment(C, D, {line: Color.yellow})

        const xA = B.x - A.x
        const yA = B.y - A.y
        const kAB = xA === 0 ? null : yA / xA

        const xB = D.x - C.x
        const yB = D.y - C.y
        const kCD = xB === 0 ? null : yB / xB

        this.text(kAB === null ? 'kAB не определён' : `kAB = ${kAB.toFixed(2)}`, {x: 0, y: 8})
        this.text(kCD === null ? 'kCD не определён' : `kCD = ${kCD.toFixed(2)}`, {x: 0, y: 7})
        if (kAB !== null && kCD !== null) this.text(`kAB * kCD = ${(kAB * kCD).toFixed(2)}`, {x: 0, y: 6})
    }
}

CanvasGrid.define(CartesianLineSlopeTwo)
