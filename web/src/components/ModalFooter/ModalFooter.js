import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  footer: {
    '& button + button': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function ModalFooter({ isOkDisabled, onOkClick, onCancelClick }) {
  const classes = useStyles();
  return (
    <Box
      className={classes.footer}
      p={3}
      py={2}
      display="flex"
      justifyContent="flex-end"
    >
      <Button onClick={onCancelClick}>Cancel</Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onOkClick}
        disabled={isOkDisabled}
      >
        Ok
      </Button>
    </Box>
  );
}

ModalFooter.propTypes = {
  isOkDisabled: PropTypes.bool,
  onOkClick: PropTypes.func,
  onCancelClick: PropTypes.func,
};
ModalFooter.defaultProps = {
  isOkDisabled: false,
  onOkClick: () => {},
  onCancelClick: () => {},
};

export default ModalFooter;
