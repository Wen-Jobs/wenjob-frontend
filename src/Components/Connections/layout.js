import React from 'react';
import PeopleTable from './table';
// import PeopleForm from './form';
import UploadConnections from './uploadConnections';
import { useSelector } from 'react-redux';
import './style.css';

import { Alert, Space } from 'antd';
import { Layout } from 'antd';
const { Content, Sider } = Layout;

function ConnectionsLayout() {

  //  use redux state to get message
  const message = useSelector(state => state.connections.message);

  return (
    <>
      {message !== '' && ( // if message is truthy, render the alert

        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Alert
            message="Error Message"
            description={message}
            type="error"
            closable
          />
        </Space>
      )}

      <Layout className='layout'>

        <Sider className='connectionSider' width='16rem' theme='light'>
          <ol className='uploadChecklist'>
            <li>
              Go to your <a href='https://www.linkedin.com/mypreferences/d/download-my-data' target='_blank' rel='noreferrer'>LinkedIn</a> Settings
            </li>
            <li>Check "Connections"</li>
            <li>Click "Request Archive"</li>
            <li>Wait for the email from LinkedIn</li>
            <li>Download the CSV from the link in the email</li>
            <li>Edit the CSV to delete the first three rows</li>
            <li>Upload the CSV here</li>
          </ol>
          {/* <PeopleForm /> */}
          <UploadConnections />
        </Sider>

        <Content className='content'>
          <PeopleTable />
        </Content>

      </Layout >
    </>


  );
}

export default ConnectionsLayout;