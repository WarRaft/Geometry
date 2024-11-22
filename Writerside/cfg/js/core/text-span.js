class TextSpan {
    /**
     * @param {string} text
     * @param {Color} color
     */
    constructor(text, {
        color = Color.text,
    } = {}) {
        this.text = text
        this.color = color
    }

    /** @type {TextRect} */
    rect

    /**
     * @param {TextDraw} t
     */
    draw(t) {
        t.spans.push(this)
    }
}
