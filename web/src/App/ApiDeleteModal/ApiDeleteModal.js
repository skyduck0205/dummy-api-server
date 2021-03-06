import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import ModalHeader from 'components/ModalHeader';
import ModalFooter from 'components/ModalFooter';
import useApi from 'hooks/useApi';
import useToast from 'hooks/useToast';
import useModalStyles from 'hooks/useModalStyles';
import api from 'services/api';

function ApiDeleteModal({ open, data, onOk, onCancel }) {
  const classes = useModalStyles();
  const toast = useToast();
  const [deleteAPIStatus, deleteAPIFetch] = useApi(api.deleteAPI);

  React.useEffect(() => {
    if (deleteAPIStatus.response) {
      toast.success(deleteAPIStatus.response.message);
      onOk(deleteAPIStatus.response);
    }
    if (deleteAPIStatus.error) {
      toast.error(deleteAPIStatus.error.message);
    }
  }, [deleteAPIStatus.response, deleteAPIStatus.error]);

  const onOkClick = () => {
    deleteAPIFetch(data.id);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 200 }}
      closeAfterTransition
      disableAutoFocus
      disableEnforceFocus
      disableBackdropClick
    >
      <Fade in={open}>
        <Container className={classes.container} maxWidth="md">
          <Paper className={classes.paper} square elevation={5}>
            {/* modal header */}
            <ModalHeader title="DeleteAPI" onCloseClick={onCancel} />

            {/* modal body */}
            <Box p={3} py={2} overflow="auto">
              Are you sure you want to remove this API?
              <Box
                component="span"
                ml={1}
                color="secondary.main"
                fontWeight="bold"
              >
                {data?.method} {data?.path}
              </Box>
            </Box>

            {/* modal footer */}
            <ModalFooter onOkClick={onOkClick} onCancelClick={onCancel} />
          </Paper>
        </Container>
      </Fade>
    </Modal>
  );
}

ApiDeleteModal.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

ApiDeleteModal.defaultProps = {
  open: false,
  data: null,
  onOk: () => {},
  onCancel: () => {},
};

export default ApiDeleteModal;
