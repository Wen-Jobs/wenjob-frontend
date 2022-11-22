import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, List, UploadProps } from 'antd';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';





const Database = () => {

    const [data, setData] = useState([]);
    const [connectionsData, setConnectionsData] = useState(null);

    const handleFile = (info) => {

        console.log(info);
        Papa.parse(info.file, {
            header: true,
            complete: (result) => {
                console.log(result.data);
                setConnectionsData(result.data)
            }
        });
    }


    const props = {
        name: 'file',
    };



    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);


    const addConnectionsData = async () => {
        const batch = writeBatch(db);

        try {
            if (connectionsData) {
                connectionsData.forEach(element => {
                    let ref = doc(db, "connections", element['First Name']);
                    batch.set(ref,
                        {
                            'First Name': element['First Name'],
                            "Last Name": element['Last Name'],
                            "Email Address": element['Email Address'],
                            "Company": element.Company,
                            "Position": element.Position,
                            "Connected On": element['Connected On'],
                        });
                });
            }

            await batch.commit();

        
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    const readConnectionsData = async () => {

        let connectionsArray = [];


        const querySnapshot = await getDocs(collection(db, "connections"));
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${JSON.stringify(doc)}`);
            const newItem = doc.data();
            connectionsArray.push(newItem);
        });
        setData(connectionsArray);
    }

    return (
        <>
            <h1>Database</h1>
            <button onClick={addConnectionsData}>add new collection item</button>
            <button onClick={readConnectionsData}>add all connections items to state</button>

            <Upload {...props} customRequest={handleFile}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

        </>
    );
}

export default Database;


// let reader = new FileReader();
//         let file = info.file
//         reader.onload = (function (file) { // here we save variable 'file' in closure
//             return function (e) { // return handler function for 'onload' event
//                 e.preventDefault();
//                 console.log(e.target.result);
//                 csvData = e.target.result;
//                 // csvData.push(e.target.result); // do some thing with data
//             }
//         })(file);
//         reader.readAsText(info.file);
