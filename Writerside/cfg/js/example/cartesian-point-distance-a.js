class CartesianPointDistanceA extends CanvasDraw {
    static name = 'canvas-cartesian-point-distance-a'

    get height() {
        return 14
    }

    constructor() {
        super()

        this
            .roundInit(false)
            .points.push(
            new Point(4, 3),
        )
    }

    drawOld() {
        this.grid().dragRelease()

        const [A] = this.points

        const O = new Point(0, 0)

        A.round = O.round = this.round

        const d = Math.sqrt(A.x * A.x + A.y * A.y)


        this
            .pointOld(A, {trackX: true, trackY: true, name: 'A'})
            .pointOld(O, {name: '(0,0)', dash: [2, 2]})
            .segment(A, O, {dash: [2, 2]})
            .text(`Расстояние ${d.toFixed(2)}`, {x: 0, y: 4})
    }
}

CanvasDraw.define(CartesianPointDistanceA)
