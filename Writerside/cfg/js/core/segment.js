class Segment {
    /**
     * @param {Point} A
     * @param {Point} B
     * @param {number[]} dash
     * @param {string} name
     * @param {boolean} ray
     * @param {boolean} line
     * @param {boolean} drawLine
     * @param {boolean} minmax
     */
    constructor(A, B, {
        dash = [],
        name = '',
        ray = false,
        line = false,
        drawLine = true,
        minmax = false,
    } = {}) {
        this.A = A
        this.drawLine = drawLine
        if (A) A.segment = this

        this.B = B
        if (B) B.segment = this

        this.dash = dash
        this.name = name
        this.ray = ray
        this.line = line

        if (minmax) {
            A.minThan = B
            B.maxThan = A
        }
    }

    get hasLine() {
        return this.A.x !== this.B.x || this.A.y !== this.B.y
    }

    /**
     * @param {TextDraw} t
     * @return {this}
     */
    noline(t) {
        const a = this.A
        const b = this.B
        if (this.line) t.push(new TextSpan('Прямая '))
        if (this.ray) t.push(new TextSpan('Луч '))

        t.push(
            new TextSpan(a.name, {color: a.color}),
            new TextSpan(b.name, {color: b.color}),
        )

        if (this.line) t.push(new TextSpan(' не определена'))
        if (this.ray) t.push(new TextSpan(' не определён'))

        t.push(new TextSpan('\n'))

        return this
    }

    get points() {
        return [this.A, this.B]
    }

    /**
     * @param {Point} A
     * @param {Point} B
     * @return {this}
     */
    position(A, B) {
        this.A = A
        this.B = B
        return this
    }
}
