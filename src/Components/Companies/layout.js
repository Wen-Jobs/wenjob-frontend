import React from 'react';
import { Layout } from 'antd';
import CompaniesTable from './table';
import './style.css';
const { Content } = Layout;

function CompaniesLayout() {

  return (

    <Layout className='companiesLayout'>

      <Content className='content'>
        <CompaniesTable />
      </Content>

    </Layout >

  );
}

export default CompaniesLayout;