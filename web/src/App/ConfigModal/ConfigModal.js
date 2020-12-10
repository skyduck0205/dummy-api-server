import React from 'react';
import PropTypes from 'prop-types';
import _isInteger from 'lodash/isInteger';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import ModalHeader from 'components/ModalHeader';
import ModalFooter from 'components/ModalFooter';
import useApi from 'hooks/useApi';
import useToast from 'hooks/useToast';
import useModalStyles from 'hooks/useModalStyles';
import api from 'services/api';

const defaultForm = {
  delay: 0,
};

function ConfigModal({ open, config, onOk, onCancel }) {
  const [form, setForm] = React.useState(defaultForm);

  const classes = useModalStyles();
  const toast = useToast();
  const [updateConfigStatus, updateConfigFetch] = useApi(api.updateConfig);

  React.useEffect(() => {
    if (open) {
      if (config) {
        setForm(config);
      } else {
        setForm(defaultForm);
      }
    }
  }, [open, config]);

  React.useEffect(() => {
    if (updateConfigStatus.response) {
      toast.success(updateConfigStatus.response.message);
      onOk(form);
    }
    if (updateConfigStatus.error) {
      toast.error(updateConfigStatus.error.message);
    }
  }, [updateConfigStatus.response, updateConfigStatus.error]);

  const onFormChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onOkClick = () => {
    updateConfigFetch(form);
  };

  const isDelayValid = _isInteger(form.delay) && form.delay >= 0;
  const isFormValid = isDelayValid;

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
        <Container className={classes.container} maxWidth="sm">
          <Paper className={classes.paper} square elevation={5}>
            {/* modal header */}
            <ModalHeader title="Config" onCloseClick={onCancel} />

            {/* modal body */}
            <Box p={3} py={2} overflow="auto">
              {/* path */}
              <TextField
                type="number"
                required
                id="das-config-delay"
                name="das-config-delay"
                label="API Delay (ms)"
                size="small"
                margin="normal"
                value={form.delay}
                min={0}
                error={!isDelayValid}
                onChange={(e) => onFormChange('delay', +e.target.value)}
                helperText="Milliseconds delay for all APIs"
                autoFocus
              />
            </Box>

            {/* modal footer */}
            <ModalFooter
              isOkDisabled={!isFormValid}
              onOkClick={onOkClick}
              onCancelClick={onCancel}
            />
          </Paper>
        </Container>
      </Fade>
    </Modal>
  );
}

ConfigModal.propTypes = {
  open: PropTypes.bool,
  config: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

ConfigModal.defaultProps = {
  open: false,
  config: null,
  onOk: () => {},
  onCancel: () => {},
};

export default ConfigModal;
