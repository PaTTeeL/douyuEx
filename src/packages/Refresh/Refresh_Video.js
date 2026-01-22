function initPkg_Refresh_Video() {
    Promise.all([
        gDomObserver.waitForElement('.menu-da2a9e'),
    ]).then(([playerMenu]) => {
        initPkg_Refresh_Video_Dom(playerMenu);
        initPkg_Refresh_Video_Func(playerMenu);
        initPkg_Refresh_Video_Set();
    });
}

function initPkg_Refresh_Video_Dom(playerMenu) {
    if (!playerMenu.querySelector("#menu-playerSimple")) {
        playerMenu.insertAdjacentHTML(
            "beforeend",
            `<li id="menu-playerSimple">简洁模式</li>`
        );
    }

/*  旧版UI
    if (!playerToolbar.querySelector("#btn-playerSimple")) {
        playerToolbar.insertAdjacentHTML(
            "afterbegin",
            `<div id="btn-playerSimple" title="视频区简洁模式">
                <svg t="1587295753406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6410" width="22" height="22">
                    <path d="M218.88 64l73.728 23.168c-9.792 20.608-18.432 41.216-25.792 61.824h224.896v73.408H362.688c19.648 25.728 39.36 54.08 59.008 84.992l-77.44 42.496a1235.456 1235.456 0 0 0-66.368-127.552h-47.936L189.376 288c-14.72 20.608-34.432 43.776-59.008 69.504L64 307.328C135.296 235.2 186.944 154.112 218.88 64z m383.488 0l70.08 23.168c-7.36 20.608-16 41.216-25.792 61.824h261.824v73.408h-151.168c19.648 25.728 36.864 52.8 51.648 81.088l-66.368 42.496a1440.32 1440.32 0 0 0-70.08-123.584h-59.072a594.816 594.816 0 0 1-95.872 131.264L451.2 303.424C520 231.36 570.432 151.552 602.368 64zM259.456 334.336a491.52 491.52 0 0 1 84.8 108.16l-70.08 38.592c-17.216-36.032-43.008-72.064-77.44-108.16l62.72-38.592z m125.376 48.832H832v472.576c0 33.472-7.36 59.2-22.144 77.248-14.72 17.984-36.864 27.008-66.368 27.008-24.576 0-44.352-1.28-78.784-3.84l-18.432-64c39.36 2.56 71.296 3.84 95.872 3.84 17.216 0 25.792-18.048 25.792-54.08V448.832H384.832V383.168zM128 448h64v512H128V448z m512 64.448V832H320V512.448h320zM576 640V576H384.832v64H576z m-191.168 64v64H576v-64H384.832z" p-id="6411" id="btn-playerSimple__svg"></path>
                </svg>
            </div>`
        );
    } */
}

function initPkg_Refresh_Video_Func(playerMenu) {
/*  旧版UI
    gDomObserver.waitForElement('.right-17e251, .right-e7ea5d').then(rightControlBar => {
        new DomHook(rightControlBar, true, () => {
        changeToolBarZIndex();
        });
    });
    new DomHook(".video__VfhVg", true, (m) => {
        for (const record of m) {
            if(record.target.className.includes("toggle__P8TKM")){
                changeToolBarZIndex();
            }
        }
    });


    function changeToolBarZIndex() {
        let video_fullPage = !!(document.querySelector(".wfs-2a8e83.removed-9d4c42") || document.querySelector(".toggle__P8TKM"));
        let video_fullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        let chatPanel_isHidden = !!document.querySelector(".shrink__Sd0uK");
        const dom_player_toolbar = document.getElementById("js-player-toolbar");
        dom_player_toolbar.style = video_fullPage ? "z-index:20" : "z-index:30";
        const dom_casebar = document.getElementsByClassName("case__f4yex")[0];
        if (dom_casebar) dom_casebar.style = (video_fullScreen || (video_fullPage && chatPanel_isHidden)) && refresh_Video_getStatus() ? "bottom: -84px;" : "bottom: 0;";
        const isBeta = !!document.getElementsByClassName("live-next-body")[0];
        if (isBeta) dom_player_toolbar.parentElement.style = "z-index:20";
    } */

    playerMenu.addEventListener("click", e => {
        if (!e.target.closest("#menu-playerSimple")) return;
        toggleSimpleMode();
    });
/*  旧版UI
    playerToolbar.addEventListener("click", e => {
        if (!e.target.closest("#btn-playerSimple")) return;
        toggleSimpleMode();
    }); */

    function toggleSimpleMode() {
        document.body.classList.toggle("is-playerSimple");
        saveData_Refresh();
        resizeWindow();
    }
}

function refresh_Video_getStatus() {
    return document.body.classList.contains("is-playerSimple");
}
// FullPageFollowGuide
function initPkg_Refresh_Video_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.video && retJson.video.status === true) {
            document.body.classList.add("is-playerSimple");
        }
    }
}