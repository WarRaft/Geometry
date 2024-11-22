class Segment {

    /**
     * @param {Point} a
     * @param {Point} b
     * @param {number[]} dash
     * @param {number} line
     */
    constructor(a, b, {
        dash = [],
        line = 0
    } = {}) {
        this.a = a
        this.b = b
        this.dash = dash
        this.line = line
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
