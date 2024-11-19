class CanvasNumberLineSegmentIntersect extends CanvasDraw {
    static name = 'canvas-number-line-segment-intersect'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-5, 0, {dragY: false}),
            new Point(1, 0, {dragY: false}),
            new Point(-2, 0, {dragY: false}),
            new Point(4, 0, {dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        let [A, B, C, D] = c.points

        if (A.x > B.x) [A, B] = [B, A]
        if (C.x > D.x) [C, D] = [D, C]

        const lp = A.x > C.x ? A : C
        const rp = B.x < D.x ? B : D
        const intersect = lp.x <= rp.x

        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})

            .point(C, {name: 'C', color: Color.blue})
            .point(D, {name: 'D', color: Color.yellow})

        c.text(intersect
            ? `Пересечением является [${lp.name}, ${rp.name}]`
            : 'Отрезки не пересекаются', {
            x: 0,
            y: 2,
            color: intersect ? Color.teal : Color.axis
        })

        if (intersect) {
            const points = [A, B, C, D].sort((a, b) => a.x - b.x)
            for (let i = 1; i < points.length; i++) {
                c.segment(points[i - 1], points[i])
            }
        } else {
            c
                .segment(A, B)
                .segment(C, D)
        }


    }
}

CanvasDraw.define(CanvasNumberLineSegmentIntersect)
