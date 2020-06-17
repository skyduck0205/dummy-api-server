import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

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
  footer: {
    '& button + button': {
      marginLeft: theme.spacing(1),
    },
  },
}));

function ApiEditModal({ open, onClose, api }) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => onClose()}
      closeAfterTransition
      disableAutoFocus
      disableEnforceFocus
      disableBackdropClick
    >
      <Fade in={open}>
        <Container className={classes.container} maxWidth="md">
          {/* modal header */}
          <Paper square elevation={5}>
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">
                {api ? 'Edit API' : 'Add API'}
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <span className="material-icons">close</span>
              </IconButton>
            </Box>

            {/* modal body */}
            <Box p={3} py={2}>
              modal content
            </Box>

            {/* modal footer */}
            <Box
              className={classes.footer}
              p={3}
              py={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button variant="contained" color="primary">
                Save
              </Button>
              <Button ml={2} onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Paper>
        </Container>
      </Fade>
    </Modal>
  );
}

ApiEditModal.propTypes = {
  open: PropTypes.bool,
  api: PropTypes.object,
  onClose: PropTypes.func,
};

ApiEditModal.defaultProps = {
  open: false,
  api: null,
  onClose: () => {},
};

export default ApiEditModal;
