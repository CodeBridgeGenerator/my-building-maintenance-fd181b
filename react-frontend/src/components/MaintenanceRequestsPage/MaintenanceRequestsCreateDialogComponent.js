import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';

const priorityArray = ["High","Medium","Low"];
const priorityOptions = priorityArray.map((x) => ({ name: x, value: x }));

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

const MaintenanceRequestsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [buildingid, setBuildingid] = useState([])
    const [userid, setUserid] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            buildingid: _entity.buildingid,
            userid: _entity.userid,
            description: _entity.description,
            category: _entity.category,
            priority: _entity.priority,
            status: _entity.status,
            reporteddate: _entity.reporteddate,
            completeddate: _entity.completeddate,
        };

        setLoading(true);

        try {
            
        const result = await client.service("maintenanceRequests").create(_data);
        const eagerResult = await client
            .service("maintenanceRequests")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "buildingid",
                    service : "buildings",
                    select:["buildingName"]
                }
            ,
                {
                    path : "userid",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info maintenanceRequests updated successfully" });
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
                            setBuildingid(res.data.map((e) => { return { name: e['buildingName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Buildings", type: "error", message: error.message || "Failed get buildings" });
                        });
                }, []);

    useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setUserid(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const buildingidOptions = buildingid.map((elem) => ({ name: elem.name, value: elem.value }));
    const useridOptions = userid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="maintenanceRequests-create-dialog-component">
            <div>
                <p className="m-0">Building Name:</p>
                <Dropdown value={_entity?.buildingid} optionLabel="name" optionValue="value" options={buildingidOptions} onChange={(e) => setValByKey("buildingid", e.value)} />
            </div>
            <div>
                <p className="m-0">User Name:</p>
                <Dropdown value={_entity?.userid} optionLabel="name" optionValue="value" options={useridOptions} onChange={(e) => setValByKey("userid", e.value)} />
            </div>
            <div>
                <p className="m-0">Description:</p>
                <InputText className="w-full mb-3" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Category:</p>
                <InputText className="w-full mb-3" value={_entity?.category} onChange={(e) => setValByKey("category", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Priority:</p>
                <Dropdown value={_entity?.priority} optionLabel="name" optionValue="value" options={priorityOptions} onChange={(e) => setValByKey("priority", e.value)} />
            </div>
            <div>
                <p className="m-0">status:</p>
                <Checkbox checked={_entity?.status} onChange={ (e) => setValByKey("status", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">reporteddate:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.reporteddate)} onChange={ (e) => setValByKey("reporteddate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">completeddate:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.completeddate)} onChange={ (e) => setValByKey("completeddate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
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

export default connect(mapState, mapDispatch)(MaintenanceRequestsCreateDialogComponent);
