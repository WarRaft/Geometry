class TextDraw {
    /**
     * @param {CanvasDraw} draw
     */
    constructor(draw) {
        this.#draw = draw
    }

    /** @type {CanvasDraw} */ #draw

    /** @type {TextSpan[]} */ spans = []

    /**
     * @param {-1|1} xalign
     */
    draw({xalign = -1} = {}) {
        if (this.spans.length === 0) return

        const ctx = this.#draw.ctx
        const caw = this.#draw.canvas.width
        const dpr = this.#draw.dpr
        const fs = 16 * dpr
        const ff = cssvar('font-family')
        ctx.textAlign = 'left'

        const lines = [new TextLine()]
        let line = lines[0]

        for (const s of this.spans) {
            if (s.text === '\n') {
                lines.push(line = new TextLine())
                continue
            }
            s.rect = TextRect.fromText(ctx, s.text, fs, ff, {color: Color.text})
            line.span = s
        }

        let w = 0
        let h = 0
        const gap = 10 * dpr
        for (const l of lines) {
            if (l.spans.length === 0) continue
            w = Math.max(w, l.width)
            h += l.height + gap
            l.maxY = h
        }

        const p = 10 * dpr
        const p2 = p * 2
        let x = 0
        let rx = 0
        const ry = h - gap + p2

        switch (xalign) {
            case -1:
                x = p
                rx = 0
                break
            case 1:
                x = caw - w - p
                rx = x - p
                break
        }
        let y = p

        ctx.beginPath()
        ctx.strokeStyle = '#1b289e'
        ctx.lineWidth = 2 * dpr
        switch (xalign) {
            case -1:
                ctx.moveTo(0, ry)
                ctx.lineTo(w + p2, ry)
                ctx.lineTo(w + p2, 0)
                break
            case 1:
                ctx.moveTo(rx, 0)
                ctx.lineTo(rx, ry)
                ctx.lineTo(caw, ry)
                break
        }
        ctx.stroke()
        ctx.closePath()

        ctx.fillStyle = Color.text.fillStyle
        ctx.fillRect(rx, 0, w + p2, ry)

        ctx.textAlign = 'left'
        for (let i = 0; i < lines.length; i++) {
            const l = lines[i]
            l.draw(x, i === 0 ? y : y + lines[i - 1].maxY)
        }
    }

    /**
     * @param {Point} a
     * @param {Point} b
     * @return {this}
     */
    noline(a, b) {
        this.spans.push(
            new TextSpan('Прямая '),
            new TextSpan(a.name, {color: a.color}),
            new TextSpan(b.name, {color: b.color}),
            new TextSpan(' не определена'),
            new TextSpan('\n'),
        )

        return this
    }
}
