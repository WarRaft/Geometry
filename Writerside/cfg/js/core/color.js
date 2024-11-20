class Color {
    static grid = new Color({
        strokeStyle: '#1b1b43',
    })

    static axis = new Color({
        strokeStyle: '#29295e',
    })

    static polygon = new Color({
        fillStyle: 'rgba(19,140,222,0.25)',
        strokeStyle: 'rgba(5,238,213,0.48)',
    })

    // --- points
    static pointA = new Color({
        fillStyle: '#ed0c215b',
        strokeStyle: '#ed0c21',
    })
    static pointA1 = new Color({
        fillStyle: '#9c24295b',
        strokeStyle: '#7c1f23',
    })

    static pointB = new Color({
        fillStyle: '#ed5ced5b',
        strokeStyle: '#ed5ced',
    })
    static pointB1 = new Color({
        fillStyle: '#6e316e5b',
        strokeStyle: '#6e316e',
    })

    static pointC = new Color({
        fillStyle: '#1bbd3c5b',
        strokeStyle: '#1bbd3c',
    })

    static pointC1 = new Color({
        fillStyle: '#11501d5b',
        strokeStyle: '#11501d',
    })

    static pointD = new Color({
        fillStyle: '#04c8d35b',
        strokeStyle: '#04c8d3',
    })

    static pointD1 = new Color({
        fillStyle: '#1c878f5b',
        strokeStyle: '#0d6d75',
    })

    /**
     * @param {string} fillStyle
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
