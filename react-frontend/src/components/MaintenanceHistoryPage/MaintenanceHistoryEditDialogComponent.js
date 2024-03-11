import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



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

const MaintenanceHistoryCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [buildingId, setBuildingId] = useState([])
    const [requestId, setRequestId] = useState([])
    const [performedByUserid, setPerformedByUserid] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount buildings 
                    client
                        .service("buildings")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setBuildingId(res.data.map((e) => ({ name: e['buildingName'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Buildings", type: "error", message: error.message || "Failed get buildings" });
                        });
                }, []);
   useEffect(() => {
                    //on mount maintenanceRequests 
                    client
                        .service("maintenanceRequests")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setRequestId(res.data.map((e) => ({ name: e['description'], value: e._id })));
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
                            setPerformedByUserid(res.data.map((e) => ({ name: e['name'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            buildingId: _entity.buildingId,
            requestId: _entity.requestId,
            description: _entity.description,
            performedByUserid: _entity.performedByUserid,
        };

        setLoading(true);
        try {
            
        await client.service("maintenanceHistory").patch(_entity._id, _data);
        const eagerResult = await client
            .service("maintenanceHistory")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "buildingId",
                    service : "buildings",
                    select:["buildingName"]
                }
            ,
                {
                    path : "requestId",
                    service : "maintenanceRequests",
                    select:["description"]
                }
            ,
                {
                    path : "performedByUserid",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info maintenanceHistory updated successfully" });
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

    const buildingIdOptions = buildingId.map((elem) => ({ name: elem.name, value: elem.value }));
    const requestIdOptions = requestId.map((elem) => ({ name: elem.name, value: elem.value }));
    const performedByUseridOptions = performedByUserid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="maintenanceHistory-edit-dialog-component">
                <div>
                <p className="m-0">Building Name:</p>
                <Dropdown value={_entity?.buildingId?._id} options={buildingIdOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("buildingId", e.value)} />
            </div>
            <div>
                <p className="m-0">requestId:</p>
                <Dropdown value={_entity?.requestId?._id} options={requestIdOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("requestId", e.value)} />
            </div>
            <div>
                <p className="m-0">Description:</p>
                <InputText className="w-full mb-3" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">performedByUserid:</p>
                <Dropdown value={_entity?.performedByUserid?._id} options={performedByUseridOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("performedByUserid", e.value)} />
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

export default connect(mapState, mapDispatch)(MaintenanceHistoryCreateDialogComponent);
