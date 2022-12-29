import { Table, Input, Space, Button } from 'antd';
import { getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
// import Column from 'antd/es/table/Column';
import { useAuth0 } from "@auth0/auth0-react";
import './style.css'
import db from '../Firebase/FirebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { setConnectionsData } from '../../Store/slices/connections';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const PeopleTable = () => {

  const { user, isAuthenticated } = useAuth0();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  let connectionsData = useSelector(state => state.connections.connections);
  const dispatch = useDispatch();

  const readConnectionsData = async () => {


    const docRef = doc(db, "users", user.email);
    let docSnap = await getDoc(docRef);
    let data;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      data = docSnap.data().connections
    } else {
      // doc.data() will be undefined in this case
      let docSnap = await getDoc(docRef);
      data = docSnap.data().connections
      console.log("No such document!");
    }

    // console.log(data)
    dispatch(setConnectionsData(data));
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
            }
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? '#1890ff' : undefined, }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#fff',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'First Name',
      key: 'firstName',
      width: '15%',
      ...getColumnSearchProps('First Name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'Last Name',
      key: 'lastName',
      width: '15%',
      ...getColumnSearchProps('Last Name'),
    },
    {
      title: 'Company',
      dataIndex: 'Company',
      key: 'company',
      ...getColumnSearchProps('Company'),
    },
    {
      title: 'Position',
      dataIndex: 'Position',
      key: 'position',
      ...getColumnSearchProps('Position'),
    },
    {
      title: 'Connected On',
      dataIndex: 'Connected On',
      key: 'connected',
    }
  ]

  useEffect(() => {
    if (isAuthenticated) {
      readConnectionsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

      <Table pagination={{ pageSize: '10' }}
        defaultPageSize={10}
        style={{ height: '100%' }}
        dataSource={connectionsData}
        columns={columns}>
      </Table>



    </>
  );
}

export default PeopleTable;