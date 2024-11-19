class Cartesian {

    /**
     * @param {CanvasDraw} draw
     * @param {number} height
     * @param {?boolean} round
     */
    constructor(draw, height, {
        round = null
    } = {}) {
        this.#draw = draw
        this.#height = height * 2

        if (round !== null) {
            const c = document.createElement('label')
            draw.container.appendChild(c)

            c.classList.add('intval')
            c.innerHTML = '<input type="checkbox"><span>Выровнять по сетке</span>'

            const ch = c.querySelector('input')
            ch.checked = this.round = round
            ch.addEventListener('change', () => this.round = ch.checked)
        }

        draw.pointerdownCallback = (e) => {
            const rect = draw.canvas.getBoundingClientRect()
            const dpr = draw.dpr
            const step = this.#step

            const x = ((e.clientX - rect.x) * dpr - this.#ox) / step
            const y = (this.#canvasHeight - (e.clientY - rect.y) * dpr - this.#oy) / step

            const dist = p => (x - p.x) ** 2 + (y - p.y) ** 2

            let lowest = 0
            for (let i = 1; i < this.points.length; i++) {
                if (dist(this.points[i]) < dist(this.points[lowest])) lowest = i
            }
            this.pointDrag = this.points[lowest]
        }

        draw.pointerupCallback = () => {
            this.pointDrag = null
        }
    }

    /** @type {CanvasDraw} */ #draw
    /** @type {CanvasRenderingContext2D} */ #ctx

    #ox = 0
    #oy = 0
    #canvasHeight = 0
    #step = 0
    #dpr = 1
    #axisY = true
    #height = 0
    round = false
    /** @type {Point[]} */ points = []
    /** @type {Point[]} */ #points = []
    /** @type {Point|null} */ pointDrag = null

    /**
     * @return {this}
     */
    drag() {
        if (this.pointDrag === null) return this
        const draw = this.#draw
        const dpr = draw.dpr
        const step = this.#step
        this.pointDrag.drag(draw.dx * dpr / step, -draw.dy * dpr / step)
        return this
    }

    /**
     * @param {boolean} x
     * @param {boolean} y
     * @return {this}
     */
    axis({
             x = true,
             y = true,
         } = {}
    ) {
        this.#axisY = y
        this.#points = []

        // -- vars
        const draw = this.#draw
        const ctx = this.#ctx = draw.ctx
        const dpr = this.#dpr = draw.dpr
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

        const caH = this.#canvasHeight = canvas.height = coh * dpr
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

    /**
     * @param {Point} point
     * @param dash
     * @param {number} radius
     * @param {Color} color
     * @param name
     * @return {this}
     */
    point(point, {
        name = '',
        color = Color.yellow,
        dash = [],
        radius = 6,
    } = {}) {
        const ctx = this.#ctx
        const dpr = this.#dpr

        point.radius = radius * dpr
        point.color = color
        point.name = name

        const x = this.#ox + point.x * this.#step
        const y = this.#oy + point.y * this.#step

        ctx.beginPath()
        ctx.fillStyle = color.fillStyle
        ctx.strokeStyle = color.strokeStyle

        ctx.setLineDash(dash.map(v => v * dpr))
        ctx.arc(x, y, point.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        if (name.length > 0) {
            ctx.beginPath()
            ctx.setLineDash([])
            ctx.save()
            ctx.scale(1, -1)

            const gap = 5 * dpr

            const ra = Rect.fromText(ctx, name, {
                x: x,
                alignX: .5,
                y: -y - point.radius - gap,
                color: color,
                fontSize: 16 * dpr,
            })

            const rb = Rect.fromText(
                ctx, `(${point.xs}${this.#axisY ? `, ${point.ys}` : ''})`, {
                    fontSize: 12 * dpr,
                    color: color,
                    x: ra.maxX,
                    y: ra.maxY,
                }
            )

            point.rect = Rect.expand(ra, rb)

            const i = () => {
                for (const p of this.#points) {
                    if (!p.rect.intesect(point.rect)) continue
                    const ty = p.rect.minY - point.rect.maxY - gap
                    if (ty > 0) continue
                    point.rect = Rect.expand(
                        ra.translate(0, ty),
                        rb.translate(0, ty)
                    )
                    i()
                    break
                }
            }
            i()

            this.#points.push(point)

            ra.fill()
            rb.fill()

            ctx.restore()
            ctx.closePath()
        }

        return this
    }

    /**
     * @param {Point} a
     * @param {Point} b
     * @param {number[]} dash
     * @return {this}
     */
    segment(a, b, {
        dash = [],
    } = {}) {
        const ctx = this.#ctx
        const dpr = this.#dpr

        const step = this.#step

        const cx = this.#ox
        const cy = this.#oy

        let ax = cx + a.x * step
        let ay = cy + a.y * step
        let bx = cx + b.x * step
        let by = cy + b.y * step

        const dx = bx - ax
        const dy = by - ay

        const angle = Math.atan2(dy, dx)
        const dist = Math.sqrt(dx * dx + dy * dy) - b.radius

        ctx.beginPath()
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        bx = cos * dist + ax
        by = sin * dist + ay

        ax += cos * a.radius
        ay += sin * a.radius

        const grad = ctx.createLinearGradient(ax, ay, bx, by)
        grad.addColorStop(0, a.color.strokeStyle)
        grad.addColorStop(1, b.color.strokeStyle)
        ctx.strokeStyle = grad

        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.setLineDash(dash.map(v => v * dpr))
        ctx.stroke()
        ctx.closePath()

        /*
        if (line !== null) {
            const ld = Math.max(this.canvas.width, this.canvas.height) * 10

            ctx.beginPath()
            ctx.strokeStyle = line.strokeStyle
            let cos = Math.cos(angle)
            let sin = Math.sin(angle)
            ctx.moveTo(cos * r + bx, sin * r + by)
            ctx.lineTo(cos * ld + bx, sin * ld + by)
            cos = Math.cos(angle + Math.PI)
            sin = Math.sin(angle + Math.PI)
            ctx.moveTo(cos * r + ax, sin * r + ay)
            ctx.lineTo(cos * ld + ax, sin * ld + ay)
            ctx.stroke()
            ctx.closePath()
        }

         */

        return this
    }


    /**
     * @param {string} text
     * @param {?number} x
     * @param {?number} y
     * @param {Color} color
     * @param {number} fontSize
     *
     */
    text(text, {
        x = null,
        y = null,
        color = Color.teal,
        fontSize = 18,
    } = {}) {
        const ctx = this.#ctx
        const dpr = this.#dpr
        const step = this.#step

        let cx = 0, cy = 0

        const mt = ctx.measureText(text)
        const th = mt.actualBoundingBoxAscent + mt.actualBoundingBoxDescent

        if (x !== null && y !== null) {
            cx = this.#ox + x * step
            cy = -this.#oy - y * step
            if (step > th) cy -= (step - th) * .5
        }

        ctx.save()
        ctx.scale(1, -1)
        ctx.beginPath()

        ctx.textAlign = 'center'
        ctx.fillStyle = color.strokeStyle
        ctx.font = `${fontSize * dpr}px ${cssvar('font-family')}`
        ctx.fillText(text, cx, cy)
        ctx.closePath()
        ctx.restore()
    }
}
