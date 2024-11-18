class CartesianLineSlope extends CanvasGrid {
    static name = 'canvas-cartesian-line-slope'

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
        )
    }

    draw() {
        // noinspection DuplicatedCode
        this.grid().dragRelease()

        const [A, B] = this.points

        for (const p of this.points) p.round = this.round

        this
            .point(A, {trackX: true, trackY: true, name: 'A'})
            .point(B, {trackX: true, trackY: true, name: 'B'})

        if (A.x === B.x && A.y === B.y) {
            this.text('Прямая не определена', {x: 0, y: 4, color: Color.yellow})
            return
        }

        const A1 = new Point(0, 0)

        const dx = B.x - A.x
        const dy = B.y - A.y

        const B1 = new Point(dx, dy)

        this
            .point(A1, {name: 'A′'})
            .point(B1, {name: 'B′'})
            .segment(A, B, {line: Color.yellow})
            .segment(A1, B1, {line: Color.yellow, dash: [2, 2]})


        if (dx === 0) {
            this.text('Коэффициент не определён', {x: 0, y: 6})
        } else {
            this.text(`Коэффициент равен ${(dy / dx).toFixed(2)} `, {x: 0, y: 6})
        }

    }
}

CanvasGrid.define(CartesianLineSlope)
