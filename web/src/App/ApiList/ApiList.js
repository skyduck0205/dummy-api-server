import React from 'react';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';
import useApi from 'hooks/useApi';
import api from 'services/api';

function ApiList() {
  const [apis, setApis] = React.useState([]);

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
      setApis(listAPIsStatus.data.data);
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
                    <Box
                      mr={1}
                      component="span"
                      color={
                        response.status >= 200 && response.status < 300
                          ? 'success.main'
                          : 'error.main'
                      }
                      display="inline-flex"
                      alignItems="center"
                    >
                      {response.status}
                    </Box>
                    {response.name}
                  </MenuItem>
                ))}
              </Select>
            ),
          },
        ]}
        data={apis}
        options={{
          paging: false,
          actionsColumnIndex: -1,
          rowStyle: { fontSize: 'initial' },
          headerStyle: { fontSize: 'initial' },
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (e, rowData) => console.log(`Edit ${rowData.id}`),
          },
          {
            icon: 'file_copy',
            tooltip: 'Copy',
            onClick: (e, rowData) => console.log(`Copy ${rowData.id}`),
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (e, rowData) => console.log(`Delete ${rowData.id}`),
          },
        ]}
      />
    </>
  );
}

export default ApiList;
