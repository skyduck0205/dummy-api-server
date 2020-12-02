import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { SnackbarProvider } from 'notistack';
import useApi from 'hooks/useApi';
import api from 'services/api';
import ApiList from 'App/ApiList';
import ConfigModal from 'App/ConfigModal';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [config, setConfig] = React.useState([]);
  const [isConfigModalOpen, setIsConfigModalOpen] = React.useState(false);

  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [getConfigStatus, getConfigFetch] = useApi(api.getConfig);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: blue,
          secondary: yellow,
        },
      }),
    [prefersDarkMode]
  );

  React.useEffect(() => {
    getConfigFetch();
  }, []);

  React.useEffect(() => {
    if (getConfigStatus.response) {
      setConfig(getConfigStatus.response.data);
    }
  }, [getConfigStatus.response]);

  const onConfigClick = () => {
    setIsConfigModalOpen(true);
  };

  const onConfigModalClose = () => {
    setIsConfigModalOpen(false);
    getConfigFetch();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Dummy API Server
            </Typography>
            <Box mr={1}>{config.name}</Box>
            <Tooltip title="Config">
              <IconButton size="small" onClick={() => onConfigClick()}>
                <Icon fontSize="small">settings</Icon>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <ApiList />

        <ConfigModal
          open={isConfigModalOpen}
          config={config}
          onOk={() => onConfigModalClose()}
          onCancel={() => onConfigModalClose()}
        />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
