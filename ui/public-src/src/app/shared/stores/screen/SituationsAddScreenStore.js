export default class SituationsAddScreenStore {
    appStore;
    consoleExpandedSize = 400;
    consoleCollapsedSize = 78;


    constructor(appStore) {
        this.appStore = appStore;
        // this.consoleSize = this.consoleCollapsedSize;
    }

    load() {
        this.appStore.situationAddStore.getAll();
    }

}