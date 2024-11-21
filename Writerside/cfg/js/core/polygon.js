class Polygon {

    /**
     * @param {Color} color
     * @param {Point[]} points
     */
    constructor(points, {
        color = Color.polygon
    } = {}) {

        this.color = color
        this.points = points
    }

    /** @type {Point[]} */ points = []

    /**
     * @param {Cartesian} ctx
     * @return {this}
     */
    draw(ctx) {
        if (ctx instanceof Cartesian) {
            ctx.drawPolygon.push(this)
        }
        return this
    }
}
