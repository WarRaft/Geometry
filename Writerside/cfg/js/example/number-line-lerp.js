class CanvasNumberLineLerp extends CanvasDraw {
    static name = 'canvas-number-line-lerp'

    constructor() {
        super()

        const c = this.cartesian = new Cartesian(this.lerp(.5), 2, {round: true})

        c.points.push(
            new Point(-5, 0, {name: 'A', color: Color.pointA, dragY: false}),
            new Point(5, 0, {name: 'B', color: Color.pointB, dragY: false}),
        )
    }

    draw() {
        const c = this.cartesian.axis({y: false, yalign: -1})

        const [A, B] = c.points

        A.draw(c)
        B.draw(c)

        const C = new Point(A.x + (B.x - A.x) * this.lerpK, -0.0000001, {name: 'C', color: Color.pointC, dash: [2, 2]}).draw(c)

        new Segment(A, C, {dash: [2, 2]}).draw(c)
        new Segment(B, C, {dash: [2, 2]}).draw(c)

        c.draw()
    }
}

CanvasDraw.define(CanvasNumberLineLerp)
