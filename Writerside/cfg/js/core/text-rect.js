class TextRect {

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


    fontSize = 0
    fontFamily = ''
    text = ''
    /** @type {CanvasRenderingContext2D} */ ctx
    /** @type {Color} */ #color
    /** @type {TextMetrics} */ metrics

    get width() {
        return this.maxX - this.minX
    }

    get height() {
        return this.maxY - this.minY
    }

    translate(x, y) {
        this.minX += x
        this.maxX += x
        this.minY += y
        this.maxY += y
        return this
    }

    /**
     * @param {TextRect} b
     * @return {boolean}
     */
    intesect(b) {
        const li = Math.max(this.minX, b.minX)
        const ri = Math.min(this.maxX, b.maxX)
        const ti = Math.max(this.minY, b.minY)
        const bi = Math.min(this.maxY, b.maxY)
        return li < ri && ti < bi
    }

    fill() {
        const ctx = this.ctx
        ctx.textAlign = 'left'
        ctx.font = `${this.fontSize}px ${this.fontFamily}`
        ctx.fillStyle = this.#color.strokeStyle
        ctx.fillText(this.text, this.minX, this.maxY)
        return this
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} fontSize
     * @param {string} fontFamily
     * @param {number} alignX
     * @param {Color} color
     * @return {TextRect}
     */
    static fromText(ctx, text, fontSize, fontFamily, {
        x = 0,
        y = 0,
        alignX = 0,
        color = Color.pointA,
    } = {}) {
        // x: left -> right
        // y: top -> bottom
        ctx.font = `${fontSize}px ${fontFamily}`
        const m = ctx.measureText(text)
        const w = m.width
        const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent

        x -= alignX * w
        const r = new TextRect(x, x + w, y - h, y)
        r.ctx = ctx
        r.text = text
        r.fontSize = fontSize
        r.fontFamily = fontFamily
        r.#color = color
        r.metrics = m
        return r
    }

}
