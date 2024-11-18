class CartesianLineEquation extends CanvasGrid {
    static name = 'canvas-cartesian-line-equation'

    get height() {
        return 18
    }

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(
            new Point(2, 3),
            new Point(-2, -5),
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

        this.segment(A, B, {line: Color.yellow})

        if (A.x === B.x) {
            this.text('Уравнение не определено для вертикальной прямой', {x: 0, y: 6, color: Color.yellow})
            return
        }

        const k = (B.y - A.y) / (B.x - A.x)
        const b = A.y - k * A.x

        this.text(`y = ${k.toFixed(2)} * x + ${b.toFixed(2)}`, {x: 0, y: 6})
    }
}

CanvasGrid.define(CartesianLineEquation)
