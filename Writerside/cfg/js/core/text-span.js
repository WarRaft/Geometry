class TextSpan {
    /**
     * @param {string} text
     * @param {TextSpan[]} children
     */
    constructor(text, {
        children = [],
    } = {}) {
        this.text = text
    }

    /** @type {TextMetrics} */
    metrics

    /**
     * @param {TextDraw} t
     */
    draw(t) {
        t.spans.push(this)
    }
}
