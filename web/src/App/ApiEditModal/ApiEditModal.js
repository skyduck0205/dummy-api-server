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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ModalHeader from 'components/ModalHeader';
import ModalFooter from 'components/ModalFooter';
import useApi from 'hooks/useApi';
import useToast from 'hooks/useToast';
import useModalStyles from 'hooks/useModalStyles';
import api from 'services/api';
import ApiMethodSelector from './ApiMethodSelector';
import ApiResponses from './ApiResponses';

const defaultForm = {
  id: null,
  delay: 0,
  method: 'GET',
  path: '',
  description: '',
  responses: [],
  currentResponseID: null,
};

function ApiEditModal({ open, data, onOk, onCancel }) {
  const [form, setForm] = React.useState(defaultForm);

  const classes = useModalStyles();
  const toast = useToast();
  const [updateAPIStatus, updateAPIFetch] = useApi(api.updateAPI);
  const [createAPIStatus, createAPIFetch] = useApi(api.createAPI);

  React.useEffect(() => {
    if (open) {
      if (data) {
        setForm({
          id: data.id,
          delay: _isInteger(data.delay) ? data.delay : 0,
          method: data.method,
          path: data.path,
          description: data.description,
          responses: data.responses,
          currentResponseID: data.currentResponseID,
        });
      } else {
        setForm(defaultForm);
      }
    }
  }, [open, data]);

  React.useEffect(() => {
    if (updateAPIStatus.response) {
      toast.success(updateAPIStatus.response.message);
      onOk(form);
    }
    if (updateAPIStatus.error) {
      toast.error(updateAPIStatus.error.message);
    }
  }, [updateAPIStatus.response, updateAPIStatus.error]);

  React.useEffect(() => {
    if (createAPIStatus.response) {
      toast.success(createAPIStatus.response.message);
      onOk(createAPIStatus.response);
    }
    if (createAPIStatus.error) {
      toast.error(createAPIStatus.error.message);
    }
  }, [createAPIStatus.response, createAPIStatus.error]);

  const isDelayValid = _isInteger(form.delay) && form.delay >= 0;
  const isPathValid = !!form.path.length;
  const isResponsesValid = !!form.responses.length;
  const isFormValid = isPathValid && isResponsesValid && isDelayValid;

  const onFormChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onOkClick = () => {
    if (form.id) {
      updateAPIFetch(form.id, form);
    } else {
      createAPIFetch(form);
    }
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
            <ModalHeader
              title={data ? 'Edit API' : 'Add API'}
              onCloseClick={onCancel}
            />

            {/* modal body */}
            <Box p={3} py={2} overflow="auto">
              <Box display="flex">
                {/* method */}
                <ApiMethodSelector
                  value={form.method}
                  onChange={(e) => onFormChange('method', e.target.value)}
                />
                {/* delay */}
                <TextField
                  required
                  type="number"
                  id="das-api-delay"
                  name="das-api-delay"
                  label="Delay (ms)"
                  size="small"
                  margin="normal"
                  value={form.delay}
                  min={0}
                  error={!isDelayValid}
                  onChange={(e) => onFormChange('delay', +e.target.value)}
                  placeholder="API delay"
                  helperText="Prior to config delay."
                  style={{ marginLeft: 'auto' }}
                />
              </Box>
              {/* path */}
              <TextField
                fullWidth
                required
                id="das-api-path"
                name="das-api-path"
                label="Path"
                size="small"
                margin="normal"
                value={form.path}
                error={!isPathValid}
                onChange={(e) => onFormChange('path', e.target.value)}
                placeholder="API path e.g. /api/user/:userId"
                helperText="API path with method should be unique and not empty."
                autoFocus
              />
              {/* description */}
              <TextField
                fullWidth
                id="das-api-description"
                name="das-api-description"
                label="Description"
                size="small"
                margin="normal"
                value={form.description}
                onChange={(e) => onFormChange('description', e.target.value)}
                placeholder="API description"
              />
              {/* response */}
              <FormControl margin="normal" fullWidth required>
                <FormLabel component="legend" error={!isResponsesValid}>
                  Responses
                </FormLabel>
                {!isResponsesValid && (
                  <FormHelperText error>
                    Should have at least one response.
                  </FormHelperText>
                )}
                <ApiResponses
                  value={form.responses}
                  current={form.currentResponseID}
                  onChange={(val) => onFormChange('responses', val)}
                  onCurrentChange={(val) => {
                    onFormChange('currentResponseID', val);
                  }}
                />
              </FormControl>
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

ApiEditModal.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

ApiEditModal.defaultProps = {
  open: false,
  data: null,
  onOk: () => {},
  onCancel: () => {},
};

export default ApiEditModal;
