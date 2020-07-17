import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import HttpStatus from 'components/HttpStatus';
import JsonEditor from 'components/JsonEditor';

const useStyles = makeStyles((theme) => ({
  panel: {
    '&:not(:first-child)': {
      marginTop: -1,
    },
  },
  summary: {
    alignItems: 'center',
    margin: 0,
    '& button + button': {
      marginLeft: theme.spacing(1),
    },
  },
}));

function ApiResponseEditor({
  response,
  isCurrent,
  isExpanded,
  onExpandedChange,
  onChange,
  onCopyClick,
  onDeleteClick,
}) {
  const classes = useStyles();

  const onResponseChange = (key, value) => {
    onChange({
      ...response,
      [key]: value,
    });
  };

  const onResponseCopyClick = (e) => {
    e.stopPropagation();
    onCopyClick();
  };

  const onResponseDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteClick();
  };

  return (
    <ExpansionPanel
      className={classes.panel}
      key={response.id}
      variant="outlined"
      square
      expanded={isExpanded}
      onChange={onExpandedChange}
    >
      <ExpansionPanelSummary classes={{ content: classes.summary }}>
        <HttpStatus status={response.status} mr={1} />
        {response.name}
        {isCurrent && (
          <Box component="span" ml={1} color="secondary.main">
            (current)
          </Box>
        )}
        {/* actions */}
        <Box ml="auto">
          <IconButton size="small" onClick={onResponseCopyClick}>
            <Icon fontSize="inherit">file_copy</Icon>
          </IconButton>
          <IconButton size="small" onClick={onResponseDeleteClick}>
            <Icon fontSize="inherit">delete</Icon>
          </IconButton>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box display="flex" flex={1}>
          {/* code */}
          <Box flex="none">
            <TextField
              fullWidth
              id={`das-response-status-${response.id}`}
              name="das-response-status"
              label="Status"
              size="small"
              type="number"
              value={response.status}
              onChange={(e) => {
                onResponseChange('status', +e.target.value);
              }}
              placeholder="Status code"
              autoFocus
            />
          </Box>
          {/* name */}
          <Box flex={1} ml={2}>
            <TextField
              fullWidth
              id={`das-response-name-${response.id}`}
              name="das-response-name"
              label="Name"
              size="small"
              value={response.name}
              onChange={(e) => onResponseChange('name', e.target.value)}
              placeholder="Response name"
            />
          </Box>
        </Box>
      </ExpansionPanelDetails>
      {/* body */}
      <JsonEditor
        value={response.body}
        onChange={(value) => onResponseChange('body', value)}
      />
    </ExpansionPanel>
  );
}

ApiResponseEditor.propTypes = {
  response: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  onChange: PropTypes.func,
  onCopyClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
ApiResponseEditor.defaultProps = {
  isCurrent: false,
  isExpanded: false,
  onExpandedChange: () => {},
  onChange: () => {},
  onCopyClick: () => {},
  onDeleteClick: () => {},
};

export default ApiResponseEditor;
