import React from 'react';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useApi from 'hooks/useApi';
import api from 'services/api';

function ApiList() {
  const [apis, setApis] = React.useState([]);
  const [listApisStatus, listApisFetch] = useApi(api.listApis, {
    isLoading: true,
  });

  React.useEffect(() => {
    listApisFetch();
  }, [listApisFetch]);

  React.useEffect(() => {
    if (listApisStatus.data) {
      setApis(listApisStatus.data);
    }
  }, [listApisStatus.data]);

  return (
    <MaterialTable
      title="API lists"
      isLoading={listApisStatus.isLoading}
      columns={[
        { title: 'Method', field: 'method' },
        { title: 'API Path', field: 'path' },
        {
          title: 'Response',
          render: (rowData) => (
            <Select value={rowData.currentResponseID} onChange={() => {}}>
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
  );
}

export default ApiList;
