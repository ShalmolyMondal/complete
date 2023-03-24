import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import ChipInput from 'material-ui-chip-input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import { DEFAULT_VALUES } from '../../constants/defaultValues';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import API from '../../api/axiosApiConfig';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './styles.css';
import cogoToast from 'cogo-toast';
import { Tooltip } from 'material-ui';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  ppaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  situationInfo: {
    // margin: '30px 0'
  },
  chip: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  chips: {
    p: {
      width: 'fit-content',
      position: 'absolute',
      bottom: '30px',
      right: 0,
    },
    // '> div': {
    //   flexFlow: 'nowrap',
    //   overflowX: 'scroll',
    // margin-top: 10px;
    // },
  },
  menu: {
    width: 200,
  },
  fullWidth: {
    width: '100%',
  },
  card: {
    marginBottom: '20px',
    boxShadow: 'none',
    border: '1px solid #f3f3f3',
  },
  //expansion pannel
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    // marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit,
  },
  selectEmpty: {
    minWidth: '100%',
  },
  panelContent: {
    flexDirection: 'column',
  },
  //grid
  root: {
    flexGrow: 1,
  },
  gridPaper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  noMarginTop: {
    marginTop: 0,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    color: theme.palette.grey[500],
  },
  contextAttribute: {
    display: 'flex',
  },
  smallMargin: {
    margin: '10px 0',
  },
  titleText: {
    color: '#646464',
  },
});

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    flexGrow: 1,
  },
  expanded: {
    marginBottom: '20px',
    '> div': {
      border: '1px solid red',
    },
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})((props) => <MuiExpansionPanelSummary {...props} />);
ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const DialogTitle = withStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  fullScreenButton: {
    position: 'absolute',
    right: theme.spacing.unit * 6,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))((props) => {
  const { children, classes, onClose, handleToggleFullScreen, fullScreen } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      <IconButton aria-label="Close" className={classes.fullScreenButton} onClick={handleToggleFullScreen}>
        {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

class AddEditSituationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: false,
      fullScreen: false,
      expanded: 1,
      application_name: '',
      application_description: '',
      situation_name: '',
      situation_description: '',
      weightError: [],
      context_attributes: [{ ...DEFAULT_VALUES.CONTEXT_ATTRIBUTE }],
      openStepTwo: false,
      fuzzy_selection: {},
      fuzzy_rules: [],
      showSummary: false,
      showMsg: undefined,
      situationConclusion: '',
      openFuzzySets: false,
      lat_long: undefined,
      latitude: '',
      longitude: '',
    };
  }

  componentDidMount() {
    if (this.props.open && this.props.mode == 'EDIT_MODE' && this.props.situationId) {
      this.populateFormData(this.props.situationId);
    }
  }

  handleClose = (message = '') => {
    this.setState({
      values: false,
      expanded: 1,
      situation_name: '',
      situation_description: '',
      context_attributes: [{ ...DEFAULT_VALUES.CONTEXT_ATTRIBUTE }],
    });
    this.props.closeModal(message);
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleContextAttributeChange = (name, index) => (event) => {
    const newCA = _.cloneDeep(this.state.context_attributes);
    const whtError = _.cloneDeep(this.state.weightError);
    newCA[index][name] = event.target.value;

    if (name == 'weight' && event.target.value > 1) {
      whtError[index] = 'Weight cannot be more than 1';
    }
    this.setState({
      weightError: whtError,
      context_attributes: newCA,
    });
  };

  handleDataValueChange = (name, caIndex, dataValueIndex) => (event) => {
    const newCA = _.cloneDeep(this.state.context_attributes);
    newCA[caIndex]['data_values'][dataValueIndex][name] = event.target.value;
    this.setState({
      context_attributes: newCA,
    });
  };

  handleDataRangeValueChange = (name, caIndex, dataValueIndex) => (event) => {
    const newCA = _.cloneDeep(this.state.context_attributes);
    newCA[caIndex]['data_values'][dataValueIndex]['range_values'][name] = event.target.value;
    this.setState({
      context_attributes: newCA,
    });
  };

  handleDeleteChip(dataValueIndex, contextIndex, itemIndex) {
    const newCA = _.cloneDeep(this.state.context_attributes);
    const dataValues = newCA[contextIndex]['data_values'][dataValueIndex]['range_values']['multiple_values'];

    newCA[contextIndex]['data_values'][dataValueIndex]['range_values'][multiple_values].splice(itemIndex, 1);
    this.setState({
      context_attributes: newCA,
    });
  }

  handleAddChip(value, dataValueIndex, contextIndex) {
    const newCA = _.cloneDeep(this.state.context_attributes);
    const dataValues = newCA[contextIndex]['data_values'][dataValueIndex]['range_values']['multiple_values'];
    newCA[contextIndex]['data_values'][dataValueIndex]['range_values']['multiple_values'] = [...dataValues, value.trim()];
    this.setState({
      context_attributes: newCA,
    });
  }

  expandPannel = (pannelNumber) => (evt, isExpanded) => {
    this.setState({ expanded: isExpanded ? pannelNumber : false });
  };

  handleAddNewContextAttribute() {
    const newContextAttributes = [..._.cloneDeep(this.state.context_attributes), ...[_.cloneDeep(DEFAULT_VALUES.CONTEXT_ATTRIBUTE)]];

    this.setState({ expanded: newContextAttributes.length });
    this.setState({
      context_attributes: newContextAttributes,
    });
  }

  handleAddNewDataValue(index) {
    const newDataValues = [..._.cloneDeep(this.state.context_attributes[index]['data_values']), ...[_.cloneDeep(DEFAULT_VALUES.DATA_VALUE)]];
    const newContextAttributes = _.cloneDeep(this.state.context_attributes);
    newContextAttributes[index]['data_values'] = newDataValues;

    this.setState({
      context_attributes: newContextAttributes,
    });
  }

  handleRemoveContextAttribute = (contextIndex) => {
    const newContextAttributes = _.cloneDeep(this.state.context_attributes);
    newContextAttributes.splice(contextIndex, 1);
    this.setState({
      context_attributes: newContextAttributes,
    });
  };

  handleRemoveDataValue = (dataValueIndex, contextIndex) => {
    const newContextAttributes = _.cloneDeep(this.state.context_attributes);
    newContextAttributes[contextIndex]['data_values'].splice(dataValueIndex, 1);
    this.setState({
      context_attributes: newContextAttributes,
    });
  };

  handleToggleFullScreen = () => {
    const showFullscreen = this.state.fullScreen;
    this.setState({ fullScreen: !showFullscreen });
  };

  handleAddEditSituation = () => {
    const situationPayload = {
      application_name: this.state.application_name,
      application_description: this.state.application_description,
      situation_name: this.state.situationConclusion,
      // situation_description: this.state.situation_description,
      context_attributes: this.state.context_attributes,
      fuzzy_selection: this.state.fuzzy_selection,
      fuzzy_rules: this.state.fuzzy_rules,
      weather: this.state.lat_long && { lat: this.state.latitude, long: this.state.longitude },
    };
    if (this.props.mode == 'EDIT_MODE') {
      this.props.viewStore.updateSituation(this.props.situationId, { situationData: situationPayload }, this.handleClose);

      // API.patch('/situation/update/' + this.props.situationId, {
      //   situationData: {situationData: situationPayload},
      // }).then((res) => {
      //
      //   this.appStore.situationsManageScreenStore.load();
      //   this.handleClose("Situation Updated successfully");
      // });
    } else {
      this.props.viewStore.createSituation({ situationData: situationPayload }, this.handleClose);
      // API.post('/situation/create', {
      //   situationData: situationPayload,
      // }).then((res) => {
      //
      //   this.appStore.situationsManageScreenStore.load();
      //   this.handleClose("Situation created successfully");
      // });
    }
  };

  populateFormData(situationId) {
    API.get('/situation/get/' + situationId).then((res) => {
      const situationData = res.data;
      this.setState({
        situation_name: situationData.situation_name,
        situation_description: situationData.situation_description,
        context_attributes: situationData.context_attributes,
      });
    });
  }

  handleFuzzyDropDown = (value, field, name) => {
    const getState = _.cloneDeep(this.state.fuzzy_selection);
    let updatedState = {};
    if (!getState[name]) {
      updatedState = {
        ...getState,
        [name]: { [field]: value },
      };
    } else {
      updatedState = {
        ...getState,
        [name]: { ...getState[name], [field]: value },
      };
    }

    this.setState({ fuzzy_selection: updatedState });
  };

  // handleFuzzyChip = (value, field, name) => {
  //   const getState = _.cloneDeep(this.state.fuzzy_selection);
  //   let updatedState = {};
  //   if (!getState[name]) {
  //     updatedState = {
  //       ...getState,
  //       [name]: { [field]: value },
  //     };
  //   } else {
  //     updatedState = {
  //       ...getState,
  //       [name]: { ...getState[name], [field]: value },
  //     };
  //   }

  //   this.setState({ fuzzy_selection: updatedState });
  // };

  canGoToSummary = () => {
    const val = Object.values(this.state.fuzzy_selection).reduce((acc, obj) => acc + obj.weight, 0);
    if (typeof val === 'number' && val === 1) {
      this.setState({ showMsg: '' });
      this.setState({ showSummary: true });
    } else {
      this.setState({ showMsg: 'Weights should add upto 1' });
    }
  };

  handleRulesInput = (e) => {
    e.persist();
    const file = e.target.files[0];
    if (file.type === 'text/plain') {
      try {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          const content = e.target.result;
          if (content.length > 0) {
            const lines = content.split(/\r\n|\n/).filter((line) => line !== '');

            const arrange = lines
              .map((line) => line.slice(line.indexOf('If')))
              .map((line) => {
                const match = line.match(/(?:\S+\s)?\S*is\S*(?:\s\S+)?/g);
                return match.reduce((acc, item) => {
                  const splitText = item.split(' ');

                  return {
                    ...acc,
                    [splitText[0]]: splitText[2].replaceAll("'", ''),
                  };
                }, []);
              })
              .flat(1);
            this.setState({ fuzzy_rules: arrange });
          }
        };
      } catch (e) {
        console.log(e);
      }
    }
  };

  checkFuzzySetRange = () => {
    console.log(Object.values(this.state.fuzzy_selection).map((item) => item.fuzzyness));
  };

  // getlatlong = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.setState({ lat_long: true/*{ lat: position.coords.latitude, long: position.coords.longitude }*/ });
  //     // localStorage.setItem('weatherData', JSON.stringify({ lat: position.coords.latitude, long: position.coords.longitude }));
  //   });
  // };

  handleWeather = (e) => {
    if (e.target.checked) {
      // this.getlatlong();
      this.setState({ lat_long: true });
    } else {
      this.setState({ lat_long: undefined });
      // localStorage.removeItem('weatherData');
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={this.state.fullScreen}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          maxWidth="md"
          fullWidth={true}
          open={this.props.open ? true : false}
          onClose={() => this.handleClose('')}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => this.handleClose('')}
            handleToggleFullScreen={this.handleToggleFullScreen}
            fullScreen={this.state.fullScreen}
          >
            {this.props.modalTitle}
          </DialogTitle>
          <DialogContent>
            {!this.state.showSummary ? (
              <Grid className={classes.situationInfo}>
                <form className={classes.container} noValidate autoComplete="off">
                  <Card className={classes.fullWidth + ' ' + classes.card}>
                    <CardContent>
                      <Typography className={classes.titleText} variant="subheading" gutterBottom>
                        <strong>Application Details</strong>
                      </Typography>
                      <Grid container spacing={24}>
                        <Grid item xs={6}>
                          <TextField
                            id="application_name"
                            required
                            label="Application Name"
                            className={classes.textField}
                            value={this.state.application_name}
                            onChange={this.handleChange('application_name')}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            id="application_description"
                            label="Application Description"
                            className={classes.textField}
                            value={this.state.application_description}
                            onChange={this.handleChange('application_description')}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {/* <Card className={classes.fullWidth + ' ' + classes.card}>
                    <CardContent>
                      <Typography variant="subheading">Situation Info</Typography>
                      <Grid container spacing={24}>
                        <Grid item xs={6}>
                          <TextField
                            id="situation_name"
                            required
                            label="Situation Name"
                            className={classes.textField}
                            value={this.state.situation_name}
                            onChange={this.handleChange('situation_name')}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            id="situation_description"
                            label="Situation Description"
                            className={classes.textField}
                            value={this.state.situation_description}
                            onChange={this.handleChange(
                              'situation_description'
                            )}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card> */}
                  <Card className={classes.fullWidth + ' ' + classes.card}>
                    <CardContent>
                      <Typography className={classes.titleText} variant="subheading" gutterBottom>
                        <strong>Context attributes</strong>
                      </Typography>
                      {this.state.context_attributes.map((ca, index) => {
                        return (
                          <div className={classes.contextAttribute} key={index}>
                            <ExpansionPanel
                              square
                              // defaultExpanded={this.state.context_attributes.length == 1}
                              expanded={this.state.expanded == index + 1}
                              onChange={this.expandPannel(index + 1)}
                            >
                              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={`${classes.titleText} ${classes.heading}`}>
                                  {ca.context_attribute_name ? <strong>{ca.context_attribute_name}</strong> : 'New context attribute'}
                                </Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails className={classes.panelContent}>
                                <Grid container spacing={24}>
                                  <Grid item xs={6}>
                                    <TextField
                                      id="context_attribute_name"
                                      required
                                      label="Context Name"
                                      className={classes.textField + ' ' + classes.noMarginTop}
                                      value={ca.context_attribute_name}
                                      onChange={this.handleContextAttributeChange('context_attribute_name', index)}
                                      margin="normal"
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <TextField
                                      required
                                      id="context_attribute_description"
                                      label="Context Description"
                                      className={classes.textField + ' ' + classes.noMarginTop}
                                      value={ca.context_attribute_description}
                                      onChange={this.handleContextAttributeChange('context_attribute_description', index)}
                                      margin="normal"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                  <Grid item xs={6}>
                                    <TextField
                                      required
                                      id="unit"
                                      label="Unit"
                                      className={classes.textField}
                                      value={ca.unit}
                                      onChange={this.handleContextAttributeChange('unit', index)}
                                      margin="normal"
                                    />
                                  </Grid>
                                  {/* <Grid item xs={6}>
                                    <TextField
                                      required
                                      id="weight"
                                      label="Weight"
                                      type="number"
                                      className={classes.textField}
                                      value={ca.weight}
                                      onChange={this.handleContextAttributeChange(
                                        'weight',
                                        index
                                      )}
                                      margin="normal"
                                      InputProps={{
                                        inputProps: { min: 0, max: 1 },
                                      }}
                                      error={
                                        this.state.weightError &&
                                        this.state.weightError.length > 0 &&
                                        this.state.weightError[index]
                                          ? true
                                          : false
                                      }
                                      helperText={
                                        this.state.weightError &&
                                        this.state.weightError.length > 0 &&
                                        this.state.weightError[index]
                                          ? this.state.weightError[index]
                                          : ''
                                      }
                                    />
                                  </Grid> */}
                                </Grid>
                                <Divider className={classes.smallMargin} />
                                {/* <Grid>
                                  <Typography
                                    className={classes.titleText}
                                    variant="subheading"
                                    gutterBottom
                                  >
                                    <strong>Data value ranges</strong>
                                  </Typography>
                                  {ca.data_values.map(
                                    (dataValue, dataValueIndex) => {
                                      return (
                                        <Grid
                                          container
                                          spacing={24}
                                          key={dataValueIndex}
                                        >
                                          <Grid item xs={3}>
                                            <FormControl
                                              className={
                                                classes.formControl +
                                                ' ' +
                                                classes.selectEmpty
                                              }
                                            >
                                              <InputLabel htmlFor="range_type">
                                                Data type
                                              </InputLabel>
                                              <Select
                                                value={dataValue.range_type}
                                                onChange={this.handleDataValueChange(
                                                  'range_type',
                                                  index,
                                                  dataValueIndex
                                                )}
                                                placeholder="Range type"
                                                className={
                                                  classes.textField +
                                                  ' ' +
                                                  classes.selectEmpty
                                                }
                                                inputProps={{
                                                  name: 'range_type',
                                                  id: 'range_type',
                                                }}
                                              >
                                                <MenuItem value="">
                                                  <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="bound">
                                                  Bound
                                                </MenuItem>
                                                <MenuItem value="array">
                                                  Array
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Grid>
                                          {dataValue.range_type == 'array' ? (
                                            <Grid item xs={6}>
                                              <ChipInput
                                                className={
                                                  classes.textField +
                                                  ' ' +
                                                  classes.noMarginTop +
                                                  ' ' +
                                                  classes.chips
                                                }
                                                value={
                                                  dataValue.range_values
                                                    .multiple_values
                                                }
                                                label="Values"
                                                onAdd={(chip) =>
                                                  this.handleAddChip(
                                                    chip,
                                                    dataValueIndex,
                                                    index
                                                  )
                                                }
                                                onDelete={(chip, itemIndex) =>
                                                  this.handleDeleteChip(
                                                    dataValueIndex,
                                                    index,
                                                    itemIndex
                                                  )
                                                }
                                              />
                                            </Grid>
                                          ) : (
                                            <React.Fragment>
                                              <Grid item xs={3}>
                                                <FormControl
                                                  className={
                                                    classes.formControl
                                                  }
                                                >
                                                  <TextField
                                                    id="lower_bound"
                                                    label="Lower bound"
                                                    type="number"
                                                    className={
                                                      classes.textField +
                                                      ' ' +
                                                      classes.noMarginTop
                                                    }
                                                    value={
                                                      dataValue.range_values
                                                        .lower_bound
                                                    }
                                                    onChange={this.handleDataRangeValueChange(
                                                      'lower_bound',
                                                      index,
                                                      dataValueIndex
                                                    )}
                                                    margin="normal"
                                                  />
                                                </FormControl>
                                              </Grid>
                                              <Grid item xs={3}>
                                                <FormControl
                                                  className={
                                                    classes.formControl
                                                  }
                                                >
                                                  <TextField
                                                    id="higher_bound"
                                                    label="Upper bound"
                                                    type="number"
                                                    className={
                                                      classes.textField +
                                                      ' ' +
                                                      classes.noMarginTop
                                                    }
                                                    value={
                                                      dataValue.range_values
                                                        .higher_bound
                                                    }
                                                    onChange={this.handleDataRangeValueChange(
                                                      'higher_bound',
                                                      index,
                                                      dataValueIndex
                                                    )}
                                                    margin="normal"
                                                  />
                                                </FormControl>
                                              </Grid>
                                            </React.Fragment>
                                          )}
                                          <Grid item xs={2}>
                                            <FormControl
                                              className={classes.formControl}
                                            >
                                              <TextField
                                                id="contribution"
                                                label="Contribution"
                                                type="number"
                                                className={
                                                  classes.textField +
                                                  ' ' +
                                                  classes.noMarginTop
                                                }
                                                value={dataValue.contribution}
                                                onChange={this.handleDataValueChange(
                                                  'contribution',
                                                  index,
                                                  dataValueIndex
                                                )}
                                                margin="normal"
                                              />
                                            </FormControl>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={1}
                                            className={classes.center}
                                          >
                                            <IconButton
                                              aria-label="Remove"
                                              className={classes.removeButton}
                                              onClick={() =>
                                                this.handleRemoveDataValue(
                                                  dataValueIndex,
                                                  index
                                                )
                                              }
                                            >
                                              <RemoveCircleOutlineIcon />
                                            </IconButton>
                                          </Grid>
                                        </Grid>
                                      );
                                    }
                                  )}
                                  <div>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        this.handleAddNewDataValue(index)
                                      }
                                    >
                                      <AddIcon />
                                      Add new data value
                                    </Button>
                                  </div>
                                </Grid> */}
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div className={classes.center}>
                              <IconButton
                                aria-label="Delete"
                                className={classes.removeButton}
                                onClick={() => this.handleRemoveContextAttribute(index)}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                      <section className="buttonPanel">
                        <Button color="primary" onClick={() => this.handleAddNewContextAttribute()}>
                          <AddIcon />
                          Add new context attribute
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.setState({ openStepTwo: true });
                            this.setState({ openFuzzySets: true });
                          }}
                        >
                          Save
                        </Button>
                      </section>
                    </CardContent>
                  </Card>
                  <Card className={classes.fullWidth + ' ' + classes.card}>
                    <CardContent>
                      <Typography className={classes.titleText} variant="subheading" gutterBottom>
                        <strong>Fuzzy Values</strong>
                      </Typography>
                      <ExpansionPanel
                        square
                        // defaultExpanded={this.state.context_attributes.length == 1}
                        expanded={this.state.openStepTwo}
                        // onChange={() => {}}
                      >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={`${classes.titleText} ${classes.heading}`}>
                            Select the fuzziness of your context attributes
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelContent} style={{ gap: '1em' }}>
                          {this.state.context_attributes[0].context_attribute_name !== '' ? (
                            this.state.context_attributes.map((context, index) => {
                              return (
                                <div className="fuzzy_selection" key={index}>
                                  <Grid container spacing={24} key={index}>
                                    <Grid item xs={4}>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        style={{
                                          pointerEvents: 'none',
                                          width: '90%',
                                          marginTop: '1rem',
                                        }}
                                      >
                                        {context.context_attribute_name}
                                      </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                                        {/* <InputLabel htmlFor="fuzzy_selection" >
                                            Fuzzyness
                                          </InputLabel> */}
                                        <TextField
                                          id="fuzzyness"
                                          label="Fuzzy Subset"
                                          value={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].fuzzyness
                                              : ' '
                                          }
                                          onChange={(e) => this.handleFuzzyDropDown(e.target.value, 'fuzzyness', context.context_attribute_name)}
                                          placeholder="Fuzzyness"
                                          className={classes.textField + ' ' + classes.selectEmpty + ' ' + classes.noMarginTop}
                                        >
                                          {/* {DEFAULT_VALUES.FUZZY_DROPDOWN_VALUES.map(
                                              (val, index_as_key) => (
                                                <MenuItem
                                                  key={index_as_key}
                                                  value={val.toLowerCase()}
                                                >
                                                  {val}
                                                </MenuItem>
                                              )
                                            )} */}
                                        </TextField>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                                        <TextField
                                          id="weight"
                                          label="Weight"
                                          type="number"
                                          className={classes.textField + ' ' + classes.noMarginTop}
                                          value={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].weight
                                              : ' '
                                          }
                                          onChange={(e) => this.handleFuzzyDropDown(e.target.valueAsNumber, 'weight', context.context_attribute_name)}
                                          margin="normal"
                                          error={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].weight > 1 ||
                                                this.state.fuzzy_selection[context.context_attribute_name].weight < 0
                                              : false
                                          }
                                          InputProps={{
                                            inputProps: {
                                              max: 1,
                                              min: 0,
                                            },
                                          }}
                                          FormHelperText="Value should be between 0 and 1"
                                        />
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </div>
                              );
                            })
                          ) : (
                            <h2>Fill Context Attributes</h2>
                          )}
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel
                        square
                        // defaultExpanded={this.state.context_attributes.length == 1}
                        expanded={this.state.openFuzzySets}
                        // onChange={() => {}}
                      >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={`${classes.titleText} ${classes.heading}`}>Fuzzy Sets</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelContent} style={{ gap: '1em' }}>
                          {/* <Grid container spacing={24}>
                            <Grid item xs={4}>
                              <div className="rule__upload">
                                <InputLabel htmlFor="fuzzy_set_range">
                                  Upload Situation Rules
                                </InputLabel>
                                <Input
                                  type="file"
                                  id="fuzzy_set_range"
                                  accept="text/plain,.txt"
                                  onChange={this.checkFuzzySetRange}
                                />
                              </div>
                            </Grid>
                          </Grid> */}
                          {this.state.context_attributes[0].context_attribute_name !== '' ? (
                            this.state.context_attributes.map((context, index) => {
                              return (
                                <div className="fuzzy_selection" key={index}>
                                  <Grid container spacing={24} key={index}>
                                    <Grid item xs={2}>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        style={{
                                          pointerEvents: 'none',
                                          width: '90%',
                                          marginTop: '1rem',
                                        }}
                                      >
                                        {context.context_attribute_name}
                                      </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                                        <TextField
                                          id="fuzzyness"
                                          label="Fuzzy Subset"
                                          disabled="true"
                                          value={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].fuzzyness
                                              : ' '
                                          }
                                          placeholder="Fuzzyness"
                                          className={classes.textField + ' ' + classes.selectEmpty + ' ' + classes.noMarginTop}
                                        >
                                          {/* {DEFAULT_VALUES.FUZZY_DROPDOWN_VALUES.map(
                                              (val, index_as_key) => (
                                                <MenuItem
                                                  key={index_as_key}
                                                  value={val.toLowerCase()}
                                                >
                                                  {val}
                                                </MenuItem>
                                              )
                                            )} */}
                                        </TextField>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                                        <TextField
                                          id="stepfn"
                                          label="Fuzzyness"
                                          type="number"
                                          value={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].stepfn
                                              : ' '
                                          }
                                          onChange={(e) => this.handleFuzzyDropDown(e.target.valueAsNumber, 'stepfn', context.context_attribute_name)}
                                          placeholder="Step Function"
                                          className={classes.textField + ' ' + classes.selectEmpty + ' ' + classes.noMarginTop}
                                        ></TextField>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                                        <TextField
                                          id="lower_bound"
                                          label="Lower Bound"
                                          type="number"
                                          value={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].lower_bound
                                              : ' '
                                          }
                                          onChange={(e) =>
                                            this.handleFuzzyDropDown(e.target.valueAsNumber, 'lower_bound', context.context_attribute_name)
                                          }
                                          placeholder="Lower Bound"
                                          className={classes.textField + ' ' + classes.selectEmpty + ' ' + classes.noMarginTop}
                                        ></TextField>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                                        <TextField
                                          id="upper_bound"
                                          label="Upper Bound"
                                          type="number"
                                          value={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].upper_bound
                                              : ' '
                                          }
                                          onChange={(e) =>
                                            this.handleFuzzyDropDown(e.target.valueAsNumber, 'upper_bound', context.context_attribute_name)
                                          }
                                          placeholder="Upper Bound"
                                          className={classes.textField + ' ' + classes.selectEmpty + ' ' + classes.noMarginTop}
                                        ></TextField>
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <FormControl className={classes.formControl + ' ' + classes.selectEmpty}>
                                        <TextField
                                          id="disclosure"
                                          label="Universe of disclosure"
                                          value={
                                            this.state.fuzzy_selection[context.context_attribute_name]
                                              ? this.state.fuzzy_selection[context.context_attribute_name].disclosure
                                              : ' '
                                          }
                                          onChange={(e) => this.handleFuzzyDropDown(e.target.value, 'disclosure', context.context_attribute_name)}
                                          placeholder="Universe of disclosure"
                                          className={classes.textField + ' ' + classes.selectEmpty + ' ' + classes.noMarginTop}
                                        ></TextField>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </div>
                              );
                            })
                          ) : (
                            <h2>Fill Context Attributes</h2>
                          )}
                        </ExpansionPanelDetails>
                      </ExpansionPanel>

                      <div className="fuzzy_btn_placement">
                        <InputLabel htmlFor="weatherCheck">
                          <Input type="checkbox" id="weatherCheck" onChange={this.handleWeather}></Input>
                          Weather
                          {/* {this.state.lat_long && (
                            <p>
                              Latitude:{this.state.lat_long.lat} Longitude:{this.state.lat_long.long}
                            </p>
                          )} */}
                        </InputLabel>
                        <div>
                          <InputLabel htmlFor="lat">
                            Latitude
                            <Input
                              disabled={!this.state.lat_long}
                              type="number"
                              id="lat"
                              onChange={(e) => this.setState({ latitude: e.target.value })}
                            ></Input>
                          </InputLabel>
                          <InputLabel htmlFor="long">
                            Longitude
                            <Input
                              type="number"
                              disabled={!this.state.lat_long}
                              id="long"
                              onChange={(e) => this.setState({ longitude: e.target.value })}
                            ></Input>
                          </InputLabel>
                        </div>
                        <Button variant="contained" onClick={this.canGoToSummary} color="primary">
                          Save
                        </Button>
                        {this.state.showMsg && <i>{this.state.showMsg}</i>}
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </Grid>
            ) : (
              <Grid className={classes.situationInfo}>
                <Card className={classes.fullWidth + ' ' + classes.card}>
                  <CardContent>
                    <div className="button__ca">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Context Attribute</TableCell>
                            <TableCell align="right">Fuzzyness</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(this.state.fuzzy_selection).map(([sit_name, { fuzzyness }], key) => {
                            return (
                              <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                  {sit_name}
                                </TableCell>
                                <TableCell align="right">
                                  <strong>{_.capitalize(fuzzyness)}</strong>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="rule__upload">
                      <InputLabel htmlFor="situation_rule">Upload Situation Rules</InputLabel>
                      <Input type="file" id="situation_rule" accept="text/plain,.txt" onChange={this.handleRulesInput} />
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <strong>SITUATION RULES SPEC</strong>
                            </Typography>
                            <strong>Example Rule :</strong>
                            <br />
                            {`IF temperature is hot AND humidity is high THEN
                              fan speed is fast`}
                          </React.Fragment>
                        }
                      >
                        <Button>
                          <InfoIcon color="primary" />
                        </Button>
                      </HtmlTooltip>
                    </div>
                    <InputLabel htmlFor="rule_name">Enter Situation Name</InputLabel>
                    <TextField
                      id="rule_name"
                      className={classes.textField + ' ' + classes.noMarginTop}
                      value={this.state.situationConclusion}
                      onChange={(e) => {
                        this.setState({ situationConclusion: e.target.value });
                      }}
                      margin="normal"
                    />

                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.setState({ showSummary: false })}
                    >
                      Click me
                    </Button> */}
                  </CardContent>
                </Card>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('')} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={this.handleAddEditSituation} color="primary">
              {this.props.mode == 'EDIT_MODE' ? 'Save Situation' : 'Add Situation'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddEditSituationModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AddEditSituationModalWrapped = withStyles(styles)(AddEditSituationModal);

export default AddEditSituationModalWrapped;
