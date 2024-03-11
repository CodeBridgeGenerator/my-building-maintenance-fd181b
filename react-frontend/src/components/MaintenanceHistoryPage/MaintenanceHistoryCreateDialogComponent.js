import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';



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
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            buildingId: _entity.buildingId,
            requestId: _entity.requestId,
            description: _entity.description,
            datePerformed: _entity.datePerformed,
            performedByUserid: _entity.performedByUserid,
        };

        setLoading(true);

        try {
            
        const result = await client.service("maintenanceHistory").create(_data);
        const eagerResult = await client
            .service("maintenanceHistory")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
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
        props.alert({ type: "success", title: "Create info", message: "Info maintenanceHistory updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount buildings
                    client
                        .service("buildings")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setBuildingId(res.data.map((e) => { return { name: e['buildingName'], value: e._id }}));
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
                            setRequestId(res.data.map((e) => { return { name: e['description'], value: e._id }}));
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
                            setPerformedByUserid(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

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

    const buildingIdOptions = buildingId.map((elem) => ({ name: elem.name, value: elem.value }));
    const requestIdOptions = requestId.map((elem) => ({ name: elem.name, value: elem.value }));
    const performedByUseridOptions = performedByUserid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="maintenanceHistory-create-dialog-component">
            <div>
                <p className="m-0">Building Name:</p>
                <Dropdown value={_entity?.buildingId} optionLabel="name" optionValue="value" options={buildingIdOptions} onChange={(e) => setValByKey("buildingId", e.value)} />
            </div>
            <div>
                <p className="m-0">requestId:</p>
                <Dropdown value={_entity?.requestId} optionLabel="name" optionValue="value" options={requestIdOptions} onChange={(e) => setValByKey("requestId", e.value)} />
            </div>
            <div>
                <p className="m-0">Description:</p>
                <InputText className="w-full mb-3" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Date Performed:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.datePerformed)} onChange={ (e) => setValByKey("datePerformed", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">performedByUserid:</p>
                <Dropdown value={_entity?.performedByUserid} optionLabel="name" optionValue="value" options={performedByUseridOptions} onChange={(e) => setValByKey("performedByUserid", e.value)} />
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

export default connect(mapState, mapDispatch)(MaintenanceHistoryCreateDialogComponent);
