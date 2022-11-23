import React, {useState} from 'react';
import { Layout } from 'antd';
import RoleTable from './table';
import RoleForm from './form';


const { Content } = Layout;

// const initalParams = {
//   keyword: '',
// }

function RolePageLayout() {

  const [keyword, setKeyword] = useState();
  const [filterParams, setFilterParams] = useState({});

  const getKeyword = (e) => {
    setKeyword(e);
    console.log('keyword', keyword)
  }

  const applyFilter = () => {
    if (keyword) {
      setFilterParams({...filterParams, 
        keyword: keyword
      })
    }
  }

  // const clearFilter = () => {
  //   setFilterParams({
  //     keyword: ''
  //   });
  // }

  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div className='contentWrapper'>
            <RoleForm getKeyword={getKeyword} applyFilter={applyFilter} />
            <RoleTable filterParams={filterParams} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default RolePageLayout