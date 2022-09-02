import React from 'react';

export const AddEditSituationForm = ({ onSubmit }) => {
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.fullWidth + ' ' + classes.card}>
        <CardContent>
          {/* <Typography variant="subheading">Situation Info</Typography> */}
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField
                id="situation_names" //changed situation_name to situation_names to see if any changes are reflected in the front end
                required
                label="Situation Names" //changed
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
                onChange={this.handleChange('situation_description')}
                margin="normal"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card className={classes.fullWidth + ' ' + classes.card}>
        <CardContent>
          <Typography
            className={classes.titleText}
            variant="subheading"
            gutterBottom
          >
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
                    <Typography
                      className={classes.titleText}
                      className={classes.heading}
                    >
                      {ca.context_attribute_name ? (
                        <strong>{ca.context_attribute_name}</strong>
                      ) : (
                        'New context attribute'
                      )}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.panelContent}>
                    <Grid container spacing={24}>
                      <Grid item xs={6}>
                        <TextField
                          id="context_attribute_name"
                          required
                          label="Context Name"
                          className={
                            classes.textField + ' ' + classes.noMarginTop
                          }
                          value={ca.context_attribute_name}
                          onChange={this.handleContextAttributeChange(
                            'context_attribute_name',
                            index
                          )}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          id="context_attribute_description"
                          label="Context Description"
                          className={
                            classes.textField + ' ' + classes.noMarginTop
                          }
                          value={ca.context_attribute_description}
                          onChange={this.handleContextAttributeChange(
                            'context_attribute_description',
                            index
                          )}
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
                          onChange={this.handleContextAttributeChange(
                            'unit',
                            index
                          )}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={6}>
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
                        />
                      </Grid>
                    </Grid>
                    <Divider className={classes.smallMargin} />
                    <Grid>
                      <Typography
                        className={classes.titleText}
                        variant="subheading"
                        gutterBottom
                      >
                        <strong>Data value ranges</strong>
                      </Typography>
                      {ca.data_values.map((dataValue, dataValueIndex) => {
                        return (
                          <Grid container spacing={24} key={dataValueIndex}>
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
                                  <MenuItem value="bound">Bound</MenuItem>
                                  <MenuItem value="array">Array</MenuItem>
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
                                  value={dataValue.range_values.multiple_values}
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
                                  <FormControl className={classes.formControl}>
                                    <TextField
                                      id="lower_bound"
                                      label="Lower bound"
                                      type="number"
                                      className={
                                        classes.textField +
                                        ' ' +
                                        classes.noMarginTop
                                      }
                                      value={dataValue.range_values.lower_bound}
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
                                  <FormControl className={classes.formControl}>
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
                                        dataValue.range_values.higher_bound
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
                              <FormControl className={classes.formControl}>
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
                            <Grid item xs={1} className={classes.center}>
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
                      })}
                      <div>
                        <Button
                          color="primary"
                          onClick={() => this.handleAddNewDataValue(index)}
                        >
                          <AddIcon />
                          Add new data value
                        </Button>
                      </div>
                    </Grid>
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
          <Button
            color="primary"
            onClick={() => this.handleAddNewContextAttribute()}
          >
            <AddIcon />
            Add new context attribute
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
export default AddEditSituationForm;
