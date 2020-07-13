import React from 'react';
import { useSnackbar } from 'notistack';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import useApi from 'hooks/useApi';
import api from 'services/api';
import HttpStatus from 'components/HttpStatus';
import ApiEditModal from 'App/ApiEditModal';

const useStyles = makeStyles((theme) => ({
  actions: {
    '& button + button': {
      marginLeft: theme.spacing(1),
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ApiList() {
  const [apis, setAPIs] = React.useState([]);
  const [selectedAPI, setSelectedAPI] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [listAPIsStatus, listAPIsFetch] = useApi(api.listAPIs, {
    isLoading: true,
  });

  const [updateAPIResponseStatus, updateAPIResponseFetch] = useApi(
    api.updateAPIResponse
  );

  React.useEffect(() => {
    listAPIsFetch();
  }, [listAPIsFetch]);

  React.useEffect(() => {
    if (updateAPIResponseStatus.data) {
      enqueueSnackbar(updateAPIResponseStatus.data.message, {
        variant: 'success',
      });
      listAPIsFetch();
    }
    if (updateAPIResponseStatus.error) {
      enqueueSnackbar(updateAPIResponseStatus.error.message, {
        variant: 'error',
      });
    }
  }, [updateAPIResponseStatus, listAPIsFetch, enqueueSnackbar]);

  React.useEffect(() => {
    if (listAPIsStatus.data) {
      setAPIs(listAPIsStatus.data.data);
    }
  }, [listAPIsStatus]);

  const onResponseSelect = React.useCallback(
    (apiID, responseID) => {
      updateAPIResponseFetch(apiID, responseID);
    },
    [updateAPIResponseFetch]
  );

  const onEditClick = (rowData) => {
    setSelectedAPI(rowData);
    setIsEditModalOpen(true);
  };

  const onCopyClick = (rowData) => {
    console.log(rowData);
  };

  const onDeleteClick = (rowData) => {
    console.log(rowData);
  };

  return (
    <>
      <MaterialTable
        title="API lists"
        isLoading={
          listAPIsStatus.isLoading || updateAPIResponseStatus.isLoading
        }
        columns={[
          {
            title: 'Method',
            field: 'method',
            cellStyle: { fontSize: 'initial' },
          },
          {
            title: 'API Path',
            field: 'path',
            cellStyle: {
              fontSize: 'initial',
              fontFamily: 'monospace',
            },
          },
          {
            title: 'Response',
            render: (rowData) => (
              <Select
                value={rowData.currentResponseID}
                onChange={(e) => onResponseSelect(rowData.id, e.target.value)}
              >
                {rowData.responses.map((response) => (
                  <MenuItem key={response.id} value={response.id}>
                    <HttpStatus
                      key={response.id}
                      status={response.status}
                      mr={1}
                    />
                    {response.name}
                  </MenuItem>
                ))}
              </Select>
            ),
          },
          {
            title: 'Description',
            field: 'description',
            cellStyle: { fontSize: 'initial' },
          },
          {
            title: 'Actions',
            sorting: false,
            render: (rowData) => (
              <Box className={classes.actions}>
                <Tooltip title="Edit API">
                  <IconButton size="small" onClick={() => onEditClick(rowData)}>
                    <Icon fontSize="small">edit</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy API">
                  <IconButton size="small" onClick={() => onCopyClick(rowData)}>
                    <Icon fontSize="small">file_copy</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete API">
                  <IconButton
                    size="small"
                    onClick={() => onDeleteClick(rowData)}
                  >
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                </Tooltip>
              </Box>
            ),
          },
        ]}
        data={apis}
        options={{
          paging: false,
          headerStyle: { fontSize: 'initial' },
        }}
      />

      <ApiEditModal
        open={isEditModalOpen}
        api={selectedAPI}
        onOk={(value) => console.log('onOk', value)}
        onCancel={() => setIsEditModalOpen(false)}
      />

      <Tooltip title="Add API">
        <Fab
          className={classes.fab}
          color="primary"
          onClick={() => onEditClick()}
        >
          <Icon>add</Icon>
        </Fab>
      </Tooltip>
    </>
  );
}

export default ApiList;
