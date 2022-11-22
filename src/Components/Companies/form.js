import React from 'react';
import {
  Form,
  Input,
  Slider, 
} from 'antd';

function FormCompanies(){

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 3,
        }}
        layout="horizontal"
      >
        <Form.Item label="General Keywords">
          <Input />
        </Form.Item>
        <Form.Item label="Headquarters Location">
          <Input />
        </Form.Item>
        <Form.Item label="Industry">
          <Input />
        </Form.Item>
      </Form>
      <Slider 
        defaultValue={5}
        tooltip={{
          open: false,
        
        }}
      />

      <Slider 
        defaultValue={5}
        tooltip={{
          open: false,
        
        }}
      />
    </>
  );
};
export default FormCompanies;