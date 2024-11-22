class TextDraw {
    /**
     * @param {CanvasDraw} draw
     */
    constructor(draw) {
        this.#draw = draw
    }

    /** @type {CanvasDraw} */ #draw

    spans = []

    draw() {
        const ctx = this.#draw.ctx
        const dpr = this.#draw.dpr
        const family = cssvar('font-family')
        ctx.font = `${12 * dpr}px ${family}`

    }
}
