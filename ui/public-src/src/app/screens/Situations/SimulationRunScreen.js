import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import glamorous from "glamorous";
import { css } from 'glamor';

import ViewLayout from 'components/ViewLayout';
import ControlPanel from '../Main/components/system/ControlPanel';
import CbtLayout from "../../shared/components/CbtLayout";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


@inject("store")
@observer
export default class SimulationRunScreen extends Component {
    constructor(props) {
        super(props);
        this.props.store.view.openSimulationRunPage();
    }
    render() {
        const theme = createMuiTheme({
            palette: {
              primary: {
                  main: '#2196F3'
              },
              secondary: red,
            },
            status: {
              danger: 'orange',
            },
          });

        return (
            <MuiThemeProvider theme={theme}>
            <CbtLayout
                page={this.props.store.view.page}
                situations={this.props.store.SimulationRunStore.items}
                {...this.props}
            />
            </MuiThemeProvider>
        )
    }
}
