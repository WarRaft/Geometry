class Rect {

    /**
     * @param {number} minX
     * @param {number} maxX
     * @param {number} minY
     * @param {number} maxY
     */
    constructor(minX, maxX, minY, maxY) {
        this.minX = minX
        this.maxX = maxX
        this.minY = minY
        this.maxY = maxY
    }

    minX = 0
    maxX = 0
    minY = 0
    maxY = 0

    get width() {
        return Math.abs(this.maxX - this.minX)
    }

    get height() {
        return Math.abs(this.maxY - this.minY)
    }

    get clone() {
        return new Rect(this.minX, this.maxX, this.minY, this.maxY)
    }

    translate(x, y) {
        this.minX += x
        this.maxX += x
        this.minY += y
        this.maxY += y
        return this
    }

    /**
     * @param {Rect} b
     * @return {boolean}
     */
    intesect(b) {
        const li = Math.max(this.minX, b.minX)
        const ri = Math.min(this.maxX, b.maxX)
        const ti = Math.max(this.minY, b.minY)
        const bi = Math.min(this.maxY, b.maxY)
        return li < ri && ti < bi
    }

    /**
     * @param {Rect} rects
     * @return {Rect}
     */
    static expand(...rects) {
        const a = rects[0].clone
        for (let i = 1; i < rects.length; i++) {
            const b = rects[i]
            a.minX = Math.min(a.minX, b.minX)
            a.maxX = Math.max(a.maxX, b.maxX)
            a.minY = Math.min(a.minY, b.minY)
            a.maxY = Math.max(a.maxY, b.maxY)
        }
        return a
    }

    #text = ''
    /** @type {CanvasRenderingContext2D} */ #ctx
    /** @type {Color} */ #color
    #fontSize = 0

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} alignX
     * @param {Color} color
     * @param {number} fontSize
     * @return {Rect}
     */
    static fromText(ctx, text, {
        x = 0,
        y = 0,
        alignX = 0,
        color = Color.yellow,
        fontSize
    } = {}) {
        // x: left -> right
        // y: top -> bottom

        ctx.font = `${fontSize}px ${cssvar('font-family')}`
        const m = ctx.measureText(text)
        const w = m.width
        const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent

        x -= alignX * w
        const r = new Rect(x, x + w, y - h, y)
        r.#ctx = ctx
        r.#text = text
        r.#fontSize = fontSize
        r.#color = color
        return r
    }

    fill() {
        const ctx = this.#ctx

        ctx.textAlign = 'left'
        ctx.font = `${this.#fontSize}px ${cssvar('font-family')}`
        ctx.fillStyle = this.#color.strokeStyle
        ctx.fillText(this.#text, this.minX, this.maxY)
    }

}
