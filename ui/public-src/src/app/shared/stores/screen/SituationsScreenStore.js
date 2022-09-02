import { observable, computed, action, autorun, toJS } from "mobx";
import targetSystemFactory from "models/system/factory";

export default class SituationsScreenStore {
    appStore;
    consoleExpandedSize = 400;
    consoleCollapsedSize = 78;


    constructor(appStore) { 
        this.appStore = appStore;
        // this.consoleSize = this.consoleCollapsedSize;
    }

    load() {
        this.appStore.SituationManageStore.getAll();
    }
}
