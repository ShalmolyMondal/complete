import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { DEFAULT_VALUES } from '../../constants/defaultValues';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  selectEmpty: {
    minWidth: '100%',
  },
  divider: {
    margin: '20px',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  removeButton: {
    color: theme.palette.grey[500],
  },
});

class ConfigureSimulation extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'md',
    transitions: [
      {
        ...DEFAULT_VALUES.TRANSITION_DATA,
      },
    ],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = (event) => {
    this.setState({ maxWidth: event.target.value });
  };

  handleValueChange = (name, index) => (event) => {
    const newTransitions = _.cloneDeep(this.state.transitions);
    newTransitions[index][name] = event.target.value;
    this.setState({
      transitions: newTransitions,
    });
  };

  handleTimeBasedChange = (name, index) => (event) => {
    const newTransitions = _.cloneDeep(this.state.transitions);
    newTransitions[index][name] = event.target.checked;
    this.setState({
      transitions: newTransitions,
    });
  };

  addNewTransition = () => {
    const newTransitions = [..._.cloneDeep(this.state.transitions), ...[_.cloneDeep(DEFAULT_VALUES.TRANSITION_DATA)]];
    console.log(newTransitions);
    this.setState({
      transitions: newTransitions,
    });
  };

  removeTransition = (transitionIndex) => {
    const newTransitions = _.cloneDeep(this.state.transitions);
    newTransitions.splice(transitionIndex, 1);
    this.setState({
      transitions: newTransitions,
    });
  };

  handleConfigure = () => {
    console.log(this.state.transitions);
    this.props.handleConfigurationSaved(this.state.transitions);
    this.props.handleDialogClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullScreen={false}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Configure Situation Transition Parameters</DialogTitle>
          <DialogContent>
            <DialogContentText>Please initiate the transition sequence.</DialogContentText>
            <form className={classes.form} noValidate>
              {this.state.transitions.map((transition, index) => {
                return (
                  <div key={index}>
                    <div>
                      {' '}
                      <h3>Transition #{index + 1}</h3>
                    </div>
                    <Grid container spacing={24}>
                      <Grid item xs={11}>
                        <Grid container spacing={24}>
                          <Grid item xs={4}>
                            <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                              <InputLabel htmlFor="transition-from">Transition From</InputLabel>
                              <Select
                                value={transition.from}
                                onChange={this.handleValueChange('from', index)}
                                inputProps={{
                                  name: 'transition-from',
                                  id: 'transition-from',
                                }}
                                className={classes.textField + ' ' + classes.selectEmpty}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {this.props.situationList.map((e, key) => {
                                  return (
                                    <MenuItem key={key} value={e._id}>
                                      {e.situation_name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                              <InputLabel htmlFor="transition-intermediate">Transition Intermediate</InputLabel>
                              <Select
                                className={classes.textField + ' ' + classes.selectEmpty}
                                value={transition.intermediate}
                                onChange={this.handleValueChange('intermediate', index)}
                                inputProps={{
                                  name: 'transition-intermediate',
                                  id: 'transition-intermediate',
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {this.props.situationList.map((e, key) => {
                                  return (
                                    <MenuItem key={key} value={e._id}>
                                      {e.situation_name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                              <InputLabel htmlFor="transition-to">Transition To</InputLabel>
                              <Select
                                className={classes.textField + ' ' + classes.selectEmpty}
                                value={transition.to}
                                onChange={this.handleValueChange('to', index)}
                                inputProps={{
                                  name: 'transition-to',
                                  id: 'transition-to',
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {this.props.situationList.map((e, key) => {
                                  return (
                                    <MenuItem key={key} value={e._id}>
                                      {e.situation_name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <FormControlLabel
                          className={classes.formControlLabel}
                          control={
                            <Switch checked={transition.timeBased} onChange={this.handleTimeBasedChange('timeBased', index)} value="timeBased" />
                          }
                          label="Time based rule"
                        />
                        {transition.timeBased ? (
                          <div>
                            Time based transition
                            <TextField
                              required
                              id="time"
                              label="Time (in seconds)"
                              className={classes.textField}
                              value={transition.time}
                              onChange={this.handleValueChange('time', index)}
                              margin="normal"
                            />
                          </div>
                        ) : (
                          <div>Condition based transition</div>
                        )}
                        <Divider className={classes.divider} />
                      </Grid>
                      <Grid item xs={1} className={classes.alignCenter}>
                        <div className={classes.alignCenter}>
                          <IconButton aria-label="Delete" className={classes.removeButton} onClick={() => this.removeTransition(index)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}

              <Button color="primary" onClick={() => this.addNewTransition()}>
                <AddIcon />
                Add new transition
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleDialogClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleConfigure} color="primary">
              Save Configuraiton
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

ConfigureSimulation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigureSimulation);
