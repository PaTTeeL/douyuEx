function initPkg_HistoryList() {
    (function() {
        const originalXHROpen = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string' && /\/(japi\/watchHistory\/apinc\/getHistoryList|wgapi\/vodnc\/front\/live\/history\/getList)/.test(url)) {
                //console.log('DouyuEx 历史列表: 发现历史列表请求，修改URL...');
                try {
                    url = url.replace(/([?&](?:num|limit))=\d+/, '$1=99');
                    console.log('DouyuEx 历史列表: 已将历史列表请求数量改为 99');
                } catch (e) {
                    console.error('DouyuEx 历史列表: 修改历史列表请求失败', e);
                }
            }
            return originalXHROpen.call(this, method, url, ...args);
        };
    })();

    gDomObserver.waitForElement('.Header-history-content').then(contentContainer => {
        new DomHook(contentContainer, false, handleHistoryList, false);
    });
}

function handleHistoryList(mutations) {
    const dropPane = document.querySelector('ul.DropPane-drop');
    new ResizeObserver((entries, observerInstance) => {
        const boundingBox = entries[0].contentRect;
        if (boundingBox.width > 0 && boundingBox.height > 0) {
            observerInstance.disconnect();
            const dropMenuRect = entries[0].target.closest('.public-DropMenu-drop').getBoundingClientRect();
            const listBoxRect = entries[0].target.getBoundingClientRect();
            const spaceAbove = listBoxRect.top;
            const spaceBelow = dropMenuRect.bottom - listBoxRect.bottom;
            const extraOffset = (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? 15 : 9;
            dropPane.style.overflow = 'auto';
            dropPane.style.scrollbarWidth = 'none';
            dropPane.style.maxHeight = `calc(100dvh - ${spaceAbove}px - ${spaceBelow}px - ${extraOffset}px)`;
        }
    }).observe(dropPane);
}
