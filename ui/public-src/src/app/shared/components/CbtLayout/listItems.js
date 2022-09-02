import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import PeopleIcon from '@material-ui/icons/People';
// import LayersIcon from '@material-ui/icons/Layers';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import DvrIcon from '@material-ui/icons/Dvr';
import { FAKE_DATA } from '../../constants/fakeData';
import ViewStore from '../../stores/ViewStore';
// import FAKE_DATA from '../../constants/fakeData';
import './cbtLayout.css';

export const mainListItems = (props, situations) => {
  return (
    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
      <ListSubheader inset>Situations</ListSubheader>
      {situations &&
        situations.map((situation, key) => {
          return (
            <ListItem
              button
              key={key}
              onClick={() =>
                props.store.view.openSituationDetailPage(situation._id)
              }
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                className="list-item-text"
                primary={situation.situation_name}
              />
            </ListItem>
          );
        })}
    </div>
  );
};

export const secondaryListItems = (props, callback) => {
  return (
    <div>
      <ListSubheader inset>Actions</ListSubheader>
      <ListItem
        button
        onClick={() => props.store.view.openSituationManagePage()}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Situations" />
      </ListItem>
      <ListItem button onClick={() => callback('add', null)}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Situations" />
      </ListItem>
      <ListItem button onClick={() => props.store.view.openSimulationRunPage()}>
        <ListItemIcon>
          <DvrIcon />
        </ListItemIcon>
        <ListItemText primary="Run Simulation Flow" />
      </ListItem>
    </div>
  );
};
