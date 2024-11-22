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
        :host {
            display: block;
            box-sizing: border-box;
            border: 1px solid #1b289e;
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

        .intval {
            background-color: #0c0c3a;
            display: block;
            user-select: none;
            cursor: pointer;
            padding: 8px;
        }

        .intval span {
            display: inline-block;
            vertical-align: middle;
        }

        [type=checkbox] {
            --input-background: #de3459;
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
            border-radius: 0;
        }

        [type=checkbox]:checked {
            --m: 4px;
            outline: var(--m) double var(--input-background);
            background-color: var(--input-background);
        }

    `)


CanvasDraw.define(CanvasDraw)
