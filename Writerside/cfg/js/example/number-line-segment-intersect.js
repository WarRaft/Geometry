class CanvasNumberLineSegmentIntersect extends CanvasDraw {
    static name = 'canvas-number-line-segment-intersect'

    constructor() {
        super()

        this
            .roundInit(true)
            .points.push(
            new Point(-3, 0, {dragY: false}),
            new Point(5, 0, {dragY: false}),
            new Point(1, 0, {dragY: false}),
            new Point(7, 0, {dragY: false}),
        )
    }

    drawOld() {
        this
            .grid({axisY: false})
            .dragRelease()

        for (const p of this.points) p.round = this.round

        let [A, B, C, D] = this.points

        if (A.x > B.x) [A, B] = [B, A]
        if (C.x > D.x) [C, D] = [D, C]

        const lp = A.x > C.x ? A : C
        const rp = B.x < D.x ? B : D
        const intersect = lp.x <= rp.x

        this.text(intersect
            ? `Пересечением является [${A.x > C.x ? 'A' : 'C'}, ${B.x < D.x ? 'B' : 'D'}]`
            : 'Отрезки не пересекаются', {
            x: 0,
            y: 2,
            color: intersect ? Color.teal : Color.axis
        })

        /**
         * @param {Point} a
         * @param {Point} b
         * @param {Color} c
         * @return {Color}
         */
        const pc = (a, b, c) => intersect && a === b ? Color.teal : c

        this
            .pointOld(A, {trackX: true, name: 'A', color: pc(A, lp, Color.yellow)})
            .pointOld(B, {trackX: true, name: 'B', color: pc(B, rp, Color.yellow)})
            .segment(A, B)

            .pointOld(C, {trackX: true, name: 'C', color: pc(C, lp, Color.blue)})
            .pointOld(D, {trackX: true, name: 'D', color: pc(D, rp, Color.blue)})
            .segment(C, D, {color: Color.blue})

        if (intersect) {
            this.segment(lp, rp, {color: Color.teal})
        }
    }
}

CanvasDraw.define(CanvasNumberLineSegmentIntersect)
