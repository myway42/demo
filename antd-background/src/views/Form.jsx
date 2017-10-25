import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import FormPage from '../components/FormPage';

/**
 * 表单页: 输入保存数据信息, 可进行简单的验证
 */

const { Content } = Layout;

const Form = () => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '12px 0' }}>
      <Breadcrumb.Item>表单页</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ background: '#fff', minHeight: 360, paddingTop: '40px' }}>
      <FormPage />
    </div>
  </Content>
)

export default Form;