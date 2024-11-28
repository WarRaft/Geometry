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

            c.classList.add('menu', 'menu-round')
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
                const pi = this.points[i]
                if (!pi.dragCan) continue
                const pl = this.points[lowest]
                if (!pl.dragCan || (dist(pi) < dist(pl))) lowest = i
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
    /** @type {Point|null} */ dragPoint = null

    /** @type {Point[]} */ points = []
    /** @type {Segment[]} */ segments = []
    /** @type {Rect[]} */ rects = []
    /** @type {Polygon[]} */ polygons = []

    /**
     * @param {boolean} x
     * @param {boolean} y
     * @param {0|-1} xalign
     * @param {0|-1} yalign
     * @return {this}
     */
    axis({
             x = true,
             y = true,
             xalign = 0,
             yalign = 0,
         } = {}
    ) {
        this.#axisY = y

        // -- vars
        const draw = this.#draw
        const ctx = this.#ctx = draw.ctx
        const dpr = this.#dpr = draw.dpr
        const canvas = draw.canvas
        const container = draw.container

        // -- width
        const cow = container.getBoundingClientRect().width
        const caw = canvas.width = this.#canvasWidth = cow * dpr
        let ox = this.#ox = caw * .5

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
        let oy = this.#oy = cah * .5

        // --- align
        if (xalign === -1) {
            ox = this.#ox = step
        }

        if (yalign === -1) {
            oy = this.#oy = cah - step
        }

        // -- grid
        ctx.lineJoin = 'miter'
        ctx.lineWidth = dpr
        ctx.font = `${12 * dpr}px ${cssvar('font-family')}`
        ctx.textRendering = 'optimizeLegibility'

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
        this.dragPoint?.drag(draw.dx * dpr / step, -draw.dy * dpr / step)

        // -- round
        for (const p of this.points) p.round = p.roundIgnore ? false : this.round

        return this
    }

    /**
     * @return {this}
     */
    draw() {
        const ctx = this.#ctx
        const dpr = this.#dpr
        const step = this.#step
        const fontFamily = cssvar('font-family')
        /** @type {TextRect[]} */ const pointName = []
        /** @type {TextRect[]} */ const pointNameClip = []

        const caw = this.#canvasWidth, cah = this.#canvasHeight

        const ox = this.#ox
        const oy = this.#oy

        const points = [...this.points].sort((a, b) => a.y - b.y)

        ctx.lineWidth = dpr

        /** @type {Point[]} */ const pointRI = []

        // -- point
        for (const p of points) {
            p.cx = ox + p.x * step
            p.cy = oy - p.y * step
            p.cr = p.radius * dpr

            if (p.hidden) continue
            for (const cp of pointRI) {
                const da = (p.cx - cp.cx) ** 2 + (p.cy - cp.cy) ** 2
                const db = (p.cr + cp.cr) ** 2
                if (da < db) p.cr += (2 * dpr) * (1 - da / db)
            }
            pointRI.push(p)

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
        for (const p of points) {
            if (p.name.length > 0) {
                ctx.beginPath()
                ctx.setLineDash([])

                const gap = 5 * dpr

                const ra = TextRect.fromText(ctx, p.name, 16 * dpr, fontFamily, {
                    x: p.cx,
                    alignX: .5,
                    y: p.cy - p.cr - gap,
                    color: p.color,
                })

                const rb = TextRect.fromText(
                    ctx, `(${p.xs}${this.#axisY ? `, ${p.ys}` : ''})`, 12 * dpr, fontFamily, {
                        color: p.color,
                        x: ra.maxX,
                        y: ra.maxY,
                    }
                )

                const intersect = () => {
                    for (const r of pointName) {
                        /** @type {TextRect} */ let cur = null
                        if (r.intesect(ra)) cur = ra
                        else if (r.intesect(rb)) cur = rb
                        if (cur === null) continue

                        const ty = r.minY - cur.maxY - gap
                        if (ty > 0) continue
                        ra.translate(0, ty)
                        rb.translate(0, ty)
                        intersect()
                        break
                    }
                }
                intersect()
                ctx.closePath()

                pointName.push(ra.fill(), rb.fill())
                rb.maxY += 3 * dpr
                pointNameClip.push(ra, rb)
            }
        }

        ctx.save()
        if (pointNameClip.length > 0) {
            for (const p of pointNameClip) {
                //ctx.fillStyle = 'rgba(0, 100, 0, .3)'
                //ctx.fillRect(p.minX, p.minY, p.width, p.height)
                const path = new Path2D()
                path.rect(0, 0, caw, cah)
                path.rect(p.minX, p.minY, p.width, p.height)
                ctx.clip(path, 'evenodd')
            }
        }

        /**
         * @param {Point} p
         */
        const _clipPoint = (p) => {
            const path = new Path2D()
            path.rect(0, 0, caw, cah)
            path.arc(p.cx, p.cy, p.cr, 0, Math.PI * 2)
            ctx.clip(path, 'evenodd')
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

        for (const s of this.segments) {
            const ax = s.A.cx, ay = s.A.cy
            const bx = s.B.cx, by = s.B.cy

            const dash = s.dash.map(v => v * dpr)

            const dx = s.B.cx - s.A.cx, dy = s.B.cy - s.A.cy
            const angle = Math.atan2(dy, dx)

            ctx.save()
            _clipPoint(s.A)
            _clipPoint(s.B)

            const ld = this.#canvasWidth + this.#canvasHeight
            const cos = Math.cos(angle) * ld
            const sin = Math.sin(angle) * ld

            if (s.ray) {
                _segment(bx, by, bx + cos, by + sin, s.B.color, null, dash)
            }

            if (s.lineOld >= 0) {
                _segment(ax, ay, bx, by, s.A.color, s.B.color, dash)
            }
            if (s.lineOld > 0) {


                if (s.lineOld >= 3 || s.lineOld === 1) {
                    _segment(ax, ay, ax - cos, ay - sin, s.A.color, null, dash)
                }
                if (s.lineOld >= 3 || s.lineOld === 2) {
                    _segment(bx, by, bx + cos, by + sin, s.B.color, null, dash)
                }
            }
            ctx.restore()

            if (s.name.length > 0) {
                ctx.fillStyle = s.B.color.strokeStyle
                ctx.font = `${14 * dpr}px ${fontFamily}`
                ctx.textAlign = 'left'
                const m = ctx.measureText(s.name)
                const th = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
                ctx.fillText(s.name, bx + s.B.cr + 8 * dpr, by + th * .5)
            }
        }

        // -- rect
        for (const r of this.rects) {
            const ax = r.A.cx, ay = r.A.cy
            const bx = r.B.cx, by = r.B.cy

            const grad = ctx.createLinearGradient(ax, ay, bx, by)
            grad.addColorStop(0, r.A.color.strokeStyle)
            grad.addColorStop(1, r.B.color.strokeStyle)
            ctx.strokeStyle = grad

            ctx.save()
            _clipPoint(r.A)
            _clipPoint(r.B)

            ctx.beginPath()

            ctx.moveTo(ax, ay) // ↖️
            ctx.lineTo(bx, ay) // ↗️
            ctx.lineTo(bx, by) // ↘️
            ctx.lineTo(ax, by) // ↙️
            ctx.closePath()

            ctx.stroke()
            ctx.restore()
        }

        ctx.restore()

        // -- polygon
        for (const p of this.polygons) {
            if (p.hidden || p.points.length < 2) continue

            ctx.beginPath()
            ctx.moveTo(p.points[0].cx, p.points[0].cy)
            for (let i = 1; i < p.points.length; i++) {
                ctx.lineTo(p.points[i].cx, p.points[i].cy)
            }
            ctx.fillStyle = p.color.fillStyle
            //ctx.strokeStyle = p.color.strokeStyle
            //ctx.stroke()
            ctx.fill('evenodd')
            ctx.closePath()
        }

        // -- return
        return this
    }

}
