import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { JsonEditor as Editor } from 'jsoneditor-react';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';
import 'jsoneditor-react/es/editor.min.css';

const useStyles = makeStyles((theme) => ({
  editor: {
    '& .jsoneditor': {
      border: 0,
    },
    '& .jsoneditor-menu': {
      backgroundColor: theme.palette.background.default,
      border: 0,
    },
  },
}));

function JsonEditor(props) {
  const classes = useStyles();

  return (
    <Box className={classes.editor}>
      <Editor
        mode={Editor.modes.code}
        ace={ace}
        theme="ace/theme/monokai"
        {...props}
      />
    </Box>
  );
}

export default JsonEditor;
