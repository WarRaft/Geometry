class Cartesian {

    /**
     * @param {CanvasDraw} draw
     * @param {number} height
     */
    constructor(draw, height) {
        this.#draw = draw
        this.#height = height * 2
    }

    /** @type {CanvasDraw} */ #draw
    /** @type {number} */ #ox
    /** @type {number} */ #oy
    /** @type {number} */ #step
    /** @type {number} */ #height

    axis(x = true,
         y = true,
    ) {
        // -- vars
        const draw = this.#draw
        const ctx = draw.ctx
        const dpr = draw.dpr
        const canvas = draw.canvas
        const container = draw.container

        // -- width
        const cow = container.getBoundingClientRect().width
        const caw = canvas.width = cow * dpr
        const ox = this.#ox = caw * .5

        // -- step
        const stepSize = 25
        const stepCow = (cow - 1)
        let stepCount = Math.floor(stepCow / stepSize)
        if (stepCount % 2 !== 0) stepCount--
        const stepNoDpr = stepCow / stepCount
        const step = this.#step = stepNoDpr * dpr

        // -- height
        const coh = stepNoDpr * this.#height + 1
        container.style.height = `${coh}px`

        const caH = canvas.height = coh * dpr
        const oY = this.#oy = caH * .5

        // -- scale
        ctx.scale(1, -1)
        ctx.translate(0, -caH)

        const cminx = Math.trunc(ox / step)
        const cminy = Math.trunc(oY / step)

        const cmaxx = Math.trunc((caw - ox) / step)
        const cmaxy = Math.trunc((caH - oY) / step)

        // -- grid
        ctx.lineJoin = 'miter'
        ctx.lineWidth = dpr
        ctx.font = `${12 * dpr}px ${cssvar('font-family')}`
        ctx.beginPath()
        for (let i = -cminx; i <= cmaxx; i++) {
            const xx = ox + i * step
            ctx.moveTo(xx, 0)
            ctx.lineTo(xx, caH)
        }

        for (let i = -cminy; i <= cmaxy; i++) {
            const yy = oY + i * step
            ctx.moveTo(0, yy)
            ctx.lineTo(caw, yy)
        }
        ctx.strokeStyle = Color.grid.strokeStyle
        ctx.stroke()
        ctx.closePath()

        // === axis
        if (x || y) {
            ctx.beginPath()
            if (x) {
                ctx.moveTo(0, oY)
                ctx.lineTo(caw, oY)
            }
            if (y) {
                ctx.moveTo(ox, 0)
                ctx.lineTo(ox, caH)
            }
            ctx.strokeStyle = Color.axis.strokeStyle
            ctx.stroke()
            ctx.closePath()

            ctx.beginPath()
            const h = 5 * dpr

            if (x) for (let i = -cminx; i <= cmaxx; i++) {
                const xx = ox + i * step
                ctx.moveTo(xx, oY - h)
                ctx.lineTo(xx, oY + h)
            }

            if (y) for (let i = -cminy; i <= cmaxy; i++) {
                const yy = oY + i * step
                ctx.moveTo(ox - h, yy)
                ctx.lineTo(ox + h, yy)
            }

            // text
            ctx.save()
            ctx.scale(1, -1)
            ctx.fillStyle = Color.axis.strokeStyle

            if (x) {
                ctx.textAlign = 'center'
                for (let i = -cminx; i <= cmaxx; i++) {
                    if (i === 0 && y) continue
                    const xx = ox + i * step
                    const text = `${i}`
                    const metrics = ctx.measureText(text)
                    const hwm = metrics.width * .5
                    if (xx - hwm < 0) continue
                    if (xx + hwm > caw) continue

                    const tw = metrics.width
                    const th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

                    const yy = -oY + th + h + 4 * dpr
                    const p = 2 * dpr

                    ctx.clearRect(xx - p - tw * .5, yy - p - th, tw + p * 2, th + p * 2)
                    ctx.fillText(text, xx, yy)
                }
            }

            if (y) {
                ctx.textAlign = 'right'
                for (let i = -cminy; i <= cmaxy; i++) {
                    if (i === 0 && y) continue
                    const yy = oY + i * step
                    const text = `${i}`
                    const metrics = ctx.measureText(text)
                    const th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
                    const hth = th * .5
                    if (yy - hth < 0) continue
                    if (yy + hth > caH) continue
                    ctx.fillText(text, ox - h - 4 * dpr, -yy + hth)
                }
            }

            ctx.restore()
            ctx.strokeStyle = Color.axis.strokeStyle
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
        return this
    }

}
