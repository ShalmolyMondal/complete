import { observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';
import systemTypes from 'models/system/types';
import targetSystemFactory from 'models/system/factory';
import API from '../../api/axiosApiConfig';

export default class SituationDetailStore {
  appStore;

  filterTypes = {
    all: 'all',
  };

  @observable.ref items;
  @observable item;
  @observable nameFilter = '';
  @observable typeFilter = this.filterTypes.all;

  constructor(appStore) {
    this.appStore = appStore;
    systemTypes.forEach((option) => {
      this.filterTypes[option.value] = option.label;
    });
  }

  @action.bound
  setNameFilter(filter) {
    this.nameFilter = filter;
  }

  @action.bound
  setTypeFilter(filter) {
    this.typeFilter = filter;
  }

  @computed
  get filteredItems() {
    if (this.items) {
      let filtered = this.items;

      if (this.nameFilter) {
        filtered = filtered.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !==
            -1
          );
        });
      }

      if (this.typeFilter !== this.filterTypes.all) {
        filtered = filtered.filter((item) => {
          return item.type === this.typeFilter;
        });
      }
      return filtered;
    }
    return [];
  }

  getAll() {
    console.log('...loading situation');
    return API.get('/situation/all').then(({ data = [] }) => {
      console.log('devices loaded: ', data);
      this.items = data;
    });
  }

  findInstanceById(id) {
    let result = null;
    if (this.items) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
          result = this.items[i];
          break;
        }
      }
    }
    return result;
  }

  create(params, callback) {
    return API.post('/situation/create', {
      ...params,
    }).then((res) => {
      this.appStore.situationsManageScreenStore.load();
      callback('Situation created successfully');
    });
  }

  update(situationId, params, callback) {
    if (!situationId) {
      return this.create(params);
    }
    return API.patch(`/situation/update/${situationId}`, {
      ...params,
    }).then((res) => {
      this.appStore.situationsManageScreenStore.load();
      callback('Situation updated successfully');
    });
  }

  delete(Id) {
    return API.delete(`/situation/delete/${Id}`).then(({ data }) => {
      this.appStore.situationsManageScreenStore.load();
    });
  }

  getById(Id) {
    return API.get(`/situation/get/${Id}`).then(({ data }) => {
      this.item = data;
    });
  }
}
