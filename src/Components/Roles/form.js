import React from 'react';
import {
  Form,
  Input,
  Slider,
  Checkbox,
  Select
} from 'antd';
import { Button } from 'antd';

import './style.css'

const options = [{
  label:'Full-Time',
  value:'Full-Time',
},
{
  label:'Part-Time',
  value:'Part-Time',
},
{
  label:'Contract',
  value:'Contract',
}]

const marks = { 
0: { style: { color: '#fff'}, label: '1'}, 
100: { style: { color: '#fff'}, label: '5000'}}


function RoleForm(props) {

  const { getKeyword, applyFilter } = props;

  return (
    <div className='formWrapper'>
      <Form
        labelCol={{
          span: 15,
        }}
        wrapperCol={{
          span: 15,
        }}
        layout="vertical"
      >
        <Button onClick={applyFilter}>Apply</Button>
        <Form.Item label="General Keywords">
          <Input onChange={(e) => getKeyword(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Role Category">
          <Input />
        </Form.Item>
        <Form.Item label="Remote">
          <Checkbox />
        </Form.Item>
        <Form.Item label="Role Type">
          <Select mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
            options={options} />
        </Form.Item>
        <Form.Item label="Salary">
          <Slider className='formSlider'
            range
            defaultValue={1}
            marks={marks}
            tooltip={{
              placement: 'right'
            }}
          />
        </Form.Item>
        <Form.Item label="Industry">
          <Input />
        </Form.Item>
        <Form.Item label="Number of Employees">
          <Slider className='formSlider'
            defaultValue={5}
            tooltip={{
              placement: 'right'
            }}
          />
        </Form.Item>
        <Form.Item label="Market Cap">
          <Slider className='formSlider'
            defaultValue={5}
            blur
            tooltip={{
              placement: 'right',
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default RoleForm;