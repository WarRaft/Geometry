class Point {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} name
     * @param {Color} color
     * @param {boolean} dragX
     * @param {boolean} dragY
     * @param {number[]} dash
     * @param round
     * @param hidden
     */
    constructor(x, y, {
        name = '',
        color = Color.pointA,
        dragX = true,
        dragY = true,
        dash = [],
        round = false,
        hidden = false,
    } = {}) {
        this.#x = x
        this.#y = y
        this.name = name
        this.color = color
        this.dragX = dragX
        this.dragY = dragY
        this.round = round
        this.dash = dash
        this.hidden = hidden
    }

    #x = 0
    #y = 0

    radius = 6
    /** @type {number} */ cx = 0
    /** @type {number} */ cy = 0
    /** @type {number} */ cr = 0

    /**
     * @param {Cartesian} ctx
     * @return {this}
     */
    draw(ctx) {
        if (ctx instanceof Cartesian) {
            ctx.drawPoint.push(this)
        }
        return this
    }

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
     * @param {Point} b
     * @param {Cartesian} c
     * @return {Point}
     */
    parent(b, c) {
        if (this.#x > b.#x) {
            if (c.dragPoint === this) b.#x = this.#x
            else this.#x = b.#x
        }
        if (this.#y < b.#y) {
            if (c.dragPoint === this) b.#y = this.#y
            else this.#y = b.#y
        }
        return this
    }
}
