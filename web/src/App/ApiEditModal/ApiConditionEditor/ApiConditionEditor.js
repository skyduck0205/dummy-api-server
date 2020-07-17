import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import JsonEditor from 'components/JsonEditor';
import ResponseSelector from 'components/ResponseSelector';
import { ListItem } from '@material-ui/core';

function ApiConditionEditor({ responses, value, onChange }) {
  const onAddConditionClick = () => {};

  return (
    <>
      <Box my={1}>
        {[
          {
            condition: { urlParam: {}, queryParam: {}, body: {} },
            responseID: null,
          },
        ].map((condition) => (
          <Box key={condition.id}>
            <JsonEditor value={condition.condition} onChange={() => {}} />
            <ResponseSelector
              responses={responses}
              value={condition.responseID}
            />
          </Box>
        ))}
      </Box>
      <Button
        color="secondary"
        startIcon={<Icon>add</Icon>}
        onClick={onAddConditionClick}
      >
        Add Condition
      </Button>
    </>
  );
}

ApiConditionEditor.propTypes = {
  responses: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func,
};

ApiConditionEditor.defaultProps = {
  responses: [],
  value: [],
  onChange: () => {},
};

export default ApiConditionEditor;
