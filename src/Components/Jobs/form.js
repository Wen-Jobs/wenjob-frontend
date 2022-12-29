import React from 'react';
import {
  Form,
  Input,
} from 'antd';
import { Button } from 'antd';

import './style.css'
import { useSelector, useDispatch } from 'react-redux';
import { filterJobs } from '../../Store/slices/jobs';
import { setKeyword } from '../../Store/slices/jobs';
import { algoliasearch } from 'algoliasearch';
const { Search } = Input;



function RoleForm() {

  //* Instantiate the Algolia client
  const client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_API_KEY);

  const jobs = useSelector(state => state.jobs);
  const dispatch = useDispatch();


  //* apply filter using redux store
  const applyFilter = async () => {
    // Fetch search results
    const { results } = await client.search({
      requests: [
        {
          indexName: 'wenjobs',
          query: jobs.keyword,
          hitsPerPage: 50,
        },
      ],
    });
    // add results to redux store
    dispatch(filterJobs(results[0].hits))
  }

  //* resets redux store back to inital call from firebase
  const clearFilter = async () => {
    dispatch(filterJobs(jobs.jobs))
  }

  //* Fetch remote jobs from algolia
  //* Combines keyword with remote for more robust search
  // const getRemote = async (e) => {
  //   if (e.target.checked) {
  //     const { results } = await client.search({
  //       requests: [
  //         {
  //           indexName: 'wenjobs',
  //           query: `${jobs.keyword} remote`,
  //           hitsPerPage: 50,
  //         },
  //       ],
  //     });
  //     // add results to redux store
  //     console.log(results[0].hits)
  //     dispatch(filterJobs(results[0].hits))

  //   }
  // }

  return (
    <>
      <Form style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Form.Item
          style={{
            display: 'flex',
            flexGrow: 1,

          }}>
          <Search
            style={{
              width: '500px',
              flexGrow: 1,
            }}
            size='large'
            enterButton='Search'
            onSearch={applyFilter}
            placeholder={`Try "Remote" or "React" or "Python", or all 3!`}
            onChange={(e) => dispatch(setKeyword(e.target.value))} />
        </Form.Item>
        {/* <Form.Item label="Remote">
          <Checkbox onChange={(e) => getRemote(e)} />
        </Form.Item> */}
      </Form>
      <Button size='large' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '1rem' }} type='primary' onClick={clearFilter}>Reset</Button>
    </>

  );
};
export default RoleForm;