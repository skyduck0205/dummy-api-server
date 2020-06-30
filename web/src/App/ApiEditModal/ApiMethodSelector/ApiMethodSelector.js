import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

function ApiMethodSelector({ value, onChange }) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  return (
    <FormControl component="fieldset" margin="dense" required>
      <FormLabel component="legend">Method</FormLabel>
      <RadioGroup row value={value} onChange={onChange}>
        {methods.map((method) => (
          <FormControlLabel
            key={method}
            value={method}
            control={<Radio />}
            label={method}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

ApiMethodSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ApiMethodSelector.defaultProps = {
  value: '',
  onChange: () => {},
};

export default ApiMethodSelector;
