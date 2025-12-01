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
    const intID1 = setInterval(() => {
        const controlbarContainer = document.querySelector('#js-player-controlbar, [class^=controlbar]');
        if (controlbarContainer) {
            clearInterval(intID1);
            fullScreenDomHook = new DomHook(controlbarContainer, true, (mutations) => {
                const fullScreenButton = controlbarContainer.querySelector('.wfs-2a8e83, [class^=icon]:has([d="M20 25h6v-6M14 7H8v6"])');
                if (fullScreenButton) {
                    console.log("DouyuEx: 触发自动网页全屏并停止监听", fullScreenButton);
                    fullScreenButton.click();
                    fullScreenDomHook.closeHook();
                    fullScreenDomHook = null;
                }
            });
            console.log("DouyuEx: 启动自动网页全屏监听:", controlbarContainer);
        }
    }, 1000);
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
    let highestVideoQualityDomHook = null;
    const intID1 = setInterval(() => {
        const controlbarContainer = document.querySelector('#js-player-controlbar, [class^=controlbar]');
        if (controlbarContainer) {
            clearInterval(intID1);
            highestVideoQualityDomHook = new DomHook(controlbarContainer, true, (mutations) => {
                const qualityContainer = controlbarContainer.querySelector('[class^=tipItem]:has([value^=画质]), [class^=tip]:has([value^=画质])');
                if (qualityContainer) {
                    const highestQualityOption = qualityContainer.querySelector('ul > li:first-child');
                    if (highestQualityOption && !highestQualityOption.classList.contains('selected')) {
                        highestQualityOption.click();
                    }
                    highestVideoQualityDomHook.closeHook();
                    highestVideoQualityDomHook = null;
                }
            });
        }
    }, 1000);
}