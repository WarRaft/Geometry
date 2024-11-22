class TextLine {

    /** @type {TextSpan[]} */ spans = []

    /**
     * @param {TextSpan} span
     */
    set span(span) {
        this.spans.push(span)
        const r = span.rect
        const h = r.height
        r.translate(this.width - r.minX, 0)
        this.width += r.width
        this.height = Math.max(this.height, h)
    }

    width = 0
    height = 0
    maxY = 0

    /**
     * @param {number} x
     * @param {number} y
     */
    draw(x, y) {
        for (const s of this.spans) {
            const r = s.rect
            r.translate(x, y + this.height)
            const ctx = r.ctx

            ctx.fillStyle = s.color.strokeStyle
            ctx.fillText(r.text, r.minX, r.maxY)
        }
    }
}
