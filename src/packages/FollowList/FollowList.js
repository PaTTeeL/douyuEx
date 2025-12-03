let followListHook;
function initPkg_FollowList() {
    let intID = setInterval(() => {
        if (getValidDom([".Header-follow-content", "#js-backpack-enter"])) {
            followListHook = new DomHook(".Header-follow-content", false, handleFollowList);
            clearInterval(intID);
        }
    }, 1000);
}

function handleFollowList(m) {
    const panel = m[0].target.querySelector('.Header-follow-listWrap');
    if (!panel) {
        return;
    }
    // panel.style.marginTop = "12px";
    const listBoxElement = panel.querySelector(".Header-follow-listBox");
    if (!listBoxElement) {
        return;
    }
    listBoxElement.style.setProperty('max-height', 'var(--followlist-max-height)', 'important');
    new ResizeObserver((entries, observerInstance) => {
        const boundingBox = entries[0].contentRect;
        if (boundingBox.width > 0 && boundingBox.height > 0) {
            observerInstance.disconnect();

            const dropMenuRect = entries[0].target.closest('.public-DropMenu-drop').getBoundingClientRect();
            const listBoxRect = entries[0].target.getBoundingClientRect();
            const spaceAbove = listBoxRect.top;
            const spaceBelow = dropMenuRect.bottom - listBoxRect.bottom;
            const extraOffset = (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? 15 : 9;
            const maxHeightValue = `calc(100dvh - ${spaceAbove}px - ${spaceBelow}px - ${extraOffset}px)`;
            listBoxElement.style.setProperty('--followlist-max-height', maxHeightValue);

            initFollowListInteractions(listBoxElement);
        }
    }).observe(listBoxElement);
}

async function initFollowListInteractions(panel) {
    const isVideoDynamicTab = panel.classList.contains("is-videoDynamic");
    const shouldLoadInCurrentPage = await GM_getValue("Ex_LoadInCurrentPage", false);
    const updateAnchorTargets = (isChecked) => {
        const anchors = panel.querySelectorAll(".DropPaneList a[href^='/']");
        anchors.forEach(anchor => {
            anchor.setAttribute('target', isChecked ? '_self' : '_blank');
        });
    };

    const styleId = 'followlist-styles';
    if (!document.getElementById(styleId)) {
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = `.Header-follow-listBox.is-videoDynamic .followlist-tip { display: none !important; }`;
        document.head.appendChild(styleElement);
    }
    if (!panel.querySelector('#followlist-toolbar')) {
        panel.insertAdjacentHTML('afterbegin', `
            <div id="followlist-toolbar" style="color: grey; cursor: default; position: absolute; top: 0px; display: flex; justify-content: space-between; width: 100%; padding: 0 5px; box-sizing: border-box;">
                <label style="cursor: pointer; display: flex;">
                    <input type="checkbox" id="loadInCurrentPageCheckbox" style="margin-right: 5px;">
                    <span class="checkbox-text">在当前页面加载</span>
                </label>
                <span class="followlist-tip">长按弹出同屏播放</span>
            </div>
        `);
        const checkbox = panel.querySelector('#loadInCurrentPageCheckbox');
        if (checkbox) {
            checkbox.checked = shouldLoadInCurrentPage;
            checkbox.addEventListener("change", function() {
                const isChecked = this.checked;
                updateAnchorTargets(isChecked);
                GM_setValue("Ex_LoadInCurrentPage", isChecked);
                showMessage(`【关注列表】已${isChecked ? "开启" : "关闭"}当前页加载功能（${isChecked ? "当前页面直接加载关注的直播间" : "使用新网页打开关注的直播间"}）`, "info");
            });
            updateAnchorTargets(shouldLoadInCurrentPage);
        }
    }

    if (!isVideoDynamicTab) {
        panel.querySelectorAll(".DropPaneList.FollowList a[href^='/']").forEach(anchor => {
            if (!anchor || anchor.dataset.enhanced) {
                return;
            }
            anchor.dataset.enhanced = 'true';
            const roomId = anchor.getAttribute('href').replace('/', '');
            if (!roomId) {
                return;
            }
            const cclick = new CClick(anchor);

            cclick.longClick(() => {
                createNewVideo(videoPlayerArr.length, roomId, "Douyu");
                document.querySelector(".Follow .public-DropMenu").className = "public-DropMenu";
            });
        });
    }
}
