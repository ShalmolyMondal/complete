const DATA_VALUE = {
  contribution: 0,
  range_type: '',
  range_values: {
    higher_bound: 0,
    lower_bound: 0,
    multiple_values: [],
  },
};

const CONTEXT_ATTRIBUTE = {
  context_attribute_name: '',
  context_attribute_description: '',
  unit: '',
  // data_values: [{ ...DATA_VALUE }],
};

const TRANSITION_DATA = {
  from: '',
  intermediate: '',
  to: '',
  timeBased: true,
  rule: null,
  time: '',
};

/**
 *  = Object.freeze({
 * speed:['slow','normal','fast'],
 * density:['less','normal,'high']
 * })
 */
const FUZZY_DROPDOWN_VALUES = ['Slow', 'Normal', 'Fast'];

export const DEFAULT_VALUES = {
  CONTEXT_ATTRIBUTE: CONTEXT_ATTRIBUTE,
  DATA_VALUE: DATA_VALUE,
  TRANSITION_DATA: TRANSITION_DATA,
  FUZZY_DROPDOWN_VALUES: FUZZY_DROPDOWN_VALUES,
};
