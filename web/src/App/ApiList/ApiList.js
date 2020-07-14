import React from 'react';
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
import useToast from 'hooks/useToast';
import api from 'services/api';
import HttpStatus from 'components/HttpStatus';
import ApiEditModal from 'App/ApiEditModal';
import ApiDeleteModal from 'App/ApiDeleteModal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const classes = useStyles();
  const toast = useToast();

  const [listAPIsStatus, listAPIsFetch] = useApi(api.listAPIs, {
    isLoading: true,
  });
  const [updateAPIResponseStatus, updateAPIResponseFetch] = useApi(
    api.updateAPI
  );

  React.useEffect(() => {
    listAPIsFetch();
  }, []);

  React.useEffect(() => {
    if (updateAPIResponseStatus.data) {
      toast.success(updateAPIResponseStatus.data.message);
      listAPIsFetch();
    }
    if (updateAPIResponseStatus.error) {
      toast.error(updateAPIResponseStatus.error.message);
    }
  }, [updateAPIResponseStatus.data, updateAPIResponseStatus.error]);

  React.useEffect(() => {
    if (listAPIsStatus.data) {
      setAPIs(listAPIsStatus.data.data);
    }
    if (listAPIsStatus.error) {
      toast.error(listAPIsStatus.error.message);
    }
  }, [listAPIsStatus.data, listAPIsStatus.error]);

  const onResponseSelect = (apiID, currentResponseID) => {
    updateAPIResponseFetch(apiID, { currentResponseID });
  };

  const onEditClick = (rowData) => {
    setSelectedAPI(rowData);
    setIsEditModalOpen(true);
  };

  const onCopyClick = (rowData) => {
    setSelectedAPI({
      ...rowData,
      description: `${rowData.description} (copied)`,
      id: null,
    });
    setIsEditModalOpen(true);
  };

  const onDeleteClick = (rowData) => {
    setSelectedAPI(rowData);
    setIsDeleteModalOpen(true);
  };

  const onEditModalClose = (data) => {
    if (data) {
      listAPIsFetch();
    }
    setIsEditModalOpen(false);
  };

  const onDeleteModalClose = (data) => {
    if (data) {
      listAPIsFetch();
    }
    setIsDeleteModalOpen(false);
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
        data={selectedAPI}
        onOk={(data) => onEditModalClose(data)}
        onCancel={() => onEditModalClose()}
      />

      <ApiDeleteModal
        open={isDeleteModalOpen}
        data={selectedAPI}
        onOk={(data) => onDeleteModalClose(data)}
        onCancel={() => onDeleteModalClose()}
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
