import React from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import genId from '../../../../../utils/genId';
import ApiResponseEditor from './ApiResponseEditor';

function ApiResponses({ value, current, onChange, onCurrentChange }) {
  const [expended, setExpanded] = React.useState(null);

  const onAddResponseClick = () => {
    const newResponse = { id: genId(), name: '', status: 200, body: {} };
    const newResponses = [...value, newResponse];
    setExpanded(newResponse.id);
    onChange(newResponses);
    if (!current) {
      onCurrentChange(newResponse.id);
    }
  };

  const onExpandedChange = (id, isExpanded) => {
    setExpanded(isExpanded ? id : null);
  };

  const onResponseChange = (idx, response) => {
    const newResponses = [
      ...value.slice(0, idx),
      response,
      ...value.slice(idx + 1),
    ];
    onChange(newResponses);
  };

  const onResponseCopyClick = (idx) => {
    const response = value[idx];
    const newResponse = {
      ...response,
      name: `${response.name} (copied)`,
      id: genId(),
    };
    const newResponses = [...value, newResponse];
    setExpanded(newResponse.id);
    onChange(newResponses);
  };

  const onResponseDeleteClick = (idx) => {
    const response = value[idx];
    const newResponses = [...value.slice(0, idx), ...value.slice(idx + 1)];
    onChange(newResponses);
    if (response.id === current) {
      onCurrentChange(_get(newResponses, '[0].id', null));
    }
  };

  return (
    <>
      <Box my={1}>
        {value.map((response, idx) => (
          <ApiResponseEditor
            key={response.id}
            response={response}
            isCurrent={response.id === current}
            isExpanded={response.id === expended}
            onExpandedChange={(e, isExpanded) => {
              onExpandedChange(response.id, isExpanded);
            }}
            onChange={(val) => onResponseChange(idx, val)}
            onCopyClick={() => onResponseCopyClick(idx)}
            onDeleteClick={() => onResponseDeleteClick(idx)}
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
    </>
  );
}

ApiResponses.propTypes = {
  value: PropTypes.array,
  current: PropTypes.string,
  onChange: PropTypes.func,
  onCurrentChange: PropTypes.func,
};

ApiResponses.defaultProps = {
  value: [],
  current: null,
  onChange: () => {},
  onCurrentChange: () => {},
};

export default ApiResponses;
