import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  textField: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    //
  },
  root: {
    flexGrow: 1,
  },
  selectEmpty: {
    minWidth: '100%',
  },
  marginTop20: {
    marginTop: '20px',
  },
});

class ConfigureForm extends React.Component {
  state = {
    open: false,
    age: '',
    transitTo: '',
    inputNode: '',
    values: {},
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleDataValueChange = (name) => (event) => {
    const newValues = _.cloneDeep(this.state.values);
    newValues[name] = event.target.value;
    this.setState({
      values: newValues,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <FormControl
                className={classes.formControl + ' ' + classes.selectEmpty}
              >
                <InputLabel htmlFor="transit_to">Transit to</InputLabel>
                <Select
                  value={this.state.transitTo}
                  onChange={this.handleChange('transitTo')}
                  placeholder="Transit to"
                  inputProps={{
                    name: 'transit_to',
                    id: 'transit_to',
                  }}
                  className={classes.textField + ' ' + classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.props.situationList
                    .filter(
                      (s) => s._id != this.props.selectedNode.data.situation._id
                    )
                    .map((e, key) => {
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
          {this.props.selectedNode.data.situation.context_attributes.map(
            (ca, caIndex) => {
              return (
                <TextField
                  label={ca.context_attribute_name}
                  type="text"
                  className={classes.textField + ' ' + classes.noMarginTop}
                  value={this.state.values[ca._id]}
                  onChange={this.handleDataValueChange(ca._id)}
                  margin="normal"
                />
              );
            }
          )}
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.marginTop20}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => this.props.closeConfigurationPanel(true)}
                >
                  Save Configuration
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

ConfigureForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigureForm);
