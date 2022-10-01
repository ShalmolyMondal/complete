import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { mainListItems, secondaryListItems } from './listItems';
import AddEditSituationModalWrapped from '../AddEditSituationModal/AddEditSituationModal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import RunSituationSimulation from '../RunSituaitonSimulation/RunSituationSimulation';
import ConfigureSimulation from '../ConfigureSimulation/ConfigureSimulation';
import Console from '../../../screens/Sessions/components/Console';
import SplitPane from 'react-split-pane';
import { observable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  splitpane: {
    '& .Resizer': {
      background: '#fff',
      opacity: '.2',
      zIndex: '1',
      MozBoxSizing: 'border-box',
      WebkitBoxSizing: 'border-box',
      boxSizing: 'border-box',
      MozBackgroundClip: 'padding',
      WebkitBackgroundClip: 'padding',
      backgroundClip: 'padding-box',
    },
    '& .Resizer:hover': {
      WebkitTransition: 'all 2s ease',
      transition: 'all 2s ease',
    },
    '& .Resizer.horizontal': {
      height: '11px',
      margin: '-5px 0',
      borderTop: '5px solid rgba(255, 255, 255, 0)',
      borderBottom: '5px solid rgba(255, 255, 255, 0)',
      cursor: 'row-resize',
      width: '100%',
    },
    '& .Resizer.horizontal:hover': {
      borderTop: '5px solid rgba(255, 255, 255, 0.5)',
      borderBottom: '5px solid rgba(0, 0, 0, 0.5)',
    },
    '& .Resizer.disabled': {
      cursor: 'not-allowed',
    },
    '& .Resizer.disabled:hover': {
      borderColor: 'transparent',
    },
  },
  grid: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    minWidth: 275,
  },
  gridroot: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  sidebarHeader: {
    marginLeft: '20px',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '36px',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    background: '#FBFCFD',
    width: 'calc(100vw - 240px)',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  // main content
  button: {
    margin: theme.spacing.unit,
    // width: "100%"
  },
  btn: {
    width: '100%',
  },
  dashboardCardText: {
    maxWidth: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  input: {
    display: 'none',
  },
  noContentText: {
    fontSize: '24px',
    color: '#757575',
  },
  card: {
    minWidth: 275,
    minHeight: 'calc(100vh - 120px)',
    padding: 'inherit',
  },
  simulationCard: {
    maxWidth: 400,
  },
  flexthis: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#f1f1f1',
  },
  list: {
    width: '100%',
    height: '100%',
    display: 'flex',
    minHeight: '0',
    overflow: 'auto',
    position: 'relative',
    background: '#d9d9d9',
  },
  consoleWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999999999,
    background: 'rgb(0, 0, 0)',
    padding: '0px',
    margin: '0px',
    opacity: '0.8',
    fontFamily: 'monospace',
    fontSize: '16px',
    overflow: 'auto',
    width: '100%',
    maxHeight: '100%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
  },
  consoleExpanded: {
    height: '200px',
  },
});

@inject('store')
@observer
class CbtLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    open: true,
    dialogOpen: false,
    selectedSituationId: null,
    openModal: false,
    addEditSituationModalMode: 'ADD_MODE',
    selected: 0,
    showDetail: false,
    id: null,
    message: '',
    openSnackbar: false,
    expanded: false,
    openRunSimulationModal: false,
    transitions: null,
  };

  handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };
  closeAddEditSituationModal = (message) => {
    this.setState({
      openModal: false,
      message: message,
      openSnackbar: message ? true : false,
      selectedSituationId: null,
    });
  };

  openSnackBarWithMessage = (message) => {
    this.setState({
      message: message,
      openSnackbar: message ? true : false,
    });
  };

  openAddEditSituationModal = (action, situationId) => {
    this.setState({
      openModal: true,
      addEditSituationModalMode: action == 'edit' ? 'EDIT_MODE' : 'ADD_MODE',
      selectedSituationId: situationId,
    });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleShowDetail = () => {
    this.setState({ showDetail: true });
  };

  handleDeleteDialogOpen = (situationId) => {
    this.setState({
      dialogOpen: true,
      selectedSituationId: situationId,
    });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false, selectedSituationId: null });
  };

  handleConfirmDeleteSituation = (id) => {
    this.props.store.view.deleteSituation(id);
    this.setState({
      dialogOpen: false,
      selectedSituationId: null,
      message: 'Deleted situation successfully',
      openSnackbar: true,
    });
    this.props.store.view.openSituationManagePage();
  };

  openConfigureSimulationModal = () => {
    this.setState({ openRunSimulationModal: true });
  };

  closeRunsituationModal = () => {
    this.setState({ openRunSimulationModal: false });
  };

  handleConfigurationSaved = (transitions) => {
    this.setState({ transitions: transitions });
  };

  closeSnackBar = () => {
    this.setState({
      message: null,
      openSnackbar: false,
    });
  };
  render() {
    const { classes, situations, situation } = this.props;
    let { sessionsScreenStore } = this.props.store;
    console.log('-----------Situations-----------', situations);

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <strong className={classes.sidebarHeader}>IoT Benchmark Tool</strong>
            </div>
            <Divider />
            <List>
              <ListItem button onClick={() => this.props.store.view.openSituationsPage()}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
            <Divider />
            {situations && situations.length > 0 && <List>{mainListItems(this.props, situations)}</List>}
            <Divider />

            <List>{secondaryListItems(this.props, this.openAddEditSituationModal)}</List>
          </Drawer>
          <main className={classes.content}>
            <Card className={classes.card}>
              {this.props.page == 'add-situation' && (
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                  <div className={classes.appBarSpacer} />
                  <div className={classes.appBarSpacer} />
                  <div className={classes.appBarSpacer} />
                  <div className={classes.noContentText}>No situation to display</div>
                  <Button color="primary" variant="contained" className={classes.button} onClick={() => this.openAddEditSituationModal('add', null)}>
                    <AddIcon /> Add situaiton
                  </Button>
                </Grid>
              )}

              {this.props.page == 'situations' && (
                <Grid container spacing={24} alignItems="center">
                  {situations && situations.length > 0 ? (
                    situations.map((situation, id) => {
                      return (
                        <Grid item xs={4} key={id}>
                          <Card>
                            <Button className={classes.btn} onClick={() => this.props.store.view.openSituationDetailPage(situation._id)}>
                              <CardContent>
                                <NotificationsIcon />
                                <Typography variant="h4" component="div" className={classes.dashboardCardText}>
                                  {situation.situation_name}
                                </Typography>
                                <Typography variant="body2" className={classes.dashboardCardText}>
                                  {situation.situation_description}
                                </Typography>
                              </CardContent>
                            </Button>
                          </Card>
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                      <div className={classes.appBarSpacer} />
                      <div className={classes.appBarSpacer} />
                      <div className={classes.appBarSpacer} />
                      <div className={classes.noContentText}>No situation to display</div>
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        onClick={() => this.openAddEditSituationModal('add', null)}
                      >
                        <AddIcon /> Add situaiton
                      </Button>
                    </Grid>
                  )}
                </Grid>
              )}

              {this.props.page == 'manage-situation' && (
                <Grid container spacing={24} alignItems="center">
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Situation Name</TableCell>
                        <TableCell align="right">Situation Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {situations &&
                        situations.map((situationData, id) => (
                          <TableRow key={id}>
                            <TableCell component="th" scope="row">
                              {situationData.situation_name}
                            </TableCell>
                            <TableCell align="right">{situationData.situation_description}</TableCell>
                            <TableCell align="right">
                              <Button onClick={() => this.props.store.view.openSituationDetailPage(situationData._id)}>View</Button>
                              <Button color={'primary'} onClick={() => this.openAddEditSituationModal('edit', situationData._id)}>
                                Edit
                              </Button>
                              <Button color={'secondary'} onClick={() => this.handleDeleteDialogOpen(situationData._id)}>
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Grid>
              )}

              {this.props.page == 'situation-detail' && (
                <React.Fragment>
                  {situation && (
                    <div className={classes.grid}>
                      <Grid container spacing={24}>
                        <Grid item xs={10}>
                          <Typography variant="title">{situation.situation_name}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Button variant="contained" color="primary" onClick={() => this.openAddEditSituationModal('edit', situation._id)}>
                            Edit
                          </Button>
                        </Grid>
                        <Grid item xs={1}>
                          <Button variant="contained" color="secondary" onClick={() => this.handleDeleteDialogOpen(situation._id)}>
                            Delete
                          </Button>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography>{situation.situation_description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Card className={classes.card}>
                            <Grid item xs={12}>
                              <Typography variant="title">Context Attributes</Typography>
                            </Grid>
                            <Divider />

                            <Grid container className={classes.grid}>
                              {situation.context_attributes &&
                                situation.context_attributes.map((attribute, id) => (
                                  <React.Fragment key={id}>
                                    <Grid item xs={4} className={classes.grid}>
                                      <Typography>Name</Typography>
                                    </Grid>
                                    <Grid item xs={8} className={classes.grid}>
                                      <Typography>{attribute.context_attribute_name}</Typography>
                                    </Grid>
                                    <Grid item xs={4} className={classes.grid}>
                                      <Typography>Description</Typography>
                                    </Grid>
                                    <Grid item xs={8} className={classes.grid}>
                                      <Typography>{attribute.context_attribute_description}</Typography>
                                    </Grid>
                                    <Grid item xs={4} className={classes.grid}>
                                      <Typography>Weight</Typography>
                                    </Grid>
                                    <Grid item xs={8} className={classes.grid}>
                                      <Typography>{attribute.weight}</Typography>
                                    </Grid>
                                    {attribute.data_values &&
                                      attribute.data_values.map((data_value, data_valueID) => (
                                        <React.Fragment key={data_valueID}>
                                          <Grid item xs={4} className={classes.grid}>
                                            <Typography>Contribution</Typography>
                                          </Grid>
                                          <Grid item xs={8} className={classes.grid}>
                                            <Typography>{data_value.contribution}</Typography>
                                          </Grid>
                                          <Grid item xs={4} className={classes.grid}>
                                            <Typography>Range Type</Typography>
                                          </Grid>
                                          <Grid item xs={8} className={classes.grid}>
                                            <Typography>{data_value.range_type}</Typography>
                                          </Grid>
                                          {data_value.range_values && (
                                            <React.Fragment>
                                              <Grid item xs={12} className={classes.grid}>
                                                <Typography>
                                                  <strong>Range Values</strong>
                                                </Typography>
                                              </Grid>

                                              {data_value.range_values && (
                                                <React.Fragment>
                                                  <Grid item xs={4} className={classes.grid}>
                                                    <Typography>Lower Bound</Typography>
                                                  </Grid>
                                                  <Grid item xs={8} className={classes.grid}>
                                                    <Typography>{data_value.range_values.lower_bound}</Typography>
                                                  </Grid>
                                                  <Grid item xs={4} className={classes.grid}>
                                                    <Typography>Higher Bound</Typography>
                                                  </Grid>
                                                  <Grid item xs={8} className={classes.grid}>
                                                    <Typography>{data_value.range_values.higher_bound}</Typography>
                                                  </Grid>
                                                  {data_value.range_values.multiple_values && data_value.range_values.multiple_values.length > 0 && (
                                                    <React.Fragment>
                                                      <Grid item xs={4} className={classes.grid}>
                                                        <Typography>Multiple Values</Typography>
                                                      </Grid>
                                                      <Grid item xs={8} className={classes.grid}>
                                                        {data_value.range_values.multiple_values &&
                                                          data_value.range_values.multiple_values.map((value, valueId) => (
                                                            <Typography>{value}</Typography>
                                                          ))}
                                                      </Grid>
                                                    </React.Fragment>
                                                  )}
                                                </React.Fragment>
                                              )}
                                            </React.Fragment>
                                          )}
                                        </React.Fragment>
                                      ))}
                                  </React.Fragment>
                                ))}
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </React.Fragment>
              )}
              {this.props.page == 'run-simulation' && (
                <React.Fragment>
                  <div className={classes.spaceBetween}>
                    <div className={classes.cardTitle}>Situation flow</div>
                    <Button variant="contained" color="primary" onClick={() => this.openConfigureSimulationModal()}>
                      Configure Transition Parameters
                    </Button>
                  </div>
                  <RunSituationSimulation
                    situationList={situations}
                    transitions={this.state.transitions}
                    store={this.props.store}
                    classes={classes}
                  />
                </React.Fragment>
              )}
            </Card>
            <div className={classes.consoleWrapper}>
              <div className={this.props.store.sessionsScreenStore.consoleExpanded ? classes.consoleExpanded : ''}>
                <Console expanded={sessionsScreenStore.consoleExpanded} />
              </div>
            </div>
          </main>
          {/* <div className={classes.list} id="test">
            <SplitPane
              className={classes.splitpane}
              split="horizontal"
              primary="second"
              defaultSize={sessionsScreenStore.consoleSize}
              size={sessionsScreenStore.consoleSize}
              pane1Style={{ overflow: 'auto' }}
              onChange={(size) => sessionsScreenStore.setConsoleSize(size)}
              maxSize={-15}
            >
              <SessionsList /> 
              
            </SplitPane>
          </div> */}
        </div>
        {this.state.openModal && (
          <AddEditSituationModalWrapped
            key={Date.now().toString(36) + Math.random().toString(36).substring(2)}
            modalTitle={this.state.addEditSituationModalMode == 'ADD_MODE' ? 'Add Situation' : 'Edit Situation'}
            mode={this.state.addEditSituationModalMode}
            situationId={this.state.selectedSituationId}
            open={this.state.openModal}
            closeModal={this.closeAddEditSituationModal}
            viewStore={this.props.store.view}
            openSnackBarWithMessage={this.openSnackBarWithMessage}
          ></AddEditSituationModalWrapped>
        )}
        {this.state.dialogOpen && (
          <ConfirmationModal
            dialogOpen={this.state.dialogOpen}
            handleDialogClose={this.handleDialogClose}
            modalTitle={'Delete Situation'}
            handleConfirmDeleteSituation={this.handleConfirmDeleteSituation}
            selectedSituationId={this.state.selectedSituationId}
          ></ConfirmationModal>
        )}
        {this.state.openRunSimulationModal && (
          <ConfigureSimulation
            dialogOpen={this.state.openRunSimulationModal}
            handleDialogClose={this.closeRunsituationModal}
            modalTitle={'Configure Simulation'}
            situationList={situations}
            handleConfigurationSaved={this.handleConfigurationSaved}
          ></ConfigureSimulation>
        )}
        {this.state.openSnackbar && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.openSnackbar}
            autoHideDuration={6000}
            onClose={this.closeSnackBar}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" onClick={this.closeSnackBar}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        )}
      </React.Fragment>
    );
  }
}

CbtLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CbtLayout);
