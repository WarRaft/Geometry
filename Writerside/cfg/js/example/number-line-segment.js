class CanvasNumberLineSegment extends CanvasGrid {
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

    draw() {
        this
            .grid({axisY: false})
            .dragRelease()

        for (const p of this.points) p.round = this.round

        let [A, B] = this.points

        if (A.x > B.x) [A, B] = [B, A]

        this
            .point(A, {trackX: true, name: 'A'})
            .point(B, {trackX: true, name: 'B'})
            .segment(A, B)
    }
}

CanvasGrid.define(CanvasNumberLineSegment)
