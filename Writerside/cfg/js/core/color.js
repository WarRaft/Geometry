const Colors = {
    point: {
        fill: 'rgba(239,172,16,0.36)',
        stroke: '#efac10',
        name: '#519bf8',
        track: {
            fill: '#4d4444',
            text: '#bd8a0e'
        }
    },
    line: {
        base: '#5c5d60',
        primary: '#efaf1b',
    },
    polygon: {
        fill: 'rgba(19,140,222,0.25)',
        stroke: 'rgba(5,238,213,0.48)'
    }
}

class Color {
    static grid = new Color({
        strokeStyle: '#373636',
    })

    static axis = new Color({
        strokeStyle: '#616060',
    })

    static teal = new Color({
        fillStyle: 'rgba(16,232,239,0.36)',
        strokeStyle: '#06ccae',
    })

    static yellow = new Color({
        fillStyle: 'rgba(239,172,16,0.36)',
        strokeStyle: '#efac10',
    })

    static blue = new Color({
        fillStyle: 'rgba(27,85,232,0.36)',
        strokeStyle: '#2165e6',
    })

    /**
     * @param {string} fillStyle
     * @param {string} fillText
     * @param {string} strokeStyle
     */
    constructor({
                    fillStyle = '#000',
                    strokeStyle = '#000'
                } = {}) {
        this.fillStyle = fillStyle
        this.strokeStyle = strokeStyle
    }

    fillStyle = '#000'
    strokeStyle = '#000'

}
