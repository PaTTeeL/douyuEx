function initPkg_Refresh_Barrage() {
    gDomObserver.waitForElement('.Barrage-toolbar').then(toolbar => {
        initPkg_Refresh_Barrage_Dom(toolbar);
        initPkg_Refresh_Barrage_Func(toolbar);
        initPkg_Refresh_Barrage_Set();
    });
}

function initPkg_Refresh_Barrage_Dom(toolbar) {
    if (!toolbar.querySelector(".Barrage-simpleMode")) {
        toolbar.insertAdjacentHTML(
            "afterbegin",
            `<a class="Barrage-simpleMode" id="btn-simpleBarrage">
                <svg t="1588051109604" id="btn-simpleBarrage__svg" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="16" height="16"><path d="M588.416 516.096L787.2 317.312a54.016 54.016 0 1 0-76.416-76.416L512 439.68 313.216 241.024A54.016 54.016 0 1 0 236.8 317.376l198.784 198.848-198.016 197.888a54.016 54.016 0 1 0 76.416 76.416L512 592.576l197.888 197.952a54.016 54.016 0 1 0 76.416-76.416L588.416 516.096z" fill="#AFAFAF" p-id="3096"></path></svg>
                <i class="Barrage-toolbarIcon"></i>
                <span id="btn-simpleBarrage__text" class="Barrage-toolbarText"></span>
            </a>
            <a class="Barrage-toolbarLock" id="btn-rankHidden">
                <i class="Barrage-toolbarIcon"></i>
                <span id="btn-rankHidden__text" class="Barrage-toolbarText"></span>
            </a>`
        );
    }
}

function initPkg_Refresh_Barrage_Func(toolbar) {
    toolbar.addEventListener("click", e => {
        if (e.target.closest("#btn-simpleBarrage")) {
            document.body.classList.toggle("is-barrageSimple");
            saveData_Refresh();
        } else if (e.target.closest("#btn-rankHidden")) {
            document.body.classList.toggle("is-rankHidden");
            saveData_Refresh();
        }
    });
}

function refresh_Barrage_getStatus() {
    return document.body.classList.contains("is-barrageSimple");
}

function refresh_BarrageFrame_getStatus() {
    return document.body.classList.contains("is-rankHidden");
}

function initPkg_Refresh_Barrage_Set() {
    let ret = localStorage.getItem("ExSave_Refresh");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        if (retJson.barrage && retJson.barrage.status === true) {
            document.body.classList.add("is-barrageSimple");
        }
        if (retJson.barrageFrame && retJson.barrageFrame.status === true) {
            document.body.classList.add("is-rankHidden");
        }
    }
}