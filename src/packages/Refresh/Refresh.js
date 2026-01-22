function initPkg_Refresh() {
	initPkg_Refresh_Barrage();
	initPkg_Refresh_Player();
}

let refreshCache = null;
const REFRESH_KEY = "ExSave_Refresh";
function initRefreshCache() {
	try {
		refreshCache = JSON.parse(localStorage.getItem(REFRESH_KEY)) || {};
	} catch (err) {
		console.warn("DouyuEx: ExSave_Refresh JSON 解析失败", err);
		refreshCache = {};
	}
}
function saveData_Refresh() {
	if (refreshCache == null) initRefreshCache();
	refreshCache.barrageSimple = { status: document.body.classList.contains("is-barrageSimple") };
	refreshCache.playerSimple  = { status: document.body.classList.contains("is-playerSimple") };
	refreshCache.rankHidden    = { status: document.body.classList.contains("is-rankHidden") };
	localStorage.setItem(REFRESH_KEY, JSON.stringify(refreshCache));
}
function loadData_Refresh(key) {
	if (refreshCache == null) initRefreshCache();
	const { status = false } = refreshCache[key] || {};
	return status;
}