class Polygon {
    /**
     * @param {Color} color
     * @param {Point[]} points
     * @param hidden
     */
    constructor(points, {
        color = Color.polygon,
        hidden = false
    } = {}) {
        this.color = color
        this.points = points
        this.hidden = hidden
    }

    /** @type {Point[]} */ points = []
}
