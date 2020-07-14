import React from 'react';
import PropTypes from 'prop-types';
import { get as _get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ModalHeader from 'components/ModalHeader';
import ModalFooter from 'components/ModalFooter';
import genId from '../../../../utils/genId';
import ApiMethodSelector from './ApiMethodSelector';
import ApiResponseEditor from './ApiResponseEditor';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    margin: theme.spacing(5, 'auto'),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    outline: 'none',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
  },
}));

const defaultForm = {
  id: null,
  method: 'GET',
  path: '',
  description: '',
  responses: [],
  currentResponseID: null,
};

function ApiEditModal({ open, api, onOk, onCancel }) {
  const classes = useStyles();
  const [form, setForm] = React.useState(defaultForm);
  const [expended, setExpanded] = React.useState(null);

  React.useEffect(() => {
    if (open) {
      if (api) {
        setForm({
          id: api.id,
          method: api.method,
          path: api.path,
          description: api.description,
          responses: api.responses,
          currentResponseID: api.currentResponseID,
        });
      } else {
        setForm(defaultForm);
      }
    }
  }, [open, api]);

  const onFormChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onExpandedChange = (id, isExpanded) => {
    setExpanded(isExpanded ? id : null);
  };

  const onAddResponseClick = () => {
    const newResponse = { id: genId(), name: '', status: 200, body: {} };
    const responses = [...form.responses, newResponse];
    let currentResponseID = form.currentResponseID;
    if (!currentResponseID) {
      currentResponseID = newResponse.id;
    }
    setExpanded(newResponse.id);
    setForm({
      ...form,
      responses,
      currentResponseID,
    });
  };

  const onResponseChange = (index, value) => {
    const responses = [
      ...form.responses.slice(0, index),
      value,
      ...form.responses.slice(index + 1),
    ];
    setForm({ ...form, responses });
  };

  const onResponseCopyClick = (index) => {
    const response = form.responses[index];
    if (!response) {
      return;
    }
    const newResponse = {
      ...response,
      name: `${response.name} (copied)`,
      id: genId(),
    };
    const responses = [...form.responses, newResponse];
    setExpanded(newResponse.id);
    setForm({ ...form, responses });
  };

  const onResponseDeleteClick = (index) => {
    const response = form.responses[index];
    if (!response) {
      return;
    }
    const responses = [
      ...form.responses.slice(0, index),
      ...form.responses.slice(index + 1),
    ];
    const isCurrent = response.id === form.currentResponseID;
    let currentResponseID = form.currentResponseID;
    if (isCurrent) {
      currentResponseID = _get(responses, '[0].id', null);
    }
    setForm({
      ...form,
      responses,
      currentResponseID,
    });
  };

  const onOkClick = () => {
    // TODO: Request for add/update API
    onOk(form);
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
              title={api ? 'Edit API' : 'Add API'}
              onCloseClick={onCancel}
            />

            {/* modal body */}
            <Box p={3} py={2} overflow="auto">
              {/* method */}
              <ApiMethodSelector
                value={form.method}
                onChange={(e) => onFormChange('method', e.target.value)}
              />
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
              <FormControl margin="normal" fullWidth required>
                <FormLabel component="legend">Responses</FormLabel>
                <Box my={1}>
                  {form.responses.map((response, index) => (
                    <ApiResponseEditor
                      key={response.id}
                      response={response}
                      isCurrent={response.id === form.currentResponseID}
                      isExpanded={expended === response.id}
                      onExpandedChange={(e, isExpanded) => {
                        onExpandedChange(response.id, isExpanded);
                      }}
                      onChange={(value) => onResponseChange(index, value)}
                      onCopyClick={() => onResponseCopyClick(index)}
                      onDeleteClick={() => onResponseDeleteClick(index)}
                    />
                  ))}
                </Box>
                <Button
                  color="secondary"
                  startIcon={<Icon>add</Icon>}
                  onClick={onAddResponseClick}
                >
                  Add Response
                </Button>
              </FormControl>
            </Box>

            {/* modal footer */}
            <ModalFooter onOkClick={onOkClick} onCancelClick={onCancel} />
          </Paper>
        </Container>
      </Fade>
    </Modal>
  );
}

ApiEditModal.propTypes = {
  open: PropTypes.bool,
  api: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

ApiEditModal.defaultProps = {
  open: false,
  api: null,
  onOk: () => {},
  onCancel: () => {},
};

export default ApiEditModal;
