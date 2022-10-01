import { observable, computed, action, autorun, toJS } from 'mobx';
import LogEntry from 'models/session/LogEntry';
let LogTypes = LogEntry.types;

export default class SessionsScreenStore {
  appStore;
  consoleExpandedSize = 400;
  consoleCollapsedSize = 78;

  @observable consoleSize;
  @observable isFilterOptionsExpanded = false;

  @observable sessionsFilter = [];
  @observable typeFilter = [LogTypes.analytics, LogTypes.error, LogTypes.payload];

  constructor(appStore) {
    this.appStore = appStore;
    this.consoleSize = this.consoleCollapsedSize;
  }

  @action.bound
  setConsoleSize(size) {
    this.consoleSize = size;
  }

  @observable
  toggleConsole = () => {
    if (this.consoleExpanded) {
      this.consoleSize = this.consoleCollapsedSize;
    } else {
      this.consoleSize = this.consoleExpandedSize;
    }
  };

  @computed
  get consoleExpanded() {
    console.log('computing');
    const cond = this.consoleSize >= this.consoleExpandedSize;
    console.log(cond);
    return cond;
  }

  load() {
    let { sessionsStore } = this.appStore;
    sessionsStore.getSessionsStatus();
  }

  @action.bound
  setFilterOptionsExpand(isExpanded) {
    this.isFilterOptionsExpanded = isExpanded;
  }

  @computed get logs() {
    let logs = this.appStore.sessionsStore.logs;
    // console.log(logs);
    if (this.sessionsFilter && this.sessionsFilter.length) {
      logs = logs.filter((log) => {
        return this.sessionsFilter.indexOf(log.sessionId) !== -1;
      });
    }
    if (this.typeFilter && this.typeFilter.length) {
      logs = logs.filter((log) => {
        return this.typeFilter.indexOf(log.type) !== -1;
      });
    }
    // console.log(logs);
    return logs;
  }

  @computed get logsFilterApplied() {
    //TODO Magic number detected!
    if ((this.sessionsFilter && this.sessionsFilter.length) || (this.typeFilter.length !== 0 && this.typeFilter.length !== 3)) {
      return true;
    }
    return false;
  }

  @action.bound
  setSessionsFilter(sessionsIds) {
    this.sessionsFilter = sessionsIds;
  }

  @action.bound
  setTypeFilter(filter) {
    this.typeFilter = filter;
  }
}
