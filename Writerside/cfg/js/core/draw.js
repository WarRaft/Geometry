const cssvar = (name) => window.getComputedStyle(document.body).getPropertyValue(name)

class CanvasDraw extends HTMLElement {
    /** @type {Map <string, boolean>} */ static map = new Map()

    static name = 'canvas-grid'
    static sheet = new CSSStyleSheet()

    /**
     * @param {CanvasDraw} constructor
     */
    static define(constructor) {
        // noinspection JSUnresolvedReference,JSCheckFunctionSignatures
        customElements.define(constructor.name, constructor)
        // noinspection JSUnresolvedReference
        CanvasDraw.map.set(constructor.name, true)
    }

    constructor() {
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.adoptedStyleSheets = [CanvasDraw.sheet]

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

    /** @deprecated */ centerX = 0
    /** @deprecated */ centerY = 0
    /** @deprecated */ pointRadius = 6

    /** @return {number} */ get dpr() {
        return window.devicePixelRatio ?? 1
    }

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

    // noinspection JSUnusedLocalSymbols
    /** @param {PointerEvent} e */
    pointerdownCallback = (e) => {
    }
    pointermoveCallback = () => {
    }
    pointerupCallback = () => {
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

        this.pointerdownCallback(e)

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
            this.pointermoveCallback()
            this.dx += e.clientX - this.#pointer.clientX
            this.dy += e.clientY - this.#pointer.clientY
            this.#pointer = e
        }

        c.onpointerup = e => {
            if (!e.isPrimary) return
            this.pointerupCallback()
            this.#point = null
            c.onpointermove = null
            c.onpointerup = null
        }
    }

    draw() {
    }

    redraw() {
        const draw = this.draw()

        this.dx = 0
        this.dy = 0

        if (draw !== false) this.raf = requestAnimationFrame(this.redraw)
    }
}

// noinspection CssUnusedSymbol,CssUnresolvedCustomProperty
CanvasDraw.sheet.replaceSync(
    //language=CSS
    `
        .container {
            display: block;
            position: relative;
            width: 100%;
            margin: 0;
            border-radius: 12px;
            background-color: #0e0e2e;
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


CanvasDraw.define(CanvasDraw)
