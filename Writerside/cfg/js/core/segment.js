class Segment {
    /**
     * @param {Point} A
     * @param {Point} B
     * @param {number[]} dash
     * @param {number} line
     * @param {string} name
     */
    constructor(A, B, {
        dash = [],
        line = 0,
        name = ''
    } = {}) {
        this.A = A
        this.B = B
        this.dash = dash
        this.line = line
        this.name = name
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
