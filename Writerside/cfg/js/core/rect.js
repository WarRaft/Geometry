class Rect {

    /**
     * @param {Point} A
     * @param {Point} B
     * @param {number[]} dash
     * @param {number} line
     */
    constructor(A, B, {
        dash = [],
    } = {}) {
        this.A = A
        this.B = B
        A.minThan = B
        B.maxThan = A
        this.dash = dash
    }

    get points() {
        return [this.A, this.B]
    }
}
