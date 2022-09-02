import React, { useEffect, useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ChipInput from "material-ui-chip-input";

const styles = (theme) => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%"
    },
    chips: {
        p: {
            width: "fit-content",
            position: "absolute",
            bottom: "30px",
            right: 0
        }
    },
    panelContent: {
        flexDirection: "column"
    },
    noMarginTop: {
        marginTop: 0
    }
});

function ContextAttributeCard(props) {
    const { classes } = props;
    const [expanded, setExpanded] = React.useState("");
    const [contextAttributes, setContextAttributes] = React.useState([]);
    const [defaultContextAttribute, setDefaultContextAttribute] = useState({
        contextName: "",
        contextDescription: "",
        unit: "",
        weight: 0,
        dataValues: [
            {
                contribution: "",
                datatype: "",
                yourChips: [],
                lowerBound: 0,
                higherBound: 0
            }
        ]
    });

    const handlePannelChange = (pannelId) => (evt, isExpanded) => {
        setExpanded(isExpanded ? pannelId : false);
    };

    const addContextAttribute = () => {
        const newContextAttributes = [...contextAttributes];
        newContextAttributes.push(defaultContextAttribute);
        setContextAttributes([...newContextAttributes]);
    };

    const handleChange = (name, index) => (event) => {
        const newContextAttributes = [...contextAttributes];
        newContextAttributes[index][name] = event.target.value;
        setContextAttributes([...newContextAttributes]);
    };

    const CAPanel = (props) => (
        <ExpansionPanel
            expanded={props.expanded === props.pannelId}
            onChange={props.handlePannelChange(props.pannelId)}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1bh-header"
                aria-controls="panel1bh-content"
            >
                Hello
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelContent}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <TextField
                            id="contextName"
                            required
                            label="Context Name"
                            className={
                                classes.textField + " " + classes.noMarginTop
                            }
                            value={props.attribute.contextName}
                            onChange={props.handleChange(
                                "contextName",
                                props.index
                            )}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="contextDescription"
                            label="Context Description"
                            className={
                                classes.textField + " " + classes.noMarginTop
                            }
                            value={props.attribute.contextDescription}
                            onChange={props.handleChange(
                                "contextDescription",
                                props.index
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
                            value={props.attribute.unit}
                            onChange={props.handleChange("unit", props.index)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="weight"
                            label="Weight"
                            className={classes.textField}
                            value={props.attribute.weight}
                            onChange={props.handleChange("weight", props.index)}
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid>
                    <Typography variant="subheading" gutterBottom>
                        Data value ranges
                    </Typography>
                    {props.attribute.dataValues.map(
                        (dataValue, dataValueIndex) => {
                            <Grid container spacing={24} key={dataValueIndex}>
                                <Grid item xs={3}>
                                    <Select
                                        value={dataValue.datatype}
                                        onChange={props.handleChange(
                                            "datatype"
                                        )}
                                        className={classes.textField}
                                        inputProps={{
                                            name: "age",
                                            id: "age-simple"
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="bound">Bound</MenuItem>
                                        <MenuItem value="array">Array</MenuItem>
                                    </Select>
                                    {/* <TextField
                                                      id="datatype"
                                                      required
                                                      label="Data type"
                                                      className={classes.textField + " " + classes.noMarginTop}
                                                      value={props.state.datatype}
                                                      onChange={ props.handleChange('datatype')}
                                                      margin="normal"
                                                    /> */}
                                </Grid>
                                {}
                                <Grid item xs={6}>
                                    <ChipInput
                                        className={
                                            classes.textField +
                                            " " +
                                            classes.noMarginTop +
                                            " " +
                                            classes.chips
                                        }
                                        value={dataValue.values}
                                        label="Values"
                                        onAdd={(chip) =>
                                            props.handleAddChip(chip)
                                        }
                                        onDelete={(chip, index) =>
                                            props.handleDeleteChip(chip, index)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id="lowerbound"
                                        label="Lower bound"
                                        className={
                                            classes.textField +
                                            " " +
                                            classes.noMarginTop
                                        }
                                        value={dataValue.lowerBound}
                                        onChange={props.handleChange(
                                            "lowerBound"
                                        )}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id="upperBound"
                                        label="upperBound"
                                        className={
                                            classes.textField +
                                            " " +
                                            classes.noMarginTop
                                        }
                                        value={dataValue.upperBound}
                                        onChange={props.handleChange(
                                            "upperBound"
                                        )}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id="contribution"
                                        label="Contribution"
                                        className={
                                            classes.textField +
                                            " " +
                                            classes.noMarginTop
                                        }
                                        value={dataValue.contribution}
                                        onChange={props.handleChange(
                                            "contribution"
                                        )}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>;
                        }
                    )}
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );

    useEffect(() => {
        setContextAttributes([{ ...defaultContextAttribute }]);
    }, []);

    return (
        <div className="flow">
            {contextAttributes.map((attribute, key) => (
                <CAPanel
                    pannelId={key + 1}
                    expanded={expanded}
                    handlePannelChange={handlePannelChange}
                    handleChange={handleChange}
                    attribute={attribute}
                    index={key}
                    key={key}
                />
            ))}
            <Button onClick={() => addContextAttribute()} color="primary">
                <AddIcon /> Add context attribute
            </Button>
        </div>
    );
}

export default withStyles(styles)(ContextAttributeCard);
