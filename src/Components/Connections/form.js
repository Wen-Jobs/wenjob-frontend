import React from 'react';
import {
    Form,
    Input
} from 'antd';

import './style.css'

function PeopleForm() {
    return (
        <Form
        labelCol={{ span: 15 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        >
            <Form.Item>
                <Input.Search placeholder='First Name' onSearch={(value) => {}} />
            </Form.Item>
            <Form.Item>
                <Input.Search placeholder='Last Name' onSearch={(value) => {}}/>
            </Form.Item>
            <Form.Item>
                <Input.Search placeholder='Company' onSearch={() => {}}/>
            </Form.Item>
        </Form>

        
    );
};
export default PeopleForm;