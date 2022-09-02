import { observable, computed, action } from "mobx";
import { fromPromise } from 'mobx-utils';

import DeviceEntry from 'models/device/DeviceEntry';
import API from "../../api/axiosApiConfig";

export default class SituationStore {
    appStore;
    @observable.ref items;
    @observable nameFilter = "";

    constructor(appStore) {
        this.appStore = appStore;
    }

    getAll() {
        console.log('...loading situation');
        return API.get('/situation/all')
            .then(({ data = [] }) => {
    
                this.items = data;
            });
    }

    
}   