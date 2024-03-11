import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
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

const WorkOrdersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [requestid, setRequestid] = useState([])
    const [assignedtouserid, setAssignedtouserid] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount maintenanceRequests 
                    client
                        .service("maintenanceRequests")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setRequestid(res.data.map((e) => ({ name: e['buildingid'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "MaintenanceRequests", type: "error", message: error.message || "Failed get maintenanceRequests" });
                        });
                }, []);
   useEffect(() => {
                    //on mount users 
                    client
                        .service("users")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setAssignedtouserid(res.data.map((e) => ({ name: e['name'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            requestid: _entity.requestid,
            assignedtouserid: _entity.assignedtouserid,
            startdate: _entity.startdate,
            enddate: _entity.enddate,
            status: _entity.status,
            notes: _entity.notes,
        };

        setLoading(true);
        try {
            
        await client.service("workOrders").patch(_entity._id, _data);
        const eagerResult = await client
            .service("workOrders")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "requestid",
                    service : "maintenanceRequests",
                    select:["buildingid"]
                }
            ,
                {
                    path : "assignedtouserid",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info workOrders updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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
    // children dropdown options

    const requestidOptions = requestid.map((elem) => ({ name: elem.name, value: elem.value }));
    const assignedtouseridOptions = assignedtouserid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="workOrders-edit-dialog-component">
                <div>
                <p className="m-0">Requests:</p>
                <Dropdown value={_entity?.requestid?._id} options={requestidOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("requestid", e.value)} />
            </div>
            <div>
                <p className="m-0">Assigned User Name:</p>
                <Dropdown value={_entity?.assignedtouserid?._id} options={assignedtouseridOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("assignedtouserid", e.value)} />
            </div>
            <div>
                <p className="m-0">Started Date:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.startdate)} onChange={ (e) => setValByKey("startdate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">End Date:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.enddate)} onChange={ (e) => setValByKey("enddate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">Status:</p>
                <Checkbox checked={_entity?.status} onChange={ (e) => setValByKey("status", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">Notes:</p>
                <InputText className="w-full mb-3" value={_entity?.notes} onChange={(e) => setValByKey("notes", e.target.value)}  />
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
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(WorkOrdersCreateDialogComponent);
