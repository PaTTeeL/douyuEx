let current_barrage_status = 0; // 0没被简化 1被简化

function initPkg_Refresh_Barrage() {
    Promise.all([
        gDomObserver.waitForElement('.Barrage-toolbar'),
        gDomObserver.waitForElement('.layout-Player-rank')
    ]).then(([toolbar, dom_rank]) => {
        initPkg_Refresh_Barrage_Dom(toolbar);
        initPkg_Refresh_Barrage_Func(toolbar, dom_rank);
        initPkg_Refresh_Barrage_Set(toolbar, dom_rank);
    });
}

function initPkg_Refresh_Barrage_Dom(toolbar) {
    if (!toolbar.querySelector(".refresh-barrage")) {
        toolbar.insertAdjacentHTML(
            "afterbegin",
            `<a class="refresh-barrage" id="refresh-barrage">
                <svg t="1588051109604" id="refresh-barrage__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16"><path d="M588.416 516.096L787.2 317.312a54.016 54.016 0 1 0-76.416-76.416L512 439.68 313.216 241.024A54.016 54.016 0 1 0 236.8 317.376l198.784 198.848-198.016 197.888a54.016 54.016 0 1 0 76.416 76.416L512 592.576l197.888 197.952a54.016 54.016 0 1 0 76.416-76.416L588.416 516.096z" fill="#AFAFAF" p-id="3096"></path></svg><i class="Barrage-toolbarIcon"></i><span id="refresh-barrage__text" class="Barrage-toolbarText">前缀</span>
            </a>
            <a class="Barrage-toolbarLock" id="refresh-barrage-frame">
                <i class="Barrage-toolbarIcon"></i><span id="refresh-barrage-frame__text" class="Barrage-toolbarText">拉高</span>
            </a>`
        );
    }
}

function initPkg_Refresh_Barrage_Func(toolbar, dom_rank) {
    toolbar.addEventListener("click", e => {
        if (e.target.closest("#refresh-barrage")) {
            if (current_barrage_status == 0) {
                // 简化
                setRefreshBarrage(toolbar);
            } else {
                cancelRefreshBarrage(toolbar);
            }
            saveData_Refresh();
        } else if (e.target.closest("#refresh-barrage-frame")) {
            let dom_activity = document.getElementById("js-room-activity");
            let dom_topBarrage = toolbar.closest('.Barrage');
            if (dom_rank.style.display == "none") {
                // 被拉高
                dom_rank.style.display = "block";
                dom_activity.style.display = "block";
                dom_topBarrage.className = "Barrage";
                toolbar.querySelector("#refresh-barrage-frame__text").innerText = "拉高";
            } else {
                // 没拉高
                dom_rank.style.display = "none";
                dom_activity.style.display = "none";
                dom_topBarrage.className = "Barrage top-0-important";
                toolbar.querySelector("#refresh-barrage-frame__text").innerText = "恢复";
            }
            saveData_Refresh();
        }
    });
}

function refresh_Barrage_getStatus() {
    return current_barrage_status == 1 ? true : false;
}

function refresh_BarrageFrame_getStatus() {
    let dom_rank = document.getElementsByClassName("layout-Player-rank")[0];
    return dom_rank ? dom_rank.style.display == "none" : false;
}

function initPkg_Refresh_Barrage_Set(toolbar, dom_rank) {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if ("barrage" in retJson == false) {
            retJson.barrage = {status: false};
        }
        if (retJson.barrage.status == true) {
            setRefreshBarrage(toolbar);
        }
        if ("barrageFrame" in retJson == false) {
            retJson.barrageFrame = {status: false};
        }
        if (retJson.barrageFrame.status == true) {
            let dom_activity = document.getElementById("js-room-activity");
            dom_rank.style.display = "none";
            dom_activity.style.display = "none";
            toolbar.querySelector("#refresh-barrage-frame__text").innerText = "恢复";
        }
    }
}
 
function setRefreshBarrage(toolbar) {
    let cssText = `
    .UserCsgoGameDataMedal,.Barrage-honor,.Barrage-listItem .Barrage-icon,.Barrage-listItem .FansMedal.is-made,.Barrage-listItem .RoomLevel,.Barrage-listItem .Motor,.Barrage-listItem .ChatAchievement,.Barrage-listItem .Barrage-hiIcon,.Barrage-listItem .Medal,.Barrage-listItem .MatchSystemTeamMedal{display:none !important;}
    /*.Barrage-listItem .UserLevel{display:none !important;}*/
    .Barrage-listItem .Baby{display:none !important;}
    .FansMedalWrap{display:none !important;}
    `;
    StyleHook_set("Ex_Style_RefreshBarrage", cssText);
    current_barrage_status = 1;
    toolbar.querySelector("#refresh-barrage").style.backgroundColor = "rgb(18,150,219)";
    toolbar.querySelector("#refresh-barrage__text").style.color = "#fff";
}

function cancelRefreshBarrage(toolbar) {
    StyleHook_remove("Ex_Style_RefreshBarrage");
    current_barrage_status = 0;
    toolbar.querySelector("#refresh-barrage").style.backgroundColor = "";
    toolbar.querySelector("#refresh-barrage__text").style.color = "";
}