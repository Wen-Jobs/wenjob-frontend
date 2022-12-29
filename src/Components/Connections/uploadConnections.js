import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { Alert, Space } from 'antd';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { setConnectionsData } from '../../Store/slices/connections';
import { doc, updateDoc } from 'firebase/firestore';
import db from "../Firebase/FirebaseConfig";
import { useAuth0 } from "@auth0/auth0-react";
import './style.css'
import { setMessage } from '../../Store/slices/connections';


const UploadConnections = () => {

    let connectionsData = useSelector(state => state.connections.connections);

    const dispatch = useDispatch();

    const { user, isAuthenticated } = useAuth0();

    const handleFile = async (info) => {

        if (isAuthenticated) {
            // console.log('authenticated', user.email)
            try {
                Papa.parse(info.file, {
                    header: true,
                    complete: (result) => {
                        console.log('a', result.data);
                        dispatch(setConnectionsData(result.data));
                        addConnectionsData(result.data);


                    }
                });
                console.log('b', connectionsData);
                info.onSuccess(info.file);
            } catch (error) {
                // console.error(error);
                info.onError(error);
                dispatch(setMessage(error));
            };
        }

        else {
            dispatch(setMessage('Please login to upload a file'));
        }

        console.log('c', connectionsData);
    }


    const addConnectionsData = async (connections) => {
        // console.log(user.email)
        console.log('connections data ', connections)
        try {
            if (connections) {
                const ref = doc(db, 'users', user.email);
                await updateDoc(ref, {
                    connections: connections
                });
                // console.log('added connections data to DB')

            }
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    return (
        <>

            <Upload customRequest={handleFile}>
                <Button className='uploadCSVButton' icon={<UploadOutlined />}>Upload CSV</Button>
            </Upload>
        </>
    );
}

export default UploadConnections;