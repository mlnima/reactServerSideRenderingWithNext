import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import FormToolBar from "../../../components/adminIncludes/formPageComponents/FormToolBar/FormToolBar";
import FormEditor from "../../../components/adminIncludes/formPageComponents/FormEditor/FormEdittor";

const form = props => {
    const [state, setState] = useState({});
    const [fields, setFields] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AdminLayout>
          <FormToolBar fields={fields} setFields={setFields}/>
          <FormEditor fields={fields} setFields={setFields}/>
        </AdminLayout>
    );
};
export default form;
