class CanvasNumberLineSegmentIntersect extends CanvasDraw {
    static name = 'canvas-number-line-segment-intersect'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        c.points.push(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(1, 0, {name: 'B', color: Color.pointB, dragY: false}),
            new Point(-2, 0, {name: 'C', color: Color.pointC, dragY: false}),
            new Point(4, 0, {name: 'D', color: Color.pointD, dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        let [A, B, C, D] = c.points

        A.parent(B.push(c), c).push(c)
        C.parent(D.push(c), c).push(c)

        const i = new NumberLineSegmentIntersection(A, B, C, D, c, {x: true})

        c.draw()

        const t = new TextDraw(this)

        if (i.X) {
            t.spans.push(
                new TextSpan('Пересечением является ['),
                new TextSpan(i.XA.name, {color: i.XA.color}),
                new TextSpan(', '),
                new TextSpan(i.XB.name, {color: i.XB.color}),
                new TextSpan(']'),
            )
        } else {
            t.spans.push(
                new TextSpan('Отрезки не пересекаются')
            )
        }

        t.draw()
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

        const drawTrue = () => {
            for (let i = 1; i < points.length; i++) {
                new Segment(points[i - 1], points[i]).draw(cartesian)
            }
        }

        const drawFalse = () => {
            new Segment(A, B).draw(cartesian)
            new Segment(C, D).draw(cartesian)
        }

        // --- X
        this.XA = A.x > C.x ? A : C
        this.XB = B.x < D.x ? B : D
        this.X = this.XA.x <= this.XB.x

        if (x) {
            if (this.X) {
                points.sort((a, b) => a.x - b.x)
                drawTrue()
            } else {
                drawFalse()
            }
        }

        // --- Y
        this.YA = A.y > C.y ? A : C
        this.YB = B.y < D.y ? B : D
        this.Y = this.YA.y <= this.YB.y

        if (y) {
            if (this.Y) {
                points.sort((a, b) => a.y - b.y)
                drawTrue()
            } else {
                drawFalse()
            }
        }
    }
}

CanvasDraw.define(CanvasNumberLineSegmentIntersect)
