{
    /**
     * @param {string} id
     */
    const check = (id) => {
        const elem = document.getElementById(id)
        if (elem === null || !elem.isConnected) return
        const grid = Grid.map.get(id)
        if (grid === undefined) return
        grid.start(elem)
    }


    document.addEventListener('DOMContentLoaded', () => {
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType !== Node.ELEMENT_NODE) continue
                        if (node.id === '') continue
                        check(node.id)
                    }

                    for (const node of mutation.removedNodes) {
                        if (node.nodeType !== Node.ELEMENT_NODE) continue
                        if (node.id === '') continue
                        console.log('☠️', node.id)
                    }
                }
            }
        })

        Grid.map.forEach((_, key) => {
            check(key)
        })

        observer.observe(document, {
            attributes: false,
            childList: true,
            subtree: true,
        })
    })
}
