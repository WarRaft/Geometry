class CanvasNumberLineSegment extends CanvasDraw {
    static name = 'canvas-number-line-segment'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-3, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false}).drag()

        let [A, B] = c.points

        for (const p of c.points) p.round = c.round

        if (A.x > B.x) [A, B] = [B, A]

        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})
            .segment(A, B)
    }

    redrawOld() {
    }
}

CanvasDraw.define(CanvasNumberLineSegment)
