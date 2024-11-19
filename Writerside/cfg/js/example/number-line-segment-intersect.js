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

        c
            .point(A, {name: 'A', color: Color.red})
            .point(B, {name: 'B', color: Color.green})

            .point(C, {name: 'C', color: Color.blue})
            .point(D, {name: 'D', color: Color.yellow})

        const i = new NumberLineSegmentIntersection(A, B, C, D, c, {x: true})

        c.text(i.X
            ? `Пересечением является [${i.XA.name}, ${i.XB.name}]`
            : 'Отрезки не пересекаются', {
            x: 0,
            y: 2,
            color: i.X ? Color.teal : Color.axis
        })

    }
}

class NumberLineSegmentIntersection {
    /** @type {Point} */ A
    /** @type {Point} */ B
    /** @type {Point} */ C
    /** @type {Point} */ D

    /** @type {boolean} */ X
    /** @type {Point} */ XA
    /** @type {Point} */ XB

    /** @type {boolean} */ Y
    /** @type {Point} */ YA
    /** @type {Point} */ YB

    /**
     * @param {Point} A
     * @param {Point} B
     * @param {Point} C
     * @param {Point} D
     * @param {Cartesian} cartesian
     * @param {boolean} x
     * @param {boolean} y
     */
    constructor(A, B, C, D, cartesian, {x = false, y = false} = {}) {
        const points = [A, B, C, D]

        const draw = () => {
            for (let i = 1; i < points.length; i++) {
                cartesian.segment(points[i - 1], points[i])
            }
        }

        // --- X
        this.XA = A.x > C.x ? A : C
        this.XB = B.x < D.x ? B : D
        this.X = this.XA.x <= this.XB.x

        if (x) {
            if (this.X) {
                points.sort((a, b) => a.x - b.x)
                draw()
            } else {
                cartesian.segment(A, B).segment(C, D)
            }
        }

        // --- Y
        this.YA = A.y > C.y ? A : C
        this.YB = B.y < D.y ? B : D
        this.Y = this.YA.y <= this.YB.y

        if (y) {
            if (this.Y) {
                points.sort((a, b) => a.y - b.y)
                draw()
            } else {
                cartesian.segment(A, B).segment(C, D)
            }
        }
    }
}

CanvasDraw.define(CanvasNumberLineSegmentIntersect)
