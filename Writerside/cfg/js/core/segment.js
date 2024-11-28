class Segment {
    /**
     * @param {Point} A
     * @param {Point} B
     * @param {number[]} dash
     * @param {number} lineOld
     * @param {string} name
     * @param {boolean} ray
     * @param {boolean} line
     * @param {boolean} minmax
     */
    constructor(A, B, {
        dash = [],
        lineOld = 0,
        name = '',
        ray = false,
        line = false,
        minmax = false,
    } = {}) {
        this.A = A
        if (A) A.segment = this

        this.B = B
        if (B) B.segment = this

        this.dash = dash
        this.lineOld = lineOld
        this.name = name
        this.ray = ray
        this.line = line

        if (minmax) {
            A.minThan = B
            B.maxThan = A
        }
    }

    /**
     * @type {number}
     * @deprecated
     */
    lineOld = 0

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
