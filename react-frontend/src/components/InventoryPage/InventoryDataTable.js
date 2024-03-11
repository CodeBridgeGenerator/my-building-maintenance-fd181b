
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

import moment from "moment";

const InventoryDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.itemName}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.category}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.unitOfMeasure}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.quantityOnHand}</p>
    const badgeTemplate4 = (rowData, { rowIndex }) => <Badge value={rowData.minimumStockLevel}  ></Badge>
    const badgeTemplate5 = (rowData, { rowIndex }) => <Badge value={rowData.maximumStockLevel}  ></Badge>
    const badgeTemplate6 = (rowData, { rowIndex }) => <Badge value={rowData.reorderPoint}  ></Badge>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.supplierVendor}</p>
    const tickTemplate8 = (rowData, { rowIndex }) => <i className={`pi ${rowData.Empty?"pi-check": "pi-times"}`}  ></i>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="itemName" header="Item Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="category" header="Category" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="unitOfMeasure" header="Unit Of Measure" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="quantityOnHand" header="Quantity On Hand" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="minimumStockLevel" header="minimumStockLevel" body={badgeTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="maximumStockLevel" header="maximumStockLevel" body={badgeTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="reorderPoint" header="reorderPoint" body={badgeTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="supplierVendor" header="Supplier Vendor" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="Empty" header="Empty" body={tickTemplate8} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default InventoryDataTable;