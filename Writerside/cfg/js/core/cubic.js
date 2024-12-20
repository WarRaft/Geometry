// https://github.com/WebKit/WebKit/blob/main/Source/WebCore/platform/graphics/UnitBezier.h
// https://codepen.io/onedayitwillmake/pen/nJjYRp

class Cubic {
    /**
     * @param {number} p1x
     * @param {number} p1y
     * @param {number} p2x
     * @param {number} p2y
     * @param name
     */
    constructor(p1x, p1y, p2x, p2y, {name = ''} = {}) {
        this.cx = 3.0 * p1x
        this.bx = 3.0 * (p2x - p1x) - this.cx
        this.ax = 1.0 - this.cx - this.bx

        this.cy = 3.0 * p1y
        this.by = 3.0 * (p2y - p1y) - this.cy
        this.ay = 1.0 - this.cy - this.by

        this.name = name
    }

    #sampleCurveX(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t
    }

    #sampleCurveY(t) {
        return ((this.ay * t + this.by) * t + this.cy) * t
    }

    #sampleCurveDerivativeX(t) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx
    }

    #solveCurveX(x, epsilon) {
        let t2
        let x2
        let d2
        let i

        for (t2 = x, i = 0; i < 32; i++) {
            x2 = this.#sampleCurveX(t2) - x
            if (Math.abs(x2) < epsilon)
                return t2
            d2 = this.#sampleCurveDerivativeX(t2)
            if (Math.abs(d2) < epsilon)
                break
            t2 = t2 - x2 / d2
        }

        let t0 = 0.0
        let t1 = 1.0
        t2 = x

        if (t2 < t0) return t0
        if (t2 > t1) return t1

        while (t0 < t1) {
            x2 = this.#sampleCurveX(t2)
            if (Math.abs(x2 - x) < epsilon)
                return t2
            if (x > x2) t0 = t2
            else t1 = t2

            t2 = (t1 - t0) * .5 + t0
        }

        return t2
    }

    solve(x, epsilon = 1e-5) {
        return this.#sampleCurveY(this.#solveCurveX(x, epsilon))
    }
}
