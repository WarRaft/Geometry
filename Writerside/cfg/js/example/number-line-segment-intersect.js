class CanvasNumberLineSegmentIntersect extends CanvasDraw {
    static name = 'canvas-number-line-segment-intersect'

    constructor() {
        super()

        this.text = new TextDraw(this)
        const c = this.cartesian = new Cartesian(this, 4, {round: true})

        const X = this.X = new NumberLineSegmentX(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(1, 0, {name: 'B', color: Color.pointB, dragY: false}),
            new Point(-2, 0, {name: 'C', color: Color.pointC, dragY: false}),
            new Point(4, 0, {name: 'D', color: Color.pointD, dragY: false}),
            new Segment(null, null),
            new Segment(null, null),
            new Segment(null, null),
        )

        c.points.push(...X.points)
        c.segments.push(...X.segments)
    }

    draw() {
        const c = this.cartesian.axis({y: false})

        const X = this.X.calcX()

        c.draw()

        const t = this.text.clear()
        if (X.value) {
            t.push(
                new TextSpan('Пересечением является ['),
                new TextSpan(X.MIN.name, {color: X.MIN.color}),
                new TextSpan(', '),
                new TextSpan(X.MAX.name, {color: X.MAX.color}),
                new TextSpan(']'),
            )
        } else {
            t.push(
                new TextSpan('Отрезки не пересекаются')
            )
        }

        t.draw()
    }
}

class NumberLineSegmentX {
    /**
     * @param {Point} A
     * @param {Point} B
     * @param {Point} C
     * @param {Point} D
     * @param {Segment} AB
     * @param {Segment} CD
     * @param {Segment} ABCD
     */
    constructor(A, B, C, D, AB, CD, ABCD) {
        this.A = A
        this.B = B
        A.minThan = B
        B.maxThan = A

        this.C = C
        this.D = D
        C.minThan = D
        D.maxThan = C

        this.AB = AB
        this.CD = CD
        this.ABCD = ABCD
    }

    /** @type {Point} */ MIN
    /** @type {Point} */ MAX

    value = false

    get points() {
        return [this.A, this.B, this.C, this.D]
    }

    get segments() {
        return [this.AB, this.CD, this.ABCD]
    }

    #xsort = (a, b) => a.x - b.x
    #ysort = (a, b) => a.y - b.y

    #true(points, sort) {
        points.sort(sort)
        this.AB.position(points[0], points[1])
        this.ABCD.position(points[1], points[2]).lineOld = 0
        this.CD.position(points[2], points[3])
        return this
    }

    #false() {
        this.AB.position(this.A, this.B)
        this.CD.position(this.C, this.D)
        this.ABCD.position(this.A, this.D).lineOld = -1
        return this
    }

    calcX() {
        const points = [...this.points]

        this.MIN = this.A.x > this.C.x ? this.A : this.C
        this.MAX = this.B.x < this.D.x ? this.B : this.D

        return (this.value = this.MIN.x <= this.MAX.x) ? this.#true(points, this.#xsort) : this.#false()
    }

    calcY() {
        const points = [...this.points]

        this.MIN = this.A.y > this.C.y ? this.A : this.C
        this.MAX = this.B.y < this.D.y ? this.B : this.D

        return (this.value = this.MIN.y <= this.MAX.y) ? this.#true(points, this.#ysort) : this.#false()
    }
}

CanvasDraw.define(CanvasNumberLineSegmentIntersect)
