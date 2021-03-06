import React from 'react';
import MaterialTable from 'material-table';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import useApi from 'hooks/useApi';
import useToast from 'hooks/useToast';
import api from 'services/api';
import ResponseSelector from 'components/ResponseSelector';
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
  table: {
    '& th:first-child': { width: '140px !important' },
    '& th:nth-child(2)': { width: '40% !important' },
    '& th:nth-child(3)': { width: '40% !important' },
    '& th:nth-child(4)': { width: '20% !important' },
    '& th:last-child': { width: '180px !important' },
    '& td': { wordBreak: 'break-word' },
    '& .MuiToolbar-root': { padding: '0 16px' },
  },
  disabledRow: {
    backgroundColor: theme.palette.disabled,
  },
  response: {
    width: '100%',
  },
}));

function ApiList() {
  const [apis, setAPIs] = React.useState([]);
  const [selectedAPI, setSelectedAPI] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const theme = useTheme();
  const classes = useStyles();
  const toast = useToast();

  const [listAPIsStatus, listAPIsFetch] = useApi(api.listAPIs, {
    isLoading: true,
  });
  const [updateAPIStatus, updateAPIFetch] = useApi(api.updateAPI);

  React.useEffect(() => {
    listAPIsFetch();
  }, []);

  React.useEffect(() => {
    if (updateAPIStatus.response) {
      toast.success(updateAPIStatus.response.message);
      listAPIsFetch();
    }
    if (updateAPIStatus.error) {
      toast.error(updateAPIStatus.error.message);
    }
  }, [updateAPIStatus.response, updateAPIStatus.error]);

  React.useEffect(() => {
    if (listAPIsStatus.response) {
      setAPIs(listAPIsStatus.response.data);
    }
    if (listAPIsStatus.error) {
      toast.error(listAPIsStatus.error.message);
    }
  }, [listAPIsStatus.response, listAPIsStatus.error]);

  const onResponseSelect = (apiID, currentResponseID) => {
    updateAPIFetch(apiID, { currentResponseID });
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

  const onVisibilityClick = (rowData) => {
    updateAPIFetch(rowData.id, { disabled: !rowData.disabled });
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
      <div className={classes.table}>
        <MaterialTable
          title="API lists"
          isLoading={listAPIsStatus.isLoading || updateAPIStatus.isLoading}
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
                fontSize: 16,
                fontFamily: 'monospace',
              },
            },
            {
              title: 'Description',
              field: 'description',
              cellStyle: { fontSize: 'initial' },
            },
            {
              title: 'Delay',
              field: 'delay',
              searchable: false,
              render: (rowData) =>
                rowData.delay > 0 && (
                  <Chip
                    variant="outlined"
                    size="small"
                    color="default"
                    label={`${rowData.delay}ms`}
                    style={{ marginRight: 4 }}
                  />
                ),
            },
            {
              title: 'Response',
              sorting: false,
              searchable: false,
              render: (rowData) => (
                <ResponseSelector
                  className={classes.response}
                  responses={rowData.responses}
                  value={rowData.currentResponseID}
                  onChange={(e) => onResponseSelect(rowData.id, e.target.value)}
                />
              ),
            },
            {
              title: 'Actions',
              sorting: false,
              searchable: false,
              headerStyle: { textAlign: 'right' },
              cellStyle: { textAlign: 'right' },
              render: (rowData) => (
                <Box className={classes.actions}>
                  <Tooltip title="Edit API">
                    <IconButton
                      size="small"
                      onClick={() => onEditClick(rowData)}
                    >
                      <Icon fontSize="small">edit</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy API">
                    <IconButton
                      size="small"
                      onClick={() => onCopyClick(rowData)}
                    >
                      <Icon fontSize="small">file_copy</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={rowData.disabled ? 'Enable API' : 'Disable API'}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onVisibilityClick(rowData)}
                    >
                      <Icon fontSize="small">
                        {rowData.disabled ? 'visibility' : 'visibility_off'}
                      </Icon>
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
            tableLayout: 'fixed',
            headerStyle: { fontSize: 'initial' },
            rowStyle: (rowData) =>
              rowData.disabled && {
                color: theme.palette.text.disabled,
                backgroundColor: theme.palette.action.disabledBackground,
              },
            searchFieldStyle: {
              width: 360,
            },
          }}
          localization={{
            toolbar: {
              searchPlaceholder: 'Search by method, path, description',
            },
          }}
        />
      </div>

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
