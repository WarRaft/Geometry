class CartesianPointDistanceB extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-b'

    get height() {
        return 16
    }

    constructor() {
        super()

        this
            .roundInit(false)
            .points.push(
            new Point(3, -2),
            new Point(6, -6),
        )
    }

    drawOld() {
        this.grid().dragRelease()

        const [A, B] = this.points

        for (const p of this.points) p.round = this.round

        const dx = B.x - A.x
        const dy = B.y - A.y

        const d = Math.sqrt(dx * dx + dy * dy)

        const A1 = new Point(0, 0)
        const B1 = new Point(dx, dy)

        A1.round = this.round

        this
            .pointOld(A1, {name: 'A′', dash: [2, 2]})
            .pointOld(B1, {name: 'B′', dash: [2, 2]})
            .segment(A1, B1, {dash: [2, 2]})

            .pointOld(A, {trackX: true, trackY: true, name: 'A'})
            .pointOld(B, {trackX: true, trackY: true, name: 'B'})

            .segment(A, B)
            .text(`Расстояние ${d.toFixed(2)}`, {x: 0, y: 5})
    }
}

CanvasDraw.define(CartesianPointDistanceB)
