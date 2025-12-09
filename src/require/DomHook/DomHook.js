class DomHook {
    static _observers = new WeakMap();
    constructor(selectorOrElement, isSubtree, callback, observeAttributes = false) {
        let targetNode = null;
        if (typeof selectorOrElement === "string") {
            targetNode = document.querySelector(selectorOrElement);
        } else if (selectorOrElement instanceof Element) {
            targetNode = selectorOrElement;
        }
        if (targetNode == null) {
            console.log("DouyuEx DomHook: 目标不存在，跳过观察");
            return;
        }
        this._targetNode = targetNode;

        let entry = DomHook._observers.get(targetNode);

        if (!entry) {
            const callbacks = new Map();
            const observer = new MutationObserver((mutations) => {
                for (const [owner, callback] of callbacks) {
                    try {
                        callback.call(owner, mutations);
                    } catch (err) {
                        console.error("DouyuEx DomHook: 元素观察实例回调出错", err, callback);
                    }
                }
            });

            try {
                observer.observe(targetNode, {
                    attributes: observeAttributes,
                    childList: true,
                    subtree: isSubtree
                });
                entry = { observer, callbacks };
                DomHook._observers.set(targetNode, entry);
                //console.log("DouyuEx DomHook: 实例不存在，新建观察", targetNode);
            } catch (err) {
                console.error("DouyuEx DomHook: 元素观察实例创建失败", targetNode, err);
                observer.disconnect();
                return;
            }
        } else {
            //console.log("DouyuEx DomHook: 实例已存在，复用观察", targetNode);
        }
        entry.callbacks.set(this, callback);
    }

    closeHook() {
        if (!this._targetNode) {
            return;
        }
        const entry = DomHook._observers.get(this._targetNode);
        if (entry) {
            entry.callbacks.delete(this);
            if (entry.callbacks.size === 0) {
                entry.observer.disconnect();
                DomHook._observers.delete(this._targetNode);
                //console.log("DouyuEx DomHook: 回调已清空，停止实例", this._targetNode);
            } else {
                //console.log(`DouyuEx DomHook: 移除回调，剩余${entry.callbacks.size}个回调`, this._targetNode);
            }
        }
        this._targetNode = null;
    }
}
