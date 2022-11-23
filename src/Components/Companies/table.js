import { Space, Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, List, UploadProps } from 'antd';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Column from 'antd/es/table/Column';
import jobData from './data.json'

const CompanyTable = () => {

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const [jobsData, setJobsData] = useState(null);
  // const [connectionsData, setConnectionsData] = useState(null);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // const handleFile = (info) => {

  //   console.log(info);
  //   Papa.parse(info.file, {
  //     header: true,
  //     complete: (result) => {
  //       console.log(result.data);
  //       setConnectionsData(result.data)
  //     }
  //   });
  // }

  // const addConnectionsData = async () => {
  //   const batch = writeBatch(db);

  //   try {
  //     if (connectionsData) {
  //       connectionsData.forEach(element => {
  //         let ref = doc(db, "connections", element['First Name']);
  //         batch.set(ref,
  //           {
  //             'First Name': element['First Name'],
  //             "Last Name": element['Last Name'],
  //             "Email Address": element['Email Address'],
  //             "Company": element.Company,
  //             "Position": element.Position,
  //             "Connected On": element['Connected On'],
  //           });
  //       });
  //     }

  //     await batch.commit();


  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // }

  // const readConnectionsData = async () => {

  //   let connectionsArray = [];


  //   const querySnapshot = await getDocs(collection(db, "connections"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${JSON.stringify(doc)}`);
  //     const newItem = doc.data();
  //     connectionsArray.push(newItem);
  //   });
  //   setConnectionsData(connectionsArray);
  // }


  // const addJobsData = async () => {
  //   console.log(jobData)
  //   const batch = writeBatch(db);

  //   try {
  //     if (jobData) {
  //       jobData.jobs.forEach(job => {
  //         let ref = doc(db, "jobs", job.key);
  //         batch.set(ref,
  //           {
  //             "job": job.job,
  //             "company": job.company,
  //             "location": job.location,
  //             "post_date": job.post_date,
  //             "link": job.link,
  //             "key": job.key,
  //             "details": job.details,
  //             "tags": job.tags
  //           });
  //       });
  //     }

  //     await batch.commit();


  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }


  // }

  // const readJobsData = async () => {
  //   let jobsArray = []

  //   const querySnapshot = await getDocs(collection(db, "jobs"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${JSON.stringify(doc)}`);
  //     const newItem = doc.data();
  //     jobsArray.push(newItem);
  //   });
  //   setJobsData(jobsArray);
  // }

  return (
    <>
      {/* <Table className='companyTableWrapper' dataSource={jobsData}>
        <Column title='job' dataIndex='job' key={Math.random()} />
        <Column title='company' dataIndex='company' key={Math.random()} />
        <Column title='location' dataIndex='location' key={Math.random()} />
        <Column title='post_date' dataIndex='post_date' key={Math.random()} />
        <Column title='link' dataIndex='link' key={Math.random()} />
        <Column title='tags' dataIndex='tags' key={Math.random()} />
      </Table>
      <div className='uploadSectionWrapper'>
        <Button onClick={addJobsData}>ADD JOBS TO DB</Button>
        <Button onClick={readJobsData}>READ JOBS FROM DB</Button>
      </div> */}
    </>
  );
}

export default CompanyTable;
