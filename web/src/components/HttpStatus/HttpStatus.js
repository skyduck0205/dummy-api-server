import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function HttpStatus({ status, ...props }) {
  return (
    <Box
      component="span"
      color={status >= 200 && status < 300 ? 'success.main' : 'error.main'}
      {...props}
    >
      {status}
    </Box>
  );
}

HttpStatus.propTypes = {
  status: PropTypes.number.isRequired,
};

export default HttpStatus;
