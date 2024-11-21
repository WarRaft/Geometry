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
            draw.shadow.appendChild(c)

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
            const y = ((e.clientY - rect.y) * dpr - this.#oy) / -step

            const dist = p => (x - p.x) ** 2 + (y - p.y) ** 2

            let lowest = 0
            for (let i = 1; i < this.points.length; i++) {
                if (dist(this.points[i]) < dist(this.points[lowest])) lowest = i
            }
            this.dragPoint = this.points[lowest]
        }

        draw.pointerupCallback = () => {
            this.dragPoint = null
        }
    }

    /** @type {CanvasDraw} */ #draw
    /** @type {CanvasRenderingContext2D} */ #ctx

    #ox = 0
    #oy = 0
    #canvasWidth = 0
    #canvasHeight = 0
    #step = 0
    #dpr = 1
    #axisY = true
    #height = 0
    round = false
    /** @type {Point[]} */ points = []
    /** @type {Point|null} */ dragPoint = null

    /** @type {Point[]} */ drawPoint = []
    /** @type {Segment[]} */ drawSegment = []
    /** @type {Rect[]} */ drawRect = []
    /** @type {Polygon[]} */ drawPolygon = []

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
        this.drawPoint = []
        this.drawSegment = []
        this.drawRect = []
        this.drawPolygon = []

        // -- vars
        const draw = this.#draw
        const ctx = this.#ctx = draw.ctx
        const dpr = this.#dpr = draw.dpr
        const canvas = draw.canvas
        const container = draw.container

        // -- width
        const cow = container.getBoundingClientRect().width
        const caw = canvas.width = this.#canvasWidth = cow * dpr
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

        const cah = this.#canvasHeight = canvas.height = coh * dpr
        const oy = this.#oy = cah * .5

        // -- grid
        ctx.lineJoin = 'miter'
        ctx.lineWidth = dpr
        ctx.font = `${12 * dpr}px ${cssvar('font-family')}`

        ctx.fillStyle = Color.bg.fillStyle
        ctx.fillRect(0, 0, caw, cah)

        ctx.beginPath()
        ctx.strokeStyle = Color.grid.strokeStyle
        const xl = Math.trunc(ox / step)
        const xr = Math.trunc((caw - ox) / step)
        const yt = Math.trunc(oy / step)
        const yb = Math.trunc((cah - oy) / step)

        // X ➡️
        const del = 3 * dpr
        const xdl = ox - step + del
        const xdr = ox + del
        for (let i = -yt; i <= yb; i++) {
            if (x && i === 0) continue
            const yi = oy + i * step
            ctx.moveTo(0, yi)
            if (y && i > -yt && i < yb) {
                ctx.lineTo(xdl, yi)
                ctx.moveTo(xdr, yi)
            }
            ctx.lineTo(caw, yi)
        }

        // Y ⬇️
        const ydt = oy + del
        const ydb = oy + step - del
        for (let i = -xl; i <= xr; i++) {
            if (y && i === 0) continue
            const xi = ox + i * step
            ctx.moveTo(xi, 0)
            if (x && i > -xl && i < xr) {
                ctx.lineTo(xi, ydt)
                ctx.moveTo(xi, ydb)
            }
            ctx.lineTo(xi, cah)
        }
        ctx.stroke()
        ctx.closePath()

        if (x || y) {
            ctx.beginPath()
            ctx.strokeStyle = Color.axis.strokeStyle
            ctx.fillStyle = Color.axis.strokeStyle

            // X ➡️
            if (x) {
                ctx.textAlign = 'center'
                ctx.moveTo(0, oy)
                ctx.lineTo(caw, oy)

                const ydt = oy - del
                const ydb = oy + del
                for (let i = -xl; i <= xr; i++) {
                    if (y && i === 0) continue
                    const xi = ox + i * step
                    ctx.moveTo(xi, ydt)
                    ctx.lineTo(xi, ydb)

                    if (i === -xl || i === xr) continue
                    const t = i.toString()
                    const m = ctx.measureText(t)
                    const wd = m.width - ctx.measureText(Math.abs(i).toString()).width
                    const th = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
                    ctx.fillText(t, xi - wd * .5, th + ydb + 3 * dpr)
                }
            }

            // Y ⬇️
            if (y) {
                ctx.textAlign = 'right'
                ctx.moveTo(ox, 0)
                ctx.lineTo(ox, cah)
                const xdl = ox - del
                const xdr = ox + del
                for (let i = -yt; i <= yb; i++) {
                    if (x && i === 0) continue
                    const yi = oy + i * step
                    ctx.moveTo(xdl, yi)
                    ctx.lineTo(xdr, yi)

                    if (i === -yt || i === yb) continue
                    const t = (-i).toString()
                    const m = ctx.measureText(t)
                    const th = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
                    ctx.fillText(t, xdl - 3 * dpr, yi + th * .5)
                }
            }

            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }

        // --- drag
        if (this.dragPoint !== null) {
            this.dragPoint.drag(draw.dx * dpr / step, -draw.dy * dpr / step)
        }

        // -- round
        for (const p of this.points) p.round = this.round

        return this
    }

    /**
     * @return {this}
     */
    draw() {
        const ctx = this.#ctx
        const dpr = this.#dpr
        const step = this.#step
        /** @type {TextRect[]} */ const pointName = []
        /** @type {TextRect[]} */ const pointNameClip = []

        const ox = this.#ox
        const oy = this.#oy

        // -- point
        for (const p of this.drawPoint) {
            p.cx = ox + p.x * step
            p.cy = oy - p.y * step
            p.cr = p.radius * dpr

            if (p.hidden) continue

            ctx.beginPath()
            ctx.fillStyle = p.color.fillStyle
            ctx.strokeStyle = p.color.strokeStyle

            ctx.setLineDash(p.dash.map(v => v * dpr))
            ctx.arc(p.cx, p.cy, p.cr, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            ctx.closePath()

            pointName.push(new TextRect(p.cx - p.cr, p.cx + p.cr, p.cy - p.cr, p.cy + p.cr))
        }

        // -- point name
        for (const p of this.drawPoint) {
            if (p.name.length > 0) {
                ctx.beginPath()
                ctx.setLineDash([])

                const gap = 5 * dpr

                const ra = TextRect.fromText(ctx, p.name, {
                    x: p.cx,
                    alignX: .5,
                    y: p.cy - p.cr - gap,
                    color: p.color,
                    fontSize: 16 * dpr,
                })

                const rb = TextRect.fromText(
                    ctx, `(${p.xs}${this.#axisY ? `, ${p.ys}` : ''})`, {
                        fontSize: 12 * dpr,
                        color: p.color,
                        x: ra.maxX,
                        y: ra.maxY,
                    }
                )

                const i = () => {
                    for (const r of pointName) {
                        /** @type {TextRect} */ let cur = null
                        if (r.intesect(ra)) cur = ra
                        else if (r.intesect(rb)) cur = rb
                        if (cur === null) continue

                        const ty = r.minY - cur.maxY - gap
                        if (ty > 0) continue
                        ra.translate(0, ty)
                        rb.translate(0, ty)
                        i()
                        break
                    }
                }
                i()

                pointName.push(ra.fill(), rb.fill())

                pointNameClip.push(ra.expand(2 * dpr), rb)
                ctx.closePath()
            }
        }

        ctx.save()
        if (pointNameClip.length > 0) {
            for (const p of pointNameClip) {
                const path = new Path2D()
                path.rect(0, 0, this.#canvasWidth, this.#canvasHeight)
                path.rect(p.minX, p.minY, p.width, p.height)
                ctx.clip(path, 'evenodd')
            }
        }

        // -- segment
        /**
         * @param {number} ax
         * @param {number} ay
         * @param {number} bx
         * @param {number} by
         * @param {Color} ca
         * @param {?Color} cb
         * @param {number[]} dash
         */
        const _segment = (ax, ay, bx, by, ca, cb, dash) => {
            const ctx = this.#ctx

            if (cb instanceof Color) {
                const grad = ctx.createLinearGradient(ax, ay, bx, by)
                grad.addColorStop(0, ca.strokeStyle)
                grad.addColorStop(1, cb.strokeStyle)
                ctx.strokeStyle = grad
            } else {
                ctx.strokeStyle = ca.strokeStyle
            }

            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.setLineDash(dash)
            ctx.stroke()
            ctx.closePath()
        }

        for (const s of this.drawSegment) {
            const dx = s.b.cx - s.a.cx
            const dy = s.b.cy - s.a.cy

            const angle = Math.atan2(dy, dx)
            const dist = Math.sqrt(dx * dx + dy * dy) - s.b.cr
            if (dist < s.a.cr + s.b.cr) continue

            const cos = Math.cos(angle)
            const sin = Math.sin(angle)

            const ax = cos * s.a.cr + s.a.cx
            const ay = sin * s.a.cr + s.a.cy

            const bx = cos * dist + s.a.cx
            const by = sin * dist + s.a.cy

            const dash = s.dash.map(v => v * dpr)

            _segment(ax, ay, bx, by, s.a.color, s.b.color, dash)

            if (s.line > 0) {
                const ld = this.#canvasWidth + this.#canvasHeight
                const cosld = cos * ld
                const sinld = sin * ld

                if (s.line >= 3 || s.line === 1) {
                    const r = s.a.cr * 2
                    _segment(-cos * r + ax, -sin * r + ay, ax - cosld, ay - sinld, s.a.color, null, dash)
                }
                if (s.line >= 3 || s.line === 2) {
                    const r = s.b.cr * 2
                    _segment(cos * r + bx, sin * r + by, cosld + bx, sinld + by, s.b.color, null, dash)
                }
            }
        }

        // -- rect
        for (const r of this.drawRect) {
            const ar = r.a.cr
            const br = r.b.cr

            const ax = r.a.cx
            const ay = r.a.cy
            const bx = r.b.cx
            const by = r.b.cy

            const grad = ctx.createLinearGradient(ax, ay, bx, by)
            grad.addColorStop(0, r.a.color.strokeStyle)
            grad.addColorStop(1, r.b.color.strokeStyle)
            ctx.strokeStyle = grad

            ctx.beginPath()

            // ↖️↗️
            if (bx - ax > ar) {
                ctx.moveTo(ax + ar, ay)
                ctx.lineTo(bx, ay)
            }

            // ↗️
            // ↘️
            if (by - ay > br) {
                ctx.moveTo(bx, ay)
                ctx.lineTo(bx, by - br)
            }

            // ↖️
            // ↙️
            if (by - ay > ar) {
                ctx.moveTo(ax, ay + ar)
                ctx.lineTo(ax, by)
            }

            // ↙️↘️
            if (bx - ax > ar) {
                ctx.moveTo(ax, by)
                ctx.lineTo(bx - br, by)
            }

            ctx.stroke()
            ctx.closePath()
        }

        ctx.restore()

        // -- polygon
        for (const p of this.drawPolygon) {
            if (p.points.length < 2) continue

            ctx.beginPath()
            ctx.moveTo(p.points[0].cx, p.points[0].cy)
            for (let i = 1; i < p.points.length; i++) {
                ctx.lineTo(p.points[i].cx, p.points[i].cy)
            }
            ctx.fillStyle = p.color.fillStyle
            //ctx.strokeStyle = p.color.strokeStyle
            ctx.fill('evenodd')
            ctx.closePath()
        }

        // -- return
        return this
    }

    /**
     * @param {string} text
     * @param {?number} x
     * @param {?number} y
     * @param {Color} color
     * @param {number} fontSize
     * @return {this}
     */
    text(text, {
        x = null,
        y = null,
        color = Color.pointD,
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
            cy = this.#oy + y * -step
            if (step > th) cy -= (step - th) * .5
        }

        ctx.beginPath()
        ctx.textAlign = 'center'
        ctx.fillStyle = color.strokeStyle
        ctx.font = `${fontSize * dpr}px ${cssvar('font-family')}`
        ctx.fillText(text, cx, cy)
        ctx.closePath()

        return this
    }
}
