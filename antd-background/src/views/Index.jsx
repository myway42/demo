import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import IndexPage from '../components/IndexPage';

const { Content } = Layout;

const Index = () => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '12px 0' }}>
      <Breadcrumb.Item>主页</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ background: '#fff', minHeight: 360, paddingTop: '40px' }}>
      <IndexPage />
    </div>
  </Content>
)

export default Index;