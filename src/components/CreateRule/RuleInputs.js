import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import NewRuleInputs from './NewRuleInputs';
import Drawer from '@material-ui/core/Drawer';

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "datatype", headerName: "Data Type", width: 200 },
  {
    field: "description",
    headerName: "Description",
    width: 350,
  },
  {
    field: "",
    headerName: "Action",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    renderCell: (params) => {
      return (
        <div style={{ display: "flex" }}>
          <EditIcon />
          <DeleteIcon />
        </div>
      );
    },
    // `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  {
    id: 1,
    title: "ACL Name 1",
    datatype: "string",
    description: "description",
  },
  {
    id: 2,
    title: "ACL Name 2",
    datatype: "string",
    description: "description",
  },
  {
    id: 3,
    title: "ACL Name 3",
    datatype: "string",
    description: "description",
  },
  { id: 4, title: "ACL Name 4", datatype: "int", description: "description" },
  {
    id: 5,
    title: "ACL Name 5",
    datatype: "string",
    description: "description",
  },
  {
    id: 6,
    title: "ACL Name 6",
    datatype: "string",
    description: "description",
  },
  {
    id: 7,
    title: "ACL Name 7",
    datatype: "string",
    description: "description",
  },
];

export default function DataTable() {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  return (
    <>
      <div  style={{ marginBottom: 20, textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>setOpenDrawer(true)}
        >
          Add New
        </Button>
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>

      <Drawer anchor={"right"} open={openDrawer} onClose={()=>setOpenDrawer(false)}>
           <NewRuleInputs setOpenDrawer={setOpenDrawer} />
          </Drawer>
    </>
  );
}
