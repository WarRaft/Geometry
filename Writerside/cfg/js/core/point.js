class Point {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} name
     * @param {Color} color
     * @param {number[]} dash
     * @param {boolean} round
     * @param {boolean} roundIgnore
     * @param {boolean} hidden
     * @param {Segment} segment
     * @param {boolean} drag
     * @param {boolean} dragX
     * @param {boolean} dragY
     */
    constructor(x, y, {
        name = '',
        color = Color.pointA,
        dash = [],
        round = false,
        roundIgnore = false,
        hidden = false,
        segment = null,
        drag = true,
        dragX = true,
        dragY = true,
    } = {}) {
        this.#x = x
        this.#y = y
        this.name = name
        this.color = color
        this.dash = dash
        this.round = round
        this.roundIgnore = roundIgnore
        this.hidden = hidden
        this.segment = segment

        this.dragX = drag && dragX
        this.dragY = drag && dragY
    }

    #x = 0
    #y = 0

    /** @type {Point} */  maxThan
    /** @type {Point} */  minThan

    radius = 6
    /** @type {number} */ cx = 0
    /** @type {number} */ cy = 0
    /** @type {number} */ cr = 0

    get #round() {
        return this.round && !this.roundIgnore
    }

    get x() {
        return this.#round ? Math.round(this.#x) : this.#x
    }

    /** @param {number} x */ set x(x) {
        this.#x = x
    }

    get y() {
        return this.#round ? Math.round(this.#y) : this.#y
    }

    /** @param {number} y */ set y(y) {
        this.#y = y
    }

    /**  @return {string} */ get xs() {
        const out = this.#x.toFixed(this.#round ? 0 : 2)
        return out === '-0' ? '0' : out
    }

    /**  @return {string} */ get xsabs() {
        const out = Math.abs(this.#x).toFixed(this.#round ? 0 : 2)
        return out === '-0' ? '0' : out
    }

    /**  @return {string} */ get ys() {
        const out = this.#y.toFixed(this.#round ? 0 : 2)
        return out === '-0' ? '0' : out
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {this}
     */
    position(x, y) {
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
        const mit = this.minThan
        const mat = this.maxThan
        if (this.dragX) {
            this.#x += dx
            if (mit && this.#x > mit.#x) mit.#x = this.#x
            if (mat && this.#x < mat.#x) mat.#x = this.#x
        }
        if (this.dragY) {
            this.#y += dy
            if (mit && this.#y < mit.#y) mit.#y = this.#y
            if (mat && this.#y > mat.#y) mat.#y = this.#y
        }
        return this
    }

    get dragCan() {
        return !this.hidden && (this.dragX || this.dragY)
    }
}
