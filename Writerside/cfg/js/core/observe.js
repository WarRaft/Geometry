{
    /**
     * @param {string} id
     */
    const check = (id) => {
        const elem = document.getElementById(id)
        if (elem === null || !elem.isConnected) return
        if (!CanvasDraw.map.get(id)) return
        elem.textContent = ''
        elem.appendChild(document.createElement(id))
    }

    document.addEventListener('DOMContentLoaded', () => {
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType !== Node.ELEMENT_NODE) continue
                        if (node.id === '') {
                            node.querySelectorAll('[id]').forEach(el => check(el.id))
                            continue
                        }
                        check(node.id)
                    }
                }
            }
        })

        CanvasDraw.map.forEach((_, key) => {
            check(key)
        })

        observer.observe(document, {
            attributes: false,
            childList: true,
            subtree: true,
        })
    })
}
