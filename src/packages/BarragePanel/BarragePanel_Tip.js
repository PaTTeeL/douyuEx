function initPkg_BarragePanel_Tip() {
    setBarragePanelTipCallBack();
}

function setBarragePanelTipCallBack() {
    let a = new DomHook("#comment-dzjy-container", false, (m) => {
        if (m.length <= 0) {
            return;
        }
        if (m[0].addedNodes.length <= 0) {
            return;
        }
        renderBarragePanelTip();
        setBarragePanelTipFunc();
    })
}

function renderBarragePanelTip() {
    const a = document.createElement("p");
    a.className = "sugun-e3fbf6";
    a.innerText = "|";

    const b = document.createElement("div");
    b.className = "labelfisrt-407af4 thirdBtn-06cde5 fourBtn-0845d4";
    b.id = "barrage-panel-tip__+1"
    b.innerText = "+1";

    const labelDoms = document.getElementsByClassName("labelfisrt-407af4");
    if (labelDoms.length === 0) {
        return;
    }
    const innerBtnsContainer = labelDoms[0].parentElement;
    if (labelDoms.length < 3) {
        const targetElement = labelDoms[0];
        innerBtnsContainer.insertBefore(a, targetElement.nextSibling);
        innerBtnsContainer.insertBefore(b, a.nextSibling);
    } else {
        const targetElement = labelDoms[labelDoms.length - 2];
        innerBtnsContainer.insertBefore(a, targetElement);
        innerBtnsContainer.insertBefore(b, a);
    }

    const outerMenuContainer = innerBtnsContainer.parentElement;
    if (!outerMenuContainer || !outerMenuContainer.style) {
        return;
    }
    const outerRect = outerMenuContainer.getBoundingClientRect();
    const menuCenterViewportX = outerRect.left + outerRect.width / 2;
    const menuHalfWidth = innerBtnsContainer.offsetWidth / 2;
    const initialMenuLeft = menuCenterViewportX - menuHalfWidth;
    const initialMenuRight = menuCenterViewportX + menuHalfWidth;

    const playerContainer = getValidDom(['#js-player-main', '.main__a3F0Y']);
    const boundaryElement = playerContainer || document.documentElement;
    const boundaryRect = boundaryElement.getBoundingClientRect();
    let boundaryLeft = boundaryRect.left;
    let boundaryRight = boundaryRect.right;
    if (!playerContainer && document.documentElement.scrollWidth > document.documentElement.clientWidth) {
        const SCROLLBAR_OFFSET = 18;
        boundaryRight -= SCROLLBAR_OFFSET;
    }

    let offsetX = 0;
    if (initialMenuLeft < boundaryLeft) {
        offsetX = boundaryLeft - initialMenuLeft; // 菜单左侧溢出，向右移动
    } else if (initialMenuRight > boundaryRight) {
        offsetX = boundaryRight - initialMenuRight; // 菜单右侧溢出，向左移动
    }
    innerBtnsContainer.style.transform = `translateX(calc(-50% + ${offsetX}px))`;
}

function setBarragePanelTipFunc() {
    document.getElementById("barrage-panel-tip__+1").onclick = () => {
        const dom = document.getElementById("comment-higher-container");
        if (dom.getElementsByClassName("ex-image-danmaku").length > 0) {
            const textDom = dom.getElementsByClassName("text-879f3e")[0];
            sendBarrage(textDom.innerHTML.replace(/<a[^>]*><img\s+(?:.*?\s+)?src="(.*?)"[^>]*?\/?><\/a>/g, (match, src) => {
                return getImageDanmakuFromImgSrc(src);
            }));
        } else {
            sendBarrage(dom.innerText);
        }
    }
}
