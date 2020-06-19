class GameDevice {
    /**
     * 只用在结算页
     * 结算页的再玩一次按钮，omo显示 Ai课不显示
     */
    static get isShowReturn() {
        // omo 返回按钮 ai课不显示
        if (window.__math2_res_config__ != undefined) {
            return true;
        } else if (window["isAI"]) {
            return false;
        } else {
            return true;
        }
    }
    static get isShowRefresh() {
        // omo 显示刷新按钮 ai课不显示
        if (window.__math2_res_config__ != undefined) {
            return true;
        } else if (window["isAI"]) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 控制设置按钮内的刷新或者返回按钮显隐
     * 游戏中的返回或者刷新，如果有结算页的这种，就把按钮隐藏掉，如果有的交互不需要结算页，就不隐藏了
     */
    static get isShowSettingBtn() {
        if (window.__math2_res_config__ != undefined) {
            return false;
        } else if (window["isAI"]) {
            return false;
        } else {
            return true;
        }
    }
}