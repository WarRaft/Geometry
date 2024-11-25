class CartesianRectOrientedIntersectProjection extends CartesianRectOrientedIntersect {
    static name = 'canvas-cartesian-rect-oriented-intersect-projection'

    xalign = -1
    yalign = -1
    height() {
        return 12
    }

    ABCD() {
        return [
            5, 15,
            15, 7,
            10, 10,
            20, 5,
        ]
    }

    constructor() {
        super()
    }

}

CanvasDraw.define(CartesianRectOrientedIntersectProjection)
