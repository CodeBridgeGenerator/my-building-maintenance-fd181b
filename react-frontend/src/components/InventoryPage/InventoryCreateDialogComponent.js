import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

import { Checkbox } from 'primereact/checkbox';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const InventoryCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            itemName: _entity.itemName,
            category: _entity.category,
            unitOfMeasure: _entity.unitOfMeasure,
            quantityOnHand: _entity.quantityOnHand,
            minimumStockLevel: _entity.minimumStockLevel,
            maximumStockLevel: _entity.maximumStockLevel,
            reorderPoint: _entity.reorderPoint,
            supplierVendor: _entity.supplierVendor,
            Empty: _entity.Empty,
        };

        setLoading(true);

        try {
            
        const result = await client.service("inventory").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info inventory created successfully" });
        props.onCreateResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="inventory-create-dialog-component">
            <div>
                <p className="m-0">Item Name:</p>
                <InputText className="w-full mb-3" value={_entity?.itemName} onChange={(e) => setValByKey("itemName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Category:</p>
                <InputText className="w-full mb-3" value={_entity?.category} onChange={(e) => setValByKey("category", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Unit Of Measure:</p>
                <InputText className="w-full mb-3" value={_entity?.unitOfMeasure} onChange={(e) => setValByKey("unitOfMeasure", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Quantity On Hand:</p>
                <InputText className="w-full mb-3" value={_entity?.quantityOnHand} onChange={(e) => setValByKey("quantityOnHand", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">minimumStockLevel:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.minimumStockLevel} onChange={(e) => setValByKey("minimumStockLevel", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">maximumStockLevel:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.maximumStockLevel} onChange={(e) => setValByKey("maximumStockLevel", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">reorderPoint:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.reorderPoint} onChange={(e) => setValByKey("reorderPoint", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Supplier Vendor:</p>
                <InputText className="w-full mb-3" value={_entity?.supplierVendor} onChange={(e) => setValByKey("supplierVendor", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Empty:</p>
                <Checkbox checked={_entity?.Empty} onChange={ (e) => setValByKey("Empty", e.checked)}  ></Checkbox>
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(InventoryCreateDialogComponent);
