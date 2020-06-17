import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import ModalHeader from 'components/ModalHeader';
import ModalFooter from 'components/ModalFooter';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    margin: theme.spacing(5, 'auto'),
  },
  container: {
    outline: 'none',
  },
}));

function ApiEditModal({ open, api, onCancelClick }) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      closeAfterTransition
      disableAutoFocus
      disableEnforceFocus
      disableBackdropClick
    >
      <Fade in={open}>
        <Container className={classes.container} maxWidth="md">
          <Paper square elevation={5}>
            {/* modal header */}
            <ModalHeader
              title={api ? 'Edit API' : 'Add API'}
              onCloseClick={onCancelClick}
            />

            {/* modal body */}
            <Box p={3} py={2}>
              modal content
            </Box>

            {/* modal footer */}
            <ModalFooter onCancelClick={onCancelClick} />
          </Paper>
        </Container>
      </Fade>
    </Modal>
  );
}

ApiEditModal.propTypes = {
  open: PropTypes.bool,
  api: PropTypes.object,
  onCancelClick: PropTypes.func,
};

ApiEditModal.defaultProps = {
  open: false,
  api: null,
  onCancelClick: () => {},
};

export default ApiEditModal;
