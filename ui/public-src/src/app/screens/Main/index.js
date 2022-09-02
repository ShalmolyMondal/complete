import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import glamorous from "glamorous";
import { css } from "glamor";
import DevTools from "mobx-react-devtools";

import Header from "./components/Header";
import View from "./components/View";

import CreateDefinitionModal from "./components/definition/CreateDefinitionModal";
import EditDefinitionModal from "./components/definition/EditDefinitionModal";
import DeleteDefinitionModal from "./components/definition/DeleteDefinitionModal";
import DeleteDatasetModal from './components/definition/DeleteDatasetModal';

import CreateSystemModal from "./components/system/CreateSystemModal";
import EditSystemModal from "./components/system/EditSystemModal";
import DeleteSystemModal from "./components/system/DeleteSystemModal";

import CreateDeviceModal from "./components/device/CreateDeviceModal";
import EditDeviceModal from "./components/device/EditDeviceModal";
import DeleteDeviceModal from "./components/device/DeleteDeviceModal";

import CreateDeviceSystemModal from "./components/device/CreateSystemModal";
import EditDeviceSystemModal from "./components/device/EditSystemModal";
import DeleteDeviceSystemModal from "./components/device/DeleteSystemModal";

import CreateSessionModal from "./components/session/CreateSessionModal";
import EditSessionModal from "./components/session/EditSessionModal";
import DeleteSessionModal from "./components/session/DeleteSessionModal";
import ErrorPanel from './components/ErrorPanel';


const StyledMainScreen = glamorous.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: "#fff"
});

const InnerContainerLayout = glamorous.div({
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
});

@inject("store")
@observer
export default class MainScreen extends Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            situationScreen: this.props.store.view.page == "situations" || this.props.store.view.page == "add-situation" || this.props.store.view.page == "situation-detail" 
            || this.props.store.view.page == "manage-situation" || this.props.store.view.page == "run-simulation" ? true : false
        }
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        alert('propschanged')
        if (this.props.userID !== prevProps.userID) {
          this.fetchData(this.props.userID);
        }
    }

    render() {
        return (
            <StyledMainScreen className="test">
                <InnerContainerLayout>
                    {
                        !this.state.situationScreen && 
                        <Header className="header-iot-ds"/>
                    }
                    <View 
                        bgColor={this.state.situationScreen ? "#fff" : "#d9d9d9"}
                    />
                </InnerContainerLayout>

                <CreateDefinitionModal />
                <EditDefinitionModal />
                <DeleteDefinitionModal />
                <DeleteDatasetModal />

                <CreateSystemModal />
                <EditSystemModal />
                <DeleteSystemModal />

                <CreateDeviceModal />
                <EditDeviceModal />
                <DeleteDeviceModal />

                <CreateDeviceSystemModal />
                <EditDeviceSystemModal />
                <DeleteDeviceSystemModal />

                <CreateSessionModal />
                <EditSessionModal />
                <DeleteSessionModal />

                <ErrorPanel />

                 {/* <DevTools />   */}
                
            </StyledMainScreen>
        );
    }
}
