class Point {
    /**
     * @param {number} x
     * @param {number} y
     * @param {boolean} dragX
     * @param {boolean} dragY
     * @param round
     */
    constructor(x, y, {
        dragX = true,
        dragY = true,
        round = false,
    } = {}) {
        this.#x = x
        this.#y = y
        this.dragX = dragX
        this.dragY = dragY
        this.round = round
    }

    #x = 0
    #y = 0
    round = false
    radius = 0
    name = ''

    /** @type {Rect} */ rect
    /** @type {Color} */ color

    get x() {
        return this.round ? Math.round(this.#x) : this.#x
    }

    /** @param {number} x */ set x(x) {
        this.#x = x
    }

    get y() {
        return this.round ? Math.round(this.#y) : this.#y
    }

    /** @param {number} y */ set y(y) {
        this.#y = y
    }

    /**  @return {string} */ get xs() {
        const out = this.#x.toFixed(this.round ? 0 : 2)
        return out === '-0' ? '0' : out
    }

    /**  @return {string} */ get ys() {
        const out = this.#y.toFixed(this.round ? 0 : 2)
        return out === '-0' ? '0' : out
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {Point}
     */
    move(x, y) {
        this.#x = x
        this.#y = y
        return this
    }

    /**
     * @param {number} dx
     * @param {number} dy
     * @return {Point}
     */
    drag(dx, dy) {
        if (this.dragX) this.#x += dx
        if (this.dragY) this.#y += dy
        return this
    }

    /**
     * @param {Cartesian} c
     * @param {Point} b
     */
    cartesianRectSwap(c, b) {
        const ax = this.#x
        const ay = this.#y
        const bx = b.#x
        const by = b.#y

        const swap = () => {
            if (c.dragPoint === this) c.dragPoint = b
            else if (c.dragPoint === b) c.dragPoint = this
        }

        if (ax > bx) {
            this.#x = bx
            b.#x = ax
            swap()
        }

        if (ay < by) {
            this.#y = by
            b.#y = ay
            swap()
        }
    }

    /**
     * @param {Point} point
     * @return {Point}
     */
    fromPoint(point) {
        this.#x = point.x
        this.#y = point.y
        return this
    }

    /**
     * @param {number} angle
     * @param {number} distance
     * @return {Point}
     */
    polar(angle, distance) {
        this.#x += Math.cos(angle) * distance
        this.#y += Math.sin(angle) * distance
        return this
    }

    /**
     * @param {Point} point
     * @return {Segment}
     */
    segment(point) {
        return new Segment(this, point)
    }

}
