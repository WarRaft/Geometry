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
        const shadow = this.shadow = this.attachShadow({mode: 'open'})
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

    /** @type {ShadowRoot} */ shadow
    /** @type {HTMLDivElement} */ container
    /** @type {HTMLCanvasElement} */ canvas
    /** @type {CanvasRenderingContext2D} */ ctx
    raf = 0

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

    // === Events
    dx = 0
    dy = 0
    /** @type {PointerEvent} */ #pointer = null

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
            c.onpointermove = null
            c.onpointerup = null
        }
    }

    /**
     * @param {number} value
     * @return {this}
     */
    lerp(value) {
        const menu = document.createElement('div')
        this.shadow.appendChild(menu)
        menu.classList.add('menu', 'menu-lerp')

        const label = document.createElement('label')
        label.classList.add('menu-lerp-label')
        menu.appendChild(label)

        const checkbox = this.#lerpCheckbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = false
        label.appendChild(checkbox)

        const range = this.#lerpRange = document.createElement('input')
        range.type = 'range'
        range.min = '0'
        range.max = '1'
        range.step = '0.0001'
        range.value = value.toString()
        menu.appendChild(range)

        const data = this.#lerpRangeData = document.createElement('div')
        data.classList.add('menu-lerp-data')
        menu.appendChild(data)

        this.lerpK = value
        this.#lerpRangeUpdate()
        range.addEventListener('input', () => {
            this.lerpK = +range.value
            this.#lerpRangeUpdate()
        })

        checkbox.addEventListener('change', () => {
            range.disabled = checkbox.checked
        })

        return this
    }

    /** @type {HTMLDivElement} */ #lerpRangeData
    /** @type {HTMLInputElement} */ #lerpRange
    /** @type {HTMLInputElement} */ #lerpCheckbox

    #lerpRangeUpdate() {
        this.#lerpRangeData.innerText = this.lerpK.toFixed(2)
    }

    lerpK = 0
    #lerpDk = 1

    #drawStart = null

    draw() {
    }

    redraw(ts) {
        if (ts && this.#lerpRange) {
            if (this.#drawStart === null) this.#drawStart = ts
            let ds = ts - this.#drawStart
            this.#drawStart = ts

            if (this.#lerpCheckbox?.checked ?? false) {
                if ((this.#lerpDk > 0 && this.lerpK >= 1) || (this.#lerpDk < 0 && this.lerpK <= 0)) this.#lerpDk *= -1
                ds *= .00055 * this.#lerpDk

                this.lerpK = Math.min(Math.max(this.lerpK + ds, 0), 1)
                this.#lerpRange.value = this.lerpK.toString()
                this.#lerpRangeUpdate()
            }
        }

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
        :host {
            --active: #de3459;
            --bc: #1b289e;
            --bg-menu: #0c0c3a;
            display: block;
            box-sizing: border-box;
            border: 1px solid var(--bc);
        }

        .container {
            position: relative;
        }

        canvas {
            touch-action: none;
            position: absolute;
            inset: 0;
            display: block;
            width: 100%;
            height: 100%;
        }

        .menu {
            --p: 8px;
            border-top: 1px solid var(--bc);
            background-color: var(--bg-menu);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            user-select: none;
        }

        label.menu {
            cursor: pointer;
        }

        .menu-round {
            padding: var(--p);
        }

        .menu-round span {
            display: inline-block;
            vertical-align: middle;
        }

        .menu-lerp [type=range] {
            border-left: 1px solid var(--bc);
        }

        .menu-lerp-label,
        .menu-lerp-data {
            align-self: stretch;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        .menu-lerp-label {
            cursor: pointer;
            padding-left: var(--p);
        }

        .menu-lerp-data {
            min-width: 3rem;
            border-left: 1px solid var(--bc);
            padding-left: 10px;
        }


        [type=checkbox] {
            --m: 0px;
            --s: 16px;
            pointer-events: none;
            display: inline-block;
            box-sizing: border-box;
            appearance: none;
            width: calc(var(--s) - var(--m) * 2);
            height: calc(var(--s) - var(--m) * 2);
            margin: var(--m) calc(.5rem + var(--m)) var(--m) calc(var(--m));
            vertical-align: middle;
            border: 1px solid var(--active);
            border-radius: 0;
        }

        [type=checkbox]:checked {
            --m: 4px;
            outline: var(--m) double var(--active);
            background-color: var(--active);
        }

        /* Range */
        [type=range] {
            --thumb: var(--active);
            margin: auto;
            appearance: none;
            position: relative;
            overflow: hidden;
            height: 36px;
            width: 100%;
            cursor: pointer;
            border-radius: 0;
            background: var(--bg-menu);
        }

        [type=range]:active {
            --thumb: #da4e6f;
        }

        [type=range]:disabled {
            --thumb: #431823;
        }

        ::-webkit-slider-runnable-track {
            background-color: transparent;
        }

        ::-webkit-slider-thumb {
            display: block;
            appearance: none;
            width: 20px;
            height: 20px;
            background: var(--thumb);
            border: 0;
        }
    `)


CanvasDraw.define(CanvasDraw)
