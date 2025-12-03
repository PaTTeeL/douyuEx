class DomHook {
    constructor(selectorOrElement, isSubtree, callback, observeAttributes = false) {
        let targetNode = null;
        if (typeof selectorOrElement === "string") {
            targetNode = document.querySelector(selectorOrElement);
        } else if (selectorOrElement instanceof Element) {
            targetNode = selectorOrElement;
        }
        if (targetNode == null) {
            return;
        }
        this.observer = new MutationObserver((mutations) => {
            if (this.observer) {
                callback.call(this, mutations);
            }
        });
        try {
            this.observer.observe(targetNode, { attributes: observeAttributes, childList: true, subtree: isSubtree });
        } catch (err) {
            console.error("DouyuEx DomHook: Failed to observe target node:", targetNode, err);
            this.observer.disconnect();
            this.observer = null;
        }
    }
    closeHook() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}
