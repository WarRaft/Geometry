class CanvasNumberLine extends CanvasDraw {
    static name = 'canvas-number-line'

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(
            new Point(-5, 0, {color: Color.yellow, dragY: false}),
            new Point(5, 0, {dragY: false}),
            new Point(0, 0, {dragY: false})
        )

        this.cartesian = new Cartesian(this, 5)
    }

    draw() {
        this.cartesian.axis()

        if (0) {
            this
                .grid({axisY: false})
                .dragRelease()

            const [A, B, X] = this.points

            for (const p of this.points) p.round = this.round


            this
                .pointOld(A, {trackX: true, name: 'A'})
                .pointOld(B, {trackX: true, name: 'B'})
                .pointOld(X, {trackX: true, name: 'X'})
        }
    }

    redrawOld() {

    }
}

CanvasDraw.define(CanvasNumberLine)
