class Rect {

    /**
     * @param {Point} a
     * @param {Point} b
     * @param {number[]} dash
     * @param {number} line
     */
    constructor(a, b, {
        dash = [],
    } = {}) {
        this.a = a
        this.b = b
        this.dash = dash
    }

    /**
     * @param {Cartesian} ctx
     * @return {this}
     */
    draw(ctx) {
        if (ctx instanceof Cartesian) {
            ctx.drawRect.push(this)
        }
        return this
    }
}
