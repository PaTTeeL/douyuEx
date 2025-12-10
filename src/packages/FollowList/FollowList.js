function initPkg_FollowList() {
    (function() {
        const originalXHROpen = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string' && url.endsWith('/wgapi/vodnc/center/follow/getSubDynamicVodListWithLive')) {
                //console.log('DouyuEx 关注列表: 发现视频动态请求，修改URL...');
                url = url.replace('/getSubDynamicVodListWithLive', '/getSubDynamicVodList');
                this._isVideoDynamicListTarget = true;
            }
            return originalXHROpen.call(this, method, url, ...args);
        };
        const originalXHRSend = unsafeWindow.XMLHttpRequest.prototype.send;
        unsafeWindow.XMLHttpRequest.prototype.send = function(body) {
            if (this._isVideoDynamicListTarget) {
                //console.log('DouyuEx 关注列表: 修改视频动态请求上限为20...');
                try {
                    body = JSON.stringify({ ...JSON.parse(body || '{}'), limit: 20 });
                } catch (e) {
                    console.error('DouyuEx 关注列表: 解析视频动态body失败，使用原始body:', e);
                }
            }
            return originalXHRSend.call(this, body);
        };
    })();

    gDomObserver.waitForElement('.Header-follow-content').then(followContent => {
        new ResizeObserver(entries => {
            const followListBox = entries[0].target.querySelector(".Header-follow-listBox");
            if (!followListBox) return;
            const listBoxRect = followListBox.getBoundingClientRect();
            const dropMenuRect = followListBox.closest('.public-DropMenu-drop').getBoundingClientRect();
            const spaceAbove = listBoxRect.top;
            const spaceBelow = dropMenuRect.bottom - listBoxRect.bottom;
            const extraOffset = (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? 15 : 9;
            const maxHeightValue = `calc(100dvh - ${Math.round(spaceAbove + spaceBelow + extraOffset)}px)`;
            if (maxHeightValue !== followContent.style.getPropertyValue('--followlist-max-height')) {
                followContent.style.setProperty('--followlist-max-height', maxHeightValue);
            }
            initFollowListInteractions(followListBox);
        }).observe(followContent);
    }, 30000);
}

async function initFollowListInteractions(followListBox) {
    const anchors = followListBox.querySelectorAll(".DropPaneList a[href^='/']");
    const loadInCurrentPage = await GM_getValue("Ex_LoadInCurrentPage", false);

    anchors.forEach(a => {
        a.target = loadInCurrentPage ? '_self' : '_blank';
        if (!followListBox.classList.contains("is-videoDynamic") && !a.dataset.enhanced) {
            a.dataset.enhanced = 'true';
            const roomId = a.getAttribute('href').slice(1);
            if (!roomId) return;
            new CClick(a).longClick(() => {
                createNewVideo(videoPlayerArr.length, roomId, "Douyu");
                followListBox.closest(".public-DropMenu").className = "public-DropMenu";
            });
        }
    });

    if (!followListBox.querySelector('#followlist-toolbar')) {
        followListBox.insertAdjacentHTML(
            'afterbegin',
            `<div id="followlist-toolbar" style="color: grey; cursor: default; position: absolute; top: 0px; display: flex; justify-content: space-between; width: 100%; padding: 0 5px; box-sizing: border-box;">
                <label style="cursor: pointer; display: flex;">
                    <input type="checkbox" id="loadInCurrentPageCheckbox" style="margin-right: 5px;">
                    <span class="checkbox-text">在当前页面加载</span>
                </label>
                <span class="followlist-tip">长按弹出同屏播放</span>
            </div>`
        );
        const checkbox = followListBox.querySelector('#loadInCurrentPageCheckbox');
        checkbox.checked = loadInCurrentPage;
        checkbox.addEventListener("change", () => {
            const isChecked = checkbox.checked;
            anchors.forEach(a => {a.target = isChecked ? '_self' : '_blank'});
            GM_setValue("Ex_LoadInCurrentPage", isChecked);
            showMessage(`【关注列表】已${isChecked ? "开启" : "关闭"}当前页加载功能（${isChecked ? "当前页面直接加载关注的直播间" : "使用新网页打开关注的直播间"}）`, "info");
        });
    }
}
