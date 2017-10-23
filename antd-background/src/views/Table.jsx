import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import TablePage from '../components/TablePage';

const { Content } = Layout;

const Table = () => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '12px 0' }}>
      <Breadcrumb.Item>表格页</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ background: '#fff', minHeight: 360, padding: '40px' }}>
      <TablePage />
    </div>
  </Content>
)

export default Table;