
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';

import moment from "moment";

const MaintenanceRequestsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.buildingid?.buildingName}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.userid?.name}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.description}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.category}</p>
    const checkboxTemplate5 = (rowData, { rowIndex }) => <Checkbox checked={rowData.status}  ></Checkbox>
    const calendarTemplate6 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.reporteddate)} showTime ></Calendar>
    const calendarTemplate7 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.completeddate)} showTime ></Calendar>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="buildingid" header="Building Name" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="userid" header="User Name" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="description" header="Description" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="category" header="Category" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="status" header="status" body={checkboxTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="reporteddate" header="reporteddate" body={calendarTemplate6} sortable style={{ minWidth: "8rem" }} />
            <Column field="completeddate" header="completeddate" body={calendarTemplate7} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default MaintenanceRequestsDataTable;