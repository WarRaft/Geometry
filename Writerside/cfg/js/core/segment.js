class Segment {
    /**
     * @param {Point} a
     * @param {Point} b
     * @param {number[]} dash
     * @param {number} line
     * @param {string} name
     */
    constructor(a, b, {
        dash = [],
        line = 0,
        name = ''
    } = {}) {
        this.a = a
        this.b = b
        this.dash = dash
        this.line = line
        this.name = name
    }

    /**
     * @param {Cartesian} ctx
     * @return {this}
     */
    draw(ctx) {
        if (ctx instanceof Cartesian) {
            ctx.drawSegment.push(this)
        }
        return this
    }
}
