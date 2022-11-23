import './style.css'
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

function RoleTable(props) {

  const {filterParams, clearFilter } = props;

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
  //Just a comment to update dev
  const [jobsData, setJobsData] = useState([]);
  // const [connectionsData, setConnectionsData] = useState(null);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const addJobsData = async () => {
    console.log(jobData)
    const batch = writeBatch(db);

    try {
      if (jobData) {
        jobData.jobs.forEach(job => {
          let ref = doc(db, "jobs", job.key);
          batch.set(ref,
            {
              "job": job.job,
              "company": job.company,
              "location": job.location,
              "post_date": job.post_date,
              "link": job.link,
              "key": job.key,
              "details": job.details,
              "tags": job.tags
            });
        });
      }

      await batch.commit();

    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  const readJobsData = async () => {
    let jobsArray = []

    const querySnapshot = await getDocs(collection(db, "jobs"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${JSON.stringify(doc)}`);
      const newItem = doc.data();
      jobsArray.push(newItem);
    });
    console.log('JOBS------', jobsArray);
    setJobsData(jobsArray);
  }

  const filterJobs = () => {
    // pop only required if last item in jobsData array is blank
    jobsData.pop();
    let allJobs = jobsData;
    let filteredJobs;
    if (filterParams.keyword !== '') {
      filteredJobs = allJobs.filter(job => {
        console.log('Job:', job.job, typeof job.job);
        return job.job.toLowerCase().includes(filterParams.keyword.toLowerCase()) || job.details.toLowerCase().includes(filterParams.keyword.toLowerCase());
      });
    }
    setJobsData(filteredJobs);
  }

  useEffect(() => {
    filterJobs();
  }, [filterParams]);

  return (
    <>
      <Table className='companyTableWrapper' dataSource={jobsData}>
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
      </div>
    </>
  );
}
export default RoleTable;