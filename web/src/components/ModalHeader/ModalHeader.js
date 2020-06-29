import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

function ModalHeader({ title, onCloseClick }) {
  return (
    <Box
      px={3}
      py={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h5">{title}</Typography>
      <IconButton size="small" onClick={onCloseClick}>
        <Icon>close</Icon>
      </IconButton>
    </Box>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  onCloseClick: PropTypes.func,
};
ModalHeader.defaultProps = {
  title: '',
  onCloseClick: () => {},
};

export default ModalHeader;
