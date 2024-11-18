class CanvasNumberLineSegment extends CanvasDraw {
    static name = 'canvas-number-line-segment'

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(
            new Point(-3, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
        )
    }

    drawOld() {
        this
            .grid({axisY: false})
            .dragRelease()

        for (const p of this.points) p.round = this.round

        let [A, B] = this.points

        if (A.x > B.x) [A, B] = [B, A]

        this
            .pointOld(A, {trackX: true, name: 'A'})
            .pointOld(B, {trackX: true, name: 'B'})
            .segment(A, B)
    }
}

CanvasDraw.define(CanvasNumberLineSegment)
