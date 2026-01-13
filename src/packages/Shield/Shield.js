function initPkg_Shield() {
  // let t = setInterval(() => {
  //     if (typeof document.getElementsByClassName("ShieldTool-list")[0] !== "undefined") {
  //         clearInterval(t);
  //         initPkg_Shield_RemoveEnter();
  //         initPkg_Shield_RemoveDanmakuBackground();
  //     }
  // }, 1000);

  let t = setInterval(() => {
    if (typeof document.getElementsByClassName("BarrageFilter")[0] !== "undefined") {
      clearInterval(t);
      new DomHook(".BarrageFilter", false, (m) => {
        if (m.length === 0) return;
        if (m[0].addedNodes.length > 0 && m[0].removedNodes.length === 0) {
          const domFilterKeywords = document.getElementsByClassName("FilterKeywords")[0];
          if (domFilterKeywords) {
            initPkg_Shield_Enable(domFilterKeywords);
          } else {
            let t2 = setInterval(() => {
              const domFilterKeywords = document.getElementsByClassName("FilterKeywords")[0];
              if (domFilterKeywords) {
                clearInterval(t2);
                initPkg_Shield_Enable(domFilterKeywords);
              }
            }, 50);
          }
        }
      });
    }
  }, 1000);
}

function initPkg_Shield_Enable(shieldTool) {
  new ResizeObserver((entries, observerInstance) => {
    const headerHeight = document.getElementsByClassName("AssembleExpressHeader-head")[0].offsetHeight;
    const playerChatHeight = document.getElementsByClassName("layout-Player-chat")[0].offsetHeight;
    shieldTool.style.setProperty('--filterkeywords-max-height', `calc(100dvh - var(--header-height) - ${headerHeight}px - ${playerChatHeight}px)`);
  }).observe(shieldTool);
  shieldTool.style.maxHeight = "var(--filterkeywords-max-height)";
  shieldTool.style.overflow = "auto";
  initPkg_Shield_RemoveRepeatedDanmaku(shieldTool);
  initPkg_Shield_RemoveEnter(shieldTool);
  initPkg_Shield_RemoveDanmakuBackground(shieldTool);
}