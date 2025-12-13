function initPkg_ExpandTool_FullScreen() {
    ExpandTool_FullScreen_insertDom();
    ExpandTool_FullScreen_insertFunc();
    ExpandTool_HighestVideoQuality_insertFunc();
    initPkg_ExpandTool_FullScreen_Set();
    initPkg_ExpandTool_HighestVideoQuality_Set();
}

function ExpandTool_FullScreen_insertDom() {
    let a = document.createElement("span");
    // a.className = "extool__bsize";
    a.innerHTML = '<label title="自动网页全屏"><input id="extool__fullscreen" type="checkbox">自动网页全屏</label><label title="自动最高画质"><input id="extool__highestvideoquality" type="checkbox">自动最高画质</label>';

    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}


function getFullScreen() {
    return document.getElementById("extool__fullscreen").checked;
}
function ExpandTool_FullScreen_insertFunc() {
    document.getElementById("extool__fullscreen").addEventListener("click", function() {
        saveData_FullScreen();
        if (getFullScreen()) {
            showMessage("刷新页面生效", "success");
        }
    });
}

function saveData_FullScreen() {
    let data = {
        isFullScreen: getFullScreen()
    }
    localStorage.setItem("ExSave_FullScreen", JSON.stringify(data));
}
function initPkg_ExpandTool_FullScreen_Set() {
    // 设置初始化
    let ret = localStorage.getItem("ExSave_FullScreen");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isFullScreen) {
            document.getElementById("extool__fullscreen").checked = retJson.isFullScreen;
        }
    }
}


function initFullScreen() {
    let ret = localStorage.getItem("ExSave_FullScreen");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isFullScreen) {
            fullScreen();
        }
    }
}

function fullScreen() {
    let fullScreenDomHook = null;
    gDomObserver.waitForElement('#js-player-controlbar, [class^=controlbar]').then(controlbarContainer => {
        fullScreenDomHook = new DomHook(controlbarContainer, true, async (mutations) => {
            const fullScreenButton = controlbarContainer.querySelector('.wfs-2a8e83, [class^=icon]:has([d="M20 25h6v-6M14 7H8v6"])');
            if (fullScreenButton) {
                console.log("DouyuEx 网页全屏: 点击fullScreenButton按钮", fullScreenButton);
                fullScreenButton.click();
                await gDomObserver.waitForElement('.toggle__P8TKM button').then(toggleButton => {
                    console.log("DouyuEx 网页全屏: 点击弹幕侧边栏显示切换按钮", toggleButton);
                    toggleButton.click();
                    fullScreenDomHook.closeHook();
                    fullScreenDomHook = null;
                });
            }
        });
    });
}

function getHighestVideoQuality() {
    return document.getElementById("extool__highestvideoquality").checked;
}
function ExpandTool_HighestVideoQuality_insertFunc() {
    document.getElementById("extool__highestvideoquality").addEventListener("click", function() {
        saveData_HighestVideoQuality();
        if (getHighestVideoQuality()) {
            showMessage("刷新页面生效", "success");
        }
    });
}

function saveData_HighestVideoQuality() {
    let data = {
        isHighestVideoQuality: getHighestVideoQuality()
    }
    localStorage.setItem("ExSave_HighestVideoQuality", JSON.stringify(data));
}
function initPkg_ExpandTool_HighestVideoQuality_Set() {
    // 设置初始化
    let ret = localStorage.getItem("ExSave_HighestVideoQuality");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isHighestVideoQuality) {
            document.getElementById("extool__highestvideoquality").checked = retJson.isHighestVideoQuality;
        }
    }
}

function initHighestVideoQuality() {
    let ret = localStorage.getItem("ExSave_HighestVideoQuality");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.isHighestVideoQuality) {
            highestVideoQuality();
        }
    }
}

function highestVideoQuality() {
    let switchBoxDomHook = null;
    gDomObserver.waitForElement('[class^="switchBox"]').then(async switchBox => {
        switchBoxDomHook = new DomHook(switchBox, true, (mutations) => {
            const reloadDiv = switchBox.querySelector('[class^=reload]');
            if (reloadDiv && reloadDiv.querySelector('label').textContent.trim() === '重新加载' && reloadDiv.offsetParent !== null) {
                console.log("DouyuEx 最高画质: 直播流异常，点击reloadDiv", reloadDiv);
                reloadDiv.click();
                return;
            }
        }, true);
        await gDomObserver.waitForElement('[class^=tipItem]:has([value^=画质]), [class^=tip]:has([value^=画质])').then(qualityContainer => {
            const highestQualityOption = qualityContainer.querySelector('ul > li:first-child');
            if (!highestQualityOption.classList.contains('selected')) {
                console.log("DouyuEx 最高画质: 点击highestQualityOption", highestQualityOption);
                highestQualityOption.click();
            } else {
                console.log("DouyuEx 最高画质: 保持highestQualityOption", highestQualityOption);
            }
            switchBoxDomHook.closeHook();
            switchBoxDomHook = null;
        });
    });
}
