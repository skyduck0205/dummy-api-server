import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import HttpStatus from 'components/HttpStatus';

function ResponseSelector({ responses, value, onChange, ...restProps }) {
  return (
    <Select value={value} onChange={onChange} {...restProps}>
      {responses.map((response) => (
        <MenuItem key={response.id} value={response.id}>
          <HttpStatus key={response.id} status={response.status} mr={1} />
          {response.name}
        </MenuItem>
      ))}
    </Select>
  );
}

ResponseSelector.propTypes = {
  responses: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ResponseSelector.defaultProps = {
  responses: [],
  value: null,
  onChange: () => {},
};

export default ResponseSelector;
