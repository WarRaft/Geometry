const cssvar = (name) => window.getComputedStyle(document.body).getPropertyValue(name)

class CanvasGrid extends HTMLElement {
    /** @type {Map <string, boolean>} */ static map = new Map()

    static name = 'canvas-grid'
    static sheet = new CSSStyleSheet()

    /**
     * @param {CanvasGrid} constructor
     */
    static define(constructor) {
        // noinspection JSUnresolvedReference,JSCheckFunctionSignatures
        customElements.define(constructor.name, constructor)
        // noinspection JSUnresolvedReference
        CanvasGrid.map.set(constructor.name, true)
    }

    constructor() {
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.adoptedStyleSheets = [CanvasGrid.sheet]

        this.container = document.createElement('div')
        shadow.appendChild(this.container)
        this.container.classList.add('container')

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.container.appendChild(this.canvas)

        this.pointerdown = this.pointerdown.bind(this)
        this.redraw = this.redraw.bind(this)

        this.canvas.addEventListener('pointerdown', this.pointerdown, {passive: false})
    }

    /** @type {HTMLDivElement} */ container
    /** @type {HTMLCanvasElement} */ canvas
    /** @type {CanvasRenderingContext2D} */ ctx
    raf = 0
    centerX = 0
    centerY = 0
    pointRadius = 6

    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        this.redraw()
        //console.log('💋connectedCallback')
    }

    // noinspection JSUnusedGlobalSymbols
    disconnectedCallback() {
        cancelAnimationFrame(this.raf)
        //console.log('🔥disconnectedCallback')
    }

    /** @type {HTMLLabelElement} */ roundContainer
    round = false

    /**
     * @param {boolean} checked
     * @return {this}
     */
    roundInit(checked = false) {
        const c = document.createElement('label')
        this.roundContainer = c
        this.container.appendChild(c)

        c.classList.add('intval')
        c.innerHTML = '<input type="checkbox"><span>Выровнять по сетке</span>'

        const ch = c.querySelector('input')
        ch.checked = this.round = checked
        ch.addEventListener('change', () => {
            this.round = ch.checked
        })
        return this
    }

    // ================
    /** @return {number} */  get height() {
        return 8
    }

    /** @return {number} */ get step() {
        return 25 * (window.devicePixelRatio ?? 1)
    }

    /**
     * @param {number} dx
     * @param {number} dy
     * @param {boolean} axisX
     * @param {boolean} axisY
     * @return {this}
     */
    grid({
             dx = .5,
             dy = .5,
             axisX = true,
             axisY = true
         } = {}) {
        const cw = this.canvas.width
        const ch = this.canvas.height
        const cx = cw * dx
        const cy = ch * dy
        this.centerX = cx
        this.centerY = cy

        const ctx = this.ctx

        const dpr = window.devicePixelRatio ?? 1
        const step = this.step

        const cminx = Math.trunc(cx / step)
        const cminy = Math.trunc(cy / step)

        const cmaxx = Math.trunc((cw - cx) / step)
        const cmaxy = Math.trunc((ch - cy) / step)

        // === grid
        ctx.beginPath()
        for (let i = -cminx; i <= cmaxx; i++) {
            const x = cx + i * step
            ctx.moveTo(x, 0)
            ctx.lineTo(x, ch)
        }

        for (let i = -cminy; i <= cmaxy; i++) {
            const y = cy + i * step
            ctx.moveTo(0, y)
            ctx.lineTo(cw, y)
        }
        ctx.strokeStyle = Color.grid.strokeStyle
        ctx.stroke()
        ctx.closePath()

        // === axis
        if (axisX || axisY) {
            ctx.beginPath()
            if (axisX) {
                ctx.moveTo(0, cy)
                ctx.lineTo(cw, cy)
            }
            if (axisY) {
                ctx.moveTo(cx, 0)
                ctx.lineTo(cx, ch)
            }
            ctx.strokeStyle = Color.axis.strokeStyle
            ctx.stroke()
            ctx.closePath()

            ctx.beginPath()
            const h = 5 * dpr

            if (axisX) for (let i = -cminx; i <= cmaxx; i++) {
                const x = cx + i * step
                ctx.moveTo(x, cy - h)
                ctx.lineTo(x, cy + h)
            }

            if (axisY) for (let i = -cminy; i <= cmaxy; i++) {
                const y = cy + i * step
                ctx.moveTo(cx - h, y)
                ctx.lineTo(cx + h, y)
            }

            // text
            ctx.save()
            ctx.scale(1, -1)
            ctx.fillStyle = Color.axis.strokeStyle

            if (axisX) {
                ctx.textAlign = 'center'
                for (let i = -cminx; i <= cmaxx; i++) {
                    if (i === 0 && axisY) continue
                    const x = cx + i * step
                    const text = `${i}`
                    const metrics = ctx.measureText(text)
                    const hwm = metrics.width * .5
                    if (x - hwm < 0) continue
                    if (x + hwm > cw) continue

                    const tw = metrics.width
                    const th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

                    const y = -cy + th + h + 4 * dpr
                    const p = 2 * dpr

                    ctx.clearRect(x - p - tw * .5, y - p - th, tw + p * 2, th + p * 2)
                    ctx.fillText(text, x, y)
                }
            }

            if (axisY) {
                ctx.textAlign = 'right'
                for (let i = -cminy; i <= cmaxy; i++) {
                    if (i === 0 && axisY) continue
                    const y = cy + i * step
                    const text = `${i}`
                    const metrics = ctx.measureText(text)
                    const th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
                    const hth = th * .5
                    if (y - hth < 0) continue
                    if (y + hth > ch) continue
                    ctx.fillText(text, cx - h - 4 * dpr, -y + hth)
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
     * @param {boolean} trackX
     * @param {boolean} trackY
     * @param {string?} name
     * @param {number[]} dash
     * @param {boolean} ray
     * @param {number} padding
     * @param {Color} color
     * @return {this}
     */
    point(point, {
        trackX = false,
        trackY = false,
        name,
        dash = [],
        ray = false,
        padding = 0,
        color = Color.yellow,
    } = {}) {
        const dpr = window.devicePixelRatio ?? 1
        const step = this.step
        const r = this.pointRadius * dpr

        const cx = this.centerX
        const cy = this.centerY

        const x = cx + point.x * step
        const y = cy + point.y * step

        const ctx = this.ctx

        if (trackX || trackY) {
            ctx.beginPath()
            ctx.strokeStyle = Colors.point.track.fill

            // === line
            let xy, yx

            if (trackX) {
                if (point.y < 0) {
                    ctx.moveTo(x, y + r)
                    xy = cy + step
                } else {
                    ctx.moveTo(x, y - r)
                    xy = cy - step
                }
                ctx.lineTo(x, xy - (padding * dpr))
            }

            if (trackY) {
                if (point.x < 0) {
                    ctx.moveTo(x + r, y)
                    yx = cx + step
                } else {
                    ctx.moveTo(x - r, y)
                    yx = cx - step
                }
                ctx.lineTo(yx, y)
            }

            ctx.fill()
            ctx.stroke()
            ctx.closePath()

            // === text
            ctx.save()
            ctx.scale(1, -1)

            /**
             * @param {number} value
             * @param {number} x
             * @param {number} y
             * @param {boolean} v
             */
            const text = (value, x, y, v) => {
                ctx.beginPath()
                const t = point.round ? Math.round(value).toString() : value.toFixed(2)
                const m = ctx.measureText(t)
                const th = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent

                const px = 6 * dpr
                const py = 8 * dpr
                let rw = m.width + px
                let rh = th + py
                let rx, ry, tx, ty
                if (v) {
                    rx = x - rw * .5
                    ry = -y
                    tx = x
                    ty = -y + th + py * .5
                    if (point.y < 0) {
                        ry -= rh
                        ty -= rh
                    }
                } else {
                    rx = x - rw
                    ry = -y - rh * .5
                    tx = x - m.width * .5 - px * .5
                    ty = -y + th * .5
                    if (point.x < 0) {
                        rx += rw
                        tx += rw
                    }
                }

                ctx.fillStyle = Colors.point.track.fill
                ctx.roundRect(rx, ry, rw, rh, [4 * dpr])

                ctx.fill()

                ctx.fillStyle = Colors.point.track.text
                ctx.textAlign = 'center'
                ctx.fillText(t, tx, ty)
                ctx.closePath()
            }
            if (trackX) text(point.x, x, xy - (padding * dpr), true)
            if (trackY) text(point.y, yx, y, false)

            ctx.restore()
        }

        ctx.beginPath()
        ctx.fillStyle = color.fillStyle
        ctx.strokeStyle = color.strokeStyle

        ctx.setLineDash(dash.map(v => v * dpr))
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        if (ray) {
            ctx.beginPath()
            ctx.strokeStyle = Colors.point.fill
            ctx.moveTo(x + r, y)
            ctx.lineTo(this.canvas.width, y)
            ctx.stroke()
            ctx.closePath()
        }

        if ((name ?? '').length > 0) {
            ctx.beginPath()
            ctx.save()
            ctx.scale(1, -1)
            const m = ctx.measureText(name)
            ctx.fillStyle = Colors.point.name
            ctx.fillText(name, x - m.width * .5, -y - r - 4 * dpr - (padding * dpr))
            ctx.restore()
            ctx.closePath()
        }

        return this
    }

    /**
     * @param {string} text
     * @param {?number} x
     * @param {?number} y
     * @param {Color} color
     * @param {number} fontSize
     */
    text(text, {
        x = null,
        y = null,
        color = Color.teal,
        fontSize = 18,
    } = {}) {
        const dpr = window.devicePixelRatio ?? 1
        const step = this.step

        let cx = 0, cy = 0

        const ctx = this.ctx

        const mt = ctx.measureText(text)
        const th = mt.actualBoundingBoxAscent + mt.actualBoundingBoxDescent

        if (x !== null && y !== null) {
            cx = this.centerX + x * step
            cy = -this.centerY - y * step
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

    /**
     * @param {Point} a
     * @param {Point} b
     * @param {number[]} dash
     * @param {Color?} line
     * @param {Color} color
     * @return {this}
     */
    segment(a, b, {
        dash = [],
        line = null,
        color = Color.yellow,
    } = {}) {
        const dpr = window.devicePixelRatio ?? 1
        const step = this.step
        const r = this.pointRadius * dpr
        const ctx = this.ctx

        const cx = this.centerX
        const cy = this.centerY

        const ax = cx + a.x * step
        const ay = cy + a.y * step
        const bx = cx + b.x * step
        const by = cy + b.y * step

        const dx = bx - ax
        const dy = by - ay

        const angle = Math.atan2(dy, dx)
        const dist = Math.sqrt(dx * dx + dy * dy) - r

        ctx.beginPath()
        ctx.strokeStyle = color.strokeStyle
        ctx.moveTo(
            Math.cos(angle) * r + ax,
            Math.sin(angle) * r + ay
        )
        ctx.lineTo(
            Math.cos(angle) * dist + ax,
            Math.sin(angle) * dist + ay
        )
        ctx.setLineDash(dash.map(v => v * dpr))
        ctx.stroke()
        ctx.closePath()

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

        return this
    }

    /**
     * @param {Point[]} points
     * @param {string} color
     * @return {this}
     */
    polygon(points, {
        color = Colors.polygon.fill
    } = {}) {
        if (points.length < 2) return this

        const ctx = this.ctx
        const step = this.step

        const cx = this.centerX
        const cy = this.centerY

        ctx.beginPath()
        ctx.moveTo(cx + points[0].x * step, cy + points[0].y * step)
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(cx + points[i].x * step, cy + points[i].y * step)
        }
        ctx.fillStyle = color
        //ctx.strokeStyle = Color.polygon.stroke
        ctx.fill('evenodd')
        ctx.closePath()
        return this
    }

    /**
     * @param {Point} point
     * @return {this}
     */
    circle(point) {
        const dpr = window.devicePixelRatio ?? 1
        const step = this.step
        const pr = this.pointRadius * dpr
        const cr = this.canvas.width * .5 - step * 3

        const cx = this.centerX
        const cy = this.centerY

        const ctx = this.ctx

        const px = cx + point.x * step
        const py = cy + point.y * step

        const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2)
        const rad = Math.atan2(-point.y, -point.x) + Math.PI
        if (dist < cr) {
            ctx.beginPath()
            ctx.strokeStyle = Colors.point.stroke
            ctx.setLineDash([3 * dpr])
            ctx.moveTo(
                cx + Math.cos(rad) * (dist + pr),
                cy + Math.sin(rad) * (dist + pr),
            )
            ctx.lineTo(
                cx + Math.cos(rad) * cr,
                cy + Math.sin(rad) * cr,
            )
            ctx.stroke()
            ctx.closePath()
        }

        ctx.beginPath()
        ctx.strokeStyle = Colors.point.track.fill
        ctx.setLineDash([])
        ctx.arc(cx, cy, cr, rad, Math.PI * 2)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = Colors.point.stroke
        ctx.setLineDash([3 * dpr])
        ctx.arc(cx, cy, cr, 0, rad)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = Colors.point.stroke
        ctx.setLineDash([3 * dpr])
        ctx.moveTo(cx + pr, cy)
        ctx.lineTo(cx + cr, cy)
        ctx.stroke()
        ctx.closePath()


        ctx.save()
        ctx.scale(1, -1)
        ctx.beginPath()
        ctx.setLineDash([])
        ctx.strokeStyle = Colors.point.track.fill

        const p = 20 * dpr
        const texts = []
        for (let a = 360; a > 0; a -= 10) {
            const rad = a * (Math.PI / 180)
            const rx = cx + cr * Math.cos(rad)
            const ry = cy + cr * Math.sin(rad)
            const lx = cx + (cr - p) * Math.cos(rad)
            const ly = cy + (cr - p) * Math.sin(rad)
            if (a < 360) {
                ctx.moveTo(rx, -ry)
                ctx.lineTo(lx, -ly)
            }
            texts.push([a, lx, ly, true])
        }

        for (let rad = 0; rad < 6.29; rad += .1) {
            const rx = cx + cr * Math.cos(rad)
            const ry = cy + cr * Math.sin(rad)
            const lx = cx + (cr + p) * Math.cos(rad)
            const ly = cy + (cr + p) * Math.sin(rad)
            ctx.moveTo(rx, -ry)
            ctx.lineTo(lx, -ly)
            texts.push([rad, lx, ly, false])
        }

        ctx.stroke()
        ctx.closePath()

        const textDraw = (value, x, y, inner) => {
            ctx.beginPath()
            const t = inner ? value.toString() : value.toFixed(1)
            const m = ctx.measureText(t)
            const th = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
            y -= th * .5

            const px = 6 * dpr
            const py = 8 * dpr
            let rw = m.width + px
            let rh = th + py
            const dt = 8 * dpr
            const r = inner ? Math.atan2(cy - y, cx - x) : Math.atan2(y - cy, x - cx)
            x += Math.cos(r) * dt
            y += Math.sin(r) * dt

            let rx = x - rw * .5
            let ry = -y - th - py * .5

            ctx.fillStyle = Colors.point.track.fill
            ctx.roundRect(rx, ry, rw, rh, [4 * dpr])
            ctx.fill()

            ctx.textAlign = 'center'
            ctx.fillStyle = Colors.point.track.text
            ctx.fillText(t, x, -y)
            ctx.closePath()
        }

        for (const t of texts) textDraw(...t)
        ctx.restore()

        return this
    }

    /**
     * @param {Point} point
     * @param {number} radius
     * @param {number} a
     * @param {number} b
     * @param {number[]} dash
     * @return {this}
     */
    arc(point, radius, a, b, {
        dash = []
    } = {}) {
        if (AngleNormalize(b - a) < 0) [a, b] = [b, a]

        const step = this.step

        const cx = this.centerX
        const cy = this.centerY

        const ctx = this.ctx

        const px = cx + point.x * step
        const py = cy + point.y * step

        ctx.beginPath()
        ctx.arc(px, py, radius * step, a, b)
        ctx.setLineDash(dash)
        ctx.strokeStyle = Colors.point.stroke
        ctx.stroke()
        ctx.closePath()

        return this
    }

    // === Events
    dx = 0
    dy = 0
    /** @type {PointerEvent} */ #pointer = null
    /** @type {Point[]} */ points = []
    /** @type {Point} */ #point = null

    dragRelease() {
        if (this.#point === null) return this
        const dpr = window.devicePixelRatio ?? 1
        const step = this.step

        this.#point.drag(this.dx * dpr / step, -this.dy * dpr / step)
        return this
    }

    /** @param {PointerEvent} e */
    pointerdown(e) {
        if (!e.isPrimary) return
        const c = this.canvas
        if (c === null) return
        if (e.pointerType === 'mouse' && e.button !== 0) return
        this.#pointer = e
        c.setPointerCapture(e.pointerId)
        e.stopImmediatePropagation()

        if (this.points.length > 0) {
            const rect = this.container.getBoundingClientRect()
            const dpr = window.devicePixelRatio ?? 1
            const step = this.step

            const x = ((e.clientX - rect.x) * dpr - this.centerX) / step
            const y = (this.canvas.height - (e.clientY - rect.y) * dpr - this.centerY) / step

            /**
             * @param {Point} p
             * @return {number}
             */
            const dist = p => (x - p.x) ** 2 + (y - p.y) ** 2

            let lowest = 0
            for (let i = 1; i < this.points.length; i++) {
                if (dist(this.points[i]) < dist(this.points[lowest])) lowest = i
            }
            this.#point = this.points[lowest]
        }

        c.onpointermove = e => {
            if (!e.isPrimary) return
            this.dx += e.clientX - this.#pointer.clientX
            this.dy += e.clientY - this.#pointer.clientY
            this.#pointer = e
        }

        c.onpointerup = e => {
            if (!e.isPrimary) return
            this.#point = null
            c.onpointermove = null
            c.onpointerup = null
        }
    }

    draw() {
    }

    // === Redraw
    redraw() {
        const dpr = window.devicePixelRatio ?? 1

        this.canvas.width = this.container.getBoundingClientRect().width * dpr
        const rh = (this.step / dpr) * this.height
        this.container.style.height = `${rh}px`

        const h = rh * dpr
        this.canvas.height = h

        const ctx = this.ctx

        ctx.lineJoin = 'miter'
        ctx.lineWidth = dpr
        ctx.font = `${12 * dpr}px ${cssvar('font-family')}`

        ctx.scale(1, -1)
        ctx.translate(0, -h)

        const repeat = this.draw()

        this.dx = 0
        this.dy = 0

        if (repeat !== false) this.raf = requestAnimationFrame(this.redraw)
    }
}

// noinspection CssUnusedSymbol,CssUnresolvedCustomProperty
CanvasGrid.sheet.replaceSync(
    //language=CSS
    `
        .container {
            display: block;
            position: relative;
            width: 100%;
            margin: 0;
            border-radius: 8px;
            background-color: var(--wh-color-white-t5);
            overflow: hidden;
        }

        canvas {
            touch-action: none;
            position: absolute;
            inset: 0;
            display: block;
            width: 100%;
            height: 100%;
        }

        .intval {
            user-select: none;
            position: absolute;
            bottom: 8px;
            left: 12px;
            cursor: pointer;
        }

        .intval span {
            display: inline-block;
            vertical-align: middle;
        }

        [type=checkbox] {
            --input-background: #32a1ce;
            --m: 0px;
            --s: 16px;
            display: inline-block;
            box-sizing: border-box;
            appearance: none;
            width: calc(var(--s) - var(--m) * 2);
            height: calc(var(--s) - var(--m) * 2);
            margin: var(--m) calc(.5rem + var(--m)) var(--m) calc(var(--m));
            vertical-align: middle;
            border: 1px solid var(--input-background);
        }

        [type=checkbox]:checked {
            --m: 4px;
            outline: var(--m) double var(--input-background);
            background-color: var(--input-background);
        }

    `)


CanvasGrid.define(CanvasGrid)
