import React from 'react';
import { Layout } from 'antd';
import RoleTable from './table';
import RoleForm from './form';
import JobCard from './jobCard';
const { Content, Sider } = Layout;

function JobsLayout() {


  return (
    <div className='background'>

      <div className='search'>
        <RoleForm />
      </div>

      <Layout className='layout'>

        <Content className='content'>
          <RoleTable />
        </Content>
        <Sider className='sider' width='35vw' theme='light'
        >
          <JobCard />
        </Sider>
      </Layout>
    </div>
  );
}

export default JobsLayout