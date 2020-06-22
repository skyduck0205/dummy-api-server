import React from 'react';
import MaterialTable from 'material-table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';
import useApi from 'hooks/useApi';
import api from 'services/api';
import HttpStatus from 'components/HttpStatus';
import ApiEditModal from 'App/ApiEditModal';

function ApiList() {
  const [apis, setAPIs] = React.useState([]);
  const [selectedAPI, setSelectedAPI] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

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
  }, [
    updateAPIResponseStatus.data,
    updateAPIResponseStatus.error,
    listAPIsFetch,
    enqueueSnackbar,
  ]);

  React.useEffect(() => {
    if (listAPIsStatus.data) {
      setAPIs(listAPIsStatus.data.data);
    }
  }, [listAPIsStatus.data]);

  const onResponseSelect = React.useCallback(
    (apiID, responseID) => {
      updateAPIResponseFetch(apiID, responseID);
    },
    [updateAPIResponseFetch]
  );

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
            cellStyle: { fontSize: 'initial' },
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
        ]}
        data={apis}
        options={{
          paging: false,
          actionsColumnIndex: -1,
          headerStyle: { fontSize: 'initial' },
        }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add API',
            isFreeAction: true,
            onClick: () => {
              setSelectedAPI(null);
              setIsEditModalOpen(true);
            },
          },
          {
            icon: 'edit',
            tooltip: 'Edit API',
            onClick: (e, rowData) => {
              setSelectedAPI(rowData);
              setIsEditModalOpen(true);
            },
          },
          {
            icon: 'file_copy',
            tooltip: 'Copy API',
            onClick: (e, rowData) => console.log(`Copy ${rowData.id}`),
          },
          {
            icon: 'delete',
            tooltip: 'Delete API',
            onClick: (e, rowData) => console.log(`Delete ${rowData.id}`),
          },
        ]}
      />

      <ApiEditModal
        open={isEditModalOpen}
        api={selectedAPI}
        onCancelClick={() => setIsEditModalOpen(false)}
      />
    </>
  );
}

export default ApiList;
