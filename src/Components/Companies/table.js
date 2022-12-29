import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useSelector } from 'react-redux';
import React, { useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';

const CompaniesTable = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

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
            // backgroundColor: '#ffc069',
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
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      width: '10%',
      ...getColumnSearchProps('company'),
    },
    {
      title: '# Connections',
      dataIndex: 'numConnections',
      key: 'numConnections',
      width: '10%',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.numConnections - b.numConnections,
    }
  ];

  let connectionsData = useSelector(state => state.connections.connections);
  let companyData = new Map();
  connectionsData.forEach(connection => {
    if (companyData.has(connection.Company)) {
      let currentCount = companyData.get(connection.Company);
      companyData.set(connection.Company, currentCount + 1);
    } else {
      companyData.set(connection.Company, 1);
    }
  })
  let companyDataArray = [];
  companyData.forEach((value, key) => {
    if (key === '') {
      companyDataArray.push({company: 'No Company Listed', numConnections: value});
    } else {
      companyDataArray.push({ company: key, numConnections: value });
    }
  })

  return (
      <Table 
        pageSize={10}
        columns={columns}
        dataSource={companyDataArray}>
        <Column title='Company' dataIndex='company' key={Math.random()} />
        <Column title='# Connections' dataIndex='numConnections' key={Math.random()} />
      </Table>
  )
}

export default CompaniesTable;