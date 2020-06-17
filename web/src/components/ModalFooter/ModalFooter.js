import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  footer: {
    '& button + button': {
      marginLeft: theme.spacing(1),
    },
  },
}));

function ModalFooter({ onOkClick, onCancelClick }) {
  const classes = useStyles();
  return (
    <Box
      className={classes.footer}
      p={3}
      py={2}
      display="flex"
      justifyContent="flex-end"
    >
      <Button variant="contained" color="primary" onClick={onOkClick}>
        Ok
      </Button>
      <Button onClick={onCancelClick}>Cancel</Button>
    </Box>
  );
}

ModalFooter.propTypes = {
  onOkClick: PropTypes.func,
  onCancelClick: PropTypes.func,
};
ModalFooter.defaultProps = {
  onOkClick: () => {},
  onCancelClick: () => {},
};

export default ModalFooter;
